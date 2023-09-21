<script>
  import Button from "../reusable/Button.svelte";
  import Match from "../reusable/Match.svelte";

  let match = [];

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

  function selectGroup(group) {
    selected = group;
  }
  let value = "";
  function updateName() {
    groups[group] = value;
  }

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

  function addToMatch(id) {
    if (match.length < 2 && match[0] ? match[0].id !== id : true) {
      match = [...match, teams.find((team) => team.id === id)];
    }
  }

  function calcId() {
    if (teams.length != 0) return Math.max(...teams.map((team) => team.id)) + 1;
    return 0;
  }
</script>

<main>
  <div id="group-manage">
    {#each groups as group}
      <h2>{group.name}</h2>
      <Button on:cClick={() => selectGroup(group)}>Click to manage group</Button
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
            <th on:click={() => toggleSortOrder("playedMatches")}>PL</th>
            <th on:click={() => toggleSortOrder("score")}>Score</th>
            <th on:click={() => toggleSortOrder("wins")}>W</th>
            <th on:click={() => toggleSortOrder("draws")}>D</th>
            <th on:click={() => toggleSortOrder("losses")}>L</th>
            <th on:click={() => toggleSortOrder("goalDiff")}>GD</th>
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
            <Button on:cClick={() => addToMatch(participant.id)}
              >Add to match</Button
            >
          {/each}
        </table>
      </div>
    {/if}
  </div>
  {#if match[0] && match[1]}
    <Match {match} />
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
