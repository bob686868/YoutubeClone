"use client";
import { useActionState } from "react";
import { login } from "./loginActions";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  const [state, formAction, isPending] = useActionState(login, { error: null });
  return (
    <AuthForm
      type="login"
      state={state}
      formAction={formAction}
      isPending={isPending}
    />
  );
};

export default LoginPage;
