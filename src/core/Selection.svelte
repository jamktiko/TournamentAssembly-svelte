<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
  import cch from '../utils/cache';
  import Card from '../reusable/Card.svelte';

  function navigate(key, path) {
    localStorage.removeItem(key);
    push(path);
  }
  function showConfirmation(key, path) {
    if (cch.isInCache(key)) {
      const isConfirmed = window.confirm("Everything you love and care about will be destroyed if you continue");
      if (isConfirmed) {
        navigate(key, path);
      }
    } else {
      navigate(key, path);
    }
  }
</script>

<main>
  <Button class="back-button2" on:cClick={() => push('/')}>Back</Button>
  <div class="text-container">
    <h2>WELCOME USER!</h2>
    <p>
      Choose a tournament type you want to play. All tournament styles are fully
      customizable to your desires.
    </p>
  </div>
  <h1>CREATE</h1>
  <div class="create-container">
    <Card background="radial-gradient(rgb(1, 1, 50) 0%, rgb(0, 0, 0) 100%)">
      <!-- Example: Custom background image -->
      <div slot="header" class="card-header">
        <h2>GROUPS</h2>
      </div>
      <div slot="button">
        <Button on:cClick={() => showConfirmation('groups', '/customizer/groups')}>CHOOSE</Button>

        {#if cch.isInCache('groups')}
          <Button on:cClick={() => push(`/group/${cch.getToken('groupsConf')}`)}
            >Continue</Button
          >
        {/if}
      </div>
      <div slot="footer">
        <p>
          Great for stage-based tournaments to qualify contestants into possible
          later playoffs.
        </p>
      </div>
    </Card>
    <Card background="radial-gradient(rgb(1, 1, 50) 0%, rgb(0, 0, 0) 100%)">
      <!-- Example: Custom background image -->
      <div slot="header">
        <h2>PLAYOFFS</h2>
      </div>
      <div slot="button">
        <Button on:cClick={() => push('/customizer/playoffs')}>CHOOSE</Button>
      </div>
      <div slot="footer">
        <p>
          With playoffs you can have elimination-style tournaments to determine
          the winner contestant.
        </p>
      </div>
    </Card>
    <Card background="radial-gradient(rgb(1, 1, 50) 0%, rgb(0, 0, 0) 100%)">
      <!-- Example: Custom background image -->
      <div slot="header">
        <h2>SCOREBOARD</h2>
      </div>
      <div slot="button">
        <Button on:cClick={() => showConfirmation('scoreboard', '/scoreboard')}>CHOOSE</Button>

        {#if cch.isInCache('scoreboard')}
          <Button on:cClick={() => push(`/scoreboard`)}>Continue</Button>
        {/if}
      </div>
      <div slot="footer">
        <p>
          Scoreboard allows you to keep track of your games and competitions by
          tracking your results each round.
        </p>
      </div>
    </Card>
    <Card background="radial-gradient(rgb(1, 1, 50) 0%, rgb(0, 0, 0) 100%)">
      <!-- Example: Custom background image -->
      <div slot="header">
        <h2>LEAGUE</h2>
      </div>
      <div slot="button">
        <Button on:cClick={() => showConfirmation('league', '/customizer/league')}>CHOOSE</Button>
        {#if cch.isInCache('league')}
          <Button
            on:cClick={() => push(`/league/${cch.getToken('leagueConf')}`)}
            >Continue</Button
          >
        {/if}
      </div>
      <div slot="footer">
        <p>
          League allows you to create and manage a tournament where with a
          pre-determined amount of rounds for all contestants.
        </p>
      </div>
    </Card>
  </div>
</main>

<style>
  main {
    padding: 0em 2em 3em;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
    width: 70%;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.308);
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
    font: 700;
    font-size: 3.2em;
  }

  p {
    text-align: center;
    margin-bottom: 1em;
    font: 100;
    font-size: 1.3em;
  }
</style>
