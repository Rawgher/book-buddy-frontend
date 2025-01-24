import React, { useState, useEffect } from "react";
import BookBuddyApi from "../../helpers/api";
import UserCard from "../../components/UserCard/UserCard";
import "./UserSearch.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      try {
        console.debug("Fetching users for page:", currentPage);
        const { users, totalPages } = await BookBuddyApi.getUsers(currentPage);
        setUsers(users);
        setTotalPages(totalPages);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, [currentPage]);

  function handlePageChange(newPage) {
    if (newPage > 0 && newPage <= totalPages) {
      console.debug("Changing to page:", newPage);
      setCurrentPage(newPage); // Triggers useEffect to fetch new users
    }
  }

  return (
    <div className="UserSearch">
      <h1>All Users</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="UserSearch-card-div">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="UserSearch-bottom-div">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="UserSearch-card-btn"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="UserSearch-card-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserList;
