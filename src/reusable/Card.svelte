<script>
  import { slide } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { scale } from 'svelte/transition';
  import { quadInOut, quintInOut, quintOut } from 'svelte/easing';

  export let bgheader;
</script>

<div class="card">
  <h1 class="card-image">{bgheader}</h1>
  <div class="header">
    <slot name="header" />
  </div>
  <div class="footer">
    <slot name="footer" />
  </div>
  <div class="button">
    <slot name="button" />
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    flex: 2;
    align-items: center;
    border: 1px solid #ffffff31;
    border-radius: 10px;
    padding: 2em 9em;
    margin: 0.2em;
    min-height: 20em;
    background: radial-gradient(rgb(1, 1, 50, 0.5) 0%, rgb(0, 0, 0, 0.5) 100%);
    transition-duration: 0.3s;
  }

  .card-image {
    margin-top: 0.5em;
    opacity: 0;
    filter: blur(3px);
    position: absolute;
    font-size: 7em;
    z-index: -99;
    transition-duration: 0.3s;
  }
  .card:hover .card-image {
    scale: 1.1;
    opacity: 0.2;
    filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5)) brightness(1)
      blur(6px);
  }

  .card:hover {
    scale: 1.01;
  }
  .header {
    text-align: center;
  }

  .header :global(h2) {
    font-size: 2.5em;
    margin-top: 0.1em;
    margin-bottom: 0.1em;
    font-weight: bold;
  }

  .footer {
    text-align: center;
  }

  .footer :global(p) {
    font-size: 1em;
    margin-top: 2.5em;
    margin-bottom: 0.1em;
  }
  .button :global(div) {
    min-width: max-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .button :global(button) {
    margin: 0.3em;
  }

  /* Tablet Portrait */
  @media only screen and (max-width: 1150px) {
    .card {
      padding: 2em 4em;
    }

    .card-image {
      font-size: 6em;
    }
  }
</style>
