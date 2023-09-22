<script>
  import Button from "../reusable/Button.svelte";
  import Match from "../reusable/Match.svelte";

  let match = [];

  let config = {
    name: "test",
    organizer: "test",
    pointsPerWin: 3,
    pointsPerDraw: 1,
  };

  let groups = [
    {
      id: 0,
      name: "Group A",
      participants: [
        {
          id: 0,
          name: "Pertti",
          playedMatches: 0,
          score: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalDiff: 0,
        },
        {
          id: 1,
          name: "Jorkki",
          playedMatches: 0,
          score: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalDiff: 0,
        },
      ],
    },
    {
      id: 1,
      name: "Group B",
      participants: [
        {
          id: 0,
          name: "Jorma",
          playedMatches: 0,
          score: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalDiff: 0,
        },
        {
          id: 1,
          name: "Nakki",
          playedMatches: 0,
          score: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalDiff: 0,
        },
        {
          id: 2,
          name: "Makkara",
          playedMatches: 0,
          score: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalDiff: 0,
        },
      ],
    },
    {
      id: 2,
      name: "Group C",
      participants: [
        {
          id: 0,
          name: "Seppo",
          playedMatches: 0,
          score: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalDiff: 0,
        },
        {
          id: 1,
          name: "Ismo",
          playedMatches: 0,
          score: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalDiff: 0,
        },
      ],
    },
  ];

  $: selected = null;

  function selectGroup(group, i) {
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
  }

  function addToMatch(id, i) {
    if (match.length < 2 && match[0] ? match[0].id !== id : true) {
      match = [...match, groups[i].participants.find((team) => team.id === id)];
    }

    if (match.length === 2) match.push(i);
  }

  function calcId() {
    if (teams.length != 0) return Math.max(...teams.map((team) => team.id)) + 1;
    return 0;
  }

  function resolve(ce) {
    console.log(ce.detail);
    if (ce.detail.draw) {
      ce.detail.contestants[0].draws++;
      ce.detail.contestants[0].playedMatches++;
      ce.detail.contestants[0].score += config.pointsPerDraw;

      ce.detail.contestants[1].draws++;
      ce.detail.contestants[1].playedMatches++;
      ce.detail.contestants[1].score += config.pointsPerDraw;
    } else {
      ce.detail.winner.wins++;
      ce.detail.winner.score += config.pointsPerWin;
      ce.detail.winner.playedMatches++;
      ce.detail.winner.goalDiff += ce.detail.goalDiff;

      ce.detail.loser.losses++;
      ce.detail.loser.playedMatches++;
      ce.detail.loser.goalDiff -= ce.detail.goalDiff;
    }

    match = [];
    console.log(groups[selected.index].participants);
    groups[selected.index].participants = groups[selected.index].participants;
    //teams = teams.sort((a, b) => b.score - a.score);
  }
</script>

<main>
  <div id="group-manage">
    {#each groups as group, i}
      <h2>{group.name}</h2>
      <Button on:cClick={() => selectGroup(group, i)}
        >Click to manage group</Button
      >
    {/each}
  </div>
  <div id="group-view">
    {#if selected}
      <div id="group">
        <h2>{selected.name}</h2>
        <table>
          <tr>
            <th> Name </th>
            <th
              on:click={() => toggleSortOrder("playedMatches", selected.index)}
              >PL</th
            >
            <th on:click={() => toggleSortOrder("score", selected.index)}
              >Score</th
            >
            <th on:click={() => toggleSortOrder("wins", selected.index)}>W</th>
            <th on:click={() => toggleSortOrder("draws", selected.index)}>D</th>
            <th on:click={() => toggleSortOrder("losses", selected.index)}>L</th
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
            <Button on:cClick={() => addToMatch(participant.id, selected.index)}
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
</main>

<style>
  main {
    display: grid;
    grid-template-columns: 1fr fr 1fr;
    grid-template-rows: auto;
    height: 100%;
  }

  #group-manage {
    grid-column: 1;
    margin-left: 20px;
  }

  #group-view {
    grid-column: 2;
  }
  input {
    color: rgb(255, 255, 255);

    font-size: 1.3em;
    padding: 0.5em 2em;
    border-radius: 20px;
    background-color: rgb(21, 21, 21);
    color: #ffffff;
    text-align: center;
  }
  td {
    padding: 20px;
  }
</style>
