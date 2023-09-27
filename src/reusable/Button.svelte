<script>
  import { createEventDispatcher } from 'svelte';

  export let disabled;

  const dp = createEventDispatcher();

  const customBtnClick = () => dp('cClick');

  let buttonProps = {
    class: [$$restProps.class],
  };
</script>

<button {disabled} on:click={customBtnClick} {...buttonProps}>
  <slot />
</button>

<style>
  button:disabled {
    opacity: 0.5;
  }
  button {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.5em;
    padding: 0.5em 1.5em;
    border: solid 1px #ffffff3c;
    border-radius: 40px;
    background: linear-gradient(
      129deg,
      rgb(11, 11, 52) 0%,
      rgb(34, 5, 32) 100%
    );
    color: whitesmoke;
    transition-duration: 0.1s;
    cursor: pointer;
  }

  button:active {
    scale: 0.95;
    color: #444444;
  }

  button:hover {
    border: solid 2px #46002b;
    filter: brightness(1.2);
    filter: contrast(1.1);
    scale: 1.1;
  }

  .footer-button {
    text-transform: uppercase;
    background: transparent;
    border: transparent;
  }

  .adjust-button {
    scale: 0.9;
    font-size: 1.1em;
    padding: 0.3em 1em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
  }

  .adjust-button:hover {
    scale: 0.9;
  }

  .league-plus-minus-button {
    scale: 1.4;
    font-size: 1.1em;
    padding: 0.05em 1em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
    margin: 1em;
  }

  .league-plus-minus-button:hover {
    scale: 1.4;
  }

  .add-team-button {
    scale: 0.9;
    font-size: 1.1em;
    padding: 0.3em 1em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
  }

  .add-team-button:hover {
    border: 1px solid #290014;
    scale: 0.9;
  }

  .back-button {
    text-transform: uppercase;
    scale: 0.7;
    border-radius: 10px;
    border: solid 1px #ffffff3c;
    position: absolute;
    top: 5.8em;
    left: 0.5em;
    transition-duration: 0.1s;
  }

  .back-button:hover {
    scale: 0.8;
  }

  .back-button2 {
    text-transform: uppercase;
    scale: 1.07;
    border-radius: 10px;
    border: solid 1px #ffffff3c;
    position: absolute;
    top: 9.2em;
    left: 2em;
    transition-duration: 0.1s;
  }

  .back-button2:hover {
    scale: 1.17;
  }

  .match-add-button {
    text-transform: uppercase;
    scale: 0.8;
    border-radius: 40px;
    border: solid 1px #ffffff3c;
    transition-duration: 0.1s;
  }

  .match-add-button:hover {
    scale: 0.9;
  }

  .revert-button {
    font-size: 1.4em;
    position: absolute;
    text-transform: uppercase;
    scale: 0.5;
    border-radius: 10px;
    border: solid 1px #ffffff3c;
    transition-duration: 0.1s;
    top: -100%;
    left: 18%;
  }

  .revert-button:hover {
    scale: 0.5;
  }

  .error-button {
    padding: 0.5em 1.25em;
    border-radius: 10px;
  }

  .results-toggle-button {
    padding: 0;
    text-transform: uppercase;
    width: 9em;
    border-radius: 40px;
    border: solid 1px #ffffff3c;
    transition-duration: 0.1s;
  }

  .results-toggle-button:hover {
    scale: 1.1;
  }
  .x-button {
    scale: 0.5;
    padding-top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .x-button:hover {
    scale: 0.5;
    padding-top: 0;
    padding-bottom: 0;
    margin: 0;
  }
</style>
