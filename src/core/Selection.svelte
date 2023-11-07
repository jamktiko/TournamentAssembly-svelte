<script>
  import { push } from 'svelte-spa-router';

  import Button from '../reusable/Button.svelte';
  import Card from '../reusable/Card.svelte';

  import { slide } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { scale } from 'svelte/transition';
  import { quintOut, elasticInOut, quadInOut } from 'svelte/easing';

  import cch from '../utils/cache';
  import stateController from '../utils/stateStore';
  import Tooltip from '../reusable/Tooltip.svelte';
  import { calcId } from '../utils/lib';
  import { loadFromSession } from '../utils/lib';

  let user;
  stateController.subscribe((userData) => (user = userData));

  if (!user.username && window.sessionStorage.getItem('user')) {
    user = loadFromSession('user');
    stateController.set(user);
  }

  console.log(user);

  function navigate(key, path) {
    localStorage.removeItem(key);
    push(path);
  }

  function showConfirmation(key, path) {
    if (cch.isInCache(key)) {
      const isConfirmed = window.confirm(
        'This will delete ongoing tournament! Continue?'
      );
      if (isConfirmed) {
        navigate(key, path);
      }
    } else {
      navigate(key, path);
    }
  }

  let showTooltip = false;

  function toggleTooltip() {
    showTooltip = !showTooltip;
  }

  function createScoreboard() {
    if (!user.username || user.isGuest) {
      showConfirmation('scoreboard', '/scoreboard');
    } else {
      const id = calcId(user.tournaments);
      user.config = { id };

      stateController.createTournament(
        {
          config: {
            id,
          },
          id,
        },
        'scoreboard'
      );
      showConfirmation('scoreboard', '/scoreboard');
    }
  }
</script>

<main
  transition:slide={{
    duration: 700,
    easing: quintOut,
    axis: 'y',
  }}
>
  <div class="text-container">
    {#if user.username}
      <h1>WELCOME {user.username.toUpperCase()}!</h1>
    {:else}
      <h1>WELCOME GUEST</h1>
    {/if}
    <p>
      Choose a tournament type you want to play. All tournament types are fully
      customizable to your desires and scalable to suit different player counts.
    </p>
  </div>
  <div
    class="create-container"
    in:slide={{
      delay: 600,
      duration: 1000,
      easing: quadInOut,
      axis: 'y',
    }}
  >
    <Card
      background="radial-gradient(rgb(1, 1, 50) 0%, rgb(0, 0, 0) 100%)"
      bgheader="GROUPS"
    >
      <div slot="header" class="card-header">
        <h2>GROUPS</h2>
      </div>
      <div slot="button">
        <Button
          class="group-select"
          on:cClick={() => showConfirmation('groups', '/customizer/groups')}
          >SELECT</Button
        >
        <Tooltip
          text="You have an unfinished tournament. Press to continue playing it."
        >
          {#if cch.isInCache('groups')}
            <Button
              class="continue-button"
              on:cClick={() => push(`/groups/${cch.getToken('groupsConf')}`)}
              >Continue</Button
            >
          {/if}
        </Tooltip>
      </div>
      <div slot="footer">
        <p>
          Groups is a great for hosting a regular season for a league. You can
          also use the EXPORT feature to continue playing a post-season
          directly.
        </p>
      </div>
    </Card>
    <Card
      background="radial-gradient(rgb(1, 1, 50) 0%, rgb(0, 0, 0) 100%)"
      bgheader="PLAYOFFS"
    >
      <div slot="header">
        <h2>PLAYOFFS</h2>
      </div>
      <div slot="button">
        <Button on:cClick={() => push('/customizer/playoffs')}>SELECT</Button>
      </div>
      <div slot="footer">
        <p>
          With playoffs you can have an elimination-style tournament to
          determine the winner.
        </p>
      </div>
    </Card>
    <Card
      background="radial-gradient(rgb(1, 1, 50) 0%, rgb(0, 0, 0) 100%)"
      bgheader="SCOREBOARD"
    >
      <div slot="header">
        <h2>SCOREBOARD</h2>
      </div>
      <div slot="button">
        <Button on:cClick={() => createScoreboard('scoreboard', '/scoreboard')}
          >SELECT</Button
        >

        {#if cch.isInCache('scoreboard')}
          <Tooltip
            text="You have an unfinished tournament. Press to continue playing it."
          >
            <Button
              class="continue-button"
              on:cClick={() => push(`/scoreboard`)}>Continue</Button
            >
          </Tooltip>
        {/if}
      </div>
      <div slot="footer">
        <p>
          Scoreboard allows you to keep track of your games and competitions by
          tracking your results each round.
        </p>
      </div>
    </Card>
    <Card
      background="radial-gradient(rgb(1, 1, 50) 0%, rgb(0, 0, 0) 100%)"
      bgheader="LEAGUE"
    >
      <div slot="header">
        <h2>LEAGUE</h2>
      </div>
      <div slot="button">
        <Button
          on:cClick={() => showConfirmation('league', '/customizer/league')}
          >SELECT</Button
        >
        {#if cch.isInCache('league')}
          <Tooltip
            text="You have an unfinished tournament. Press to continue playing it."
          >
            <Button
              class="continue-button"
              on:cClick={() => push(`/league/${cch.getToken('leagueConf')}`)}
              >Continue</Button
            >
          </Tooltip>
        {/if}
      </div>
      <div slot="footer">
        <p>
          League allows you to create and manage a tournament where participants
          play a certain number of rounds and determine a winner by the amount
          of points.
        </p>
      </div>
    </Card>
  </div>
</main>

<style>
  main {
    padding: 0em 2em 3em;
    margin-left: 18%;
    margin-top: 2em;
    margin-bottom: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
    width: 60%;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .create-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 2em;
  }

  .text-container {
    display: flex;
    flex-direction: column;
    margin: 1em;
    align-items: center;
  }

  h2 {
    margin: auto;
    text-align: center;
    font: 100;
    font-size: 2em;
    margin-top: 1em;
    margin-bottom: 1.3em;
  }

  h1 {
    margin-top: 1em;
    font: 700;
    font-size: 3.2em;
  }

  p {
    text-align: center;
    margin-bottom: 1em;
    font: 100;
    font-size: 1.3em;
  }

  /* Tablet Portrait */
  @media only screen and (max-width: 1450px) {
    main {
      margin-left: 16%;
    }
  }
</style>
