<script>
  let gridData = [{ name: "", columns: [""] }];
  import Button from "../reusable/Button.svelte";
  function addRow() {
    const numColumns = gridData[0].columns.length;
    const newRow = {
      name: "",
      columns: Array(numColumns).fill(""), // Create an array with the same number of empty strings as columns
    };
    gridData = [...gridData, newRow];

  }

  function addColumn() {
    gridData.forEach((row) => {
      row.columns.push("");
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
<div id="container">
  <div class="flex-item">
    <Button  on:cClick={addRow}>Add Row</Button>
  </div>
  <div class="flex-item">
    <Button on:cClick={addColumn}>Add Column</Button>
  </div>
</div>
<table>
  <thead>
    <tr>
      <th>Name</th>
      {#each gridData[0].columns as column, colIdx}
        <th>
          <Button  on:cClick={() => removeColumn(colIdx)}
            >X</Button
          >
        </th>
      {/each}
      <th>Total</th>
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
        <td
          ><Button  on:cClick={() => removeRow(rowIdx)}
            >Remove</Button
          ></td
        >
      </tr>
    {/each}
  </tbody>
</table>

<style>
  #container {
    margin-top: 1em;
    display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: normal;
  align-content: normal;
  }
  .flex-item{
    margin-left: 12px;
  }
  input {
    color: rgb(255, 255, 255);

    font-size: 1.3em;
    padding: 0.5em 2em;
    border-radius: 20px;
    background-color: rgb(21, 21, 21);
    color: #ffffff;
    text-align: center;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    border: 1px solid white;
    padding: 8px;
    text-align: center;
    text-emphasis-color: black;
    font-size: 1.3em;

  }
</style>