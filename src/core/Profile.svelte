<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';

  import stateController from '../utils/stateStore';
  import { onDestroy } from 'svelte';

  import { loadFromSession } from '../utils/lib';

  let user;

  const unsub = stateController.subscribe((userData) => (user = userData));

  if (!user.username && window.sessionStorage.getItem('user')) {
    user = loadFromSession('user');
    stateController.set(user);
  }

  onDestroy(() => {
    if (unsub) unsub();
  });
</script>

<main>
  <div class="profile-header">
    <h1>
      WELCOME {user.username ? user.username.toUpperCase() : ''}!
    </h1>
  </div>
  <div class="profile-description">
    <p>
      Choose below if you want to create a new Tournament & Scoreboard or if you
      want view your previously created Tournaments & Scoreboards
    </p>
  </div>
  <div class="buttons">
    <Button class="login-button" on:cClick={() => push('/selection')}
      >Create A Tournament</Button
    >
    <Button class="signup-button" on:cClick={() => push('/tournaments')}
      >My Tournaments</Button
    >
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

  .profile-description {
    text-align: center;
  }

  .buttons {
    display: flex;
    justify-content: space-evenly;
    margin: 1em;
  }

  /* Tablet Portrait */
  @media only screen and (max-width: 1450px) {
    main {
      scale: 0.9;
      margin-left: 12.5%;
      height: 100%;
      width: 70%;
      padding-top: 4em;
      padding-bottom: 3em;
      padding-left: 1em;
      padding-right: 1em;
    }
  }
</style>
