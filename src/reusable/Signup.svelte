<script>
  import { push } from "svelte-spa-router";
  import Button from "../reusable/Button.svelte";
  import stateController from "../utils/stateStore";
  import { scale } from "svelte/transition";
  import { bounceInOut, quadInOut, quintOut } from "svelte/easing";
  import { createEventDispatcher } from "svelte";

  let username = "";
  let password = "";

  let invalidRegister = false;
  let errorMsg = "";

  async function register() {
    const user = {
      username: username,
      password: password,
      tournaments: [],
    };
    const res = await stateController.register(user);

    if (res.success) {
      const loginUser = { username: user.username, password: user.password };
      await stateController.login(loginUser);

      push("/profile");
    } else {
      invalidRegister = true;
      errorMsg = res.msg;

      setTimeout(() => {
        invalidRegister = false;
      }, 2000);
    }
  }

  const dispatch = createEventDispatcher();
  function closeSignup() {
    dispatch("closeSignup");
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="backdrop" on:click={closeSignup} />

<div
  class="modal"
  transition:scale={{
    duration: 400,
    opacity: 0.5,
    start: 0.0,
    easing: quadInOut,
  }}
>
  <div class="closeButton">
    <Button on:cClick={closeSignup}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        viewBox="0 -960 960 960"
        width="48"
        ><path
          d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
        /></svg
      ></Button
    >
  </div>

  <div class="signup-input">
    <h1>SIGN UP</h1>
    <h2>USERNAME</h2>
    <input
      type="username"
      id="username"
      placeholder="Username"
      bind:value={username}
    />
    <h2>PASSWORD</h2>
    <input
      type="password"
      id="password"
      placeholder="Password"
      bind:value={password}
    />
    <Button on:cClick={register}>SIGN UP</Button>
  </div>
  {#if invalidRegister}
    <p>Username already taken!</p>
  {/if}
</div>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }

  .modal {
    margin-left: 24.1%;
    display: flex;
    color: #ffffff;
    padding: 1rem;
    position: relative;
    margin-top: -40em;
    width: 50%;
    max-height: 80vh;
    background: linear-gradient(
      129deg,
      rgb(4, 4, 27) 0%,
      rgba(10, 3, 47, 0.856) 100%
    );
    border-radius: 40px;
    z-index: 100;
    border: solid 1px #ffffff3f;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }

  h1 {
    margin-bottom: 1em;
    font-size: 3em;
  }
  h2 {
    font-size: 2em;
    margin-bottom: 0.2em;
    color: rgb(255, 255, 255);
  }

  ::placeholder {
    text-align: center;
  }

  input {
    color: rgb(255, 255, 255);
    margin-bottom: 1em;
    font-size: 1.3em;
    padding: 0.5em 2em;
    border-radius: 20px;
    border: 1px solid #ffffff3f;
    background-color: rgba(0, 0, 0, 0.208);
    color: #ffffff;
    text-align: center;
  }

  .signup-input {
    padding-bottom: 2em;
    align-items: center;
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: space-around;
  }

  .closeButton {
    scale: 0.6;
    position: absolute;
    top: 0;
    fill: rgb(255, 255, 255);
  }

  /* Tablet Portrait */
  @media only screen and (max-width: 1450px) {
    .modal {
      margin-top: -52.5em;
    }
  }
</style>
