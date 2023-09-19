<script>
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
    push('/selection');
  }
</script>

<main>
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
    padding-bottom: 3em;
    margin: auto;
    align-items: center;
    height: 100%;
    width: 60%;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.308);
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
</style>
