<script>
  import cch from '../utils/cache';
  import Button from '../reusable/Button.svelte';
  import Match from '../reusable/Match.svelte';
  import { onDestroy } from 'svelte';
  import MatchResults from '../reusable/MatchResults.svelte';

  export let params;

  let matchResults = [];
  let matchResultsR = [];
  let showResults = 1;

  $: selected = null;

  function toggleResults() {
    if (showResults == 0) {
      showResults = 1;
    } else {
      showResults = 0;
    }
  }

  let config = cch.detokenify(params.tourdata)[0];

  onDestroy(() => {
    cch.saveToCache('league', teams);
    cch.saveToCache('leagueConf', config);
  });

  let teams = [];
  let match = [];

  if (cch.isInCache('league') && cch.isInCache('leagueConf')) {
    teams = cch.getFromCache('league');

    console.log(teams);
  }

  let sortBy = '';
  let sortOrder = 1;

  function toggleSortOrder(column) {
    if (sortBy === column) {
      sortOrder *= -1;
    } else {
      sortBy = column;
      sortOrder = 1;
    }

    teams = teams.sort((a, b) => {
      return sortOrder * (a[column] < b[column] ? 1 : -1);
    });
  }

  $: newPlayerName = null;
  let playerNameInputVisible = false;
  let nameInvalid = false;
  /**
   * Add player to the league, gets contestants name from an input and adds to an object to create the contestant
   */
  function addPlayer() {
    if (!newPlayerName) {
      nameInvalid = true;
      setTimeout(() => (nameInvalid = false), 2000);
      return;
    }

    const newPlayer = {
      id: calcId(),
      name: newPlayerName,
      playedMatches: 0,
      score: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalDiff: 0,
    };
    teams = [...teams, newPlayer];

    newPlayerName = null;
  }
  /**
   * Adds player from the league to a match, match can only hold two players simultaneously
   */
  function addToMatch(id) {
    if (!selected && selected !== 0 && match.length < 2) {
      selected = id;
    } else {
      setTimeout(() => {
        const titleElement = document.querySelector('.match-header');
        if (!titleElement) return;
        titleElement.scrollIntoView({ behavior: 'smooth' });
      }, 20);

      selected = null;
    }
    if (match.length < 2 && match[0] ? match[0].id !== id : true) {
      match = [...match, teams.find((team) => team.id === id)];
    }
  }

  /**
   * Fires when a match is resolved, increments the winner and losers stats and sort board based on the highest score
   * @param ce custom event received from Match-component, contains the winner and loser
   */
  function resolve(ce) {
    if (ce.detail.draw) {
      ce.detail.contestants[0].draws++;
      ce.detail.contestants[0].playedMatches++;
      ce.detail.contestants[0].score += config.pointsPerDraw;

      ce.detail.contestants[1].draws++;
      ce.detail.contestants[1].playedMatches++;
      ce.detail.contestants[1].score += config.pointsPerDraw;
      matchResults.push({
        contestants: [
          {
            name: ce.detail.contestants[0].name,
            score: ce.detail.result1,
            win: false,
          },
          {
            name: ce.detail.contestants[1].name,
            score: ce.detail.result2,
            win: false,
          },
        ],
        draw: true,
      });
    } else {
      ce.detail.winner.wins++;
      ce.detail.winner.score += config.pointsPerWin;
      ce.detail.winner.playedMatches++;
      ce.detail.winner.goalDiff += ce.detail.goalDiff;

      ce.detail.loser.losses++;
      ce.detail.loser.playedMatches++;
      ce.detail.loser.goalDiff -= ce.detail.goalDiff;
      if (ce.detail.result1 > ce.detail.result2) {
        matchResults.push([
          {
            contestants: [
              {
                name: ce.detail.winner.name,
                score: ce.detail.result1,
                win: true,
              },
              {
                name: ce.detail.loser.name,
                score: ce.detail.result2,
                win: false,
              },
            ],
            draw: false,
          },
        ]);
      } else {
        matchResults.push([
          {
            contestants: [
              {
                name: ce.detail.loser.name,
                score: ce.detail.result1,
                win: false,
              },
              {
                name: ce.detail.winner.name,
                score: ce.detail.result2,
                win: true,
              },
            ],
            draw: false,
          },
        ]);
      }
    }

    match = [];

    teams = teams.sort((a, b) => b.score - a.score);
    matchResultsR = [...matchResults].reverse();
  }
  /**
   * Calculates new ID based on the highest existing ID in the array, if array is empty returns 0
   */
  function calcId() {
    if (teams.length != 0) return Math.max(...teams.map((team) => team.id)) + 1;
    return 0;
  }
</script>

