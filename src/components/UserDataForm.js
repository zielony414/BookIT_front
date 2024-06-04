import React, { useState, useEffect } from 'react';

const UserDataForm = ({ userId, getUserInfo }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`https://book-it-back.vercel.app/api/user_info?user_id=${userId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${data.error}`);
        }

        setUserInfo(data);
        getUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return (
    <div>
      {userInfo ? (
        <div key={userInfo.email} className="self-end ml-5 mb-5 mr-45 -mb-px text-xl text-zinc-700">
          {userInfo.email}
          <br />
          tel: {userInfo.tel_nr}
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default UserDataForm;
