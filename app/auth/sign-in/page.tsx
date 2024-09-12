"use client";

import { Button } from "@/components/ui/button";
import { signinWithGoogle } from "@/lib/actions/auth-action";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-lg">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Sign in</h1>
            <p className="text-balance text-muted-foreground">
              Only SSNU GSUITE account is allowed.
            </p>
          </div>
          <div className="grid gap-4">
            <form>
              <Button
                formAction={signinWithGoogle}
                className="w-full py-6"
                variant="outline"
              >
                <FcGoogle className="mr-2" size={25} />
                Sign in with SNSU GSUITE Account
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
