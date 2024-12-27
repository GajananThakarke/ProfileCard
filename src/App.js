import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // To track the current user index
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?page=1&results=10&seed=abc');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setUsers(data.results);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const nextUser = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const prevUser = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + users.length) % users.length);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch users</div>;
  if (users.length === 0) return <div>No users available</div>;

  return (
    <div className="user-container">
      <UserCard user={users[currentIndex]} />
      <div className="buttons-container">
        <button className="btn" onClick={prevUser}>
          Previous
        </button>
        <button className="btn" onClick={nextUser}>
          Next
        </button>
      </div>
    </div>
  );
};

const UserCard = ({ user }) => {
  const { picture, name, gender, phone } = user;

  return (
    <div className="user-card">
      <img className="user-img" src={picture.large} alt={`${name.first} ${name.last}`} />
      <div className="user-info">
        <h2 className="font-bold">{`${name.first} ${name.last}`}</h2>
        <p className="text-gray-600 capitalize">{`Gender: ${gender}`}</p>
        <p className="text-gray-600">{`Phone: ${phone}`}</p>
      </div>
    </div>
  );
};

export default App;