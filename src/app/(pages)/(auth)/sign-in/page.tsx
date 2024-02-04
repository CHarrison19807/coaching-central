"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { GiTank } from "react-icons/gi";
import {
  TSignInCredentials,
  signInCredentials,
} from "@/lib/validators/authValidator";

function SignInPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const origin = searchParams.get("origin");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInCredentials),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: (data) => {
      toast.success("Signed in successfully");
      if (origin) {
        router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/${origin}`);
      } else {
        router.push("/");
      }
      router.refresh();
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password");
      }
    },
  });

  function onSubmit({ email, password }: TSignInCredentials) {
    signIn({ email, password });
  }
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 items-center text-center">
            <GiTank className="w-20 h-20" />
            <h1 className="text-2xl font-bold">Sign in to your account</h1>
            <Link
              href="sign-up"
              className={buttonVariants({ variant: "link" })}
            >
              Don&apos;t have an account? Sign-up
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-6">
            <form
              onSubmit={
                // @ts-expect-error don't know why this is happening
                handleSubmit(onSubmit)
              }
            >
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message?.toString()}
                    </p>
                  )}
                </div>
                <Button>Sign in</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
