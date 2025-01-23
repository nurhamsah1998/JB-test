/* eslint-disable @typescript-eslint/no-explicit-any */
import { AXIOS, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import Cookies from "universal-cookie";

export type Form = {
  email: string;
  password: string;
  name?: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { toast } = useToast();
  const cookie = new Cookies();
  const token = cookie.get("access_token");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [state, setState] = React.useState<{ isLoading?: boolean }>({
    isLoading: false,
  });
  const nav = useNavigate();
  const onSubmit = async (values: Omit<Form, "name">) => {
    setState({ ...state, isLoading: true });
    try {
      const data = await AXIOS.post("/login", values);
      cookie.set("access_token", data?.data?.authorization?.token);
      nav("/");
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "error",
        title: error?.response?.data?.message || "Internal server error",
      });
    } finally {
      setState({ ...state, isLoading: false });
    }
  };
  return !token ? (
    <div className="h-dvh w-full justify-center flex items-center px-4 sm:p-0">
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-1">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your JB account
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Controller
                    name="email"
                    rules={{ required: "email is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                      />
                    )}
                    control={control}
                  />
                  {errors.email && (
                    <p className=" text-xs text-red-500 leading-3">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Controller
                    name="password"
                    rules={{ required: "password is required" }}
                    render={({ field }) => (
                      <Input {...field} id="password" type="password" />
                    )}
                    control={control}
                  />
                  {errors.password && (
                    <p className=" text-xs text-red-500 leading-3">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  disabled={state.isLoading}
                  type="submit"
                  className="w-full"
                >
                  Login
                </Button>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a
                    onClick={() => nav("/register")}
                    className="underline underline-offset-4 cursor-pointer"
                  >
                    Register
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
}
