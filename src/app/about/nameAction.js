'use server'

export async function addName(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(formData.get("name") + "bonys")
        }, 3000)
    })
} 