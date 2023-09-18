<script>

  ///app
  let gridData = [
    { name: '', columns: [''] },
  ];
  
  function addRow() {
  const numColumns = gridData[0].columns.length;
  const newRow = {
    name: '',
    columns: Array(numColumns).fill('') // Create an array with the same number of empty strings as columns
  };
  gridData = [...gridData, newRow];
}

  function addColumn() {
    gridData.forEach((row) => {
      row.columns.push('');
    });
    gridData = [...gridData]
  }



  function removeRow(index) {
    const numRows = gridData.length;
    if (numRows > 1){
      gridData = gridData.filter((_, i) => i !== index);
    }
    
    

  }

  function removeColumn(index) {
    gridData.forEach((row) => {
      row.columns.splice(index, 1);
    });
    gridData = [...gridData]
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

<style>
  input {
    color: black;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    
  }

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
    text-emphasis-color: black;
  }

  .remove-button {
    cursor: pointer;
    color: black;
    min-width: 20px;
  }
</style>

<button class="remove-button" on:click={addRow}>Add Row</button>
<button class="remove-button" on:click={addColumn}>Add Column</button>

<table>
  <thead>
    <tr>
      <th>Name</th>
      {#each gridData[0].columns as column, colIdx}
        <th>
          <button class="remove-button" on:click={() => removeColumn(colIdx)}>X</button>
        </th>
      {/each}
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    {#each gridData as row, rowIdx}
      <tr>
        <td><input type="text" bind:value={row.name} on:input={(event) => updateRowName(rowIdx, event)} /></td>
        {#each row.columns as column, colIdx}
          <td><input type="text" bind:value={column} on:input={(event) => updateCellValue(rowIdx, colIdx, event)} /></td>
        {/each}
        <td>{calculateRowTotal(row)}</td>
        <td><button class="remove-button" on:click={() => removeRow(rowIdx)}>Remove</button></td>
        
      </tr>
    {/each}
  </tbody>
</table>
