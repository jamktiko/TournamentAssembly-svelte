<script>
</script>

<header>
  <img id="logo" src="./images/TourAssLogo.png" alt="..." />
</header>

<style>
  #logo {
    margin-top: 5em;
    margin-bottom: 5em;
    width: 1000px;
    border-radius: 50%;

    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
    transform: scale(1);
    animation: pulse 5s infinite;
    max-width: 100%;
    max-height: 20%;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.99) rotate(1deg);
      filter: brightness(1) drop-shadow(0 0 0.1rem rgb(255, 255, 255, 0));
    }

    50% {
      transform: scale(1.05) rotate(-1deg);
      filter: brightness(2.5) drop-shadow(0 0 0.3rem rgb(255, 255, 255, 0.5));
    }

    100% {
      transform: scale(0.99) rotate(1deg);
      filter: brightness(1) drop-shadow(0 0 0.1rem rgb(255, 255, 255, 0));
    }
  }
  header {
    background: rgb(17, 17, 65);
    background: linear-gradient(
      129deg,
      rgb(26, 7, 87) 50%,
      rgb(68, 1, 58) 100%
    );
    filter: brightness(1) contrast(1.9);
    border-bottom: solid 1px #ffffff;
    display: flex;
    justify-content: center;

  }
</style>
