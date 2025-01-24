import axios, { AxiosInstance } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const AXIOS: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.JB_ENV_BASE_URL}`,
});
export const moneyCurrency = (num: number, currency: string): string => {
  if (!num) num = 0;
  return `${currency}${num?.toLocaleString()}`;
};

export const getInitialName = (name: string) => {
  try {
    if (!name.match(/\s/g)) return name[0];
    let index = 0;
    while (index < name?.length) {
      if (name[index].match(/\s/)) {
        index += 1;
        break;
      }
      index += 1;
    }
    return `${name[0]}${name[index]}`.toUpperCase();
  } catch (error: unknown) {
    console.log(error);
    return "";
  }
};
