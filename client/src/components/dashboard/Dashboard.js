import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
      <Fragment>
        <p className='lead'>
          <i className='fas fa-user' /> Welcome to dashboard, <span className='span-lead'>{user && user.name}</span>
        </p>
        {profile !== null ? (
          <Fragment>
            <div className="edit-delete">
              <DashboardActions />

              <div className='my-2'>
                <button className='btn btn-danger' onClick={() => deleteAccount()}>
                  <i className='fas fa-user-minus' /> Delete My Account
              </button>
              </div>
            </div>
          </Fragment>
        ) : (
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to='create-profile' className='btn btn-success my-1'>
                Create Profile
          </Link>
            </Fragment>
          )}
      </Fragment>
    );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
