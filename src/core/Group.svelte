<script>
  import cch from '../utils/cache';
  import Button from '../reusable/Button.svelte';
  import Match from '../reusable/Match.svelte';
  import MatchResults from '../reusable/MatchResults.svelte';
  import { onDestroy } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { slide } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let params;

  let match = [];
  let matchResults = [];
  let matchResultsR = [];
  let groupWinners = [];

  let config = cch.detokenify(params.tourdata)[0];

  let groups = [];

  let blacklisted = [];

  onDestroy(() => {
    cch.saveToCache('groups', groups);
    cch.saveToCache('groupsConf', config);
  });

  if (cch.isInCache('groups')) {
    groups = cch.getFromCache('groups');
  } else {
    generateGroups(config);
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
          name: '',
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
    console.log(selected, group.id);

    selected = group;
    selected.index = i;
  }

  function checkIfBlacklisted(group) {
    for (let key in blacklisted) {
      if (key == group.id) {
        return true;
      }
      return false;
    }
  }
  let value = '';
  function updateName() {
    groups[group] = value;
  }

  let sortBy = '';
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
    }

    if (match.length === 2) match.push(i);
  }

  function calcId(arr) {
    if (arr.length != 0) return Math.max(...arr.map((unit) => unit.id)) + 1;
    return 0;
  }

  function resolve(ce) {
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
        group: 'group ' + (selected.id + 1),
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
            group: 'group ' + (selected.id + 1),
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
            group: 'group ' + (selected.id + 1),
          },
        ]);
      }
    }
    console.log(sortBy);

    sortBy = '';
    if (sortBy === 'score') {
      for (let i = 0; i < 2; i++) toggleSortOrder('score', selected.id);
    } else {
      toggleSortOrder('score', selected.id);
    }

    match = [];
    groups[selected.index].participants = groups[selected.index].participants;
    matchResultsR = [...matchResults].reverse();

    //teams = teams.sort((a, b) => b.score - a.score);
  }

  function calcWinner(group) {
    // Needs to be attached to customizations

    const winner = group.participants.sort((a, b) => a.score < b.score)[0];

    groupWinners.push(winner);

    console.log(groupWinners);
    selected = null;
    blacklisted.push(group.id);
  }

  function closeGroup() {
    selected = null;
  }
</script>

<main>
  <Button class="back-button2" on:cClick={() => push('/selection')}>Back</Button
  >
  <div class="header-container">
    <h1>{config.tournamentName}</h1>
    <h3>Organized by: {config.organizerName || '-'}</h3>
  </div>
  <div class="grid-container">
    <div id="group-manage" in:slide>
      {#each groups as group, i}
        {#if selected}
          {#if group.name == selected.name}
            <h2 class="group-header-focused">{group.name}</h2>
            <Button on:cClick={() => closeGroup()}>Close group</Button>
          {:else}
            <h2 class="group-header-unselected">{group.name}</h2>
            <Button on:cClick={() => selectGroup(group, i)}
              >Click to manage group</Button
            >
          {/if}
        {:else}
          <h2 class="group-header">{group.name}</h2>
          <Button on:cClick={() => selectGroup(group, i)}
            >Click to manage group</Button
          >
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
          <h2 id="group-name">{selected.name}</h2>
          <table>
            <tr>
              <th />
              <th> Name </th>
              <th
                on:click={() =>
                  toggleSortOrder('playedMatches', selected.index)}>PL</th
              >
              <th on:click={() => toggleSortOrder('score', selected.index)}
                >Score</th
              >
              <th on:click={() => toggleSortOrder('wins', selected.index)}>W</th
              >
              <th on:click={() => toggleSortOrder('draws', selected.index)}
                >D</th
              >
              <th on:click={() => toggleSortOrder('losses', selected.index)}
                >L</th
              >
              <th on:click={() => toggleSortOrder('goalDiff', selected.index)}
                >GD</th
              >
            </tr>
            {#each selected.participants as participant}
              <tr>
                <td>
                  {#if participant.name != '' && !checkIfBlacklisted(selected)}
                    <Button
                      class="group-adjust-button"
                      on:cClick={() =>
                        addToMatch(participant.id, selected.index)}
                      >Add to match</Button
                    >
                  {/if}
                </td>
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
            {#if !checkIfBlacklisted(selected)}
              <Button
                class="resolve-button"
                on:cClick={() => calcWinner(selected)}>Finish this Group</Button
              >
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

    {#if match[0] && match[1]}
      <Match {match} on:winnerevent={resolve} />
    {/if}

    <div class="results-button-container">
      <Button class="results-toggle-button" on:cClick={toggleResults}
        >{showResults ? 'Hide Results' : 'Show Results'}</Button
      >
      {#if showResults}
        <div class="flex-container" transition:slide>
          <h1 class="results-header">RESULTS</h1>
          <p>
            Below is a list of concluded matches and their results. You can hide
            the results from view by clicking the HIDE RESULTS button.
          </p>
          {#each matchResultsR as matchResult}
            <MatchResults {matchResult} />
          {/each}
        </div>
      {/if}
    </div>
    {#if match[0] && match[1]}
      <div
        class="test"
        in:fade={{
          duration: 500,
          easing: quintOut,
        }}
      >
        <Match {match} on:winnerevent={resolve} />
      </div>
    {/if}
  </div>
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
    margin-top: 2em;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2em;
    margin-bottom: 2em;
    grid-column: 2;
  }
  #group {
    display: flex;
    justify-content: center;
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
    background-color: rgba(0, 0, 0, 0.308);
  }

  #group-view {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2em;
    grid-column: 2;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.308);
  }

  input {
    color: rgb(255, 255, 255);
    font-size: 1em;
    padding: 0.5em 1.8em;
    border-radius: 20px;
    background-color: rgb(21, 21, 21);
    color: #ffffff;
    text-align: center;
  }

  td {
    padding: 20px;
  }

  .test {
    opacity: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    width: 100%;
    height: 100%;
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
</style>
