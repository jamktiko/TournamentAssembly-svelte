<script>
  import cch from '../utils/cache';
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
  import Match from '../reusable/Match.svelte';
  import { onDestroy } from 'svelte';

  onDestroy(() => {
    cch.saveToCache('league', [config, ...teams]);
  });

  let config = {
    name: 'test',
    organizer: 'test',
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
      console.log(config.pointsPerDraw);
    } else {
      ce.detail.winner.wins++;
      console.log(config.pointsPerWin);
      ce.detail.winner.score += config.pointsPerWin;
      ce.detail.winner.playedMatches++;
      ce.detail.winner.goalDiff += ce.detail.goalDiff;

      ce.detail.loser.losses++;
      ce.detail.loser.playedMatches++;
      ce.detail.loser.goalDiff -= ce.detail.goalDiff;
    }

    match = [];

    teams = teams.sort((a, b) => b.score - a.score);
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
      <h2>{config.name}</h2>
    </div>
    <div class="addplayer-content">
      {#if playerNameInputVisible}
        <div class="playername-input">
          <input type="text" bind:value={newPlayerName} />
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
            <p>Player needs to have a name!</p>
          {/if}
        </div>
      {:else}
        <Button on:cClick={() => (playerNameInputVisible = true)}
          >Add new Player</Button
        >
      {/if}
    </div>
    <div class="league-scoreboard">
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
        <tbody>
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
                <Button on:cClick={() => addToMatch(team.id)}
                  >Add player to match</Button
                >
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      {#if match[0] && match[1]}
        <Button class="adjust-button" on:cClick={() => (match = [])}>X</Button>
        <Match {match} on:winnerevent={resolve} />
      {/if}
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
  }

  .league-header {
    text-align: center;
  }

  .addplayer-content {
    position: relative;
    padding: 10em, 0em;
    margin: auto;
    height: 10em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .playername-input {
    justify-content: center;
    align-items: center;
  }

  .addplayer-buttons {
    justify-content: center;
    align-items: center;
  }

  .error-message-content {
    justify-content: center;
    align-items: center;
  }

  input {
    color: black;
  }

  th {
    text-decoration: underline;
    text-align: left;
    padding-right: 3em;
  }
</style>
