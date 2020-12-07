import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { getFriendsRequest } from '../../slices/friendsSlice';

const Friend = ({
  data: { name, avatar }, text, handler,
}) => (
  <div className="room" key={name}>
    <img src={avatar} alt="" />
    <span>{name}</span>
    <button type="button" onClick={handler}>{text}</button>
  </div>
);
export default function FriendsList({ setShowFriends }) {
  const { friendsRequest } = useSelector((state) => state.friends);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendsRequest());
  }, []);

  return (
    <div className="roomlist friendsBar">
      <div className="friendsBar__nav">
        <button type="button" className="settingBtn" onClick={() => setShowFriends(false)}>
          <FontAwesomeIcon icon={faLongArrowAltLeft} color="white" />
        </button>
        <h2>Friends setting</h2>
      </div>
      <div>
        <div>
          {friendsRequest?.map((request) => (
            <Friend data={request} />
          ))}
        </div>
        <div />

      </div>
    </div>
  );
}

FriendsList.propTypes = {
  setShowFriends: PropTypes.func.isRequired,
};
