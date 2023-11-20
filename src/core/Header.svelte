<script>
  import { push, location } from 'svelte-spa-router';

  function goToSelection() {
    console.log($location);
    if ($location !== '/' && $location !== '/devinfo') push('/selection');
  }
</script>

<header>
  <img
    id="logo"
    src="./images/TourAssLogo.svg"
    alt="HeaderImage, Tournament Assembly logo"
    on:click={goToSelection}
    on:keydown
  />
  <div class="light x1" />
  <div class="light x2" />
  <div class="light x3" />
  <div class="light x4" />
  <div class="light x5" />
  <div class="light x6" />
  <div class="light x7" />
  <div class="light x8" />
  <div class="light x9" />
</header>

<style>
  #logo {
    object-fit: cover;
    width: 700px;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
    transform: scale(1);
    animation: pulse 20s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.99) rotate(1deg);
      filter: brightness(1) drop-shadow(0 0 0.1rem rgb(255, 255, 255, 0));
    }

    50% {
      transform: scale(1.03) rotate(-1deg);
      filter: brightness(2.5) drop-shadow(0 0 0.3rem rgb(255, 255, 255, 0.5));
    }

    100% {
      transform: scale(0.99) rotate(1deg);
      filter: brightness(1) drop-shadow(0 0 0.1rem rgb(255, 255, 255, 0));
    }
  }
  header {
    z-index: 999;
    position: fixed;
    top: 0;
    width: 100%;
    margin: 0;
    font-weight: 100;
    -webkit-overflow-y: hidden;
    -moz-overflow-y: hidden;
    -o-overflow-y: hidden;
    overflow-y: hidden;
    -webkit-animation: fadeIn 1 1s ease-out;
    -moz-animation: fadeIn 1 1s ease-out;
    -o-animation: fadeIn 1 1s ease-out;
    animation: fadeIn 1 1s ease-out;
    height: 17%;
    background: radial-gradient(rgb(25, 6, 101) 50%, rgb(27, 7, 97) 100%);
    filter: brightness(1) contrast(1.9);
    display: flex;
    justify-content: center;
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

  /* Mobile Phone */
  @media only screen and (max-width: 500px) {
    #logo {
      width: 300px;
    }
  }
</style>
