import React from 'react';
import ProfileCard from '../../components/ProfileCard/';
import ItemsGrid from '../../components/ItemsGrid';

const Profile = ({ user, userItems }) => {
  return (
    <div>
      <ProfileCard key={user.index} user={user} userItems={userItems} />
      <ItemsGrid key={user.index} items={userItems} />
    </div>
  );
};

export default Profile;
