import React from 'react';
import ProfileCard from '../../components/ProfileCard/';
import ItemsGrid from '../../components/ItemsGrid';
import PropTypes from 'prop-types';

const Profile = ({ user, userItems }) => {
  return (
    <div>
      <ProfileCard key={user.index} user={user} userItems={userItems} />
      <ItemsGrid key={user.index} items={userItems} />
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  userItems: PropTypes.array
};

export default Profile;
