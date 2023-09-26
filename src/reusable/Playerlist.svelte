<script>
	import { createEventDispatcher } from "svelte";
	const dp = createEventDispatcher();
	import Button from "./Button.svelte";
  import Customizer from "../core/Customizer.svelte";



		let playerList = []


	
	
	let NewPlayer = ""; /*The text on the input*/

	/*Adds text input to the player list and empties the input*/
	function addToList() {
		playerList.push(NewPlayer);
		playerList = [...playerList];
		NewPlayer = "";
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
		dp("playersEvent", playerList);
	}

</script>

<div class="backdrop" />
<div class="modal">
	<div class="container">




		<input type="text" bind:value={NewPlayer} />
		{#if NewPlayer.length > 0}
			<!--If input is empty, it creates unfunctional button-->
			<Button on:cClick={() => addToList()}>Add player</Button>
		{:else}
			<Button>Add player</Button>
		{/if}
		<Button on:cClick={() => pushList()}>Finish</Button>


	</div>
</div>

<style>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.75);
		z-index: 10;
	}
	input {
		color: rgb(255, 255, 255);
		margin-bottom: 1em;
		font-size: 1.3em;
		padding: 0.5em 2em;
		border-radius: 20px;
		background-color: rgb(21, 21, 21);
		color: #ffffff;
		text-align: center;
	}
	.modal {
		margin: auto;
		display: flex;
		color: #ffffff;
		padding: 1rem;
		position: relative;
		width: 50%;
		max-height: 80vh;
		background: linear-gradient(
			129deg,
			rgb(11, 11, 52) 0%,
			rgba(24, 0, 23, 0.285) 100%
		);
		border-radius: 40px;
		z-index: 100;
		border: solid 1px #ffffff3f;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	}
	.container {
		align-items: center;
		display: flex;
		margin: auto;
		flex-direction: column;
		justify-content: space-around;
	}

</style>
