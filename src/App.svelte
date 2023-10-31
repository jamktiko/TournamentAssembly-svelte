<script>
  import Router from "./utils/Router.svelte";
  import Header from "./core/Header.svelte";
  import Button from "./reusable/Button.svelte";
  import { pop, location, push } from "svelte-spa-router";
  import stateController from "./utils/stateStore";

  let userData;

  stateController.subscribe(($userData) => {
    userData = $userData;
  });

  function logout() {
    window.sessionStorage.removeItem("user");
    stateController.set({});
  }

  console.log(userData);
</script>

<Header />

<Button on:cClick={logout}>Log out</Button>

{#if $location !== "/" && $location !== "/errorpage" && $location !== "/LoginUser" && $location !== "/Signup"}
  {#if $location == "/selection"}
    <Button class="back-button" on:cClick={() => push("/")}
      ><svg
        class="back-arrow"
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        fill="#ffffff"
        viewBox="0 -960 960 960"
        width="48"><path d="M560-280 360-480l200-200v400Z" /></svg
      > Back</Button
    >
  {:else}
    <Button class="back-button" on:cClick={() => push("/selection")}
      ><svg
        class="back-arrow"
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        fill="#ffffff"
        viewBox="0 -960 960 960"
        width="48"><path d="M560-280 360-480l200-200v400Z" /></svg
      > Back</Button
    >
  {/if}
{/if}

{#if userData.username !== "guest" && userData.username}
  <Button class="profile-button" on:cClick={() => push("/profile")}
    ><svg
      class="profile"
      xmlns="http://www.w3.org/2000/svg"
      height="36"
      viewBox="0 -960 960 960"
      width="36"
      ><path
        d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
      /></svg
    > Profile</Button
  >
{/if}

<Router />

<style>
  .back-arrow {
    fill: #fff;
    position: absolute;
    top: 10%;
    left: 8%;
    margin-right: 1em;
  }

  .profile {
    fill: #fff;
    position: absolute;
    top: 20%;
    left: 8%;
    margin-right: 1em;
  }
</style>
