<script>
  import cch from "../utils/cache";
  import stateController from "../utils/stateStore";
  import Button from "../reusable/Button.svelte";
  import Match from "../reusable/Match.svelte";
  import MatchResults from "../reusable/MatchResults.svelte";
  import Automatches from "../reusable/Automatches.svelte";
  import { onDestroy } from "svelte";
  import { push } from "svelte-spa-router";
  import { slide } from "svelte/transition";
  import { fade } from "svelte/transition";
  import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Tooltip from "../reusable/Tooltip.svelte";
  import { loadFromSession } from "../utils/lib";

  export let params;

  let user;
  const unsub = stateController.subscribe((userData) => (user = userData));

  if (!user.username && window.sessionStorage.getItem("user")) {
    user = loadFromSession("user");
    stateController.set(user);
  }

  let match = [];
  let matchResults = [];
  let matchResultsR = [];
  let groupWinners = [];

  let config = cch.detokenify(params.tourdata)[0];

  let groups = [];

  let blacklisted = [];

  onDestroy(() => {
    cch.saveToCache("groups", groups);
    cch.saveToCache("groupsConf", config);

    if (user.state) delete user.state;

    if (unsub) unsub();
  });

  if (cch.isInCache("groups")) {
    groups = cch.getFromCache("groups");
  } else {
    generateGroups(config);
  }

  if (user.state && user.config) {
    groups = user.state.groups;
    matchResults = user.state.matchResults;
    matchResultsR = [...matchResults].reverse()
    config = user.config;
  }

  let showResults = false;
  function toggleResults() {
    showResults = !showResults;
  }

  function generateGroups(conf) {
    for (let i = 0; i < conf.numberOfGroups; i++) {
      const group = {
        id: i,
        name: `Group ${i + 1}`,
        participants: [],
      };

      groups.push(group);

      for (let j = 0; j < conf.teamsInGroup; j++) {
        const newParticipant = {
          id: calcId(groups[i].participants),
          name: "",
          playedMatches: 0,
          score: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalDiff: 0,
        };
        groups[i].participants.push(newParticipant);
      }
    }
  }

  $: selected = null;

  function selectGroup(group, i) {
    if (selected) {
      othermatches[selected.id] = agmatches;
    }

    console.log(selected, group.id);

    selected = group;
    selected.index = i;
    match = [];

    if (othermatches[selected.id]) {
      agmatches = othermatches[selected.id];
    } else {
      agmatches = [];
    }
  }

  function checkIfBlacklisted() {
    return blacklisted.includes(selected.id);
  }
  let value = "";
  function updateName() {
    groups[group] = value;
  }

  let sortBy = "";
  let sortOrder = 1;

  function toggleSortOrder(column, i) {
    if (sortBy === column) {
      sortOrder *= -1;
    } else {
      sortBy = column;
      sortOrder = 1;
    }

    groups[i].participants = groups[i].participants.sort((a, b) => {
      return sortOrder * (a[column] < b[column] ? 1 : -1);
    });

    selectGroup(selected, selected.id);
  }

  function addToMatch(id, i) {
    if (match.length < 2 && match[0] ? match[0].id !== id : true) {
      match = [...match, groups[i].participants.find((team) => team.id === id)];
      console.log(id.team);
      console.log(match);
      console.log(id);
    }

    if (match.length === 2) match.push(i);
  }

  function calcId(arr) {
    if (arr.length != 0) return Math.max(...arr.map((unit) => unit.id)) + 1;
    return 0;
  }

  function resolve(ce) {
    deleteFromGenMatch(match[0], match[1]);
    if (ce.detail.draw) {
      ce.detail.contestants[0].draws++;
      ce.detail.contestants[0].playedMatches++;
      ce.detail.contestants[0].score += config.pointsPerDraw;

      ce.detail.contestants[1].draws++;
      ce.detail.contestants[1].playedMatches++;
      ce.detail.contestants[1].score += config.pointsPerDraw;
      console.log(ce.detail.contestants);
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
        group: "group " + (selected.id + 1),
      });
      console.log(selected.id);
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
            group: "group " + (selected.id + 1),
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
            group: "group " + (selected.id + 1),
          },
        ]);
      }
    }
    console.log(sortBy);

    sortBy = "";
    if (sortBy === "score") {
      for (let i = 0; i < 2; i++) toggleSortOrder("score", selected.id);
    } else {
      toggleSortOrder("score", selected.id);
    }

    match = [];
    groups[selected.index].participants = groups[selected.index].participants;
    matchResultsR = [...matchResults].reverse();

    //teams = teams.sort((a, b) => b.score - a.score);
  }

  function calcWinner(group) {
    let sorted2 = selected.participants.sort(function (a, b) {
      return b.score - a.score || b.goalDiff - a.goalDiff;
    });
    let sorted = sorted2.filter((sorted2) => sorted2.name != "");
    console.log(sorted);
    let winner = "";
    // Needs to be attached to customizations
    /*
    let a = 0;
    let winner = selected.participants[a];
    while (a < selected.participants.length) {
      if (winner.score < selected.participants[a].score) {
        winner = selected.participants[a];
      }

      if (winner.score == selected.participants[a].score) {
        if (winner.goalDiff < selected.participants[a].goalDiff) {
          winner = selected.participants[a];
        }
      }
      a += 1;
    }
    
*/
    let a = 0;
    while (a < config.advance) {
      if (a >= sorted.length) {
        break;
      }
      winner = sorted[a];
      if (winner.name == "") {
        a += 1;
        continue;
      }
      groupWinners.push(winner);
      selected = null;
      groupWinners = [...groupWinners];

      a += 1;
    }
    console.log(groupWinners);
    blacklisted.push(group.id);
  }

  function closeGroup() {
    selected = null;
  }
  let contA = null;
  let agmatches = [];
  let othermatches = [];

  function autoCreateMatch(num) {
    while (num > 0) {
      let contA = 0;
      let contB = 1;
      while (contA < selected.participants.length) {
        while (contB < selected.participants.length) {
          if (
            selected.participants[contA].name.length > 0 &&
            selected.participants[contB].name.length > 0
          ) {
            agmatches.push([
              selected.participants[contA],
              selected.participants[contB],
            ]);
          }
          contB += 1;
        }
        contA += 1;
        contB = contA + 1;
      }
      num = num - 1;
    }

    randomizeMatches(agmatches);
    console.log(agmatches);
    agmatches = [...agmatches];
    othermatches[selected.id] = agmatches;
    console.log(selected.id);
    console.log(othermatches);
  }
  function randomizeMatches(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    agmatches = [...agmatches];
  }
  function playGeneratedMatches(player1, player2) {
    toggleMatches();
    console.log(player1, player2);
    addToMatch(player1.id, selected.index);
    addToMatch(player2.id, selected.index);
  }

  function deleteFromGenMatch(player1, player2) {
    let finder = 0;
    while (finder < agmatches.length) {
      if (
        agmatches[finder][0].name == player1.name &&
        agmatches[finder][1].name == player2.name
      ) {
        agmatches.splice(finder, 1);
      }
      finder += 1;
      agmatches = [...agmatches];
    }
    toggleMatches();
  }

  let playoffconfig = {
    tournamentName: "",
    organizerName: "",
    numberOfGroups: "",
    teamsInGroup: "",
    tourDecider: "",
    pointsPerWin: "",
    pointsPerDraw: "",
    numberOfRounds: "",
    bestOf: config.bestOf,

    players: [],
  };
  async function leaveGroup() {
    let pusher = 0;
    console.log(groupWinners);
    playoffconfig.tournamentName = config.tournamentName;
    playoffconfig.organizerName = config.organizerName;
    playoffconfig.tourDecider = "";

    if (!playoffconfig.bestOf) {
      playoffconfig.bestOf = 1;
    }
    playoffconfig.players = [];
    while (pusher < groupWinners.length) {
      playoffconfig.players.push(groupWinners[pusher].name);
      pusher += 1;
    }
    config = playoffconfig;
    AddCorrectAmount();
    if (user.tournaments) {
      config.id = user.tournaments.length;
    } else {
      config.id = 0;
    }
    const tournament = {
      config,
      id: config.id,
    };
    if (user.tournaments) {
      const res = await stateController.createTournament(
        tournament,
        "playoffs"
      );
    }
    push(`/playoffs/${cch.tokenify(config)}`);
  }
  let num = 0;
  function randomnum() {
    num = Math.floor(Math.random() * 10000);
  }
  function AddCorrectAmount() {
    if (playoffconfig.players.length == 3) {
      randomnum();
      playoffconfig.players.push("PLAYER_" + num);
      playoffconfig.players = [...playoffconfig.players];
    }
    let place = 3;
    while (
      playoffconfig.players.length > 4 &&
      playoffconfig.players.length < 8
    ) {
      randomnum();
      playoffconfig.players.splice(place, 0, "PLAYER_" + num);

      playoffconfig.players = [...playoffconfig.players];
      place += 2;
    }
  }
  let showmatches = false;
  function toggleMatches() {
    showmatches = !showmatches;
  }

  async function save() {  

    const state = {
      groups,
      matchResults:matchResults
    };

    const res = await stateController.updateTourState(
      state,
      user.config.id,
      user.username
    );

    console.log(res);
  }

  let showTooltip = false;

  function toggleTooltip() {
    showTooltip = !showTooltip;
  }
  function resetscore() {
    agmatches = [];
    let a = 0;
    while (a < selected.participants.length) {
      selected.participants[a].draws = 0;
      selected.participants[a].goalDiff = 0;
      selected.participants[a].losses = 0;
      selected.participants[a].playedMatches = 0;
      selected.participants[a].score = 0;
      selected.participants[a].wins = 0;
      a += 1;
    }
  }

