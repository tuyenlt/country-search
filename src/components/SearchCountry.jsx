import { useState } from "react";
import axios from "axios";
import CountryCard from "./CountryCard";
import './SearchCountry.css';

const api = axios.create({
    baseURL: "https://restcountries.com/v3.1/",
    // headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer mi3NokLHKstU5SsUCXI1mlDSQKrIzBD3cyjBGOdC`
    // }
});

async function onSearch(query, filter) {
    console.log(`Searching for ${query} by ${filter}`);
    let options = `/${filter}/${query}`;
    try {
        const response = await api.get(options);
        console.log("Search results:", response.data);
        return Object.values(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`No results found for ${filter} ${query}`);
            return [];
        }
        console.error(`Error fetching country by ${filter} ${query}:`, error);
        throw error;
    }
}

export default function SearchCountry() {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('name');
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('name');
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;
        setLoading(true);
        try {
            const results = await onSearch(query, filter);
            setCountries(results);
            if (results.length === 0) {
                setError(`No results found for country ${filter} : "${query}"`);
            } else {
                setError(null);
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
            alert("An error occurred while fetching the data", error);
        }
        setLoading(false);
    };

    const handleSortChange = (e) => {
        const sortOption = e.target.value;
        setSortBy(sortOption);
        setCountries((prevCountries) => {
            return prevCountries.sort((a, b) => {
                if (sortOption === 'name') {
                    return a.name.common.localeCompare(b.name.common);
                }
                if (sortOption === 'population-desc') {
                    return b.population - a.population;
                }
                if (sortOption === 'population') {
                    return a.population - b.population;
                }
                if (sortOption === 'area') {
                    return b.area - a.area;
                }
                if (sortOption === 'area-desc') {
                    return a.area - b.area;
                }
                return 0;
            });
        });
    };

    return (
        <div className="search-country-container">
            <h1 className="search-title">COUNTRY SEARCHING WEB</h1>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for a country..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
                <div className="options-group">
                    <div className="filter-group">
                        <label>Search by:</label>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="search-select"
                        >
                            <option value="name">Name</option>
                            <option value="capital">Capital</option>
                            <option value="region">Region</option>
                            <option value="lang">Language</option>
                        </select>
                    </div>
                    <div className="sort-group">
                        <label>Sort by:</label>
                        <select
                            value={sortBy}
                            onChange={handleSortChange}
                            className="sort-select"
                        >
                            <option value="name">Name</option>
                            <option value="population">Population (asc)</option>
                            <option value="population-desc">Population (desc)</option>
                            <option value="area">Area (asc)</option>
                            <option value="area-desc">Area (desc)</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="search-button">Search</button>
            </form>

            {loading ? (
                <div className="loading-spinner">Loading...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) :
                (
                    <div className="results">
                        {countries.map((country) => (
                            <CountryCard key={country.cca3} country={country} />
                        ))}
                    </div>
                )}
        </div>
    );
}
