<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
  import App from '../App.svelte';

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
    push('/selection');
  }
</script>

<main>
  <img id="background" src="./images/BackgroundBrackets.png" alt="..." />
  <div class="container">
    <div id="message-container">
      <h1>WELCOME</h1>
      <p>
        Tournament Assembly is the fix-it-all solution for all your needs in
        terms of tournament building.<br /> Any type, any discipline, we got it.<br
        />So go ahead and build your own tournament or league the way it's meant
        to be!
      </p>
    </div>
    <div class="button-container">
      <Button on:cClick={loginAsGuest}>CREATE A TOURNAMENT AS GUEST</Button>
      <h2>OR</h2>
      <Button on:cClick={() => push('/LoginUser')}>LOG IN</Button>
      <br />
      <Button on:cClick={() => push('/Signup')}>SIGN UP</Button>
    </div>
  </div>
</main>

<style>
  main {
    align-items: center;
    height: 100%;
  }

  h1,
  h2 {
    margin-top: 0.7em;
    margin-bottom: 0.3em;
    font-size: 3em;
  }

  p {
    text-align: center;
    margin-top: 2em;
    margin-bottom: 1em;
  }
  .container {
    margin: auto;
    align-items: center;
  }

  #message-container {
    font-size: x-large;
    margin-top: 2em;
    margin-bottom: 3em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .button-container {
    padding: 6em;
    scale: 1.5;
    margin: auto;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #background {
    transform: rotate(30deg);
    scale: 3;
    z-index: -1;
    position: absolute;
    left: 40%;
    top: 50%;
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
