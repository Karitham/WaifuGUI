/* eslint-disable require-jsdoc */
import {pop} from 'svelte-spa-router';
import {writable, Writable} from 'svelte/store';

export class User {
  id: string;
  favorite?: Waifu;
  quote: string;
  waifus: Waifu[];

  public async pullInventory(user: string): Promise<Waifu[]> {
    const resp = await fetch('https://waifuapi.kar.moe/user/' + user);
    if (resp.status !== 200) {
      throw new Error('User not found');
    }
    try {
      const payload = (await resp.json()) as User;
      this.favorite = payload.favorite;
      this.id = payload.id;
      this.quote = payload.quote;
      this.waifus = payload.waifus;

      return this.waifus;
    } catch (e) {
      alert(e);
      pop();
    }
  }
}

export interface Waifu {
  id: number;
  image: string;
  name: string;
  date: Date;
  type: string;
}

export const Inventory: Writable<User> = writable(new User());
