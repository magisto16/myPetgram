import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import loginImg from '../../img/showcase.jpg';


const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
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
              <img className='card-img-top' src={loginImg} />
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
                      type='email'
                      placeholder='Email Address'
                      name='email'
                      value={email}
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
                      placeholder='Password'
                      name='password'
                      value={password}
                      onChange={e => onChange(e)}
                    />
                  </div>
                </div>

                <div className='buttons'>
                  <input type='submit' className='btn btn-success' value='Login' />
                </div>
              </form>
              <div className='smalls'>
                <small>Don't have an account? <Link to='/register'><b>Sign Up</b></Link></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
