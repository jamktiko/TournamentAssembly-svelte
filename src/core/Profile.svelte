<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';

  import stateController from '../utils/stateStore';
  import { onDestroy } from 'svelte';

  let currentUser;

  const unsub = stateController.subscribe((user) => (currentUser = user));

  onDestroy(() => {
    if (unsub) unsub();
  });
</script>

<main>
  <h1>WELCOME {currentUser.username.toUpperCase()}!</h1>
  <div class="buttons">
    <Button on:cClick={() => push('/selection')}>Create A Tournament</Button>
    <Button>My Tournaments</Button>
  </div>
</main>

<style>
  .buttons {
    display: flex;
    justify-content: space-evenly;
    padding: 5em;
  }
</style>
