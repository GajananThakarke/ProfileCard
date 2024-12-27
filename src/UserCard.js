// src/UserCard.js
import React from 'react';

const UserCard = ({ user }) => {
  if (!user) return null;

  const { picture, name, email, phone, location } = user;

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
      <div className="flex items-center px-6 py-4">
        <img
          className="w-24 h-24 object-cover rounded-full"
          src={picture.large}
          alt={`${name.first} ${name.last}`}
        />
        <div className="mx-3">
          <h2 className="text-xl font-semibold text-gray-800">
            {name.first} {name.last}
          </h2>
          <p className="text-gray-600">{email}</p>
          <p className="text-gray-600">{phone}</p>
          <p className="text-gray-600">
            {location.city}, {location.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;