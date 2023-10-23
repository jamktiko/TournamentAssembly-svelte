<script>
</script>

<div class="card">
  <div class="header">
    <slot name="header" />
  </div>
  <div class="footer">
    <slot name="footer" />
  </div>
  <div class="button">
    <slot name="button" />
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    flex: 2;
    align-items: center;
    border: 1px solid #ffffff31;
    border-radius: 10px;
    padding: 2em 9em;
    margin: 0.2em;
    min-height: 20em;
    background: radial-gradient(rgb(1, 1, 50, 0.5) 0%, rgb(0, 0, 0, 0.5) 100%);
    transition-duration: 0.3s;
  }

  .card:hover {
    filter: brightness(1.2);
    background: radial-gradient(
      rgba(20, 1, 50, 0.5) 0%,
      rgb(0, 0, 0, 0.5) 100%
    );
    filter: drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.171));
    scale: 1.03;
  }
  .header {
    text-align: center;
  }

  .header :global(h2) {
    font-size: 2.5em;
    margin-top: 0.1em;
    margin-bottom: 0.1em;
    font-weight: bold;
  }

  .footer {
    text-align: center;
  }

  .footer :global(p) {
    font-size: 1em;
    margin-top: 2.5em;
    margin-bottom: 0.1em;
  }
  .button :global(div) {
    min-width: max-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .button :global(button) {
    margin: 0.3em;
  }
</style>
