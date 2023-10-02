<script>
  import { pop } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
</script>

<div class="backdrop" />

<div class="modal">
  <div class="winner-content">
    <p1>Winner is INSERT NAME HERE</p1>

    <Button on:cClick={pop}>Close</Button>
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
</style>
