import { useState } from "react"
import DataFetcher from "./components/DataFetcher"
import "./index.css"

export default function App() {
  const [userId, setUserId] = useState(1)

  return (
    <div className="app">
      <h1>Task 42.1 — useEffect + Axios</h1>

      <div className="card">
        <label className="field">
          User ID (1-10)
          <input
            type="number"
            min="1"
            max="10"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
          />
        </label>
      </div>

      <DataFetcher userId={userId} />
    </div>
  )
}