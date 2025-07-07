"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export default function Page() {
  return (
    <div className="flex justify-between ">
      <div className="bg-white w-sm mx-auto flex flex-col gap-4 py-10 p-5 sm:p-8 text-center shadow-md rounded-md">
        <SignIn.Root>
          <SignIn.Step name="start">
            <h1 className="text-lg font-semibold text-slate-900 mb-2">
              Sign in to Job Board
            </h1>
            <p className="text-gray-600 text-sm mb-5">
              Welcome back! Please sign in to continue
            </p>
            <Clerk.Connection
              name="google"
              className="w-full mx-auto flex items-center justify-center gap-2 py-2 rounded-md cursor-pointer bg-indigo-600 text-white border mb-3"
            >
              <span>
                <FaGoogle />
              </span>
              Sign in with Google
            </Clerk.Connection>
            <p className="mb-3">or</p>
            <Clerk.Field
              name="identifier"
              className=" w-full mx-auto flex flex-col items-start"
            >
              <Clerk.Label className="mb-2 text-gray-600">Email</Clerk.Label>
              <Clerk.Input className="w-full outline-1 px-2 py-2 mb-5 rounded-md" />
              <Clerk.FieldError />
            </Clerk.Field>
            <SignIn.Action
              submit
              className="bg-indigo-600 py-2 text-white rounded-md w-full mb-3 cursor-pointer"
            >
              Continue
            </SignIn.Action>
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <span className="text-gray-900 text-l">
                <Link href={"/sign-up"}>Sign up</Link>
              </span>
            </p>
          </SignIn.Step>

          <SignIn.Step name="verifications" className="">
            <SignIn.Strategy name="email_code">
              <h1 className="text-lg font-semibold text-slate-900 mb-5">
                Check your email
              </h1>

              <Clerk.Field
                name="code"
                className="flex flex-col items-start gap-2 mb-3"
              >
                <Clerk.Label>Email Code</Clerk.Label>
                <Clerk.Input className="w-full outline-1 rounded-md px-2 py-2" />
                <Clerk.FieldError />
              </Clerk.Field>

              <SignIn.Action
                submit
                className="bg-indigo-600 text-white w-full rounded-md py-2 cursor-pointer"
              >
                Verify
              </SignIn.Action>
            </SignIn.Strategy>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  );
}
