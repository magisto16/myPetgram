import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');
  return (
    <div class='post-form'>
      <form
        class='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          className='form-control'
          name='text'
          value={text}
          onChange={e => setText(e.target.value)}
          cols='30'
          rows='5'
          placeholder='Create a comment'
          required
        />
        <input type='submit' class='btn btn-success my-1' value='Comment' />
      </form>
      <p className='w3-tangerine'>All Comments</p>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
