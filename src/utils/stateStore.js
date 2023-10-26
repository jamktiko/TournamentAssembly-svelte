import { writable } from "svelte/store";
import { calcId } from "./lib";

const stateStore = writable({});

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
    stateStore.set(guest);
  },

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

    if (res.success) {
      const userData = {
        id: res.id,
        username: res.username,
        token: res.token,
        tournaments: res.tournaments,
      };

      stateStore.set(userData);
    }
    return res;
  },

  async createTournament(tournament, type) {
    let user;
    const unsub = this.subscribe((userData) => (user = userData));
    unsub();

    tournament.id = calcId(user.tournaments);
    tournament.type = type;

    const tourData = {
      username: user.username,
      tournament,
      token: user.token,
    };

    const opt = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tourData),
    };

    const res = await this.customFetch("addTour", opt);
    console.log(res);
  },
};

export default stateController;
