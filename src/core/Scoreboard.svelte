<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
  import { slide } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  import { onDestroy } from 'svelte';
  import cch from '../utils/cache';

  let gridData = [{ name: '', columns: [0] }];

  onDestroy(() => {
    if (
      (gridData[0].name && gridData[0].columns[0]) ||
      gridData[0].columns[0] === 0
    ) {
      cch.saveToCache('scoreboard', gridData);
    }
  });

  if (cch.isInCache('scoreboard')) {
    const cachedData = cch.getFromCache('scoreboard');
    console.log(!Array.isArray(cachedData[0].columns));
    if (!Array.isArray(cachedData[0].columns)) {
      for (let unit of cachedData) {
        unit.columns = [unit.columns];
      }
    }
    gridData = cachedData;
  }

  function addRow() {
    const numColumns = gridData[0].columns.length;
    const newRow = {
      name: '',
      columns: Array(numColumns).fill(0), // Create an array with the same number of empty strings as columns
    };
    gridData = [...gridData, newRow];
  }

  function addColumn() {
    gridData.forEach((row) => {
      row.columns.push(0);
    });
    gridData = [...gridData];
  }

  function removeRow(index) {
    const numRows = gridData.length;
    if (numRows > 1) {
      gridData = gridData.filter((_, i) => i !== index);
    }
  }

  function removeColumn(index) {
    gridData.forEach((row) => {
      row.columns.splice(index, 1);
    });
    gridData = [...gridData];
  }

  function updateRowName(index, event) {
    gridData[index].name = event.target.value;
  }

  function updateCellValue(rowIdx, colIdx, event) {
    gridData[rowIdx].columns[colIdx] = event.target.value;
  }

  $: gridData = [...gridData]; // Trigger reactivity

  function calculateRowTotal(row) {
    return row.columns.reduce((acc, val) => acc + parseFloat(val) || 0, 0);
  }
</script>

<main in:slide>
  <div class="scoreboard-header">
    <h1>Scoreboard</h1>
  </div>
  <div class="scoreboard-description">
    <p>Create a scoreboard for your games!</p>
  </div>
  <div class="button-container">
    <Button class="add-button" on:cClick={addRow}>ADD PLAYER</Button>
    <Button class="add-button" on:cClick={addColumn}>ADD ROUND</Button>
  </div>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th class="custom-thead" />
          <th class="custom-thead" />
          {#each gridData[0].columns as column, colIdx}
            <th class="custom-thead">
              <Button
                class="delete-round-button"
                on:cClick={() => removeColumn(colIdx)}>Delete Round</Button
              >
            </th>
          {/each}
          <th class="custom-thead" />
        </tr>
      </thead>
      <thead>
        <tr>
          <th class="custom-thead" />
          <th>NAME</th>
          {#each gridData[0].columns as column, colIdx}
            <th class="round-th">ROUND {colIdx + 1}</th>
          {/each}
          <th class="total-td">TOTAL</th>
        </tr>
      </thead>
      <tbody>
        {#each gridData as row, rowIdx}
          <tr transition:slide>
            <td class="custom-thead"
              ><Button
                class="delete-player-button"
                on:cClick={() => removeRow(rowIdx)}>DELETE Player</Button
              ></td
            >
            <td
              ><input
                type="text"
                class="input-name"
                placeholder="ENTER PLAYER NAME"
                bind:value={row.name}
                on:input={(event) => updateRowName(rowIdx, event)}
              /></td
            >
            {#each row.columns as column, colIdx}
              <td class="round-td" transition:fade
                ><input
                  type="number"
                  class="input-score"
                  bind:value={column}
                  on:input={(event) => updateCellValue(rowIdx, colIdx, event)}
                /></td
              >
            {/each}
            <td class="total-td">{calculateRowTotal(row)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style>
  main {
    margin-left: 15%;
    margin-top: 2em;
    margin-bottom: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 70%;
    padding-top: 4em;
    padding-bottom: 3em;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  h1 {
    text-transform: uppercase;
    font-size: 2em;
  }

  .input-name {
    font-size: 1.1em;
    color: rgb(255, 255, 255);
    padding: 0.1em 0em;
    border-radius: 10px;
    background-color: rgba(5, 2, 45, 0.226);
    text-align: center;
    border: 1px solid #ffffffae;
  }

  .input-score {
    font-size: 1.1em;
    color: rgb(255, 255, 255);
    padding: 0.1em 0em;
    border-radius: 10px;
    background-color: rgba(5, 2, 45, 0.226);
    text-align: center;
    border: 1px solid #ffffffae;
    width: 3em;
  }

  /* Hides Arrows from Round/Score */
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  table {
    font-size: 1.3em;
    margin: 0em 1em;
  }

  .custom-thead {
    padding: 0.25em;
    border: none;
    background-color: transparent;
  }

  tr {
    height: 1em;
  }

  th {
    font-weight: 700;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid white;
    text-align: center;
  }

  td {
    font-weight: 700;
    padding: 0.5em;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid white;
    text-align: center;
  }

  tr:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .round-td {
    width: 2em;
  }

  .round-th {
    width: 2em;
  }

  .total-td {
    position: sticky;
    right: 0;
    background-color: #0a0630;
    padding: 0.25em;
  }

  .scoreboard-header {
    font-size: x-large;
    text-align: center;
  }

  .scoreboard-description {
    font-size: 1.3em;
  }

  .button-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: normal;
    align-content: normal;
    margin: 2.5em 0em;
  }

  .table-container {
    overflow-x: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
  }
</style>
