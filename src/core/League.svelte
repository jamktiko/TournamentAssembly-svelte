<script>
  import cch from '../utils/cache';
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
  import Match from '../reusable/Match.svelte';
  import { onDestroy } from 'svelte';
  import MatchResults from '../reusable/MatchResults.svelte';

  let matchResults = [];
  let matchResultsR = [];
  let showResults = 0;
  function toggleResults() {
    if (showResults == 0) {
      showResults = 1;
    } else {
      showResults = 0;
    }
  }

  onDestroy(() => {
    cch.saveToCache('league', [config, ...teams]);
  });

  let config = {
    name: 'test1',
    organizer: 'test2',
    pointsPerWin: 3,
    pointsPerDraw: 1,
  };

  let teams = [];
  let match = [];

  if (cch.isInCache('league')) {
    const cachedItems = cch.getFromCache('league');
    config = cachedItems.shift();

    teams = cachedItems;
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
  <div class="league-content">
    <div class="league-header">
      <h1 class="league-name">{config.name}</h1>
    </div>
    <div class="addplayer-content">
      {#if playerNameInputVisible}
        <p>Type your Team name below</p>
        <div class="playername-input">
          <input
            type="text"
            bind:value={newPlayerName}
            placeholder="Team name"
          />
        </div>
        <div class="addplayer-buttons">
          <Button
            class="adjust-button"
            disabled={newPlayerName ? true : false}
            on:cClick={addPlayer}>Add</Button
          >
          <Button
            class="adjust-button"
            on:cClick={() => (playerNameInputVisible = false)}>Close</Button
          >
        </div>
        <div class="error-message-content">
          {#if nameInvalid}
            <p class="error">Player needs to have a name!</p>
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
            <tr>
              <td>{team.name}</td>
              <td>{team.playedMatches}</td>
              <td>{team.score}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.goalDiff}</td>
              <td>
                <Button
                  class="adjust-button"
                  on:cClick={() => addToMatch(team.id)}
                  >Add player to match</Button
                >
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    {#if match[0] && match[1]}
      <Button class="adjust-button" on:cClick={() => (match = [])}>Close</Button
      >
      <Match {match} on:winnerevent={resolve} />
    {/if}
    <div class="results-container">
      <div class="results-button-container">
        {#if showResults == 0}
          <Button on:cClick={() => toggleResults()}>Show results</Button>
        {/if}
        {#if showResults == 1}
          <Button on:cClick={() => toggleResults()}>Hide results</Button>
        {/if}
      </div>
      {#if showResults == 1}
        <div class="matchresults-container">
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
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .league-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .league-header {
    padding-top: 2em;
    text-align: center;
  }

  .league-name {
    font-size: 4em;
  }

  .addplayer-buttons {
    padding: 1em 0em;
  }

  .addplayer-content {
    padding: 1em 0em;
    margin: auto;
    height: 10em;
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

  th:first-child {
    text-align: left;
    padding-right: 3em;
  }

  th:not(:first-child) {
    text-align: center;
    padding-left: 1em;
    padding-right: 1em;
  }

  tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.1);
  }

  td:first-child {
    text-align: left;
  }

  td:not(:first-child) {
    text-align: center;
  }

  td {
    padding: 0.25em 0em;
  }

  td {
    border-top: 1px solid rgb(255, 255, 255);
  }

  .results-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 1em, 0em;
  }

  .results-button-container {
    padding: 1em 0em;
  }

  .matchresults-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: auto;
  }
</style>
