"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const {id}=React.use(params)

  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts[0])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setUserPosts(data);

    };
    if (id) fetchPosts();
  }, []);

  console.log(userPosts[0])

  return (
    <Profile
      name={userPosts[0].username}
      desc={`Welcome to ${userPosts[0].username}'s personalized profile page. Explore ${userPosts[0].username}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
