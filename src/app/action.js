"use server"
import { cookies } from "next/headers"

export async function addToCookies(formData) {
    const email = formData.get('email')
    console.log('Email:', email)
    let cookieStore = await cookies()
    cookieStore.set("email", email)
}