<script>
  export let background = '';
</script>

<div class="card" style="background: {background}">
  <div class="card-header">
    <slot name="header" />
  </div>
  <div class="card-body">
    <slot name="button" />
  </div>
  <div class="card-footer">
    <slot name="footer" />
  </div>
</div>

<style>
  .card {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 16px;
    margin: 16px;
    max-width: 300px;
  }

  .card-header {
    text-align: center;
  }

  .card-footer {
    text-align: center;
  }
</style>
