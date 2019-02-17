import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { AppContext } from './ContextProvider';
import { useFormInput, useFormValidation } from '../helpers/hooks';


const Login = (props) => {
  const { layout, user, userActions } = useContext(AppContext);
  const { redirectToReferrer, formSubmitted, message } = layout;

  const email = useFormInput('');
  const password = useFormInput('');
  const twoFACode = useFormInput('');

  const formValidation = (email.value !== '' && password.value !== '');
  const formValid = useFormValidation(formValidation);

  if (user.loggedIn) return <Redirect to="/" />;

  if (redirectToReferrer) {
    const { from } = props.location.state || { from: { pathname: '/' } };
    return <Redirect to={from} />;
  }

  return (
    <div className="signin-wrapper">

      <div className="signin-box">
        <h2 className="slim-logo"><a href="/">Conceal</a> <span className="beta-header">BETA</span></h2>
        <h2 className="signin-title-primary">Welcome back!</h2>
        <h3 className="signin-title-secondary">Sign in to continue.</h3>

        <form onSubmit={(e) => userActions.loginUser(e, email.value, password.value, twoFACode.value)}>
          <div className="form-group">
            <input
              {...email}
              placeholder="Enter your email"
              type="email"
              name="email"
              className="form-control"
              minLength={4}
            />
          </div>

          <div className="form-group mg-b-50">
            <input
              {...password}
              placeholder="Enter your password"
              type="password"
              name="password"
              className="form-control"
              minLength={8}
            />
          </div>

          <div className="form-group mg-b-50">
            <input
              {...twoFACode}
              placeholder="2-Factor Authentication (if enabled)"
              type="number"
              name="twoFA"
              className="form-control"
              minLength={6}
              maxLength={6}
            />
          </div>

          {message &&
            <div className="text-danger text-center">{message}</div>
          }

          <button
            type="submit"
            disabled={formSubmitted || !formValid}
            className="btn btn-primary btn-block btn-signin"
          >
            {formSubmitted ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mg-b-0">Don't have an account? <Link to="/signup">Sign Up</Link></p>
        <p className="mg-b-0">Forgot your password? <Link to="/reset_password">Reset It</Link></p>
      </div>
      ​
    </div>
  )
};

export default Login;
