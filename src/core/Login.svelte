<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
  import Footer from '../reusable/Footer.svelte';

  import stateController from '../utils/stateStore';
  import { onDestroy } from 'svelte';
  import Loading from '../reusable/Loading.svelte';
  import LoginUser from '../reusable/LoginUser.svelte';
  import Signup from '../reusable/Signup.svelte';
  import { loadFromSession } from '../utils/lib';

  let stateLocal;
  const unsub = stateController.subscribe((state) => (stateLocal = state));

  onDestroy(() => {
    if (unsub) unsub();
  });

  function loginAsGuest() {
    stateController.loginAsGuest();
    push('/selection');
  }

  let openLogin = false;
  function toggleLogin() {
    openLogin = !openLogin;
  }

  let openSignup = false;
  function toggleSignup() {
    openSignup = !openSignup;
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
      <Button class="guest-login" on:cClick={loginAsGuest}
        >CREATE A TOURNAMENT AS GUEST</Button
      >
      <h2>OR</h2>
    </div>
    <div class="login-buttons-container">
      <Button class="login-button" on:cClick={() => toggleLogin()}
        >LOG IN</Button
      >
      <Button class="signup-button" on:cClick={() => toggleSignup()}
        >SIGN UP</Button
      >
    </div>
    <div class="login-ad">
      <p>
        By creating an account and logging in you can experience the full
        potential of Tournament Assembly by saving your custom tournaments and
        continuing them later when you choose to.
      </p>
    </div>
  </div>
</main>
<div class="spacer" />
{#if openLogin}
  <LoginUser on:closeLogin={toggleLogin} />
{/if}

{#if openSignup}
  <Signup on:closeSignup={toggleSignup} />
{/if}

<Footer />

<style>
  main {
    padding-bottom: 1em;
    margin-top: 30vh;
    margin-left: 25%;
    align-items: center;
    height: 100%;
    width: 50%;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  h1,
  h2 {
    margin-top: 0.7em;
    margin-bottom: 0.3em;
    font-size: 2em;
  }

  p {
    font-size: 0.9em;
    text-align: center;
    margin-top: 1em;
  }
  .container {
    margin: auto;
    align-items: center;
  }

  #message-container {
    font-size: x-large;
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .button-container {
    padding-top: 4em;
    padding-bottom: 1em;
    margin: auto;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .login-buttons-container {
    margin-left: 20%;
    padding-bottom: 2em;
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .login-ad {
    width: 60%;
    margin: auto;
    font-size: 1.3em;
  }
  .spacer {
    margin-bottom: 4%;
  }

  /* Tablet Portrait */
  @media only screen and (max-width: 1150px) {
    main {
      width: 75%;
      margin-left: 12.5%;
    }
    p {
      padding: 1em;
    }
    .login-buttons-container {
      margin-left: 20%;
      padding-bottom: 2em;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
