<script>
  import cch from "../utils/cache";
  import { push } from "svelte-spa-router";
  import Button from "../reusable/Button.svelte";
  import Match from "../reusable/Match.svelte";
  import { onDestroy } from "svelte";
  import MatchResults from "../reusable/MatchResults.svelte";


  let matchResults = [];
  let matchResultsR = []
  let showResults = 0
  function toggleResults(){
    if (showResults == 0){
      showResults = 1}
      else{
        showResults = 0
      }
    } 


  
  onDestroy(() => {
    cch.saveToCache("league", [config, ...teams]);
  });

  let config = {
    name: "test",
    organizer: "test",
    pointsPerWin: 3,
    pointsPerDraw: 1,
  };

  let teams = [];
  let match = [];

  if (cch.isInCache("league")) {
    const cachedItems = cch.getFromCache("league");
    config = cachedItems.shift();

    teams = cachedItems;
  }

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
        { name: ce.detail.contestants[0].name, score: ce.detail.result1, win: false },
        { name: ce.detail.contestants[1].name, score: ce.detail.result2, win: false },
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
      if (ce.detail.result1 > ce.detail.result2){
      matchResults.push([
  {
    contestants: [
      { name: ce.detail.winner.name, score: ce.detail.result1, win: true },
      { name: ce.detail.loser.name, score: ce.detail.result2, win: false },
    ],
    draw: false,
  },
]);
}
else{
  matchResults.push([
  {
    contestants: [
      { name: ce.detail.loser.name, score: ce.detail.result1, win: false },
      { name: ce.detail.winner.name, score: ce.detail.result2, win: true },
    ],
    draw: false,
  },
]);
}
    }
    
    match = [];

    teams = teams.sort((a, b) => b.score - a.score);
    matchResultsR = [...matchResults].reverse()
  }
  /**
   * Calculates new ID based on the highest existing ID in the array, if array is empty returns 0
   */
  function calcId() {
    if (teams.length != 0) return Math.max(...teams.map((team) => team.id)) + 1;
    return 0;
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
  <h2>{config.name}</h2>

  <table>
    <thead>
      <tr>
        <th on:click={() => toggleSortOrder("name")}>Team Name</th>
        <th on:click={() => toggleSortOrder("playedMatches")}>PL</th>
        <th on:click={() => toggleSortOrder("score")}>Score</th>
        <th on:click={() => toggleSortOrder("wins")}>W</th>
        <th on:click={() => toggleSortOrder("draws")}>D</th>
        <th on:click={() => toggleSortOrder("losses")}>L</th>
        <th on:click={() => toggleSortOrder("goalDiff")}>GD</th>
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



  

</div>
{#if showResults == 0}
  <Button on:cClick={() => (toggleResults())}>Show results</Button>
  {/if}
    {#if showResults == 1}
    <Button on:cClick={() => (toggleResults())}>Hide results</Button>
      {#each matchResultsR as matchResult}
      <div class="flex-container">
      <MatchResults {matchResult} />
      <div></div>
    </div>
      {/each}

    {/if}
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
  .flex-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: stretch;
  max-width: 700px;
}
</style>
