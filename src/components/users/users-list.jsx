import React, { useState, useEffect } from "react";
import axios from "axios";
import { List } from "@mui/material";
import User from "./user";

const API_URL = "http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow"; // we can store this as an environment variable

const UsersList = () => {
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //   const [expandedUserId, setExpandedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        const usersObject = {};
        response.data.items.map((user) => {
            usersObject[user.user_id] = {
                id: user.user_id,
                profileImage: user.profile_image,
                name: user.display_name,
                reputation: user.reputation,
                isFollowed: false,
                isBlocked: false
            };          
        });
        setUsers(usersObject);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <List>
      {Object.keys(users).map(userId => (
        <User details={users[userId]} updateUsers={setUsers} key={userId} />
      ))}
    </List>
  );
};

export default UsersList;
