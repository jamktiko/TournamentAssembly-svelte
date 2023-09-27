<script>
  import cch from "../utils/cache";
  import Button from "../reusable/Button.svelte";
  import Match from "../reusable/Match.svelte";
  import MatchResults from "../reusable/MatchResults.svelte";

  export let params;

  let match = [];
  /**/
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
  let config = cch.detokenify(params.tourdata)[0];

  let groups = [];
  generateGroups(config);
  console.log(config);

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
    console.log(groups);
  }

  $: selected = null;

  function selectGroup(group, i) {
    console.log(selected, group.id);
    if (selected && selected.id === group.id) {
      selected = null;
      return;
    }
    selected = group;
    selected.index = i;
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
    console.log(sortBy);
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
</script>

<main>
  <div class="header-container">
    <h1>{config.tournamentName}</h1>
    <h3>Organized by: {config.organizerName || "-"}</h3>
  </div>
  <div class="grid-container">
    <div id="group-manage">
      {#each groups as group, i}
        {#if selected}
          {#if group.name == selected.name}
            <h1>{group.name}</h1>
          {:else}
            <h2>{group.name}</h2>
          {/if}
        {:else}
          <h2>{group.name}</h2>
        {/if}

        <Button on:cClick={() => selectGroup(group, i)}
          >Click to manage group</Button
        >
      {/each}
    </div>
    <div id="group-view">
      {#if selected}
        <div id="group">
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
              <Button
                class="adjust-button"
                on:cClick={() => addToMatch(participant.id, selected.index)}
                >Add to match</Button
              >
            {/each}
          </table>
        </div>
      {/if}
    </div>
    {#if match[0] && match[1]}
      <Match {match} on:winnerevent={resolve} />
    {/if}

    {#if showResults == 0}
      <Button class="results-toggle-button" on:cClick={() => toggleResults()}
        >Show results</Button
      >
    {/if}
    {#if showResults == 1}
      <Button class="results-toggle-button" on:cClick={() => toggleResults()}
        >Hide results</Button
      >
      {#each matchResultsR as matchResult}
        <div class="flex-container">
          <MatchResults {matchResult} />
          <div />
        </div>
      {/each}
    {/if}
  </div>
  {#if match[0] && match[1]}
    <div class="test">
      <Match {match} on:winnerevent={resolve} />
    </div>
  {/if}
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
    text-align: left;
    padding-right: 3em;
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
  #group-manage {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    column-span: 1;
    grid-column: 1;
    margin-right: 2em;
    padding-top: 2em;
    padding-left: 2em;
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
    padding: 0.5em 2em;
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
    background-color: rgba(0, 0, 0, 0.9);

    width: 100%;
    height: 100%;
  }

  h1 {
    font-size: 3em;
  }

  #group-name {
    text-transform: uppercase;
    font-size: 1.9em;
    text-align: center;
    margin-bottom: 0.7em;
  }
</style>
