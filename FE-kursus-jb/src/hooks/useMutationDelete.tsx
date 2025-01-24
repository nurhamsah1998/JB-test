/* eslint-disable @typescript-eslint/no-explicit-any */
import { AXIOS } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { useToast } from "./use-toast";
import { useNavigate } from "react-router-dom";

function useMutationDelete({
  invalidateKey,
  api,
  headers,
  showNotifSuccess,
  afterSuccess = () => {},
}: {
  afterSuccess?: () => void;
  invalidateKey: string;
  api: string;
  showNotifSuccess?: string;
  headers?: Record<string, any>;
}) {
  const cookie = new Cookies();
  const nav = useNavigate();
  const token = cookie.get("access_token");
  const client = useQueryClient();
  const { toast } = useToast();
  const mutatioQuery = useMutation({
    mutationKey: [invalidateKey],
    mutationFn: async (values: unknown) => {
      try {
        const data = await AXIOS.delete(`${api}/${values}`, {
          headers: {
            Authorization: `bearer ${token}`,
            ...headers,
          },
        });
        if (showNotifSuccess) {
          toast({
            variant: "success",
            title: showNotifSuccess,
          });
        }
        client.invalidateQueries({ queryKey: [invalidateKey] });
        afterSuccess();
        return data.data;
      } catch (error: any) {
        if (error?.response?.status === 401) {
          toast({
            variant: "error",
            title: "Token expired, you need to login again",
          });
          cookie.remove("access_token", { path: "/" });
          nav("/login");
          return;
        }
        toast({
          variant: "error",
          title: error?.response?.data?.message || "Internal server error",
        });
        console.log(error);
      }
    },
  });
  return { ...mutatioQuery };
}

export default useMutationDelete;
