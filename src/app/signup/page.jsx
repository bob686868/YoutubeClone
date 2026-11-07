"use client";
import React from "react";

import Link from "next/link";

import { useActionState } from "react";
import { signUp } from "./signupActions";
import AuthForm from "../components/AuthForm";


const page = () => {

  const [state, formAction,isPending] = useActionState(signUp, { error: null });
  return (
    <div className="bg-neutral-950">
    <AuthForm
      type="signup"
      state={state}
      formAction={formAction}
      isPending={isPending}
    />
    </div>
  );
};

export default page;
