<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
  import { slide } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { scale } from 'svelte/transition';
  import { quadInOut, quintInOut, quintOut } from 'svelte/easing';
  import Loading from '../reusable/Loading.svelte';
</script>

<main transition:fade={{ duration: 700 }}>
  <div class="dev-info-header">
    <h1>Developers</h1>
    <p>
      Here you can see the entire development team. Each individual has
      contributed equally to the success of the "TOURNAMENT ASSEMBLY" porject.
    </p>
  </div>
  <ul class="information-content">
    <li class="dev-card-content" in:slide={{ delay: 700, duration: 1200 }}>
      <div class="developer-content">
        <h2>Eemi Salonen</h2>
        <h3>Product Owner, Backend, Testing</h3>
      </div>
      <img
        class="dev-pic"
        src="./images/TourAssLogoCompressed.svg"
        alt="Tournament Assembly logo"
      />
    </li>
    <li class="dev-card-content" in:slide={{ delay: 1200, duration: 1200 }}>
      <img
        class="dev-pic"
        src="./images/TourAssLogoCompressed.svg"
        alt="Tournament Assembly logo"
      />
      <div class="developer-content">
        <h2>Jani Haakana</h2>
        <h3>Scrum Master, Content Creation, UI/UX</h3>
      </div>
    </li>
    <li class="dev-card-content" in:slide={{ delay: 1700, duration: 1200 }}>
      <div class="developer-content">
        <h2>Nikolas Orava</h2>
        <h3>Frontend</h3>
      </div>
      <img
        class="dev-pic"
        src="./images/TourAssLogoCompressed.svg"
        alt="Tournament Assembly logo"
      />
    </li>
    <li class="dev-card-content" in:slide={{ delay: 2200, duration: 1200 }}>
      <img
        class="dev-pic"
        src="./images/TourAssLogoCompressed.svg"
        alt="Tournament Assembly logo"
      />
      <div class="developer-content">
        <h2>Mikko Hämäläinen</h2>
        <h3>Backend, Finance</h3>
      </div>
    </li>
    <li class="dev-card-content" in:slide={{ delay: 2700, duration: 1200 }}>
      <div class="developer-content">
        <h2>Teemu Vorho</h2>
        <h3>Content Creation, UI/UX, Finance</h3>
      </div>
      <img
        class="dev-pic"
        src="./images/TourAssLogoCompressed.svg"
        alt="Tournament Assembly logo"
      />
    </li>
  </ul>
</main>

<style>
  main {
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 1em;
    margin-left: 15%;
    margin-top: 22em;
    margin-bottom: 2em;
    height: 100%;
    width: 70%;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.308);
  }

  .dev-pic {
    width: 140px;
    padding: 0;
  }
  .dev-info-header {
    margin-top: 2em;
    margin-bottom: 1em;
    font-size: 2em;
    text-transform: uppercase;
  }

  .information-content {
    position: relative;
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .developer-content {
    display: flex;
    flex-direction: column;
    margin: 1em;
  }

  .dev-card-content {
    padding: 1em 1em;
    border: 1px solid;
    display: flex;
    flex-direction: row;
    margin: 0.5em;
    justify-content: space-between;
    transition-duration: 0.3s;
    cursor: pointer;
  }

  .information-content li:nth-child(odd) {
    text-align: left;
    background: linear-gradient(
      90deg,
      rgb(11, 11, 52) 0%,
      rgba(24, 0, 23, 0.285) 100%
    );
  }

  .information-content li:nth-child(even) {
    text-align: right;
    background: linear-gradient(
      270deg,
      rgb(11, 11, 52) 0%,
      rgba(24, 0, 23, 0.285) 100%
    );
  }

  .dev-card-content:hover {
    filter: brightness(1.2);
    filter: drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.171));
    scale: 1.03;
  }

  h2 {
    text-transform: uppercase;
    font-size: 3em;
  }

  h3 {
    font-weight: 200;
  }

  p {
    text-transform: none;
    font-size: 0.7em;
  }

  @media only screen and (max-width: 1450px) {
    .dev-card-content {
      width: 90%;
    }
  }

  @media only screen and (max-width: 500px) {
    .dev-card-content {
      width: 290px;
      scale: 1;
    }

    .information-content {
      width: 100%;
      display: flex;
      align-items: center;
    }

    .dev-pic {
      width: 60px;
    }

    main {
      margin-left: 5%;
      width: 90%;
      font-size: 0.6em;
    }
  }
</style>
