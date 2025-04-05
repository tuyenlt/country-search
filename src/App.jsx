import { useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query) return

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${query}`)
      if (!response.ok) throw new Error('Country not found')
      const data = await response.json()
      setCountries(data)
    } catch (error) {
      console.error(error)
      setCountries([])
    }
  }

  return (
    <div className="App">
      <h1>Country Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="results">
        {countries.map((country) => (
          <div key={country.cca3} className="country">
            <h2>{country.name.common}</h2>
            <img src={country.flags.svg} alt={`${country.name.common} flag`} />
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App