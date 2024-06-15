import React, { useState, useEffect } from "react";
import './pages_css/About.css';

const AboutPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:5000/search?query=${encodeURIComponent(query)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Elasticsearch Data:', data); // Log Elasticsearch data
        setResults(data); // Assuming data is an array of objects
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Error fetching search results. Please try again later.');
      }
    };

    const debounceTimeout = setTimeout(fetchResults, 300);

    return () => clearTimeout(debounceTimeout);

  }, [query]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setResults([]); // Clear results after selecting an item
  };

  return (
    <div className="about-page">
      <h1>Data Search</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for data"
        />
      </form>
      {error && <p className="error-message">{error}</p>}
      {results.length > 0 && (
        <ul className="results">
          {results.map((item, index) => (
            <li key={index} className="item" onClick={() => handleItemClick(item)}>
              {item._source.Book_title} {/* Adjust based on your data structure */}
            </li>
          ))}
        </ul>
      )}
      {selectedItem && (
        <div className="item-details">
          <h2>{selectedItem._source.Book_title}</h2>
          <p>Author: {selectedItem._source.Book_author}</p>
          <p>Genre: {selectedItem._source.Book_genre}</p>
          <p>Description: {selectedItem._source.Book_description}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default AboutPage;