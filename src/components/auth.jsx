import { useState } from 'preact/hooks';
import { connect } from 'redux-zero/preact';
import { LogIn } from 'preact-feather';

import { actions } from '../services/state';
import { checkUserName, loginUser } from '../services/auth';

function mapToProps({ hostName, secure }) {
  return { hostName, secure };
}

function LoginFormBase({ hostName, secure, setUserName, setToken }) {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const formName = 'login';
  const userNameInputId = `${formName}-user-name`;
  const passwordInputId = `${formName}-password`;

  const handleFormSubmit = (async (e) => {
    e.preventDefault();
    const token = await loginUser(hostName, secure, name, password);
    if (token != null) {
      setUserName(name);
      setToken(token);
    } 
  });

  return (
    <div>
      <h3>Login</h3>
      <form class="form-horizontal" onSubmit={handleFormSubmit}>
        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label" for={userNameInputId}>User name</label>
          </div>
          <div class="col-9 col-sm-12">
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
        </div>
        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label" for={passwordInputId}>Password</label>
          </div>
          <div class="col-9 col-sm-12">
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
        </div>
        <div class="form-group">
          <div class="col-3 col-sm-12" />
          <div class="col-9 col-sm-12">
            <button type="submit"><LogIn /> Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

const LoginForm = connect(mapToProps, actions)(LoginFormBase);

function RegistrationFormBase({ hostName, secure, setUserName, setToken }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameHasError, setNameHasError] = useState(false);
  const [nameError, setNameError] = useState('');

  const formName = 'register';
  const userNameInputId = `${formName}-user-name`;
  const passwordInputId = `${formName}-password`;

  const handleNameInput = (async (e) => {
    e.preventDefault();
    const userName = e.target.value;
    setName(userName);
    const rv = await checkUserName(hostName, secure, userName);
    if (rv.ok) {
      setNameHasError(false);
      setNameError('');
    } else {
      setNameHasError(true);
      setNameError(rv.message);
    }
  });

  return (
    <div>
      <h3>Login</h3>
      <form class="form-horizontal">
        <div class={nameHasError ? 'form-group has-error' : 'form-group'}>
          <div class="col-3 col-sm-12">
            <label class="form-label" for={userNameInputId}>User name</label>
          </div>
          <div class="col-9 col-sm-12">
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
        </div>
        <div class="form-group">
          <div class="col-3 col-sm-12">
            <label class="form-label" for={passwordInputId}>Password</label>
          </div>
          <div class="col-9 col-sm-12">
            <input
              type="password"
              class="form-input"
              id={passwordInputId}
              name="password"
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
}

const RegistrationForm = connect(mapToProps, actions)(RegistrationFormBase);

export { LoginForm, RegistrationForm };
