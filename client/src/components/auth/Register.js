import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import regImg from '../../img/showcase.jpg';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div class="container-fluid">
        <div class="col-md-5">

          <div class="card">
            <div class="view overlay">
              <img className='card-img-top' src={regImg} />
            </div>

            <div class="card-body">
              <div class="w3-container w3-tangerine">
                <p class="w3-xxxlarge">myPetgram</p>
              </div>
              <form className='login-form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                  <div className='input-group'>
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <span class="fa fa-user"></span>
                      </span>
                    </div>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='Name'
                      name='name'
                      value={name}
                      onChange={e => onChange(e)}
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <div className='input-group'>
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <span class="fa fa-envelope"></span>
                      </span>
                    </div>
                    <input
                      className='form-control'
                      type='email'
                      placeholder='Email Address'
                      name='email'
                      value={email}
                      onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                      This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small>
                  </div>
                </div>

                <div className='form-group'>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <span class="fa fa-lock"></span>
                      </span>
                    </div>
                    <input
                      className='form-control'
                      type='password'
                      placeholder='Password'
                      name='password'
                      value={password}
                      onChange={e => onChange(e)}
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <span class="fa fa-lock"></span>
                      </span>
                    </div>
                    <input
                      className='form-control'
                      type='password'
                      placeholder='Confirm Password'
                      name='password2'
                      value={password2}
                      onChange={e => onChange(e)}
                    />
                  </div>
                </div>

                <div className='buttons'>
                  <input type='submit' className='btn btn-success' value='Register' />
                </div>
              </form>
              <div className='smalls'>
                <small>Already have an account? <Link to='/login'>Sign In</Link></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Register.prototype = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
