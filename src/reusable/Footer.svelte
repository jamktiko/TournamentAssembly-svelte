<script></script>

<main>
  <!--<div class="footer">footer</div>-->

  <div>
    <ul>
      <li><a href="tourazz">Github</a></li>

      <li>Copyright</li>
    </ul>
  </div>
</main>

<style>
  /*.footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem;
    background: purple;
    color: white;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
  }*/

  ul {
    display: inline-grid;
    grid-auto-flow: row;
    grid-gap: 24px;
    justify-items: center;
    margin: auto;
  }

  @media (min-width: 500px) {
    ul {
      grid-auto-flow: column;
    }
  }

  a {
    color: white;
    text-decoration: none;
    box-shadow: inset 0 -1px 0 hsla(0, 0%, 100%, 0.4);
  }

  a:hover {
    box-shadow: inset 0 -1.2em 0 hsla(0, 0%, 100%, 0.4);
  }

  li:last-child {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }

  /* below is just for demo styling */

  div {
    display: flex;
    height: 10vh;
    width: 100%;
    background-color: #002a38;
    line-height: 1.3;
    font-family: Menlo, monospace;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  @keyframes wave-animation {
    0%,
    100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(20deg);
    }
    75% {
      transform: rotate(-15deg);
    }
  }
</style>
