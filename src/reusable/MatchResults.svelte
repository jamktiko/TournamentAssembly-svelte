<script>
const matches = [
  {
    contestants: [
      { name: "Tiimi-1", score: 1, win: false },
      { name: "Tiimi-2", score: 2, win: true },
    ],
    draw: false,
  },
];

</script>
<main>
<td>Team 1</td>
<td>Score</td>
{#if matches[0].draw == true} 
  <td><b>Draw</b></td>
{:else}
  <td> </td>
{/if}
<td>Score</td>
<td>Team 2</td>
<p></p>
{#if matches[0].draw == true} 
  <td>{matches[0].contestants[0].name}</td>
  <td>{matches[0].contestants[0].score}</td> 
  <td> - </td> 
  <td>{matches[0].contestants[1].score}</td>      
  <td>{matches[0].contestants[1].name}</td>
{:else if matches[0].contestants[0].win == true}
  <td><b>{matches[0].contestants[0].name}</b></td>
  <td>{matches[0].contestants[0].score}</td> 
  <td> - </td> 
  <td>{matches[0].contestants[1].score}</td>      
  <td>{matches[0].contestants[1].name}</td>
{:else}
  <td>{matches[0].contestants[0].name}</td>
  <td>{matches[0].contestants[0].score}</td> 
  <td> - </td> 
  <td>{matches[0].contestants[1].score}</td>      
  <td><b>{matches[0].contestants[1].name}</b></td>
{/if}


      
</main>
<style>
    td {
    font-weight: 700;
    background-color: rgba(0, 0, 0, 0.308);
    border: 1px solid white;
    text-align: center;
    font-size: 1.7em;
    width: 5em;
    max-width: 5em;
  }

  b{
    color: gold;
    
  }
</style>