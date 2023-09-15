import { writable } from "svelte/store";

const stateStore = writable();

const stateController = {
  subscribe: stateStore.subscribe,

  loginAsGuest() {
    const guest = {
      username: "guest",
      password: null,
      isGuest: true,
    };
    stateStore.set({ user: guest });
  },
};

export default stateController;
