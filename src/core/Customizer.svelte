<script>
  import cch from '../utils/cache';

  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
  import Playerlist from '../reusable/Playerlist.svelte';



  export let params;

  let selectedMenu = params.id;

  let config = {
    tournamentName: '',
    organizerName: '',
    numberOfGroups: 0,
    teamsInGroup: 0,
    tourDecider: '',
    pointsPerWin: 0,
    pointsPerDraw: 0,
    numberOfRounds: 0,
    bestOf: 0,
    players: [],
  };


  const numberGroups = [4, 6, 8];
  const tournamentDeciders = ['Goal Difference', 'Aggregate'];
  const teamsGroups = [4, 6, 8];
  const pointsPerWin = [3, 4, 5];
  const pointsForDraw = [0, 1];

  const bestOf = [3, 5, 7];
  const deciderTypes = ['Wins'];

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

  function handlePlayerList(ce) {
    playerListVisible = false;
    ce.detail.forEach((i) => config.players.push(i))
    config.players = [...config.players];
  }

  function setParticipants() {
    switch (params.id) {
      case 'playoffs':
        push(`/playoffs/${cch.tokenify(config)}`);
        break;
      case 'groups':
        push(`/group/${cch.tokenify(config)}`);
        break;
      case "league":
        push(`/league/${cch.tokenify(config)}`);
    }
  }
  function randomizePlayers(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		config.players = [...config.players];
	}
  let playerListOpen = false

  let playerListVisible = false;
  function removePlayer(player) {
    config.players = config.players.filter(p => p !== player);
  }
</script>
{#if params.id == 'playoffs'   }
<div class ="playerlist">
  <p>Players:</p>
  {#each config.players as player}
  <p>{player} <Button class="x-button" on:cClick={removePlayer(player)}>X</Button></p> 
 {/each}
</div>
{/if}

<main>
  <Button class="back-button" on:cClick={() => push('/selection')}>Back</Button>
  <div class="customizer-content">
    <!-- League Name & Organizer -->
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
          bind:value={config.tournamentName}
        />
      </div>
      <div>
        <label for="organizerName">Organizer Name</label>
        <br />
        <input
          type="text"
          id="organizerName"
          placeholder="Name"
          bind:value={config.organizerName}
        />
      </div>
    </div>

    <!-- Groups Menu -->
    {#if selectedMenu == "groups"}
      <div class="customizer-settings">
        <div>
          <label for="roundSelection">Number of Groups</label>
          <br />
          <select
            id="roundSelection"
            bind:value={config.numberOfGroups}
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
            bind:value={config.tourDecider}
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
            bind:value={config.teamsInGroup}
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
            bind:value={config.pointsPerWin}
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
            bind:value={config.pointsPerDraw}
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

    {#if selectedMenu == "playoffs"}
    
      <div class="customizer-settings">
        {#if playerListVisible}
          <Playerlist on:playersEvent={handlePlayerList} />
        {:else}
          <Button on:cClick={() => (playerListVisible = !playerListVisible)}
            >Add Players</Button
          >
        {/if}
        

    
      <Button on:cClick={randomizePlayers(config.players)}>randomize</Button>
        <div>
          <label for="roundSelection">Best of X</label>
          <br />
          <select
            id="roundSelection"
            bind:value={config.bestOf}
            on:change={handleSelection}
          >
            <option value="" disabled selected>SELECT</option>
            {#each bestOf as numberRound (numberRound)}
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
            {#if playerListVisible}
              <Playerlist />
            {:else}
              <Button>Add Players</Button>
            {/if}
          </select>
        </div>
      </div>
    {/if}

		{#if params.id == 'league'   }
		{#if config.tournamentName.length > 0}
			{#if config.organizerName.length > 0}
			<div class="createButton">
				<Button on:cClick={setParticipants}>CREATE</Button>
			</div>
			{/if}
		{/if}
	{/if}
	{#if params.id == 'playoffs'   }
		{#if config.tournamentName.length > 0}
			{#if config.organizerName.length > 0}
				{#if selectedDecider.length > 0}
					{#if config.bestOf != 0}
						{#if config.players != null}
							{#if config.players.length > 1}
								<div class="createButton">
									<Button on:cClick={setParticipants}>CREATE</Button>
								</div>
							{/if}
						{/if}
					{/if}
				{/if}
			{/if}
		{/if}
	{/if}
	{#if params.id == 'groups'   }
		{#if config.tournamentName.length > 0}
			{#if config.organizerName.length > 0}
				{#if config.numberOfGroups > 0}
					{#if config.teamsInGroup > 0}
						{#if config.pointsPerWin > 0}
							{#if config.tourDecider != ""}
								<div class="createButton">
									<Button on:cClick={setParticipants}>CREATE</Button>
								</div>
							{/if}			
						{/if}	
					{/if}			
				{/if}
			{/if}
		{/if}
	{/if}

    <!-- League Menu -->
    {#if selectedMenu == "league"}
      <div class="customizer-settings">
        <div>
          <label for="deciderType">Decider Type</label>
          <br />
          <select
            id="deciderType"
            bind:value={config.tourDecider}
            on:change={handleSelection}
          >
            <option value="" disabled selected>SELECT</option>
            {#each tournamentDeciders as tournamentDecider (tournamentDecider)}
              <option value={tournamentDecider}>{tournamentDecider}</option>
            {/each}
          </select>
        </div>
        <div>
          <label for="deciderType">Points for Win</label>
          <br />
          <select
            id="deciderType"
            bind:value={config.pointsPerWin}
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
            bind:value={config.pointsPerDraw}
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
  p{
    font-size: 1.3em;
  }
  select,
  input {
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
  .playerlist {
  margin: 0px;
  padding: 2px;
  text-align: left;
  background: linear-gradient(
			129deg,
			rgb(11, 11, 52) 0%,
			rgba(24, 0, 23, 0.285) 100%
		);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  color: white;
  font-size: 1em;
  width: 200px;

  border: solid 1px #ffffff3c;
  
  position: sticky; top: 300px; left:10px;
}

</style>
