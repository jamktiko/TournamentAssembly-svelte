<script>
  import { push } from "svelte-spa-router";
  import Button from "../reusable/Button.svelte";

  import stateController from "../utils/stateStore";

  import { onDestroy } from "svelte";

  let stateLocal;
  const unsub = stateController.subscribe((state) => (stateLocal = state));

  onDestroy(() => {
    if (unsub) unsub();
  });

  function loginAsGuest() {
    stateController.loginAsGuest();
    console.log(stateLocal);
    push("/selection");
  }
</script>

<main>
  <div id="container">
    <Button on:cClick={loginAsGuest}>Create new Tournament as guest</Button>
    <h2>or</h2>
    <div id="login-sign">
      <Button>Log in</Button>
      <Button>Sign up</Button>
    </div>
  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-top: 100px;
  }

  #container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 50%;
  }

  #login-sign {
    display: flex;
    flex-direction: column;
  }
</style>