<main>
  <h1 class="league-name">{config.tournamentName}</h1>
  <div class="league-content">
    <div class="league-header" />

    <div class="addplayer-content">
      {#if playerNameInputVisible}
        <p>Type your team name below</p>
        <div class="playername-input">
          <input
            class="player-input"
            type="text"
            bind:value={newPlayerName}
            placeholder="Team name"
          />
        </div>
        <div class="addplayer-buttons">
          <Button
            class="adjust-button-league"
            disabled={!newPlayerName ? true : false}
            on:cClick={addPlayer}>Add</Button
          >
          <Button
            class="adjust-button-league"
            on:cClick={() => (playerNameInputVisible = false)}>Close</Button
          >
        </div>
        <div class="error-message-content">
          {#if nameInvalid}
            <p class="error">Team needs to have a name!</p>
          {/if}
        </div>
      {:else}
        <Button on:cClick={() => (playerNameInputVisible = true)}
          >Add new Team</Button
        >
      {/if}
    </div>
    <div class="league-scoreboard-container">
      <table>
        <thead>
          <tr>
            <th on:click={() => toggleSortOrder('name')}>Team Name</th>
            <th on:click={() => toggleSortOrder('playedMatches')}>PL</th>
            <th on:click={() => toggleSortOrder('score')}>Score</th>
            <th on:click={() => toggleSortOrder('wins')}>W</th>
            <th on:click={() => toggleSortOrder('draws')}>D</th>
            <th on:click={() => toggleSortOrder('losses')}>L</th>
            <th on:click={() => toggleSortOrder('goalDiff')}>GD</th>
          </tr>
        </thead>
        <tbody class="scoreboard-lined-cell">
          {#each teams as team (team.id)}
            <tr class="table-row">
              <td>{team.name}</td>
              <td>{team.playedMatches}</td>
              <td>{team.score}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.goalDiff}</td>
              <td>
                <Button
                  disabled={selected === team.id}
                  class="add-team-button"
                  on:cClick={() => addToMatch(team.id)}
                  >Add team to match</Button
                >
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    {#if match[0] && match[1]}
      <Button on:cClick={() => (match = [])}>CANCEL</Button>
      <Match {match} on:winnerevent={resolve} />
    {/if}
    <div class="results-button-container">
      {#if showResults == 0}
        <Button on:cClick={() => toggleResults()}>Show results</Button>
      {/if}
      {#if showResults == 1}
        <Button on:cClick={() => toggleResults()}>Hide results</Button>
      {/if}
    </div>
    <div class="results-container">
      {#if showResults == 1}
        <div>
          <h1 class="results-header">RESULTS</h1>
          <p>
            Below is a list of concluded matches and their results. You can hide
            the results from view by clicking the HIDE RESULTS button.
          </p>
          {#each matchResultsR.slice().reverse() as matchResult}
            <MatchResults {matchResult} />
          {/each}
        </div>
      {/if}
    </div>
  </div>
</main>

<style>
  main {
    margin: auto;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .league-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.308);
  }

  .league-header {
    padding-top: 1em;
    text-align: center;
  }

  .league-name {
    font-size: 4em;
  }

  .addplayer-buttons {
    text-transform: uppercase;
    padding: 1em 0em 2em;
  }

  .addplayer-content {
    padding: 0em 0em;
    margin: auto;
    height: 11em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
  }

  input {
    text-align: center;
    color: black;
  }
  .player-input {
    width: 15em;
    height: 2.2em;
    font-size: 14pt;
    margin: auto;
    display: block;
    justify-content: center;
    color: white;
    border-radius: 1em;
    background-color: rgb(69, 69, 69);
    border-color: rgba(31, 0, 24, 0.295);
  }
  .error-message-content {
    position: absolute;
    top: 80%;
    left: 0;
    width: 100%;
    text-align: center;
  }

  .error {
    color: red;
  }

  table {
    font-size: 1.1em;
    padding-bottom: 1em;
  }

  th {
    font-size: 1.2em;
    text-transform: uppercase;
  }
  th:first-child {
    text-align: left;
    padding-left: 1em;
  }

  th:not(:first-child) {
    text-align: center;
    padding-left: 1em;
    padding-right: 1em;
  }

  tr:nth-child(even) {
    text-align: left;
    padding-right: 3em;
    background-color: rgba(255, 255, 255, 0.1);
  }

  td:first-child {
    text-align: left;
    padding-right: 3em;
  }

  td:not(:first-child) {
    text-align: center;
  }

  td {
    font-size: 1.15em;
    padding: 0.3em 1em;
    border-top: 1px solid rgb(255, 255, 255);
    border-bottom: 1px solid rgb(255, 255, 255);
  }

  .results-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1em 0em;
  }

  .results-button-container {
    margin-top: 2em;
    padding-bottom: 1em;
  }

  .league-scoreboard-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    width: 100%;
  }

  .results-header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    text-transform: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
  }
</style>
