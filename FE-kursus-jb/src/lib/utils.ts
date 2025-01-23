import axios, { AxiosInstance } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const AXIOS: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.JB_ENV_BASE_URL}`,
});
