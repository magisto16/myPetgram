import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  return (
    <div class='post-form'>

      <form
        class='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost({ text });
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
          placeholder='Create a post'
          required
        />
        <input type='submit' class='btn btn-success my-1' value='Post' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);
