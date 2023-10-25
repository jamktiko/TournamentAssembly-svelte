<script>
  import { onDestroy } from 'svelte';
  import stateController from '../utils/stateStore';

  let user;
  const unsub = stateController.subscribe((userData) => (user = userData));

  onDestroy(() => {
    if (unsub) unsub();
  });

  const tournaments = user.tournaments;

  console.log(tournaments);
</script>

<main>
  <div class="tournaments-header">
    <h1>Tournaments</h1>
  </div>
  <div class="tournaments-description">
    <p>Below is a list of your created Tournaments</p>
  </div>
</main>

<style>
  main {
    margin-left: 15%;
    margin-top: 2em;
    margin-bottom: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 70%;
    padding-top: 4em;
    padding-bottom: 3em;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  h1 {
    text-transform: uppercase;
    font-size: 2em;
  }
</style>
