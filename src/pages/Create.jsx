import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../supabaseClient"

export default function Create() {
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [rating, setRating] = useState('')
    const [formError, setFormError] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!title || !method || !rating) {
            setFormError("Please fill in all the forms correctly")
            return
        }

        const {data, error} = await supabase.from('smoothies').insert([{title, method, rating}]).select()

        if (error) {
            console.log(error);
            setFormError("Please fill in all the forms correctly")
        }

        if (data) {
            console.log(data);
            setFormError(null)
            navigate("/")
        }

    }

  return (
    <div className="page create">
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" value={title} id="title" onChange={(e) => setTitle(e.target.value)} />

            <label htmlFor="method">Method:</label>
            <textarea value={method} id="method" onChange={(e) => setMethod(e.target.value)} />

            <label htmlFor="rating">Rating</label>
            <input type="number" value={rating} id="rating" onChange={(e) => setRating(e.target.value)} />

            <button>Create Smoothie Recipe</button>

            {formError && <p className="error">{formError}</p>}
        </form>
    </div>
  )
}
