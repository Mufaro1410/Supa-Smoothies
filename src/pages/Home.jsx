import { useEffect, useState } from "react"
import supabase from "../supabaseClient"
import SmoothieCard from "../components/SmoothieCard"

export default function Home() {
    const [fetchError, setFetchError] = useState(null)
    const [smoothies, setSmoothies] = useState(null)
    const [orderBy, setOrderBy] = useState('created_at')

    const handleDelete = async (id) => {
        const {data, error} = await supabase
            .from("smoothies")
            .delete()
            .eq("id", id)
            .select()

        if (error) {
            console.log(error);
        }

        if (data) {
            setSmoothies(prevSmoothies => (prevSmoothies.filter(
                smoothie => smoothie.id !== id
            )))
        }
    }

    useEffect(() => {
        const fetchSmoothies = async () => {
            const {data, error} = await supabase
                .from("smoothies")
                .select()
                .order(orderBy, {ascending: false})

            if (error) {
                setFetchError("Could not fetch the smoothies")
                setSmoothies(null)
                console.log(error);
            }
            if (data) {
                setSmoothies(data)
                setFetchError(null)
            }
        }

        fetchSmoothies()

    }, [orderBy])

  return (
    <div className="page home">
        {fetchError && <p>{fetchError}</p>}
        {smoothies && (
            <div className="smoothies">
                <div className="order-by">
                    <p>Order by:</p>
                    <button onClick={() => setOrderBy('created_at')}>Time Created</button>
                    <button onClick={() => setOrderBy('title')}>Title</button>
                    <button onClick={() => setOrderBy('rating')}>Rating</button>
                    {orderBy}
                </div>
                <div className="smooothie-grid">
                {smoothies.map(smoothie => (
                    <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete}/>
                ))}
                </div>
            </div>
        )}
    </div>
  )
}
