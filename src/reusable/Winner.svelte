<script>
  import { pop } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';

  export let winner;
</script>

<div class="backdrop" />

<div id="container">
  <div class="modal">
    <div class="winner-content">
      <div class="winner-text">
        <h1>Winner</h1>
        <h1>is</h1>
        <h1 class="winner-name">{winner.name}</h1>
      </div>
      <div>
        <Button on:cClick={pop}>Back to Settings</Button>
      </div>
    </div>
  </div>
</div>

<style>
  h1 {
    text-transform: uppercase;
    font-size: 2em;
  }

  #container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

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

  .winner-content {
    align-items: center;
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: space-around;
  }

  .winner-text {
    text-align: center;
    padding-bottom: 1em;
  }

  .winner-name {
    font-size: 3em;
    -webkit-text-stroke: 1px rgba(0, 0, 0);
    animation: pulsate 2s infinite alternate;
  }

  @keyframes pulsate {
    0% {
      /* Smaller blur radius */
      text-shadow: 0 0 5px #66ff44, 0 0 10px #66ff44, 0 0 15px #66ff44,
        0 0 20px #66ff44, 0 0 25px #66ff44;
    }
    100% {
      /* Larger blur radius */
      text-shadow: 0 0 20px #66ff44, 0 0 22.5px #66ff44, 0 0 25px #66ff44,
        0 0 27.5px #66ff44, 0 0 30px #66ff44;
    }
  }
</style>
