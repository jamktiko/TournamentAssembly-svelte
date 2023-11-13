<nav class="navbar" style={$$props.style}>
  <ul class="navbar-nav">
    <slot />
  </ul>
</nav>

<style>
  .navbar {
    height: 4em;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 0 1rem;
    border-bottom: rgba(0, 0, 0, 0.2);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .navbar-nav {
    max-width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
  }
</style>
