"use server";
import { redirect } from "next/navigation";
import { login as login2 } from "../actions/users";


 export  async function login(prevState, formData) {

    const email = formData.get("email");
    const password = formData.get("password");
    const result = await login2( email, password);
    if (result.error) {
      return { error: result.error };
    }

    redirect("/");
  }