</script>

<main>
  <div class="header-container">
    <h1>{config.tournamentName}</h1>

    <h3>Organized by: {config.organizerName || "-"}</h3>
    <Tooltip
      text="Once you have finished all groups stages in your tournament, you can export your tournament data to playoffs and start playing them by pressing this button."
    >
      <Button
        disabled={groupWinners.length < 2}
        on:cClick={leaveGroup}
        on:mouseenter={toggleTooltip}
        on:mouseleave={toggleTooltip}>EXPORT TO PLAYOFFS</Button
      >
    </Tooltip>

    {#if !user.isGuest && user.username}
      <Tooltip
        text="Press to save any unfinished tournament progress and continue it later via the PORFILE page."
      >
        <Button class="save-button" on:cClick={() => save()}>SAVE</Button>
      </Tooltip>
    {/if}
  </div>

  <div class="grid-container">
    <div id="group-manage" in:slide>
      {#each groups as group, i}
        {#if selected}
          <div class="group-content">
            {#if group.name == selected.name}
              <h2 class="group-header-focused">{group.name}</h2>
              <Button on:cClick={() => closeGroup()}>Close</Button>
            {:else}
              <h2 class="group-header-unselected">{group.name}</h2>
              <Button on:cClick={() => selectGroup(group, i)}>Manage</Button>
            {/if}
          </div>
        {:else}
          <div class="group-content">
            <h2 class="group-header">{group.name}</h2>
            <Button on:cClick={() => selectGroup(group, i)}>Manage</Button>
          </div>
        {/if}
      {/each}
    </div>
    <div id="group-view">
      {#if selected}
        <div
          id="group"
          transition:scale={{
            duration: 500,
            opacity: 0.5,
            start: 0.0,
            easing: quintOut,
          }}
        >
          <Tooltip
            text="Once you have played all the matches in this group press this button to finalize the results for the group in question."
          >
            <Button class="finish-button" on:cClick={() => calcWinner(selected)}
              >Finish this Group</Button
            >
          </Tooltip>
          <h2 id="group-name">{selected.name}</h2>
          <table>
            <tr>
              <th> Name </th>
              <th
                on:click={() =>
                  toggleSortOrder("playedMatches", selected.index)}>PL</th
              >
              <th on:click={() => toggleSortOrder("score", selected.index)}
                >Score</th
              >
              <th on:click={() => toggleSortOrder("wins", selected.index)}>W</th
              >
              <th on:click={() => toggleSortOrder("draws", selected.index)}
                >D</th
              >
              <th on:click={() => toggleSortOrder("losses", selected.index)}
                >L</th
              >
              <th on:click={() => toggleSortOrder("goalDiff", selected.index)}
                >GD</th
              >
            </tr>
            {#each selected.participants as participant}
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Insert name here"
                    bind:value={participant.name}
                    on:input={updateName(participant.name)}
                  />
                </td>
                <td>{participant.playedMatches}</td>
                <td>{participant.score}</td>
                <td>{participant.wins}</td>
                <td>{participant.draws}</td>
                <td>{participant.losses}</td>
                <td>{participant.goalDiff}</td>
              </tr>
            {/each}
          </table>
          <div class="resolve-button-container">
            {#if selected && !checkIfBlacklisted()}
              <Tooltip
                text="Press to create a match schedule for all the group's participants. You can see the schedule by pressing the SHOW SCHEDULE button."
              >
                <Button
                  class="schedule-create-button"
                  disabled={agmatches.length > 0}
                  on:cClick={() => autoCreateMatch(1)}
                  >GENERATE A MATCH SCHEDULE</Button
                >
              </Tooltip>
              <Button
                class="resolve-button"
                disabled={agmatches.length == 0}
                on:cClick={toggleMatches}>Show schedule</Button
              >

              <Button class="reset-button" on:cClick={resetscore}>reset</Button>
            {/if}
          </div>
        </div>
      {:else}
        <div
          class="group-MIA-container"
          in:fade={{
            delay: 700,
            duration: 500,
            easing: quintOut,
          }}
        >
          <h1>NO GROUP SELECTED</h1>
          <p>
            Select a group from the left menu to view and edit your groups in
            the tournament.
          </p>
        </div>
      {/if}
    </div>
    <div class="results-button-container">
      <Tooltip
        text="Below is a list of concluded matches and their results in all groups. You can hide
      the results from view by toggling the SHOW/HIDE RESULTS button."
      >
        <Button class="results-toggle-button" on:cClick={toggleResults}
          >{showResults ? "Hide Results" : "Show Results"}</Button
        >
      </Tooltip>
      {#if showResults}
        <div class="flex-container" transition:slide>
          <h1 class="results-header">RESULTS</h1>

          {#each matchResultsR as matchResult}
            <MatchResults {matchResult} />
          {/each}
        </div>
      {/if}
    </div>
    {#if match[0] && match[1]}
      <div
        class="match-modal"
        in:fade={{
          duration: 0,
          easing: quintOut,
        }}
      >
        <Match
          {match}
          on:winnerevent={resolve}
          on:cancelevent={() => (match = [])}
        />
      </div>
    {/if}
  </div>
  {#if showmatches}
    {#if agmatches.length > 0}
      <div class="backdrop" on:click={toggleMatches} on:keydown />
      <div class="modal">
        <h1 class="list-header">MATCH SCHEDULE</h1>
        <h2 id="match-count">MATCHES REMAINING: {agmatches.length}</h2>
        <div class="schedule-content">
          <Tooltip
            text="Clears and cancels the remaining schedule made for this group."
          >
            <Button
              class="cancel-match-button"
              on:cClick={() => (agmatches = [])}>Cancel matches</Button
            >
          </Tooltip>

          <div class="matches-container" transition:slide>
            {#each agmatches as agmatch}
              <Automatches
                {agmatch}
                on:chooseevent={playGeneratedMatches(agmatch[0], agmatch[1])}
              />
            {/each}
          </div>
          <Button class="add-player-exit-button" on:cClick={toggleMatches}
            >CLOSE SCHEDULE</Button
          >
        </div>
      </div>
    {/if}{/if}
</main>

<style>
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
    justify-content: center;
  }

  table {
    font-size: 1em;
    padding-left: 1em;
    padding-right: 1em;
    padding-bottom: 4em;
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
    text-align: center;
    width: 10em;
  }

  td:not(:first-child) {
    text-align: center;
  }

  td {
    width: 1.2em;
    font-size: 1.15em;
    border-top: 1px solid rgb(255, 255, 255);
    border-bottom: 1px solid rgb(255, 255, 255);
  }

  .grid-container {
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto;
    height: 100%;
  }

  .header-container {
    text-transform: uppercase;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2em;
    margin-bottom: 2em;
  }

  .flex-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-left: 0%;
    margin-top: 1em;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .results-button-container {
    text-transform: uppercase;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2em;
    margin-bottom: 2em;
    grid-column: 2;
  }

  .resolve-button-container {
    text-transform: uppercase;
    width: 85%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-top: 2em;
    margin-bottom: 2em;
    grid-column: 2;
  }

  #group {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
  }

  #group-manage {
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    column-span: 1;
    grid-column: 1;
    margin-right: 2em;
    padding: 1em 2em;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  #group-view {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2em;
    grid-column: 2;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  input {
    color: rgb(255, 255, 255);
    margin-bottom: 1em;
    font-size: 1.3em;
    padding: 0.5em 2em;
    border-radius: 20px;
    border: 1px solid #ffffff3f;
    background-color: rgba(0, 0, 0, 0.58);
    color: #ffffff;
    text-align: center;
  }

  td {
    padding: 20px;
  }

  h1 {
    font-size: 3em;
  }

  .group-header {
    margin-top: 0.7em;
    font-size: 1.6em;
  }

  .group-header-focused {
    margin-top: 0.7em;
    font-size: 2em;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      filter: brightness(1);
    }

    50% {
      filter: brightness(0.7);
    }

    100% {
      filter: brightness(1);
    }
  }

  .group-header-unselected {
    margin-top: 0.7em;
    opacity: 0.4;
    font-size: 1.6em;
    animation: pulse 3s infinite;
  }

  #group-name {
    text-transform: uppercase;
    font-size: 2.2em;
    text-align: center;
    margin-bottom: 0.7em;
    margin-top: 1em;
  }

  .group-MIA-container {
    display: flex;
    flex-direction: column;
    align-items: center;
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

  .list-header {
    text-transform: uppercase;
  }

  #match-count {
    text-transform: uppercase;
    font-size: 0.9em;
  }

  .match-modal {
    opacity: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    width: 100%;
    height: 100%;
  }
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.83);
    z-index: 10;
  }

  .modal {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 50%;
    height: 60%;
    position: absolute;
    top: 18em;
    left: 23%;
    color: #ffffff;
    padding: 1em 3em;
    background: linear-gradient(
      129deg,
      rgba(5, 5, 40, 0.7) 0%,
      rgba(15, 11, 40, 0.7) 100%
    );
    border-radius: 40px;
    z-index: 100;
    border: solid 1px #ffffff3f;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow-y: auto;
  }

  .schedule-content {
    margin: auto;
    width: 90%;
    align-items: center;
    padding-bottom: 2em;
  }

  .matches-container {
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 5em;
  }

  .group-content {
    text-align: center;
  }
  /* Tablet Portrait */
  @media only screen and (max-width: 1150px) {
    input {
      margin-bottom: 0em;
      font-size: 1.3em;
      padding: 0.5em 0.5em;
    }

    .grid-container {
      width: 80%;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    #group-manage {
      margin: auto;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      column-gap: 1em;
      margin: 0em;
      padding: 1em;
      text-align: center;
    }

    #group-view {
      width: 100%;
      margin-top: 1em;
    }

    .group-header-focused {
      font-size: 1.6em;
    }

    .resolve-button-container {
      justify-content: center;
      width: 100%;
      margin-top: 0em;
      margin-bottom: 2em;
    }
    .modal {
      width: 80%;
      height: auto;
      position: absolute;
      top: 14em;
      left: 3%;
      padding: 1em 3em;
      overflow-x: none;
    }

    #match-count {
      font-size: 1em;
      scale: 1.7;
    }
  }
</style>
