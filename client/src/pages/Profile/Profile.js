import React from 'react';
import ProfileCard from '../../components/ProfileCard/';
import ItemsGrid from '../../components/ItemsGrid';

const Profile = ({ classes, user, userItems }) => {
  console.log(userItems.length);
  return (
    <div>
      <ProfileCard key={user.index} user={user} userItems={userItems} />
      <ItemsGrid key={user.index} items={userItems} />
    </div>
  );
};

export default Profile;
