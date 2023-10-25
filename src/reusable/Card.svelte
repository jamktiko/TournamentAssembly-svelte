<script>
  import { slide } from "svelte/transition";
  import { fade } from "svelte/transition";
  import { scale } from "svelte/transition";
  import { quadInOut, quintInOut, quintOut } from "svelte/easing";
</script>

<div class="card">
  <img
    class="card-image"
    src="./images/TourAssLogoCompressed.svg"
    alt="..."
    in:fade={{ duration: 500, delay: 1500, easing: quadInOut }}
  />
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
    opacity: 0.1;
    filter: blur(3px);
    position: absolute;
    width: 400px;
    z-index: -1;
    transition-duration: 0.3s;
  }
  .card:hover {
    filter: brightness(1);
    filter: drop-shadow(0px 0px 6px rgba(101, 66, 255, 0.111));
    scale: 1.03;
  }

  .card-image:hover {
    scale: 1.1;
    opacity: 0.1;
    filter: blur(3px);
    width: 400px;
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
</style>
