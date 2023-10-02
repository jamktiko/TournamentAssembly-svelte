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
    playerList = [...playerList];
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

  function pushList() {
    dp('playersEvent', playerList);
  }
</script>

<div class="backdrop" />
<div class="modal">
  <div class="add-player-content">
    <h3>Input player name below</h3>
    <input type="text" bind:value={NewPlayer} placeholder="Player Name" />

    <!--If input is empty, it creates unfunctional button-->
    <Button
      class="add-player-button"
      disabled={NewPlayer.length <= 0}
      on:cClick={() => addToList()}>Add player</Button
    >

    <Button class="add-player-button" on:cClick={() => pushList()}>Exit</Button>
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
    background-color: rgb(21, 21, 21);
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
    top: 50%;
    color: #ffffff;
    padding: 1rem;
    background: linear-gradient(
      129deg,
      rgb(11, 11, 52) 0%,
      rgba(24, 0, 23) 100%
    );
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
