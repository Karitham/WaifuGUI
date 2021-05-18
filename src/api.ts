import { pop } from "svelte-spa-router";
import { writable, Writable } from "svelte/store";

export class User {
  ID: string;
  Date: Date;
  Favorite: Waifu;
  Quote: string;
  Waifus: Waifu[];

  constructor() {}

  public async pullInventory(user: string): Promise<Waifu[]> {
    let resp = await fetch("https://waifubot.kar.wtf/user/" + user);
    try {
      let payload = (await resp.json()) as User;
      this.Date = payload.Date;
      this.Favorite = payload.Favorite;
      this.ID = payload.ID;
      this.Quote = payload.Quote;
      this.Waifus = payload.Waifus;

      return this.Waifus;
    } catch (e) {
      alert(e);
      pop();
    }
  }
}

export interface Waifu {
  ID: number;
  Image: string;
  Name: string;
}

export const Inventory: Writable<User> = writable(new User());
