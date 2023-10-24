<script>
  import { createEventDispatcher } from 'svelte';
  const dp = createEventDispatcher();
  import Button from './Button.svelte';
  import Customizer from '../core/Customizer.svelte';

  let playerList = [];

  let NewPlayer = ''; /*The text on the input*/

  /*Adds text input to the player list and empties the input*/
  function addToList() {
    playerList.push(NewPlayer);
    playerList = [...NewPlayer];
    dp('playersEvent', [NewPlayer]);
    NewPlayer = '';
  }

  /*Randomizes the list positions*/
  function randomizePlayers(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    playerList = [...playerList];
  }

  function closeList() {
    dp('playersEvent', '.');
  }

  function isValidInput(input) {
    const regex = /^[A-Za-z0-9\s]+$/; // Only allow letters, numbers, and spaces
    return regex.test(input);
  }
</script>

<div class="backdrop" />
<div class="modal">
  <div class="add-player-content">
    <h3>TYPE PLAYER NAME BELOW</h3>
    <input
      type="text"
      placeholder="Player Name"
      bind:value={NewPlayer}
      on:input={(event) => {
        if (!isValidInput(event.target.value)) {
          event.target.value = event.target.value.replace(
            /[^A-Za-z0-9\s]/g,
            ''
          ); // Remove invalid characters
          NewPlayer = event.target.value;
        }
      }}
    />
    <Button
      class="add-player-button"
      disabled={NewPlayer.length <= 0}
      on:cClick={() => addToList()}>Add player</Button
    >
    <Button class="add-player-exit-button" on:cClick={() => closeList()}
      >Exit</Button
    >
  </div>
</div>

<style>
  h3 {
    transform: uppercase;
    padding-bottom: 0.5em;
  }

  input {
    color: rgb(255, 255, 255);
    margin-bottom: 1em;
    font-size: 1.3em;
    padding: 0.25em 0.5em;
    border-radius: 20px;
    border: 1px solid #ffffff3f;
    background-color: rgba(0, 0, 0, 0.208);
    color: #ffffff;
    text-align: center;
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
    position: absolute;
    top: 26%;
    color: #ffffff;
    padding: 1em 3em;
    background: linear-gradient(129deg, rgb(5, 5, 40) 0%, rgb(15, 11, 40) 100%);
    border-radius: 40px;
    z-index: 100;
    border: solid 1px #ffffff3f;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }

  .add-player-content {
    align-items: center;
    display: flex;
    margin: auto;
    flex-direction: column;
    justify-content: space-around;
  }
</style>
