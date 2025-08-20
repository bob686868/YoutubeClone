'use client'

import React, { useOptimistic, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Form from 'next/form'
import { addName } from './nameAction'

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button type="submit" className="border border-black p-2">
            {pending ? 'Loading...' : 'Submit'}
        </button>
    )
}

export default function ClientForm() {
    const [name, setName] = useState('')
    const [optmisticName, setOptimisticName] = useOptimistic(name, (currentState, optimisicValue) => {
        return optimisicValue
    })
    
    async function handleSubmit(prevState, formData) {
        setOptimisticName(formData.get("name"))
        const result = await addName(formData)
        setName(result)
        return result
    }

    const [state, formAction] = useFormState(handleSubmit, null)

    return (
        <div className="space-y-4">
            <Form action={formAction}>
                <input type="text" name="name" className='border border-black p-2'/>
                <SubmitButton />
                <div className="mt-2">
                    Current name: {optmisticName}
                </div>
            </Form>
        </div>
    )
} 