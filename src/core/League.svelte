<script>
  import cch from '../utils/cache';
  import Button from '../reusable/Button.svelte';
  import Match from '../reusable/Match.svelte';
  import { onDestroy } from 'svelte';
  import MatchResults from '../reusable/MatchResults.svelte';
  import { push } from 'svelte-spa-router';
  import Winner from '../reusable/Winner.svelte';
  import { slide } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { scale } from 'svelte/transition';
  import { quintOut, quadInOut } from 'svelte/easing';
  import Automatches from '../reusable/Automatches.svelte';
  import Tooltip from '../reusable/Tooltip.svelte';
  import stateController from '../utils/stateStore';
  import { loadFromSession } from '../utils/lib';

  let user;
  const unsub = stateController.subscribe((userData) => (user = userData));

  if (!user.username && window.sessionStorage.getItem('user')) {
    user = loadFromSession('user');
    stateController.set(user);
  }

  onDestroy(() => {
    if (unsub) unsub();
  });

  export let params;
  let matchResults = [];
  let matchResultsR = [];
  let showResults = 0;

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

    if(user.username) {
      save();
    }

    if (user.state) delete user.state;
  });

  let teams = [];
  let match = [];

  if (cch.isInCache('league') && cch.isInCache('leagueConf')) {
    teams = cch.getFromCache('league');

    console.log(teams);
  }
  if (user.state) {
    teams = user.state.teams;
    matchResults = user.state.matchResults;
    matchResultsR = [...matchResults].reverse();
    console.log(matchResultsR, 'reversed');
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
    cch.saveToCache('league', teams);
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
    deleteFromGenMatch(match[0], match[1]);
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
        group: ' ',
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
            group: ' ',
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
            group: ' ',
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

  let largest = '';
  function largestScore() {
    if (teams.length != 0) {
      let i = 0;
      largest = teams[i];
      while (i < teams.length) {
        if (largest.score < teams[i].score) {
          largest = teams[i];
        }
        if (
          largest.score == teams[i].score &&
          largest.goalDiff < teams[i].goalDiff
        ) {
          largest = teams[i];
        }
        i += 1;
      }
    }
    window.scrollTo(0, 0);
  }
  function closewindow() {
    largest = '';
  }

  function deleteTeam(team) {
    teams = teams.filter((p) => p !== team);

    console.log(teams);
    if (match.includes(team)) {
      match = [];
    }
    agmatches = [];
  }
  let agmatches = [];
  function autoCreateMatch(num) {
    agmatches = [];

    while (num > 0) {
      let contA = 0;
      let contB = 1;
      while (contA < teams.length) {
        while (contB < teams.length) {
          if (teams[contA].name.length > 0 && teams[contB].name.length > 0) {
            agmatches.push([teams[contA], teams[contB]]);
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
    addToMatch(player1.id);
    addToMatch(player2.id);
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
  let showmatches = false;
  function toggleMatches() {
    showmatches = !showmatches;
    scroll(0,50)
  }

  let showTooltip = false;

  function toggleTooltip() {
    showTooltip = !showTooltip;
  }

  async function save() {
    showsavepopup = true
    setTimeout(() => {
       
      showsavepopup = false;
      }, 1000)
    const state = {
      teams,
      matchResults,
    };

    const res = await stateController.updateTourState(state, user.config.id);

    console.log(res);
  }

  $: console.log(teams);

  function resetscore() {
    const confirm = window.confirm('All the scores will be reset!\nContinue?');
    if (confirm) {
      agmatches = [];
      let a = 0;
      while (a < teams.length) {
        teams[a].draws = 0;
        teams[a].goalDiff = 0;
        teams[a].losses = 0;
        teams[a].playedMatches = 0;
        teams[a].score = 0;
        teams[a].wins = 0;
        a += 1;
      }
    }
  }
  function cancelMatches(){
    agmatches = []
    toggleMatches()
  }
  let showsavepopup = false
</script>

<main
  in:slide={{
    duration: 700,
    easing: quintOut,
    axis: 'y',
  }}
>
  <h1 class="league-name">{config.tournamentName}</h1>
  <div
    class="league-content"
    in:fade={{
      duration: 700,
      easing: quintOut,
    }}
  >
    <div class="league-header" />

    <div class="addplayer-content">
      {#if playerNameInputVisible}
        <div class="addplayer-content" transition:slide>
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
              class="adjust-button-league-close"
              on:cClick={() => (playerNameInputVisible = false)}>Close</Button
            >
          </div>
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
    {#if largest != ''}
      <Winner {config} winner={largest} on:closeevent={closewindow} />
    {/if}
    {#if !user.isGuest && user.username}
      <Tooltip
        text="Press to save any unfinished tournament progress and continue it later via the PROFILE page."
      >
        <Button class="save-button" on:cClick={save}
          ><svg
            class="save-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="32"
            viewBox="0 -960 960 960"
            width="32"
            ><path
              d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"
            /></svg
          >SAVE</Button
        >
        {#if showsavepopup != false}
        <div class="popup">
          <p class="popup-message">Save successful</p>
        </div>
        {/if}
      </Tooltip>
    {/if}
    <Tooltip
      text="Once you have played all the matches in the league press this button to finalize the results and declare a winner."
    >
      <Button class="league-resolve-button" on:cClick={() => largestScore()}
        >FINISH LEAGUE</Button
      ></Tooltip
    >
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
            <tr
              class="table-row"
              in:fade={{
                duration: 2000,
                easing: quintOut,
                axis: 'y',
              }}
            >
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
                  class="delete-player-button"
                  on:cClick={() => deleteTeam(team)}
                  ><svg
                    class="trash-can"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                    ><path
                      d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                    /></svg
                  ></Button
                >
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="results-button-container">
      <Tooltip
        text="Press to create a match schedule for all the league's participants. You can see the schedule by pressing the SHOW SCHEDULE button."
      >
        <Button
          class="schedule-create-button"
          disabled={agmatches.length > 0}
          on:cClick={() => autoCreateMatch(1)}>GENERATE A MATCH SCHEDULE</Button
        ></Tooltip
      >
      <Button
        class="resolve-button"
        disabled={agmatches.length == 0}
        on:cClick={toggleMatches}>Show schedule</Button
      >
      <Button class="reset-button" on:cClick={resetscore}>Reset</Button>
    </div>
    <div class="league-match-container">
      {#if match[0] && match[1]}
        <Match
          {match}
          on:winnerevent={resolve}
          on:cancelevent={() => (match = [])}
        />
      {/if}
    </div>
    <div class="results-button-container">
      {#if showResults == 0}
        <Tooltip
          text="Below is a list of concluded matches and their results in all groups. You can hide
    the results from view by toggling the SHOW/HIDE RESULTS button."
        >
          <Button on:cClick={() => toggleResults()}>Show results</Button>
        </Tooltip>
      {/if}
      {#if showResults == 1}
        <Tooltip
          text="Below is a list of concluded matches and their results in all groups. You can hide
    the results from view by toggling the SHOW/HIDE RESULTS button."
        >
          <Button on:cClick={() => toggleResults()}>Hide results</Button
          ></Tooltip
        >
      {/if}
    </div>
    {#if showResults == 1}
      <div class="results-container" transition:slide>
        <h1 class="results-header">RESULTS</h1>
        {#if matchResultsR.length === 0}
          <p>There are currently no results to display.</p>
        {:else}
          {#each matchResultsR.slice() as matchResult}
            <MatchResults {matchResult} />
          {/each}
        {/if}
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
          <div class="buttons-container">
            <Button on:cClick={toggleMatches}>CLOSE SCHEDULE</Button>
            <Tooltip
              text="Clears and cancels the remaining schedule made for this group."
            >
              <Button
                class="cancel-match-button"
                on:cClick={cancelMatches}>Cancel matches</Button
              >
            </Tooltip>
          </div>

          <div class="matches-container" transition:slide>
            {#each agmatches as agmatch}
              <Automatches
                {agmatch}
                on:chooseevent={playGeneratedMatches(agmatch[0], agmatch[1])}
              />
            {/each}
          </div>
        </div>
      </div>
    {/if}{/if}

</main>

<style>
  main {
    margin-top: 22em;
    margin-left: 15%;
    margin-bottom: 2em;
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
    background-color: rgba(0, 0, 0, 0.5);
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
  .buttons-container {
    padding-top: 1em;
    margin: auto;
    width: fit-content;
    display: flex;
    flex-direction: column;
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
    border-radius: 1em;
    border: 1px solid #ffffff3f;
    background-color: rgba(0, 0, 0, 0.208);
    color: #ffffff;
    text-align: center;
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
    flex-direction: column;
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
    font-size: 1.3em;
    margin-bottom: 0.25em;
  }

  .list-header {
    padding-top: 1em;
    text-transform: uppercase;
  }

  #match-count {
    text-transform: uppercase;
    font-size: 1.1em;
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

  .trash-can {
    fill: rgba(110, 0, 0);
  }

  .save-icon {
    padding-right: 0.3em;
    fill: #7396ff;
  }
  .popup {
    border-radius: 10px;
    position: fixed;
    text-align: center;
    font-size: 1.5em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    padding: 20px;
    color: white;
    border-radius: 5px;
    z-index: 9999;
  }
  .popup-message {
    cursor: pointer;
    color: #fff;
    margin-left: 0.2em;
    width: 100%;
  }

  /* Tablet Portrait */
  @media only screen and (max-width: 1450px) {
    main {
      margin-top: 25vh;
      margin-left: 5%;
      width: 90%;
      overflow-x: hidden;
    }

    .results-button-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .modal {
      display: flex;
      flex-direction: column;
      width: 80%;
      height: 75%;
      position: absolute;
      top: 28vh;
      left: 10%;
      padding: 0em 0em;
    }

    .schedule-content {
      margin: 1.8em;
      width: 90%;
      align-items: center;
      padding-bottom: 2em;
    }
  }

  /* Mobile Phone */
  @media only screen and (max-width: 600px) {
    main {
      overflow-x: hidden;
    }
    tr {
      font-size: 0.7em;
    }

    main {
      overflow-x: hidden;
    }


    .matches-container {
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;

    }


    .modal {
      width: 94%;
      padding: 1em 0em;
      left: 3%;
      
    }

    .schedule-content {
      margin: auto;
      width: 90%;
      align-items: center;
      padding-bottom: 2em;
    }
  }
</style>
