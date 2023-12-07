<script>
  import { pop, push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
  import { createEventDispatcher } from 'svelte';
  const dp = createEventDispatcher();

  export let config;
  export let winner;
  let close = 1;

  function closewinnerwindow() {
    dp('closeevent');
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="backdrop" on:click={closewinnerwindow} />

<div id="container">
  <div class="modal">
    <div class="winner-content">
      <h1 class="tournament-name">{config.tournamentName}</h1>
      <h2>Winner</h2>
      <h1 class="winner-name">{winner.name}</h1>
      <div id="winner-button-container">
        <Button class="winner-buttons" on:cClick={() => push('/selection')}
          >Back to main menu</Button
        >
        <Button class="winner-buttons" on:cClick={closewinnerwindow}
          >Close</Button
        >
      </div>
    </div>
    <div class="light x1" />
    <div class="light x2" />
    <div class="light x3" />
    <div class="light x4" />
    <div class="light x5" />
    <div class="light x6" />
    <div class="light x7" />
    <div class="light x8" />
    <div class="light x9" />
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
    justify-content: center;
    color: #ffffff;
    position: relative;
    top: -40%;
    width: 50%;
    height: 60vh;
    background: radial-gradient(rgb(25, 6, 101) 50%, rgb(13, 0, 58) 100%);
    filter: brightness(1) contrast(1.1);
    border-radius: 40px;
    z-index: 100;
    border: solid 1px #ffffff41;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    -webkit-overflow-y: hidden;
    -moz-overflow-y: hidden;
    -o-overflow-y: hidden;
    overflow-y: hidden;
    -webkit-animation: fadeIn 1 1s ease-out;
    -moz-animation: fadeIn 1 1s ease-out;
    -o-animation: fadeIn 1 1s ease-out;
    animation: fadeIn 1 1s ease-out;
  }

  .light {
    position: absolute;
    width: 0px;
    opacity: 0.75;
    background-color: white;
    box-shadow: #e9f1f1 0px 0px 20px 2px;
    opacity: 0;
    top: 100vh;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
  }

  .x1 {
    -webkit-animation: floatUp 4s infinite linear;
    -moz-animation: floatUp 4s infinite linear;
    -o-animation: floatUp 4s infinite linear;
    animation: floatUp 4s infinite linear;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }

  .x2 {
    -webkit-animation: floatUp 7s infinite linear;
    -moz-animation: floatUp 7s infinite linear;
    -o-animation: floatUp 7s infinite linear;
    animation: floatUp 7s infinite linear;
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
    left: 15%;
  }

  .x3 {
    -webkit-animation: floatUp 2.5s infinite linear;
    -moz-animation: floatUp 2.5s infinite linear;
    -o-animation: floatUp 2.5s infinite linear;
    animation: floatUp 2.5s infinite linear;
    -webkit-transform: scale(0.5);
    -moz-transform: scale(0.5);
    -o-transform: scale(0.5);
    transform: scale(0.5);
    left: -15%;
  }

  .x4 {
    -webkit-animation: floatUp 4.5s infinite linear;
    -moz-animation: floatUp 4.5s infinite linear;
    -o-animation: floatUp 4.5s infinite linear;
    animation: floatUp 4.5s infinite linear;
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -o-transform: scale(1.2);
    transform: scale(1.2);
    left: 34%;
  }

  .x5 {
    -webkit-animation: floatUp 8s infinite linear;
    -moz-animation: floatUp 8s infinite linear;
    -o-animation: floatUp 8s infinite linear;
    animation: floatUp 8s infinite linear;
    -webkit-transform: scale(1.6);
    -moz-transform: scale(1.6);
    -o-transform: scale(1.6);
    transform: scale(1.6);
    left: 57%;
  }

  .x6 {
    -webkit-animation: floatUp 3s infinite linear;
    -moz-animation: floatUp 3s infinite linear;
    -o-animation: floatUp 3s infinite linear;
    animation: floatUp 3s infinite linear;
    -webkit-transform: scale(0.8);
    -moz-transform: scale(0.8);
    -o-transform: scale(0.8);
    transform: scale(0.8);
    left: -91%;
  }

  @-webkit-keyframes floatUp {
    0% {
      top: 100vh;
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    50% {
      top: 0vh;
      opacity: 0.8;
    }
    75% {
      opacity: 1;
    }
    100% {
      top: -100vh;
      opacity: 0;
    }
  }
  @-moz-keyframes floatUp {
    0% {
      top: 100vh;
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    50% {
      top: 0vh;
      opacity: 0.8;
    }
    75% {
      opacity: 1;
    }
    100% {
      top: -100vh;
      opacity: 0;
    }
  }
  @-o-keyframes floatUp {
    0% {
      top: 100vh;
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    50% {
      top: 0vh;
      opacity: 0.8;
    }
    75% {
      opacity: 1;
    }
    100% {
      top: -100vh;
      opacity: 0;
    }
  }
  @keyframes floatUp {
    0% {
      top: 100vh;
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    50% {
      top: 0vh;
      opacity: 0.8;
    }
    75% {
      opacity: 1;
    }
    100% {
      top: -100vh;
      opacity: 0;
    }
  }

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-moz-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-o-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeOut {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    80% {
      opacity: 0.9;
    }
    100% {
      opacity: 0;
    }
  }

  @-moz-keyframes fadeOut {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    80% {
      opacity: 0.9;
    }
    100% {
      opacity: 0;
    }
  }

  @-o-keyframes fadeOut {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    80% {
      opacity: 0.9;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    80% {
      opacity: 0.9;
    }
    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes finalFade {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    80% {
      opacity: 0.9;
    }
    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes finalFade {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    80% {
      opacity: 0.9;
    }
    100% {
      opacity: 1;
    }
  }

  @-o-keyframes finalFade {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    80% {
      opacity: 0.9;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes finalFade {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    80% {
      opacity: 0.9;
    }
    100% {
      opacity: 1;
    }
  }

  .winner-content {
    align-items: center;
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: space-around;
  }

  .tournament-name {
    font-size: 3em;
    text-align: center;
  }

  .winner-name {
    font-size: 5em;
    animation:
      4s anim-lineUp ease-out,
      pulse 5s infinite;
  }
  @keyframes anim-lineUp {
    0% {
      opacity: 0;
      transform: translateY(80%);
    }
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
      transform: translateY(0%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @keyframes pulse {
    0% {
      filter: brightness(1) drop-shadow(0 0 30px rgb(255, 255, 255));
    }
    50% {
      filter: brightness(2.5) drop-shadow(0 0 30px rgb(99, 115, 255));
    }
    100% {
      filter: brightness(1) drop-shadow(0 0 30px rgb(255, 255, 255));
    }
  }
  #winner-button-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  /* Tablet Portrait */
  @media only screen and (max-width: 1450px) {
    .modal {
      top: -55vh;
      width: 55%;
      height: 42.5vh;
    }
  }

  /* Mobile Phone */
  @media only screen and (max-width: 500px) {
    .modal {
      top: -65vh;
      width: 90%;
      height: 50vh;
    }

    .winner-name {
      font-size: 3em;
    }
  }
</style>
