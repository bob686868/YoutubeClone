"use client"
import React from 'react'
import Form from 'next/form'
import { addToCookies } from '../action'
// import { cookies } from 'next/headers'
import ClientForm from './ClientForm'
import { useFormStatus } from 'react-dom'

async function getCookies(){
    let c=await cookies()
    return c.get("email")
}
const page =() => {
    // let em=getCookies()
    let em={value:"email.com"}
    let {pending}=useFormStatus()
    return (
        <div>
            About
            <ClientForm />
            <Form action={addToCookies}>
                <input type="text" name="email" className='border border-black'/>
                {em?.value}
            </Form>
            {pending && <div>Loading...</div>}
    
        </div>
    )
}

export default page
