<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
</script>

<div class="backdrop" />

<div class="modal">
  <Button on:cClick={() => push('/')}>
    <svg
      class="closeButton"
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      ><path
        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
      /></svg
    ></Button
  >

  <div class="login-input">
    <h1>Log In</h1>
    <h2>Username</h2>
    <input placeholder="Username" />
    <h2>Password</h2>
    <input placeholder="Password" />
    <Button>Log In</Button>
  </div>
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
    padding: 1rem;
    position: fixed;
    top: 10vh;
    left: 10vw;
    width: 80%;
    max-height: 80vh;
    background: white;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }

  h1,
  h2,
  input {
    color: black;
  }

  ::placeholder {
    text-align: center;
  }

  input {
    text-align: center;
  }

  .login-input {
    align-items: center;
    display: flex;
    margin: auto;
    flex-direction: column;
  }

  .closeButton {
    fill: rgb(255, 255, 255);
  }
</style>
