<script>
  import cch from '../utils/cache';
  import { calcId } from '../utils/lib';

  import Tooltip from '../reusable/Tooltip.svelte';
  import { slide } from 'svelte/transition';
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
  import Playerlist from '../reusable/Playerlist.svelte';
  import { quintOut } from 'svelte/easing';
  import { loadFromSession } from '../utils/lib';

  import stateController from '../utils/stateStore';
  import { onDestroy } from 'svelte';

  export let params;

  let user;
  const unsub = stateController.subscribe((userData) => (user = userData));

  if (!user.username && window.sessionStorage.getItem('user')) {
    user = loadFromSession('user');
    stateController.set(user);
  }

  onDestroy(() => {
    if (unsub) unsub();
  });

  let selectedMenu = params.id;

  let config = {
    tournamentName: '',
    organizerName: '',
    numberOfGroups: '',
    teamsInGroup: '',
    tourDecider: '',
    pointsPerWin: '',
    pointsPerDraw: '',
    numberOfRounds: '',
    bestOf: '',
    players: [],
    advance: 1,
  };

  const numberGroups = [4, 6, 8];
  const tournamentDeciders = ['Goal Difference', 'Wins'];
  const teamsGroups = [4, 6, 8];
  const pointsPerWin = [1, 2, 3, 4, 5];
  const pointsForDraw = [0, 1, 2];
  const numberadvance = [1, 2, 3, 4];

  const bestOf = [1, 3, 5, 7];
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
      case 'advance':
        selectedAdvance = value;
      default:
        break;
    }
  }
  let sameNameMessage = false;
  let sameNameTimer = 0;
  function handlePlayerList(ce) {
    if (ce.detail != '.') {
      console.log(ce.detail);
      let upcount = 0;
      let stopper = 0;
      while (upcount < config.players.length) {
        if (ce.detail == config.players[upcount]) {
          stopper = 1;
        }
        upcount += 1;
      }

      if (stopper == 0) {
        ce.detail.forEach((i) => config.players.push(i));
        config.players = [...config.players];
      } else {
        sameNameMessage = true;
        sameNameTimer = setTimeout(() => {
          sameNameMessage = false;
        }, 2000);
      }
    } else {
      playerListVisible = false;
    }
    checkplayers();
  }

  async function setParticipants() {
    if (!user.isGuest && user.username) {
      const tournament = {
        config,
        state: true,
      };
      const res = await stateController.createTournament(tournament, params.id);
      config.id = res.result._id;

      user.config = config;

      stateController.set(user);
    }

    switch (params.id) {
      case 'playoffs':
        push(`/playoffs/${cch.tokenify(config)}`);
        break;
      case 'groups':
        push(`/groups/${cch.tokenify(config)}`);
        break;
      case 'league':
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

  let playerListVisible = false;

  function removePlayer(player) {
    config.players = config.players.filter((p) => p !== player);
    checkplayers();
    changeables = [];
  }

  function isValidInput(input) {
    const regex = /^[A-Za-z0-9\s]+$/; // Only allow letters, numbers, and spaces
    return regex.test(input);
  }

  let playerAmountOk = false;
  function checkplayers() {
    if (
      config.players.length == 128 ||
      config.players.length == 64 ||
      config.players.length == 4 ||
      config.players.length == 8 ||
      config.players.length == 16 ||
      config.players.length == 32
    ) {
      playerAmountOk = true;
    } else {
      playerAmountOk = false;
    }
  }

  let num = 0;
  function randomnum() {
    num = Math.floor(Math.random() * 10000);
  }
  function fill() {
    while (true) {
      if (
        config.players.length != 4 &&
        config.players.length != 8 &&
        config.players.length != 16 &&
        config.players.length != 32 &&
        config.players.length != 64 &&
        config.players.length != 128 &&
        config.players.length != 256 &&
        config.players.length != 512 &&
        config.players.length != 1024
      ) {
        randomnum();
        config.players.push('PLAYER_' + num);
      } else {
        config.players = [...config.players];
        break;
      }
    }
  }
  function autofill() {
    let place = 1;
    while (true) {
      if (
        config.players.length != 4 &&
        config.players.length != 8 &&
        config.players.length != 16 &&
        config.players.length != 32 &&
        config.players.length != 64 &&
        config.players.length != 128 &&
        config.players.length != 256 &&
        config.players.length != 512 &&
        config.players.length != 1024
      ) {
        randomnum();
        config.players.splice(place, 0, 'PLAYER_' + num);
        place += 2;
      } else {
        config.players = [...config.players];
        break;
      }
    }
    setParticipants();
  }

  let showPlayerlist = false;
  function togglePlayerlist() {
    showPlayerlist = !showPlayerlist;
  }

  let playerlistExpanded = false;
  function expandPlayerlist() {
    playerlistExpanded = !playerlistExpanded;
  }

  /* Function check if the window is for tablet, used for alternative playerlist */
  let isTablet = false;
  const checkScreenSizeTablet = () => {
    isTablet = window.matchMedia('(max-width: 1450px)').matches;
  };
  checkScreenSizeTablet();
  window.addEventListener('resize', checkScreenSizeTablet);

  /* Function check if the window is a phone, used to hide tooltips */
  let isPhone = false;
  const checkScreenSizePhone = () => {
    isPhone = window.matchMedia('(max-width: 500px)').matches;
  };
  checkScreenSizePhone();
  window.addEventListener('resize', checkScreenSizePhone);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Use 'auto' for instant scrolling
    });
  }

  let showTooltip = false;

  function toggleTooltip() {
    showTooltip = !showTooltip;
  }
  let changeables = [];
  function storeobject(index) {
    console.log(index);
    changeables.push(index);
    if (changeables.length == 2) {
      switchobjects(changeables[0], changeables[1]);
      changeables = [];
    }
    changeables = [...changeables];
  }
  function switchobjects(index, index2) {
    var tempplace = config.players[index];
    config.players[index] = config.players[index2];
    config.players[index2] = tempplace;
  }
