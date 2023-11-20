<script>
  export let bgheader;
  export let minplayers;
  export let recomplayers;
</script>

<div class="card">
  <h1 class="card-image">{bgheader}</h1>
  <div class="header">
    <slot name="header" />
  </div>
  <div class="footer">
    <slot name="footer" />
  </div>
  <div class="card-overlay">
    <div class="overlay-left">
      <div class="left-content">
        <svg
          class="player-count"
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 -960 960 960"
          width="48"
          ><path
            d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z"
          /></svg
        >
        <h3 class="participants">PARTICIPANTS</h3>
      </div>
    </div>
    <h1 class="separator">|</h1>
    <div class="overlay-right">
      <h2 class="player-min">{minplayers}</h2>
      <h2 class="player-min">{recomplayers}</h2>
    </div>
  </div>
  <div class="button">
    <slot name="button" />
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex: 2;
    align-items: center;
    border: 1px solid #ffffff31;
    border-radius: 10px;
    padding: 2em 9em;
    margin: 0.2em;
    min-height: 25em;
    min-width: 20em;
    background: radial-gradient(rgb(1, 1, 50, 0.5) 0%, rgb(0, 0, 0, 0.5) 100%);
    transition-duration: 0.3s;
  }

  .player-min {
    margin-bottom: 0;
    text-transform: uppercase;
    font-size: 1.2em;
    color: #7396ff;
  }

  .card-overlay {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    column-gap: 0.9em;
    margin-top: 0.3em;
    align-items: center;
    text-align: left;
    transition-duration: 0.2s;
  }

  .separator {
    font-size: 3.5em;
    margin: 0%;
    text-align: center;
  }
  .player-count {
    margin: 0;
    fill: #fff;
  }

  .left-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .participants {
    margin-top: -0.5em;
  }
  .card-image {
    margin-top: 0.5em;
    opacity: 0;
    filter: blur(3px);
    position: absolute;
    font-size: 7.6em;
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
    margin-top: 0.3em;
    margin-bottom: 0.1em;
    font-weight: bold;
  }

  .footer {
    text-align: center;
    transition-duration: 0.2s;
  }

  .footer :global(p) {
    font-size: 1.2em;
    margin-top: 1em;
    margin-bottom: 0.9em;
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
  @media only screen and (max-width: 1450px) {
    .card {
      padding: 2em 4em;
    }

    .card-image {
      font-size: 6em;
    }
  }

  /* Tablet Landscape */
  @media only screen and (max-height: 768px) {
    .card-image {
      margin-top: 1em;
      font-size: 4em;
    }
  }

  /* Mobile Phone */
  @media only screen and (max-width: 500px) {
    .card {
      padding: auto;
      min-height: 0em;
      min-width: 0em;
    }

    .header :global(h2) {
      font-size: 2.5em;
      margin-top: 0em;
      margin-bottom: 0em;
    }

    .button :global(div) {
      margin-top: 0em;
      margin-bottom: 0em;
    }

    .player-min {
      font-size: 1.2em;
    }

    .card-image {
      font-size: 3.5em;
    }
  }
</style>
