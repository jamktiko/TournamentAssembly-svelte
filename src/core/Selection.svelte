<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
  import cch from '../utils/cache';
</script>

<main>
  <div class="text-container">
    <h2>WELCOME USER!</h2>
    <p>
      Choose a tournament type you want to play. All tournament styles are fully
      customizable to your desires.
    </p>
  </div>
  <div class="create-container">
    <h1>CREATE</h1>
    <div class="button-container">
      <Button on:cClick={() => push('/customizer/groups')}>GROUPS</Button>
      <Button on:cClick={() => push('/customizer/playoffs')}>PLAYOFFS</Button>
      <Button on:cClick={() => push('/scoreboard')}>SCOREBOARD</Button>
      <Button on:cClick={() => push('/customizer/league')}>LEAGUE</Button>
    </div>
  </div>
</main>

<style>
  main {
    padding-bottom: 3em;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
    width: 50%;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.308);
  }

  .create-container {
    width: 50vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em 8em 6em;
  }

  .button-container {
    margin-top: 3em;
    display: flex;
    width: 25vw;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
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
    margin-top: 2em;
    margin-bottom: 1.3em;
  }

  h1 {
    font: 700;
    font-size: 3em;
  }

  p {
    text-align: center;
    margin-bottom: 1em;
    white-space: pre;
    font: 100;
    font-size: 1.3em;
  }
</style>