</script>

<main>
  <div class="customizer-content">
    <!-- League Name & Organizer -->
    <div class="customizer-header">
      <h1>CUSTOMIZE YOUR TOURNAMENT {params.id}</h1>
    </div>
    <div class="input-container">
      <div class="tournamentname-content">
        <label for="tournamentName">Tournament Name</label>
        <br />
        <input
          type="text"
          id="tournamentName"
          placeholder="Name"
          bind:value={config.tournamentName}
          on:input={(event) => {
            if (!isValidInput(event.target.value)) {
              event.target.value = event.target.value.replace(
                /[^A-Za-z0-9\s]/g,

                ''
              ); // Remove invalid characters
              config.tournamentName = event.target.value;
            }
          }}
        />
      </div>
      <div class="organizername-content">
        <label for="organizerName">Organizer Name</label>
        <br />
        <input
          type="text"
          id="organizerName"
          placeholder="Name"
          bind:value={config.organizerName}
          on:input={(event) => {
            if (!isValidInput(event.target.value)) {
              event.target.value = event.target.value.replace(
                /[^A-Za-z0-9\s]/g,

                ''
              ); // Remove invalid characters
              config.organizerName = event.target.value;
            }
          }}
        />
      </div>
    </div>
    <!-- Groups Menu -->
    {#if selectedMenu == 'groups'}
      <div class="customizer-settings">
        <div>
          <label for="numberofGroups">Number of Groups</label>
          <br />
          <select
            id="numberofGroups"
            bind:value={config.numberOfGroups}
            on:change={handleSelection}
          >
            <option value="" selected disabled>SELECT</option>
            {#each numberGroups as numberGroup (numberGroup)}
              <option value={numberGroup}>{numberGroup}</option>
            {/each}
          </select>
        </div>
        <div>
          <label for="teamsinGroup">Teams in Group</label>
          <br />
          <select
            id="teamsinGroup"
            bind:value={config.teamsInGroup}
            on:change={handleSelection}
          >
            <option value="" selected disabled>SELECT</option>
            {#each teamsGroups as teamGroup (teamGroup)}
              <option value={teamGroup}>{teamGroup}</option>
            {/each}
          </select>
        </div>
        <div>
          <label for="pointsPerWin">Points for Win</label>
          <br />
          <select
            id="pointsPerWin"
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
          <label for="pointsPerDraw">Points for Draw</label>
          <br />
          <select
            id="pointsPerDraw"
            bind:value={config.pointsPerDraw}
            on:change={handleSelection}
          >
            <option value="" disabled selected>SELECT</option>
            {#each pointsForDraw as pointsForDraw (pointsForDraw)}
              <option value={pointsForDraw}>{pointsForDraw}</option>
            {/each}
          </select>
        </div>
        <div>
          <label for="advance">Number of qualifiers</label>
          <br />
          {#if !isPhone}
            <Tooltip
              text="Defines how many patricipants advance to the possible playoff stage."
            >
              <select
                id="advance"
                bind:value={config.advance}
                on:change={handleSelection}
              >
                <option value="1" disabled selected>SELECT</option>
                {#each numberadvance as numberadvance (numberadvance)}
                  <option value={numberadvance}>{numberadvance}</option>
                {/each}
              </select>
            </Tooltip>
          {:else}
            <select
              id="advance"
              bind:value={config.advance}
              on:change={handleSelection}
            >
              <option value="1" disabled selected>SELECT</option>
              {#each numberadvance as numberadvance (numberadvance)}
                <option value={numberadvance}>{numberadvance}</option>
              {/each}
            </select>
          {/if}
        </div>
        <div>
          <label for="roundSelection">Best of X</label>
          <br />
          {#if !isPhone}
            <Tooltip
              text="Defines how many match wins are needed in order to advance to the next round in the possible playoff stage."
            >
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
            </Tooltip>
          {:else}
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
          {/if}
        </div>
      </div>
    {/if}
    <!-- Playoffs Menu -->
    {#if params.id == 'playoffs'}
      {#if isTablet}
        {#if !playerlistExpanded}
          <Button
            class="expand-playerlist-button-open"
            on:cClick={expandPlayerlist}
            ><svg
              class="expand-arrows"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
              ><path
                d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
              /></svg
            ></Button
          >
        {/if}
        {#if playerlistExpanded}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div on:click={expandPlayerlist} class="backdrop" />
          <div
            class="playerlist"
            transition:slide={{ axis: 'x', duration: 500 }}
          >
            <h2 class="list-header">List of players</h2>
            <p id="player-count">Player count: {config.players.length}</p>
            <Button class="expand-button" on:cClick={togglePlayerlist}>
              {showPlayerlist ? 'Hide Players' : 'Show Players'}
            </Button>
            {#if showPlayerlist}
              <div transition:slide>
                {#each config.players as player, index (player)}
                  <div class="single-player-content">
                    <div
                      class="player-name"
                      on:keypress={() => console.log('test')}
                      on:click={storeobject(index)}
                    >
                      {#if index == changeables[0]}
                        <div class="selected">
                          {player}
                        </div>
                      {:else}
                        {player}
                      {/if}
                    </div>
                    <div>
                      <Button
                        class="remove-player-button"
                        on:cClick={removePlayer(player)}>Delete</Button
                      >
                    </div>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        {/if}
      {:else}
        <div class="playerlist" transition:slide={{ axis: 'y', duration: 500 }}>
          <h2 class="list-header">List of players</h2>
          <p id="player-count">Player count: {config.players.length}</p>
          <Button class="expand-button" on:cClick={togglePlayerlist}>
            {showPlayerlist ? 'Hide Players' : 'Show Players'}
          </Button>
          {#if showPlayerlist}
            <div transition:slide>
              {#each config.players as player, index (player)}
                <div class="single-player-content">
                  <div
                    class="player-name"
                    on:keypress={storeobject(index)}
                    on:click={storeobject(index)}
                  >
                    {#if index == changeables[0]}
                      <div class="selected">
                        {player}
                      </div>
                    {:else}
                      {player}
                    {/if}
                  </div>
                  <div>
                    <Button
                      class="delete-player-button"
                      on:cClick={removePlayer(player)}
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
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/if}
    {/if}
    {#if selectedMenu == 'playoffs'}
      <div
        class="customizer-settings"
        in:slide={{
          duration: 700,
          easing: quintOut,
          axis: 'y',
        }}
      >
        {#if playerListVisible}
          <Playerlist
            {config}
            on:playersEvent={handlePlayerList}
            on:closeWindow={() => {
              playerlistExpanded = false;
            }}
          />
        {/if}
        <div>
          <label for="roundSelection">Best of X</label>
          <br />
          {#if !isPhone}
            <Tooltip
              text="Defines how many match wins are needed in order to advance to the next round."
            >
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
            </Tooltip>
          {:else}
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
          {/if}
        </div>
        <div class="playoffs-button-container">
          {#if isTablet}
            <p id="player-count">Player count: {config.players.length}</p>
          {/if}
          <Button
            class="playoffs-buttons"
            on:cClick={scrollToTop}
            on:cClick={() => (playerListVisible = !playerListVisible)}
            on:cClick={() => (playerlistExpanded = true)}>Add Players</Button
          >
          {#if !isPhone}
            <Tooltip
              text="Puts the players participating in random order for the playoff brackets."
            >
              <Button
                class="playoffs-buttons"
                on:cClick={randomizePlayers(config.players)}>Randomize</Button
              >
            </Tooltip>
          {:else}
            <Button
              class="playoffs-buttons"
              on:cClick={randomizePlayers(config.players)}>Randomize</Button
            >
          {/if}
        </div>
      </div>
    {/if}
    <!-- League Menu -->
    {#if selectedMenu == 'league'}
      <div
        class="customizer-settings"
        in:slide={{
          duration: 700,
          easing: quintOut,
          axis: 'y',
        }}
      >
        <div>
          <label for="pointsPerWin">Points for Win</label>
          <br />
          <select
            id="pointsPerWin"
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
          <label for="pointsPerDraw">Points for Draw</label>
          <br />
          <select
            id="pointsPerDraw"
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
    <!-- Create buttons -->

    {#if params.id == 'playoffs' && config.tournamentName.length > 0 && config.organizerName.length > 0 && config.bestOf != 0 && config.players != null && config.players.length > 1}
      <div class="createButton">
        <Button class="create-button" on:cClick={autofill}>CREATE</Button>
      </div>
    {/if}

    {#if params.id == 'groups' && config.tournamentName.length > 0 && config.organizerName.length > 0 && config.numberOfGroups > 0 && config.teamsInGroup > 0 && config.pointsPerWin > 0 && config.pointsPerDraw >= 0}
      <div class="createButton">
        <Button class="create-button" on:cClick={setParticipants}>CREATE</Button
        >
      </div>
    {/if}
    {#if params.id == 'league' && config.tournamentName.length > 0 && config.organizerName.length > 0 && config.pointsPerWin > 0 && config.pointsPerDraw >= 0}
      <div class="createButton">
        <Button class="create-button" on:cClick={setParticipants}>CREATE</Button
        >
      </div>
    {/if}
  </div>
  {#if sameNameMessage}
    <div class="popup">Same name can't appear twice</div>
  {/if}
</main>

<style>
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
  main {
    font-size: x-large;
    padding-top: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    flex-flow: row wrap;
    padding-bottom: 1em;
    margin-left: 25%;
    margin-top: 25vh;
    margin-bottom: 2em;
    flex-direction: column;
    width: 50%;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  h1 {
    text-transform: uppercase;
    font-size: 2em;
    margin-bottom: 2em;
  }

  p {
    font-size: 1.3em;
  }

  #player-count {
    text-transform: uppercase;
    font-size: 0.9em;
  }

  select,
  input {
    font-size: 1.3em;
    padding: 0.25em 2.2em;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.244);
    text-align: center;
    border: 1px solid #ffffff37;
  }

  option {
    text-transform: uppercase;
    color: #000000;
    font-size: 1.3em;
    padding: 0.25em 1em;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0);
    text-align: center;
    border: 1px solid #ffffff37;
    width: auto;
  }

  label {
    text-transform: uppercase;
  }

  .customizer-header {
    text-align: center;
  }

  .tournamentname-content {
    margin: 0.25em 0em;
  }

  .organizername-content {
    margin: 0.25em 0em;
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

  .playoffs-button-container {
    width: 100%;
  }

  .createButton {
    margin-top: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .list-header {
    text-transform: uppercase;
  }

  .playerlist {
    text-align: center;
    padding: 0.5em;
    width: 12.5em;
    position: absolute;
    top: 16em;
    left: 0.75em;
    background: linear-gradient(
      129deg,
      rgba(0, 0, 0, 0.366) 0%,
      rgba(5, 0, 24, 0.285) 100%
    );
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    font-size: 1em;
    color: white;
    border: solid 1px #ffffff3c;
    border-radius: 5px;
    z-index: 50;
    overflow-y: auto;
    max-height: 50%;
  }

  .single-player-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25em 0em;
  }

  .player-name {
    flex: 1;
    padding-left: 0.5em;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    font-size: 1.2em;
    overflow-x: auto;
  }
  .selected {
    opacity: 50%;
  }
  /* Tablet Portrait */
  @media only screen and (max-width: 1450px) {
    main {
      padding-left: 1em;
      padding-right: 1em;
      margin-left: 10%;
      margin-top: 28vh;
      margin-bottom: 2em;
      width: 75%;
    }

    .playerlist {
      text-align: center;
      padding: 0em;
      width: 12.5em;
      position: absolute;
      top: 30%;
      left: 0;
      background: #090728;
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.4);
      z-index: 10;
    }

    .expand-arrows {
      fill: #fff;
    }
  }

  .trash-can {
    fill: rgba(110, 0, 0);
  }

  /* Mobile Phone */
  @media only screen and (max-width: 500px) {
    main {
      margin-left: 5%;
      width: 80%;
    }

    h1 {
      text-transform: uppercase;
      font-size: 1.25em;
      margin-bottom: 2em;
    }

    select,
    input {
      width: auto;
      font-size: 1em;
      padding: 0.25em 2.2em;
      border-radius: 20px;
    }

    option {
      font-size: 1em;
      padding: 0.25em 1em;
      border-radius: 20px;
      width: auto;
    }

    .playerlist {
      text-align: center;
      padding: 0em;
      width: 12.5em;
      position: absolute;
      top: 60vh;
      left: 19.6%;
    }

    .list-header {
      font-size: 1.1em;
    }

    .player-name {
      font-size: 1em;
    }

    .single-player-content {
      padding: 0em 0em;
    }
  }

  @media only screen and (max-width: 360px) {
    .playerlist {
      left: 8.5%;
    }
  }
</style>
