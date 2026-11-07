"use server";
import { redirect } from "next/navigation";
import { signup } from "../actions/users";


 export  async function signUp(prevState, formData) {

   const email = formData.get("email");
   const username = email.split("@")[0];    
    const password = formData.get("password");

    const result = await signup(username, email, password);
  
    if (result.error) {
      return { error: result.error };
    }

    redirect("/");
  }