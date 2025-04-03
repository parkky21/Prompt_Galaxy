"use client";
import React, {Suspense} from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import Loading from "@app/profile/loading";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const {id}=React.use(params)

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setUserPosts(data);

    };
    if (id) fetchPosts();
  }, []);


  return (
      <>
          {userPosts.length === 0 ? (
              <Loading />
          ) : (
              <Profile
                  name={userPosts[0]?.username}
                  desc={`Welcome to ${userPosts[0]?.username}'s profile.`}
                  data={userPosts}
              />
          )}
      </>
  );
};

export default UserProfile;
