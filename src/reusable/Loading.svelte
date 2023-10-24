<script>
</script>

<div class="loading-icon">
  <h1>Loading</h1>
  <span />
</div>

<style>
  .loading-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background: transparent;
    border: 3px solid #ffffff50;
    border-radius: 50%;
    text-align: center;
    line-height: 150px;
    font-size: 1.7em;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0px;
    text-transform: uppercase;
    filter: drop-shadow(0 0 20px rgba(0, 17, 143, 0.13));
    text-shadow: 0 0 10px rgb(95, 135, 255);
    box-shadow: 0 0 40px rgb(95, 135, 255);
  }
  .loading-icon:before {
    content: '';
    position: absolute;
    top: -2.5px;
    left: -2px;
    width: 101%;
    height: 101%;
    border-top: 4px solid rgb(95, 135, 255);
    border-right: 4px solid rgb(95, 135, 255);
    border-radius: 50%;
    filter: drop-shadow(0 0 20px rgba(53, 76, 255, 0.13));
    animation: animateC 1.5s ease-in-out infinite;
  }
  span {
    display: block;
    position: absolute;
    top: calc(50% - 2px);
    left: 50%;
    width: 50%;
    height: 4px;
    background: transparent;
    transform-origin: left;
    animation: animate 1.5s ease-in-out infinite;
  }
  span:before {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    border-radius: 50%;
    background: rgb(50, 22, 255);
    top: -4px;
    right: -7px;
    box-shadow: 0 0 20px rgb(59, 48, 255);
  }
  @keyframes animateC {
    0% {
      filter: brightness(0.9);
      transform: rotate(0deg);
    }
    50% {
      filter: brightness(1.8);
    }

    100% {
      filter: brightness(0.9);
      transform: rotate(360deg);
    }
  }
  @keyframes animate {
    0% {
      transform: rotate(45deg);
      filter: brightness(1);
    }

    50% {
      filter: brightness(1.8);
    }
    100% {
      transform: rotate(405deg);
      filter: brightness(1);
    }
  }

  h1 {
    font-weight: 500;
    font-size: 1.1em;
    scale: 1;
    animation: animateS 3s ease-in-out infinite;
  }

  @keyframes animateS {
    0% {
      scale: 1;
      filter: brightness(0.8);
    }
    50% {
      scale: 1.05;
      filter: brightness(1.8);
    }
    100% {
      scale: 1;
      filter: brightness(0.8);
    }
  }
</style>
