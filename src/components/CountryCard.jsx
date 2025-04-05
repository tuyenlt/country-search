import React, { useState } from "react";
import './CountryCard.css';

export default function CountryCard({ country }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="country-card" onClick={toggleExpand}>
            <div className="row">
                <img src={country.flags?.png} alt={`${country.name.common} flag`} className="flag" />
                <h2 className="country-name">{country.name.common}</h2>
                <span className="population">Population: {country.population.toLocaleString()}</span>
            </div>

            {isExpanded && (
                <div className="additional-info">
                    <div className="info-row"><strong>Official Name:</strong> {country.name.official}</div>
                    <div className="info-row"><strong>Capital:</strong> {country.capital?.join(", ")}</div>
                    <div className="info-row"><strong>Region:</strong> {country.region}</div>
                    <div className="info-row"><strong>Continents:</strong> {country.continents?.join(", ")}</div>
                    <div className="info-row"><strong>Area:</strong> {`${country.area} Km2`}</div>
                    <div className="info-row"><strong>Top Level Domain:</strong> {country.tld?.join(", ")}</div>
                    <div className="info-row"><strong>Calling Code:</strong> {country.idd?.root}{country.idd?.suffixes?.join(", ")}</div>
                    <div className="info-row"><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</div>
                    <div className="info-row"><strong>Alt Spellings:</strong> {country.altSpellings?.join(", ")}</div>
                    <div className="info-row">
                        <strong>Codes:</strong>
                        <ul>
                            <li>CCA2: {country.cca2}</li>
                            <li>CCA3: {country.cca3}</li>
                            <li>CCN3: {country.ccn3}</li>
                        </ul>
                    </div>
                    <div className="info-row"><strong>Map:</strong> <a href={country.maps?.googleMaps} target="_blank" rel="noreferrer">Google Maps</a></div>
                </div>
            )}
        </div>
    );
}
