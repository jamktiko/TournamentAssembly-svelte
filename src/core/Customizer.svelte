<script>
  import Button from '../reusable/Button.svelte';
  export let params;

  let selectedMenu = params.id;

  const numberGroups = [4, 6, 8];
  const tournamentDeciders = ['Goal Difference', 'Aggregate'];
  const teamsGroups = [4, 6, 8];
  const pointsPerWin = [3, 4, 5];
  const pointsForDraw = [0, 1];

  const numberRounds = [7];
  const deciderTypes = ['Wins'];

  let tournamentName = '';
  let organizerName = '';

  let selectedGroups = '';
  let selectedTournamentDecider = '';
  let selectedTeamGroups = '';
  let selectedPointsPerWin = '';
  let selectedPointsForDraw = '';

  let selectedRounds = '';
  let selectedDecider = '';

  function handleSelection(event, selectionType) {
    const value = event.target.value;
    switch (selectionType) {
      case 'groups':
        selectedGroups = value;
        break;
      case 'tournamentDecider':
        selectedTournamentDecider = value;
        break;
      case 'teamgroups':
        selectedTeamGroups = value;
        break;
      case 'pointsperwin':
        selectedPointsPerWin = value;
        break;
      case 'pointsfordraw':
        selectedPointsForDraw = value;
        break;
      case 'decider':
        selectedDecider = value;
        break;
      default:
        break;
    }
  }

  function createTournamentTest() {
    console.log('Tournament Name:', tournamentName);
    console.log('Organizer Name:', organizerName);
    console.log('Selected Groups:', selectedGroups);
    console.log('Selected Tournament Decider:', selectedTournamentDecider);
    console.log('Selected Team Groups:', selectedTeamGroups);
    console.log('Selected Points Per Win:', selectedPointsPerWin);
    console.log('Selected Points For Draw:', selectedPointsForDraw);
    console.log('Selected Rounds:', selectedRounds);
    console.log('Selected Decider:', selectedDecider);
  }
</script>

<main>
  <div class="customizer-content">
    <div class="customizer-header">
      <h1>CUSTOMIZE YOUR TOURNAMENT {params.id}</h1>
    </div>
    <div class="input-container">
      <div>
        <label for="tournamentName">Tournament Name</label>
        <br />
        <input
          type="text"
          id="tournamentName"
          placeholder="Name"
          bind:value={tournamentName}
        />
      </div>
      <div>
        <label for="organizerName">Organizer Name</label>
        <br />
        <input
          type="text"
          id="organizerName"
          placeholder="Name"
          bind:value={organizerName}
        />
      </div>
    </div>
    {#if selectedMenu == 'groups'}
      <div class="customizer-settings">
        <div>
          <label for="roundSelection">Number of Groups</label>
          <br />
          <select
            id="roundSelection"
            bind:value={selectedGroups}
            on:change={handleSelection}
          >
            <option value="" disabled selected>SELECT</option>
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
            <option value="" disabled selected>SELECT</option>
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
            <option value="" disabled selected>SELECT</option>
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
            <option value="" disabled selected>SELECT</option>
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
            <option value="" disabled selected>SELECT</option>
            {#each pointsForDraw as pointsForDraw (pointsForDraw)}
              <option value={pointsForDraw}>{pointsForDraw}</option>
            {/each}
          </select>
        </div>
      </div>
    {/if}
    {#if selectedMenu == 'playoffs'}
      <div class="customizer-settings">
        <div>
          <label for="roundSelection">Best of X</label>
          <br />
          <select
            id="roundSelection"
            bind:value={selectedRounds}
            on:change={handleSelection}
          >
            <option value="" disabled selected>SELECT</option>
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
            <option value="" disabled selected>SELECT</option>
            {#each deciderTypes as deciderType (deciderType)}
              <option value={deciderType}>{deciderType}</option>
            {/each}
          </select>
        </div>
      </div>
    {/if}
    <div class="createButton">
      <Button on:cClick={createTournamentTest}>CREATE</Button>
    </div>
  </div>
</main>

<style>
  h1 {
    text-transform: uppercase;
    font-size: 2em;
    margin-bottom: 2em;
  }
  main {
    font-size: x-large;
    padding-top: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-flow: row wrap;
    padding-bottom: 3em;
    margin: auto;
    flex-direction: column;
    width: 50%;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.308);
  }

  .customizer-header {
    text-align: center;
  }

  .input-container {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
  }

  .customizer-settings {
    padding-top: 1em;
    padding-bottom: 2em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-basis: 50%;
    gap: 2em;
    width: 100%;
  }

  .createButton {
    margin-top: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  select,
  input {
    text-transform: uppercase;
    font-size: 1.3em;
    padding: 0.5em 2.2em;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.244);
    text-align: center;
    border: 1px solid #ffffff37;
  }

  option {
    text-transform: uppercase;
    color: #000000;
    font-size: 1.3em;
    padding: 0.5em 1em;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0);
    text-align: center;
    border: 1px solid #ffffff37;
  }

  label {
    text-transform: uppercase;
  }
</style>
