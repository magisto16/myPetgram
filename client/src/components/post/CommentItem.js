import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => (
    <ul className='list-group'>
      <li class="list-group-item">
        <div class='post bg-white p-1 my-1'>
          <div>
            <Link to={`/profile/${user}`}>
              <p className='user-name'>{name}</p>
            </Link>
          </div>

          <div>
            <p class='my-1'>{text}</p>
            <p class='post-date'>
              Posted on <Moment format='DD MMM YYYY - HH:mm'>{date}</Moment>
            </p>
          </div>

          <div>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deleteComment(postId, _id)}
                type='button'
                className='btn btn-danger'
              >
                <i className='fas fa-times' />
              </button>
            )}
          </div>
        </div>
      </li>
    </ul>
  );

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
