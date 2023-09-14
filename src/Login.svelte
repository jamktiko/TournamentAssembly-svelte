<script>
  import Button from "./Button.svelte";
</script>

<main>
  <div id="container">
    <Button>Create new Tournament as guest</Button>
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
