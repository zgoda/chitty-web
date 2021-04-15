import { useState, useRef } from 'preact/hooks';
import { connect } from 'redux-zero/preact';
import { LogIn, LogOut, UserPlus } from 'preact-feather';

import { actions } from '../services/state';
import { checkUserName, loginUser, registerUser } from '../services/auth';
import { Toast } from './misc';

function LogoutBase({ setIsLoggedIn }) {

  const buttonRef = useRef(null);

  const handleButtonClick = ((e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    buttonRef.current && buttonRef.current.blur();
  });

  return (
    <div class="text-center">
      <button
        type="button"
        class="btn btn-link"
        ref={buttonRef}
        onClick={handleButtonClick}
      >
        <LogOut /> Logout
      </button>      
    </div>
  );
}

const Logout = connect(() => ({}), actions)(LogoutBase);

function AuthSelector() {

  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);

  const loginButtonRef = useRef(null);
  const registerButtonRef = useRef(null);

  const handleLoginButtonClick = ((e) => {
    e.preventDefault();
    setLoginVisible(!loginVisible);
    setRegisterVisible(false);
    loginButtonRef.current && loginButtonRef.current.blur();
  });

  const handleRegisterButtonClick = ((e) => {
    e.preventDefault();
    setRegisterVisible(!registerVisible);
    setLoginVisible(false);
    registerButtonRef.current && registerButtonRef.current.blur();
  });

  return (
    <>
      <h3>Authentication</h3>
      <div class="container">
        <div class="columns">
          <div class="column text-center">
            <button
              type="button"
              class="btn btn-link"
              ref={loginButtonRef}
              onClick={handleLoginButtonClick}
            >
              <LogIn /> Login
            </button>
          </div>
          <div class="column text-center">
            <button
              type="button"
              class="btn btn-link"
              ref={registerButtonRef}
              onClick={handleRegisterButtonClick}
            >
              <UserPlus /> Register
            </button>
          </div>
        </div>
      </div>
      {loginVisible && <LoginForm />}
      {registerVisible && <RegistrationForm />}
    </>
  );
}

function mapToProps({ authHost, secure }) {
  return { authHost, secure };
}

function LoginFormBase({ authHost, secure, setUserName, setToken, setIsLoggedIn }) {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loginResult, setLoginResult] = useState({ token: '', error: '' });

  const formName = 'login';
  const userNameInputId = `${formName}-user-name`;
  const passwordInputId = `${formName}-password`;

  const handleFormSubmit = (async (e) => {
    e.preventDefault();
    const res = await loginUser(authHost, secure, name, password);
    setLoginResult(res);
    if (res.token !== '') {
      setUserName(name);
      setToken(res.token);
    }
    setIsLoggedIn(res.token !== '');
  });

  const closeToast = ((e) => {
    e.preventDefault();
    setLoginResult({ token: '', error: '' });
  });

  return (
    <div>
      <h4>Login</h4>
      {
        loginResult.error !== '' ? 
        <Toast state='error' message={loginResult.error} toggler={closeToast} /> : 
        null
      }
      <form onSubmit={handleFormSubmit}>
        <div class="form-group">
          <label class="form-label" for={userNameInputId}>User name</label>
          <input
            type="text"
            class="form-input"
            id={userNameInputId}
            name="name"
            value={name}
            required
            onInput={(e) => setName(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label class="form-label" for={passwordInputId}>Password</label>
          <input
            type="password"
            class="form-input"
            id={passwordInputId}
            name="password"
            required
            value={password}
            onInput={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="form-group buttons">
          <button type="submit" class="btn btn-primary"><LogIn /> Login</button>
        </div>
      </form>
    </div>
  );
}

const LoginForm = connect(mapToProps, actions)(LoginFormBase);

function RegistrationFormBase(
    { authHost, secure, setUserName, setToken, setIsLoggedIn }
) {
  const [name, setName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [nameHasError, setNameHasError] = useState(false);
  const [nameError, setNameError] = useState('');
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [loginResult, setLoginResult] = useState({ token: '', error: '' });

  const formName = 'register';
  const userNameInputId = `${formName}-user-name`;
  const password1InputId = `${formName}-password1`;
  const password2InputId = `${formName}-password2`;

  const handleNameInput = (async (e) => {
    e.preventDefault();
    const userName = e.target.value;
    setName(userName);
    const rv = await checkUserName(authHost, secure, userName);
    if (rv.ok) {
      setNameHasError(false);
      setNameError('');
      return;
    }
    setNameHasError(true);
    setNameError(rv.message);
  });

  const handleFormSubmit = (async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setPasswordHasError(true);
      return;
    }
    const rv = await registerUser(authHost, secure, name, password1);
    setLoginResult(rv);
    if (rv.token !== '') {
      setUserName(name);
      setToken(rv.token);
      setIsLoggedIn(true);
    }
    setIsLoggedIn(false);
  });

  const closeToast = ((e) => {
    e.preventDefault();
    setLoginResult({ token: '', error: '' });
  });

  return (
    <div>
      <h4>Register</h4>
      {
        loginResult.error !== '' ? 
        <Toast state='error' message={loginResult.error} toggler={closeToast} /> : 
        null
      }
      <form onSubmit={handleFormSubmit}>
        <div class={nameHasError ? 'form-group has-error' : 'form-group'}>
          <label class="form-label" for={userNameInputId}>User name</label>
          <input
            type="text"
            class="form-input"
            id={userNameInputId}
            name="name"
            value={name}
            required
            onInput={handleNameInput}
          />
          {nameHasError && <p class="form-input-hint">{nameError}</p>}
        </div>
        <div class="form-group">
          <label class="form-label" for={password1InputId}>Password</label>
          <input
            type="password"
            class="form-input"
            id={password1InputId}
            name="password1"
            required
            value={password1}
            onInput={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div class={passwordHasError ? 'form-group has-error' : 'form-group'}>
          <label class="form-label" for={password2InputId}>Password (repeat)</label>
          <input
            type="password"
            class="form-input"
            id={password2InputId}
            name="password2"
            required
            value={password2}
            onInput={(e) => setPassword2(e.target.value)}
          />
          {passwordHasError && <p class="form-input-hint">passwords do not match</p>}
        </div>
        <div class="form-group buttons">
          <button type="submit" class="btn btn-primary"><UserPlus /> Register</button>
        </div>
      </form>
    </div>
  );
}

const RegistrationForm = connect(mapToProps, actions)(RegistrationFormBase);

export { AuthSelector, Logout };
