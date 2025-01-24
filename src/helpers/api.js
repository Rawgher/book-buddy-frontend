import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:5000";

class BookBuddyApi {
  static token;

  /** Base method to make requests to your backend API */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${BookBuddyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response?.data?.error?.message || "An error occurred.";
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Authenticate user and retrieve a token */
  static async login(data) {
    let res = await this.request("auth/token", data, "POST");
    return res.token;
  }

  /** Register a new user and retrieve a token */
  static async signup(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  /** Get details about the logged-in user */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get all users */
  static async getUsers(page = 1, limit = 8) {
    let res = await this.request(`users`, { page, limit }, "get");
    return res;
  }

  /** Update user details */
  static async updateUser(data) {
    let res = await this.request(`users/${data.username}`, data, "patch");
    return res.user;
  }

  /** Search for books using API */
  static async searchBooks(query) {
    if (!query || query.trim() === "") {
      throw new Error("Search query cannot be empty");
    }
  
    const endpoint = `https://www.googleapis.com/books/v1/volumes`;
    const params = { q: query, key: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY };
  
    try {
      const response = await axios.get(endpoint, { params });
      const items = response.data.items || []; 
      return items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title || "No Title",
        authors: item.volumeInfo.authors?.join(", ") || "Unknown Author",
        thumbnailUrl: item.volumeInfo.imageLinks?.thumbnail || "",
      }));
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response?.data?.error?.message || "An error occurred.";
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Save a book to the user's profile */
  static async saveBook(bookData) {
    let res = await this.request("books", bookData, "POST");
    return res.book;
  }

  /** Get all a user's books */
  static async getSavedBooks() {
    const res = await this.request("books/saved");
    return res.books;
  }

  /** Update a book's comment */
  static async updateComment(bookId, comment) {
    let res = await this.request(`books/${bookId}/comment`, { comment }, "patch");
    return res.updatedBook;
  }

  /** Delete a saved book */
  static async deleteBook(bookId) {
    let res = await this.request(`books/${bookId}`, {}, "delete");
    return res.deleted;
  }
}

export default BookBuddyApi;
