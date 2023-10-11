import { writable } from "svelte/store";

const stateStore = writable();

const stateController = {
  apiUrl: "http://localhost:3000/",
  subscribe: stateStore.subscribe,

  loginAsGuest() {
    const guest = {
      username: "guest",
      password: null,
      isGuest: true,
      tournamentData: null,
    };
    stateStore.set({ user: guest });
  },

  login() {},

  async customFetch(urlExt, opt) {
    const res = await fetch(this.apiUrl + urlExt, opt);
    const data = await res.json();

    return data;
  },

  async register(user) {
    const res = await this.customFetch("register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log(res);
    return res;
  },

  async login(user) {
    const res = await this.customFetch("login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log(res);
    return res;
  },
};

export default stateController;
