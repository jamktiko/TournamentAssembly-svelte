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
    border: solid 1px #ffffff77;
    border-radius: 40px;
    background: linear-gradient(
      129deg,
      rgba(19, 19, 102, 0.5) 0%,
      rgba(14, 5, 34, 0.5) 100%
    );
    color: whitesmoke;
    transition-duration: 0.1s;
    cursor: pointer;
  }

  button:active {
    color: #444444;
  }

  button:hover {
    color: rgb(184, 183, 255);
    border: solid 1px #23219b;
    filter: brightness(1.2);
    filter: contrast(1.1);
  }

  .login-button2 {
    margin: 0.3em;
  }
  .login-button {
    margin: 0.3em;
    border: solid 1px #7396ff;
    border-radius: 40px;
    background: linear-gradient(
      129deg,
      rgba(0, 0, 0, 0.227) 0%,
      rgba(14, 5, 34, 0.5) 100%
    );
    color: #7396ff;
    transition-duration: 0.1s;
    cursor: pointer;
  }

  .login-button:hover {
    border: solid 1px #7396ff;
    filter: brightness(1.2);
    filter: contrast(1.4);
  }
  .continue-button {
    border: solid 1px #7396ff;
    border-radius: 40px;
    background: linear-gradient(
      129deg,
      rgba(0, 0, 0, 0.227) 0%,
      rgba(14, 5, 34, 0.5) 100%
    );
    color: #7396ff;
    transition-duration: 0.1s;
    cursor: pointer;
  }

  .continue-button:hover {
    border: solid 1px #7396ff;
    filter: brightness(1.2);
    filter: contrast(1.4);
  }

  .footer-button {
    position: relative;
    text-transform: uppercase;
    background: transparent;
    border: transparent;
    transition-duration: 0.2s;
  }

  .footer-button:hover {
    border: none;
    filter: brightness(1.2);
    filter: drop-shadow(0px 0px 10px rgb(255, 255, 255, 0.3));
  }

  .adjust-button {
    scale: 0.9;
    font-size: 1.1em;
    padding: 0.3em 1em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
  }

  .adjust-button-league {
    scale: 1;
    font-size: 1.1em;
    padding: 0.3em 1em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
  }

  .adjust-button-league-close {
    scale: 1;
    font-size: 1.1em;
    padding: 0.3em 1em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
    background: linear-gradient(
      270deg,
      rgba(167, 0, 0, 0.4) 0%,
      rgba(14, 5, 34, 0.5) 100%
    );
  }
  .adjust-button-league-close:hover {
    border: solid 1px #5d0f0f;
    color: rgb(255, 91, 91);
  }
  .add-player-exit-button:hover {
    border: solid 1px #5d0f0f;
    color: rgb(255, 91, 91);
  }
  .group-adjust-button {
    text-align: center;
    width: 7em;
    scale: 0.9;
    font-size: 1em;
    padding: 0.3em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
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

  .cancel-match-button {
    scale: 1.4;
    font-size: 1.1em;
    padding: 0.05em 1em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
    margin: 1em;
    background: linear-gradient(
      180deg,
      rgba(167, 0, 0, 0.4) 0%,
      rgba(14, 5, 34, 0.5) 100%
    );
  }

  .cancel-match-button:hover {
    border: solid 1px #5d0f0f;
    color: rgb(255, 91, 91);
  }

  .add-team-button {
    scale: 0.9;
    font-size: 1.1em;
    padding: 0.3em 1em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
  }

  .delete-team-button {
    scale: 0.9;
    font-size: 1.1em;
    padding: 0.3em 1em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
    background: linear-gradient(
      270deg,
      rgba(167, 0, 0, 0.4) 0%,
      rgba(14, 5, 34, 0.5) 100%
    );
  }

  .delete-team-button:hover {
    border: solid 1px #5d0f0f;
    color: rgb(255, 91, 91);
  }

  .back-button {
    padding-left: 2.2em;
    display: flex;
    flex-direction: row;
    text-transform: uppercase;
    scale: 1;
    border-radius: 10px;
    position: absolute;
    margin: 0.5em;
    transition-duration: 0.1s;
  }

  .match-add-button {
    text-transform: uppercase;
    scale: 0.8;
    border-radius: 40px;
    transition-duration: 0.1s;
  }

  .revert-button {
    font-size: 1.4em;
    position: absolute;
    text-transform: uppercase;
    scale: 0.5;
    border-radius: 10px;
    transition-duration: 0.1s;
    top: -100%;
    left: 18%;
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
    transition-duration: 0.1s;
  }

  .remove-player-button {
    scale: 0.5;
    font-size: 1.3em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
    background: linear-gradient(
      270deg,
      rgba(167, 0, 0, 0.4) 0%,
      rgba(14, 5, 34, 0.5) 100%
    );
  }

  .remove-player-button:hover {
    border: solid 1px #5d0f0f;
    color: rgb(255, 91, 91);
  }

  /* Playerlist button */
  .add-player-button {
    scale: 1;
    font-size: 1.1em;
    padding: 0.05em 1em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
    margin: 0.25em;
  }

  .add-player-button:active {
    color: whitesmoke;
  }

  .add-player-button:disabled {
    cursor: default;
  }

  .add-player-exit-button {
    scale: 1;
    font-size: 1.1em;
    padding: 0.05em 1em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
    margin: 0.25em;
    background: linear-gradient(
      0deg,
      rgba(167, 0, 0, 0.4) 0%,
      rgba(14, 5, 34, 0.5) 100%
    );
  }

  .add-player-exit-button:hover {
    border: solid 1px #5d0f0f;
    color: rgb(255, 91, 91);
  }

  /* Playoffs playerlist expand button */
  .expand-button {
    scale: 1;
    font-size: 1.1em;
    padding: 0.05em 1em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
    margin: 0.25em;
  }

  /* Winner.svelte buttons */
  .winner-buttons {
    margin-top: 0.2em;
    filter: brightness(1.4) contrast(0.9);
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.5em;
    padding: 0.5em 1.5em;
    border-radius: 40px;
    color: whitesmoke;
    transition-duration: 0.1s;
    cursor: pointer;
  }

  .winner.buttons:active {
    color: #444444;
  }

  .resolve-button {
    width: auto;
    margin: 0em 0.2em;
    border-radius: 10px;
  }

  /* Customizer Playoffs Buttons */
  .playoffs-buttons {
    font-size: 1.1em;
    padding: 0.25em 2.2em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
    margin: 0.25em;
  }

  .playoffs-buttons:active {
    color: whitesmoke;
  }

  .playoffs-buttons:disabled {
    cursor: default;
  }

  /* Scoreboard Buttons */
  .add-button {
    font-size: 1.7em;
    padding: 0.25em 2.2em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
    margin: 0.25em;
  }

  .delete-round-button {
    font-size: 1.1em;
    padding: 0.25em 0.75em;
    border-radius: 10px;
    text-transform: uppercase;
    margin: 0.25em;
    background: linear-gradient(
      180deg,
      rgba(167, 0, 0, 0.4) 0%,
      rgba(14, 5, 34, 0.5) 100%
    );
  }

  .delete-round-button:hover {
    border: solid 1px #5d0f0f;
    color: rgb(255, 91, 91);
  }

  .delete-player-button {
    font-size: 1.1em;
    padding: 0.25em 0.75em;
    border-radius: 10px;
    text-transform: uppercase;
    margin: 0.25em;
    background: linear-gradient(
      90deg,
      rgba(167, 0, 0, 0.4) 0%,
      rgba(14, 5, 34, 0.5) 100%
    );
  }

  .delete-player-button:hover {
    border: solid 1px #5d0f0f;
    color: rgb(255, 91, 91);
  }

  .league-resolve-button {
    font-size: 1.3em;
    padding: 0.25em 2.2em;
    border: solid 1px #7396ff;
    border-radius: 10px;
    background: linear-gradient(
      180deg,
      #7396ff6b 0%,
      rgba(14, 5, 34, 0.5) 100%
    );
    color: #fff;
    transition-duration: 0.1s;
    cursor: pointer;
    transition-duration: 0.1s;
    margin-top: 0.5em;
    margin-bottom: 2em;
  }

  .league-resolve-button:hover {
    border: solid 1px #7396ff;
    filter: brightness(1.2);
    filter: contrast(1.4);
  }

  .league-resolve-button:active {
    color: whitesmoke;
  }

  .league-resolve-button:disabled {
    cursor: default;
  }

  .profile-button {
    padding-left: 2.2em;
    display: flex;
    flex-direction: row;
    text-transform: uppercase;
    scale: 1;
    border-radius: 10px;
    position: absolute;
    margin: 0.5em;
    transition-duration: 0.1s;
    right: 0;
  }

  .finish-button {
    margin: 0em 0.2em;
    border: solid 1px #7396ff;
    border-radius: 10px;
    background: linear-gradient(
      180deg,
      #7396ff6b 0%,
      rgba(14, 5, 34, 0.5) 100%
    );
    color: #fff;
    transition-duration: 0.1s;
    cursor: pointer;
  }

  .finish-button:hover {
    border: solid 1px #7396ff;
    filter: brightness(1.2);
    filter: contrast(1.4);
  }

  .schedule-create-button {
    margin: 0em 0.2em;
    border: solid 1px #7396ff;
    border-radius: 10px;
    background: linear-gradient(
      129deg,
      rgba(0, 0, 0, 0.227) 0%,
      rgba(14, 5, 34, 0.5) 100%
    );
    color: #7396ff;
    transition-duration: 0.1s;
    cursor: pointer;
  }

  .schedule-create-button:hover {
    border: solid 1px #7396ff;
    filter: brightness(1.2);
    filter: contrast(1.4);
  }

  /* Show playerlist Button */
  .show-playerlist-button {
    font-size: 1.1em;
    padding: 0.25em 1em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
    margin: 0.25em;
  }

  .show-playerlist-button2 {
    scale: 1;
    font-size: 1.1em;
    padding: 0.05em 1em;
    border-radius: 10px;
    text-transform: uppercase;
    transition-duration: 0.1s;
    margin: 0.25em;
  }

  @media only screen and (max-width: 1150px) {
    /* Sitewide Back Button */
    .back-button {
      scale: 0.9;
      margin: 0em;
      margin-top: 0.25em;
    }

    /* Groups Resolve Buttons */
    .finish-button {
      scale: 0.9;
      margin: 0em 0.2em;
    }

    .schedule-create-button {
      scale: 0.9;
      margin: 0em 0.2em;
    }

    .resolve-button {
      scale: 0.9;
      width: auto;
      margin: 0em 0.2em;
    }

    /* Match Schedule Buttons */
    .cancel-match-button {
      scale: 1.5;
    }

    .group-adjust-button {
      scale: 1.4;
    }

    .add-player-exit-button {
      scale: 1.5;
    }

    /* Match Scoring Buttons */
    .cancel-match-button {
      scale: 1.5;
    }

    .league-plus-minus-button {
      scale: 1.5;
    }

    /* Playerlist Buttons */
    .show-playerlist-button {
      background: #060048;
    }
  }
</style>
