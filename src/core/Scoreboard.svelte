<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';
  import { slide } from 'svelte/transition';
  import { fade } from 'svelte/transition';
  import { scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  import { onDestroy } from 'svelte';
  import cch from '../utils/cache';

  import stateController from '../utils/stateStore';

  import { loadFromSession } from '../utils/lib';

  let user;
  const unsub = stateController.subscribe((userData) => (user = userData));

  if (!user.username && window.sessionStorage.getItem('user')) {
    user = loadFromSession('user');
    stateController.set(user);
  }

  let gridData = [{ name: '', columns: [''] }];

  onDestroy(() => {
    if (unsub) unsub();

    if (user.state) delete user.state;

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
  } else if (user.state) {
    console.log(user.state, 'testing');
    gridData = user.state;
  }

  function addRow() {
    const numColumns = gridData[0].columns.length;
    const newRow = {
      name: '',
      columns: Array(numColumns).fill(''), // Create an array with the same number of empty strings as columns
    };
    gridData = [...gridData, newRow];
  }

  function addColumn() {
    gridData.forEach((row) => {
      row.columns.push('');
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
  let total = 0;
  let caculator = 0;
  function calculateRowTotal(row) {
    return row.columns.reduce((acc, val) => {
      const num = parseFloat(val);
      return !isNaN(num) ? acc + num : acc;
    }, 0);
  }

  async function save() {
    const res = await stateController.updateTourState(
      gridData,
      user.config.id,
      user.username
    );

    console.log(res);
  }

  /* Function check if the window is for tablet, used for alternative playerlist */
  let isTablet = false;
  const checkScreenSize = () => {
    isTablet = window.matchMedia('(max-width: 1450px)').matches;
  };
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
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
    {#if !user.isGuest && user.username}
      <Button class="save-button" on:cClick={save}>SAVE</Button>
    {/if}
  </div>
  {#if !isTablet}
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
                  on:cClick={() => removeColumn(colIdx)}
                  ><svg
                    class="trash-can"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                    ><path
                      d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                    /></svg
                  ></Button
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
                  on:cClick={() => removeRow(rowIdx)}
                  ><svg
                    class="trash-can"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                    ><path
                      d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                    /></svg
                  ></Button
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
  {:else}
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
                  on:cClick={() => removeColumn(colIdx)}
                  ><svg
                    class="trash-can"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                    ><path
                      d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                    /></svg
                  ></Button
                >
              </th>
            {/each}
            <th class="custom-thead" />
          </tr>
        </thead>
        <thead>
          <tr>
            <th class="custom-thead" />
            <th class="name-td">NAME</th>
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
                  on:cClick={() => removeRow(rowIdx)}
                  ><svg
                    class="trash-can"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                    ><path
                      d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                    /></svg
                  ></Button
                ></td
              >
              <td class="name-td"
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
  {/if}
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
    margin-top: 2.5em;
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

  .trash-can {
    fill: rgba(110, 0, 0);
  }

  /* Tablet Portrait */
  @media only screen and (max-width: 1450px) {
    table {
      scale: 0.9;
      margin: 0;
      max-width: 100%;
      overflow-anchor: left;
    }

    .name-td {
      position: static;
      left: 0;
      background-color: #0a0630;
    }

    .total-td {
      position: static;
    }
  }
</style>
