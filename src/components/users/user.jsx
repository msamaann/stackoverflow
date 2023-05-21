import React, { useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Collapse,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";

const User = ({ details, updateUsers }) => {
  const [expandedUserId, setExpandedUserId] = useState(null);

  const handleFollow = (userId) => {
    updateUsers((prevUsers) => {
      const updatedUsers = { ...prevUsers };
      updatedUsers[userId] = {
        ...updatedUsers[userId],
        isFollowed: !details.isFollowed,
      };
      return updatedUsers;
    });
  };

  const handleBlock = (userId) => {
    updateUsers((prevUsers) => {
      const updatedUsers = { ...prevUsers };
      updatedUsers[userId] = {
        ...updatedUsers[userId],
        isBlocked: !details.isBlocked,
      };
      return updatedUsers;
    });
  };

  const handleTap = (userId) => {
    if (details.isBlocked) {
      setExpandedUserId(null);
    } else {
      if (userId && expandedUserId !== userId) {
        setExpandedUserId(details.id);
      } else {
        setExpandedUserId(null);
      }
    }
  };

  return (
    <React.Fragment key={details.id}>
      <ListItem
        onClick={() => handleTap(details.id)}
        sx={details.isBlocked ? { filter: "grayscale(1)" } : {}}
      >
        <ListItemAvatar>
          <Avatar src={details.profileImage} alt={details.name} />
        </ListItemAvatar>
        <ListItemText
          primary={details.name}
          secondary={`Reputation: ${details.reputation}`}
        />
        {details.isFollowed && <CheckCircleIcon />}
        {details.isBlocked && <BlockIcon />}
      </ListItem>

      <Collapse in={expandedUserId === details.id} timeout="auto">
        <Box pl={4}>
          {details.isFollowed ? (
            <Button variant="outlined" onClick={() => handleFollow(details.id)}>
              Unfollow
            </Button>
          ) : (
            <Button variant="outlined" onClick={() => handleFollow(details.id)}>
              Follow
            </Button>
          )}
          &nbsp;
          {details.isBlocked ? (
            <Button variant="outlined" onClick={() => handleBlock(details.id)}>
              Blocked
            </Button>
          ) : (
            <Button variant="outlined" onClick={() => handleBlock(details.id)}>
              Block
            </Button>
          )}
        </Box>
      </Collapse>
    </React.Fragment>
  );
};

export default User;
