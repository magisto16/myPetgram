import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, created_at },
  showActions
}) => (
    <div className='card'>
      <div className='card-header'>
        <Link to={`/profile/${user}`}>
          <p className='user-name'>{name}</p>
        </Link>
      </div>

      <div className='card-body'>
        <div className='post bg-white p-1 my-1'>
          <div>
            <Link to={`/profile/${user}`}>
              <img className='round-img' src={avatar} alt='' />

            </Link>
          </div>
          <div>
            <p className='my-1'>{text}</p>
            <p className='post-date'>
              Posted on <Moment format='DD MMM YYYY - HH:mm'>{created_at}</Moment>
            </p>

            {showActions && (
              <Fragment>
                <button
                  onClick={() => addLike(_id)}
                  type='button'
                  className='btn btn-light'
                >
                  <i className='fas fa-thumbs-up' />
                  {likes.length > 0 && <span> {likes.length}</span>}
                </button>
                <button
                  onClick={() => removeLike(_id)}
                  type='button'
                  className='btn btn-light'
                >
                  <i className='fas fa-thumbs-down' />
                </button>
                <Link to={`/posts/${_id}`} className='btn btn-info'>
                  <i className='fas fa-comment' />{' '}
                  {comments.length > 0 && (
                    <span className='comment-count'>{comments.length}</span>
                  )}
                </Link>
                {!auth.loading && user === auth.user._id && (
                  <button
                    onClick={() => deletePost(_id)}
                    type='button'
                    className='btn btn-danger'
                  >
                    <i className='fas fa-times' />
                  </button>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
