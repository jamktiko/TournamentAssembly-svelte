<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
</script>

<div class="backdrop" />

<div class="modal">
  <div class="closeButton">
    <Button on:cClick={() => push('/')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
        ><path
          d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
        /></svg
      ></Button
    >
  </div>
  <div class="login-input">
    <h1>LOG IN</h1>
    <h2>USERNAME</h2>
    <input placeholder="Username" />
    <h2>PASSWORD</h2>
    <input placeholder="Password" />
    <Button>LOG IN</Button>
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
    margin: auto;
    display: flex;
    color: #ffffff;
    padding: 1rem;
    position: relative;
    width: 50%;
    max-height: 80vh;
    background: linear-gradient(
      129deg,
      rgb(11, 11, 52) 0%,
      rgba(24, 0, 23, 0.285) 100%
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
    background-color: rgb(21, 21, 21);
    color: #ffffff;
    text-align: center;
  }

  .login-input {
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
</style>
