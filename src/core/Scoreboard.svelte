<script>
  import { push } from 'svelte-spa-router';
  import Button from '../reusable/Button.svelte';

  let gridData = [{ name: '', columns: [''] }];

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

  function calculateRowTotal(row) {
    return row.columns.reduce((acc, val) => acc + parseFloat(val) || 0, 0);
  }
</script>

<main>
  <Button class="back-button" on:cClick={() => push('/selection')}>Back</Button>
  <div id="button-container">
    <div class="flex-item">
      <Button on:cClick={addRow}>ADD PLAYER</Button>
    </div>
    <div class="flex-item">
      <Button on:cClick={addColumn}>ADD ROUND</Button>
    </div>
  </div>

  <div id="table-container">
    <table>
      <thead>
        <tr>
          <th>NAME</th>
          {#each gridData[0].columns as column, colIdx}
            <th>
              <div class="remove-button">
                <Button on:cClick={() => removeColumn(colIdx)}
                  >DELETE ROUND</Button
                >
              </div></th
            >
          {/each}
          <th>TOTAL</th>
        </tr>
      </thead>
      <tbody>
        {#each gridData as row, rowIdx}
          <tr>
            <td
              ><input
                type="text"
                bind:value={row.name}
                on:input={(event) => updateRowName(rowIdx, event)}
              /></td
            >
            {#each row.columns as column, colIdx}
              <td
                ><input
                  type="number"
                  bind:value={column}
                  on:input={(event) => updateCellValue(rowIdx, colIdx, event)}
                /></td
              >
            {/each}
            <td>{calculateRowTotal(row)}</td>
            <div class="remove-button">
              <td class="delete-player"
                ><Button on:cClick={() => removeRow(rowIdx)}
                  >DELETE PLAYER</Button
                ></td
              >
            </div>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style>
  main {
    padding-bottom: 8em;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
    width: 70%;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.308);
  }

  #button-container {
    margin-top: 6em;
    margin-bottom: 2em;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: normal;
    align-content: normal;
  }
  #table-container {
    overflow-x: auto;
    width: 100%;
    margin: auto;
    margin-bottom: 2em;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
  }
  .flex-item {
    margin-left: 12px;
  }
  input {
    color: rgb(255, 255, 255);
    font-size: 1.3em;
    padding: 0.3em 0.7em;
    border-radius: 20px;
    background-color: rgba(5, 2, 45, 0.226);
    text-align: center;
    border: 1px solid #ffffff37;
  }

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    appearance: none;
  }
  table {
    margin: auto;
    width: 100%;
    table-layout: auto;
  }

  th,
  td {
    font-weight: 700;
    background-color: rgba(0, 0, 0, 0.308);
    border: 1px solid white;
    text-align: center;
    font-size: 1.7em;
  }

  .remove-button {
    scale: 0.6;
  }

  .delete-player {
    background: none;
    border: none;
  }
</style>
