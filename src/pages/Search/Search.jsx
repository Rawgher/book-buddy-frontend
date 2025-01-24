import React, { useState } from "react";
import BookBuddyApi from "../../helpers/api";
import BookCard from "../../components/BookCardSearch/BookCardSearch";
import "./Search.css";

function BookSearch() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstSearch, setIsFirstSearch] = useState(true);

  // Handles the book search API call
  async function handleSearch(evt) {
    evt.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      let apiQuery = "";
      switch (searchType) {
        case "title":
          apiQuery = `intitle:${query}`;
          break;
        case "author":
          apiQuery = `inauthor:${query}`;
          break;
        case "genre":
          apiQuery = `subject:${query}`;
          break;
        default:
          apiQuery = query;
      }

      const results = await BookBuddyApi.searchBooks(apiQuery);
      setIsFirstSearch(false);
      setBooks(results);
    } catch (err) {
      console.error("Error searching books:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="Search">
      <div className="Search-top-div">
        <h1>Find books for your reading list</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="Search-form">
          <div className="Search-form-div">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Enter ${searchType}`}
            />
            <select
              id="searchType"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="genre">Genre</option>
            </select>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* Results Section */}

      {isLoading ? (
        <div className="Search-results-loading">
          <p>Results loading...</p>
        </div>
      ) : (
        <div className="Search-results">
          {books.length
            ? books.map((book) => <BookCard key={book.id} book={book} />)
            : !isFirstSearch && (
                <p>
                  No results found. Please try again or use a different title.
                </p>
              )}
        </div>
      )}
    </div>
  );
}

export default BookSearch;
