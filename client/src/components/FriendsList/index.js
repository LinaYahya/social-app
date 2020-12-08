/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import {
  getFriendsRequest,
  getSuggestedFriends,
  addFriend,
  respondFriendRequest,
} from '../../slices/friendsSlice';
import './style.css';

const Friend = ({ data: { name, avatar }, children }) => (
  <div className="user">
    <div>
      <img
        src="https://res.cloudinary.com/dacf3uopo/image/upload/c_scale,h_50,r_500,w_50/v1605737001/qyrth98fqt0l4pwjfa50.jpg"
        alt=""
      />
      <span>{name}</span>
    </div>
    {children}
  </div>
);
export default function FriendsList({ setShowFriends }) {
  const [row, setRow] = useState(0);

  const { friendsRequest } = useSelector((state) => state.friends);
  const { suggestedFriends } = useSelector((state) => state.friends);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendsRequest());
  }, []);

  useEffect(() => {
    dispatch(getSuggestedFriends(row));
  }, [row]);

  return (
    <div className="roomlist friendsBar">
      <div className="friendsBar__nav">
        <button
          type="button"
          className="settingBtn"
          onClick={() => setShowFriends(false)}
        >
          <FontAwesomeIcon icon={faLongArrowAltLeft} color="white" />
        </button>
        <h2>Friends setting</h2>
      </div>
      <div className="userList">
        {friendsRequest?.length ? (
          <div>
            <h3> Friends request</h3>
            {friendsRequest?.map((user) => (
              <Friend key={user._id} data={user}>
                <button
                  type="button"
                  onClick={() => dispatch(
                    respondFriendRequest({
                      friendID: user._id,
                      respond: true,
                    }),
                  )}
                >
                  Accept Friend
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(
                    respondFriendRequest({
                      friendID: user._id,
                      respond: false,
                    }),
                  )}
                >
                  Cancel Request
                </button>
              </Friend>
            ))}
          </div>
        ) : null}
        {suggestedFriends?.length ? (
          <div>
            <h3>Suggested Friends</h3>
            {suggestedFriends?.map((user) => (
              <Friend key={user._id} data={user}>
                <button
                  type="button"
                  onClick={() => dispatch(addFriend(user._id))}
                >
                  Add friend
                </button>
              </Friend>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

Friend.propTypes = {
  data: PropTypes.objectOf({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};
FriendsList.propTypes = {
  setShowFriends: PropTypes.func.isRequired,
};
