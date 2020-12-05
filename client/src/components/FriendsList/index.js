import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

export default function FriendsList({ setShowFriends }) {
  return (
    <div className="roomlist friendsBar">
      <div className="friendsBar__nav">
        <button type="button" className="settingBtn" onClick={() => setShowFriends(false)}>
          <FontAwesomeIcon icon={faLongArrowAltLeft} color="white" />
        </button>
        <h2>Friends setting</h2>
      </div>
      <div>
        huuuuuuuuu
      </div>
    </div>
  );
}

FriendsList.propTypes = {
  setShowFriends: PropTypes.func.isRequired,
};
