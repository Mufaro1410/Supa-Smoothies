import { useEffect, useState } from "react"
import supabase from "../supabaseClient"
import SmoothieCard from "../components/SmoothieCard"

export default function Home() {
    const [fetchError, setFetchError] = useState(null)
    const [smoothies, setSmoothies] = useState(null)

    useEffect(() => {
        const fetchSmoothies = async () => {
            const {data, error} = await supabase.from("smoothies").select()

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

    }, [])

  return (
    <div className="page home">
        {fetchError && <p>{fetchError}</p>}
        {smoothies && (
            <div className="smoothies">
                <div className="smooothie-grid">
                {smoothies.map(smoothie => (
                    <SmoothieCard key={smoothie.id} smoothie={smoothie}/>
                ))}
                </div>
            </div>
        )}
    </div>
  )
}
