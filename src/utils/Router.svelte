<script>
import Router from "svelte-spa-router";
import Login from "../core/Login.svelte";

const routes = {
    "/":Login,
}
</script>

<Router {routes}/>

