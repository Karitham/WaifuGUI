import type { Waifu } from "./api";

export const DateAsc = (a: Waifu, b: Waifu): number =>
    new Date(b.date).getTime() - new Date(a.date).getTime();
export const DateDesc = (a: Waifu, b: Waifu): number =>
    new Date(a.date).getTime() - new Date(b.date).getTime();
export const IDAsc = (a: Waifu, b: Waifu): number => a.id - b.id;
export const IDDesc = (a: Waifu, b: Waifu): number => b.id - a.id;