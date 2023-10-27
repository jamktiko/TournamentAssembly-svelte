<script>
  export let text = '';
</script>

<span class="tooltip">
  <slot />
  <span class="tooltip-text">{text}</span>
</span>

<style>
  .tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip-text {
    text-transform: none;
    font-size: 1.2em;
    visibility: hidden;
    position: absolute;
    background-color: #000;
    color: #fff;
    text-align: center;
    border-radius: 10px;
    padding: 1em;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    min-width: 300px;
    max-width: 600px; /* Adjust this value to control the maximum width */
    white-space: nowrap;
    overflow: hidden;
  }

  .tooltip:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
    white-space: normal; /* Allow text to wrap */
  }
</style>
