<script>
  import Button from "../reusable/Button.svelte";
  export let params;

  let selectedMenu = params.id;

  const numberGroups = [4];
  const tournamentDeciders = ["Goal Difference"];
  const teamsGroups = [6];
  const pointsPerWin = [3];
  const pointsForDraw = [1];

  const numberRounds = [3, 5];
  const deciderTypes = ["Round High Score"];

  let selectedGroups = "";
  let selectedTournamentDecider = "";
  let selectedTeamGroups = "";
  let selectedPointsPerWin = "";
  let selectedPointsForDraw = "";

  let selectedRounds = "";
  let selectedDecider = "";

  function handleSelection(event, selectionType) {
    const value = event.target.value;
    switch (selectionType) {
      case "groups":
        selectedGroups = value;
        break;
      case "tournamentDecider":
        selectedTournamentDecider = value;
        break;
      case "teamgroups":
        selectedTeamGroups = value;
        break;
      case "pointsperwin":
        selectedPointsPerWin = value;
        break;
      case "pointsfordraw":
        selectedPointsForDraw = value;
        break;
      case "decider":
        selectedDecider = value;
        break;
      default:
        break;
    }
  }
</script>

<main>
  <div class="customizer-content">
    {#if selectedMenu == "groups"}
      <div class="customizer-header">
        <h1>Customize your tournament</h1>
      </div>
      <div class="customizer-settings">
        <div>
          <label for="roundSelection">Number of Groups</label>
          <br />
          <select
            id="roundSelection"
            bind:value={selectedGroups}
            on:change={handleSelection}
          >
            {#each numberGroups as numberGroup (numberGroup)}
              <option value={numberGroup}>{numberGroup}</option>
            {/each}
          </select>
        </div>
        <div>
          <label for="deciderType">Decider Type</label>
          <br />
          <select
            id="deciderType"
            bind:value={selectedTournamentDecider}
            on:change={handleSelection}
          >
            {#each tournamentDeciders as tournamentDecider (tournamentDecider)}
              <option value={tournamentDecider}>{tournamentDecider}</option>
            {/each}
          </select>
        </div>
        <div>
          <label for="deciderType">Teams in Group</label>
          <br />
          <select
            id="deciderType"
            bind:value={selectedTeamGroups}
            on:change={handleSelection}
          >
            {#each teamsGroups as teamGroup (teamGroup)}
              <option value={teamGroup}>{teamGroup}</option>
            {/each}
          </select>
        </div>
        <div>
          <label for="deciderType">Points for Win</label>
          <br />
          <select
            id="deciderType"
            bind:value={selectedPointsPerWin}
            on:change={handleSelection}
          >
            {#each pointsPerWin as pointsPerWin (pointsPerWin)}
              <option value={pointsPerWin}>{pointsPerWin}</option>
            {/each}
          </select>
        </div>
        <div>
          <label for="deciderType">Points for Draw</label>
          <br />
          <select
            id="deciderType"
            bind:value={selectedPointsForDraw}
            on:change={handleSelection}
          >
            {#each pointsForDraw as pointsForDraw (pointsForDraw)}
              <option value={pointsForDraw}>{pointsForDraw}</option>
            {/each}
          </select>
        </div>
      </div>
    {/if}
    {#if selectedMenu == "playoffs"}
      <div class="customizer-header">
        <h1>Customize your scoreboard!</h1>
      </div>
      <div class="customizer-settings">
        <div>
          <label for="roundSelection">Number of Rounds</label>
          <br />
          <select
            id="roundSelection"
            bind:value={selectedRounds}
            on:change={handleSelection}
          >
            {#each numberRounds as numberRound (numberRound)}
              <option value={numberRound}>{numberRound}</option>
            {/each}
          </select>
        </div>
        <div>
          <label for="deciderType">Decider Type</label>
          <br />
          <select
            id="deciderType"
            bind:value={selectedDecider}
            on:change={handleSelection}
          >
            {#each deciderTypes as deciderType (deciderType)}
              <option value={deciderType}>{deciderType}</option>
            {/each}
          </select>
        </div>
      </div>
    {/if}
    <div class="createButton">
      <Button>Create</Button>
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-flow: row wrap;
  }

  .createButton {
    padding-top: 2em;
  }

  option,
  select {
    color: black;
  }
</style>
