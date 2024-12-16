import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../supabaseClient"

export default function Update() {
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [rating, setRating] = useState('')
    const [formError, setFormError] = useState(null)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSmoothie = async () => {
            const { data, error } = await supabase
            .from("smoothies")
            .select()
            .eq("id", id)
            .single()

            if (error) {
                navigate("/", {replace: true})
            }
            if (data) {
                setTitle(data.title)
                setMethod(data.method)
                setRating(data.rating)
                
            }
        }

        fetchSmoothie()
    }, [id, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !method || !rating) {
            setFormError()
            return
        }

        const { data, error } = await supabase
            .from("smoothies")
            .update({title, method, rating})
            .eq("id", id)
            .select()

        if (error) {
            setFormError("Please fill in all the forms correctly")
            console.log(error);
        }

        if (data) {
            setFormError(null)
            // console.log(data);
            navigate("/")
        }
    }

    return (
        <div className="page update">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" value={title} id="title" onChange={(e) => setTitle(e.target.value)} />

                <label htmlFor="method">Method:</label>
                <textarea value={method} id="method" onChange={(e) => setMethod(e.target.value)} />

                <label htmlFor="rating">Rating</label>
                <input type="number" value={rating} id="rating" onChange={(e) => setRating(e.target.value)} />

                <button>Update Smoothie Recipe</button>

                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}
