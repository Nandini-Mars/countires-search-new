import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL =
    "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

  // Fetch countries data from the API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(URL);
        setCountries(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);
  console.log(countries);

  // Filter countries based on search term
  const filteredCountries = countries.filter((country) =>
    country.common.includes(searchTerm)
  );

  return (
    <div className="App">
      <h1>Country Search</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      {error && <p>Error loading countries. Please try again later.</p>}

      {!loading && !error && (
        <div className="countryList">
          {filteredCountries.length === 0 ? (
            <p>No results found.</p>
          ) : (
            filteredCountries.map((country) => (
              <div key={country.alpha3Code} className="countryCard">
                <img src={country.png} alt={`Flag of ${country.common}`} />
                <h2>{country.common}</h2>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default App;
