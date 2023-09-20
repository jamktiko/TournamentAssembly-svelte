<script>
  import Button from "../reusable/Button.svelte";

  const groups = [
    {
      id: 0,
      name: "Group A",
      participants: [
        {
          name: "Pertti",
          playedMatches: 0,
          score: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalDiff: 0,
        },
        {
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
          name: "Jorma",
          playedMatches: 0,
          score: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalDiff: 0,
        },
        {
          name: "Nakki",
          playedMatches: 0,
          score: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalDiff: 0,
        },
        {
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
          name: "Seppo",
          playedMatches: 0,
          score: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalDiff: 0,
        },
        {
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
          {/each}
        </table>
      </div>
    {/if}
  </div>
  <Button on:cClick={console.log(groups)}>console log</Button>
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
