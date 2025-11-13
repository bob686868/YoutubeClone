import React from 'react'
import { addTag } from '../actions/tags'
const AddTag = async () => {
  async function add(formData){
    "use server"
    console.log(formData)
    let tagName=formData.get("tag")
    await addTag(tagName)
  }

  return (
    <div>
          <div className="h-[50vh] mt-10 bg-gray-100 flex justify-center py-10">
            <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-semibold mb-6">Add a tag</h1>
      
              <form action={add} className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-1">Tag Name:</label>
                  <input
                    type="text"
                    name="tag"
                    required
                    placeholder="Enter video title"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
      
      
                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white font-medium py-2 rounded-md hover:bg-red-700 transition"
                >
                  Add Tag
                </button>
              </form>
            </div>
          </div>
    </div>
  )
}

export default AddTag
