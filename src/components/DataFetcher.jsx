import { useEffect, useState } from "react"
import axios from "axios"

export default function DataFetcher({ userId = "1" }) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!userId) {
            setLoading(false)
            setError("")
            setData(null)
            return
        }

        const idNumber = Number(userId)
        const isValid =
            Number.isInteger(idNumber) && idNumber >= 1 && idNumber <= 10

        if (!isValid) {
            setLoading(false)
            setData(null)
            setError("Введіть коректний User ID (1–10).")
            return
        }

        let isMounted = true

        async function fetchUser() {
            try {
                setLoading(true)
                setError("")

                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/users/${idNumber}`
                )

                if (isMounted) {
                    setData(response.data)
                }
            } catch (err) {
                if (isMounted) {
                    setData(null)
                    setError("Не вдалося завантажити дані. Спробуйте ще раз.")
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchUser()

        return () => {
            isMounted = false
        }
    }, [userId])

    if (!userId) {
        return <p className="muted">Введіть User ID (1–10).</p>
    }

    if (loading) return <p>Завантаження даних...</p>
    if (error) return <p className="error">{error}</p>

    return (
        <div className="card">
            <h2>DataFetcher (Axios)</h2>

            {data ? (
                <>
                    <p>
                        <strong>Name:</strong> {data.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {data.email}
                    </p>
                    <p>
                        <strong>City:</strong> {data.address?.city}
                    </p>
                </>
            ) : (
                <p>Даних немає</p>
            )}
        </div>
    )
}