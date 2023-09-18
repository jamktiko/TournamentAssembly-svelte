<script>
  import chc from "../utils/cache";
  import { push } from "svelte-spa-router";
  import Button from "../reusable/Button.svelte";
  import Match from "../reusable/Match.svelte";

  let config = {
    pointsPerWin: 3,
  };

  let teams = [];
  let match = [];

  let sortBy = "";
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
    console.log(!newPlayerName);
    if (!newPlayerName) {
      nameInvalid = true;
      setTimeout(() => (nameInvalid = false), 2000);
      return;
    }

    const newPlayer = {
      id: calcId(),
      name: newPlayerName,
      score: 0,
      wins: 0,
      losses: 0,
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
    ce.detail.winner.wins++;
    ce.detail.winner.score += config.pointsPerWin;
    ce.detail.loser.losses++;
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

  function save() {
    console.log(chc.detokenify(chc.tokenify(teams)));
  }
</script>

<div class="back-arrow-container">
  <Button on:cClick={() => push("/selection")}>
    <svg
      class="back-arrow"
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      ><path
        d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"
      /></svg
    >
  </Button>
</div>

<div class="league-content">
  <table>
    <thead>
      <tr>
        <th on:click={() => toggleSortOrder("name")}>Team Name</th>
        <th on:click={() => toggleSortOrder("score")}>Score</th>
        <th on:click={() => toggleSortOrder("wins")}>W</th>
        <th on:click={() => toggleSortOrder("losses")}>L</th>
      </tr>
    </thead>
    <tbody>
      {#each teams as team (team.id)}
        <tr>
          <td>{team.name}</td>
          <td>{team.score}</td>
          <td>{team.wins}</td>
          <td>{team.losses}</td>
          <td>
            <Button on:cClick={() => addToMatch(team.id)}
              >Add player to match</Button
            >
          </td>
        </tr>
      {/each}
    </tbody>
    {#if playerNameInputVisible}
      <input type="text" bind:value={newPlayerName} />
      <Button disabled={newPlayerName ? true : false} on:cClick={addPlayer}
        >Accept</Button
      >
      <Button on:cClick={() => (playerNameInputVisible = false)}>Close</Button>
      {#if nameInvalid}
        <p>Player needs to have a name!</p>
      {/if}
    {:else}
      <Button on:cClick={() => (playerNameInputVisible = true)}
        >Add new Player</Button
      >
    {/if}
  </table>
  {#if match[0] && match[1]}
    <Button on:cClick={() => (match = [])}>X</Button>
    <Match {match} on:winnerevent={resolve} />
  {/if}

  <Button on:cClick={save}>Save</Button>
</div>

<style>
  input {
    color: black;
  }
  .league-content {
    display: flex;

    justify-content: center;
    display: flex;
    margin: auto;
    flex-direction: row;
  }

  th {
    text-decoration: underline;
    text-align: left;
    padding-right: 3em;
  }

  .back-arrow-container {
    position: absolute;
    top: 3em;
    left: 2em;
  }

  .back-arrow {
    width: 4em;
    height: 4em;
    fill: rgb(255, 255, 255);
  }
</style>
