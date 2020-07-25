import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Dave Tokar",
      image:
        "https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.0-9/37295147_10156470862909556_5196812270977417216_n.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=sSCYJ_Obf60AX9AglbL&_nc_ht=scontent.fsdv3-1.fna&oh=5cc31568d89d29c8e74159cbb60b4626&oe=5F40C4F6",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
