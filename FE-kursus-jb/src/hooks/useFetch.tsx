/* eslint-disable @typescript-eslint/no-explicit-any */
import { AXIOS } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { useToast } from "./use-toast";
import { AxiosResponse } from "axios";

function useFetch({
  invalidateKey,
  api,
  staleTime = 5000,
  enabled,
  afterSuccess = () => {},
}: {
  enabled?: boolean;
  invalidateKey: string;
  api: string;
  staleTime?: number;
  afterSuccess?: (prop: AxiosResponse) => void;
}) {
  const cookie = new Cookies();
  const { toast } = useToast();
  const token = cookie.get("access_token");
  const fetchingQuery = useQuery({
    queryKey: [invalidateKey],
    queryFn: async () => {
      try {
        const data = await AXIOS.get(`${api}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        afterSuccess(data);
        return data.data;
      } catch (error: any) {
        if (error?.response?.status === 401) {
          toast({
            variant: "error",
            title: "Token expired, you need to login again",
          });
          cookie.remove("access_token", { path: "/" });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          return;
        }
        console.log(error);
      }
    },
    staleTime,
    enabled,
    refetchOnWindowFocus: false,
  });
  const items = fetchingQuery.data?.data;
  return { items, ...fetchingQuery };
}

export default useFetch;
