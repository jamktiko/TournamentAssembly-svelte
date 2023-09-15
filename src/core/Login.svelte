<script>
  import Header from './Header.svelte';
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';

  import stateController from '../utils/stateStore';

  import { onDestroy } from 'svelte';

  let stateLocal;
  const unsub = stateController.subscribe((state) => (stateLocal = state));

  onDestroy(() => {
    if (unsub) unsub();
  });

  function loginAsGuest() {
    stateController.loginAsGuest();
    console.log(stateLocal);
  }
</script>

<main>
  <div id="message-container">
    <h1>WELCOME</h1>
    <p>
      Tournament Assembly is the fix-it-all solution for all your needs in terms
      of tournament building.<br /> Any type, any discipline, we got it.<br />So
      go ahead and build your own tournament or league the way it's meant to be!
    </p>
  </div>
  <div id="container">
    <Button on:cClick={loginAsGuest}>CREATE A TOURNAMENT A GUEST</Button>
    <h2>OR</h2>
    <div id="login-sign">
      <Button>LOG IN</Button>
      <Button>SIGN UP</Button>
    </div>
  </div>
  <img id="background" src="./images/BackgroundBrackets.png" alt="..." />
</main>

<style>
  main {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  h1,
  h2 {
    font-size: 3em;
  }

  p {
    text-align: center;
    margin-top: 2em;
    margin-bottom: 1em;
  }
  #container {
    font-size: larger;
    margin-top: 1em;
    margin-bottom: 5em;
    padding-bottom: 5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 50%;
  }

  #message-container {
    font-size: larger;
    margin-top: 3em;
    margin-bottom: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 50%;
  }

  #login-sign {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
  }

  #background {
    transform: rotate(30deg);
    scale: 3;
    z-index: -1;
    position: absolute;
    top: 900;
    overflow: hidden;
    animation: pulse 20s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.99) rotate(1deg);
      filter: brightness(1) drop-shadow(0 0 0.1rem rgb(255, 255, 255, 0))
        blur(6px);
    }

    50% {
      transform: scale(1.05) rotate(-1deg);
      filter: brightness(1.5) drop-shadow(0 0 0.3rem rgb(255, 255, 255, 0.5))
        blur(6px);
    }

    100% {
      transform: scale(0.99) rotate(1deg);
      filter: brightness(1) drop-shadow(0 0 0.1rem rgb(255, 255, 255, 0))
        blur(6px);
    }
  }
</style>
