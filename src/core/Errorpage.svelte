<script>
  	import Button from "../reusable/Button.svelte";
    import { push } from 'svelte-spa-router';
</script>
<div class="flex-container">
<h1>Error 404</h1>

<h2>Page not found</h2>
<h3>
<Button on:cClick={() => push('/')}>Return</Button></h3>
</div>
<style>
.flex-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
}
  h1{
    font-size: 10em;
  }
  h2{font-size: 7em;}
  h3{font-size: 3em;}
</style>