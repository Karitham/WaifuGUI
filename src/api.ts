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
    switch (resp.status) {
      case 200:
        let payload = (await resp.json()) as User;
        this.Waifus = payload.Waifus;
        return this.Waifus;
      default:
        alert("could not fetch user");
    }
  }
}

export interface Waifu {
  ID: number;
  Image: string;
  Name: string;
}

export const Inventory: Writable<User> = writable(new User());
