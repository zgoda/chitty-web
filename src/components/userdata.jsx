import { useState } from 'preact/hooks';
import { set, del } from 'idb-keyval';
import { Save } from 'preact-feather';
import { connect } from 'redux-zero/preact';

import { USER_NAME_KEY } from '../services/storage';
import { actions } from '../services/state';

const mapToProps = ({ userName }) => ({ userName });

const UserDataBoxBase = (({ userName, setUserName, setRemember }) => {

  const [name, setName] = useState(userName);
  const [rememberKey, setRememberKey] = useState(true);

  const canSave = name.length > 0;

  const handleSubmit = (async (e) => {
    e.preventDefault();
    setUserName(name);
    setRemember(rememberKey);
    if (rememberKey) {
      await set(USER_NAME_KEY, name);
    } else {
      await del(USER_NAME_KEY);
    }
  });

  const handleNameInput = ((e) => setName(e.target.value.trim()));

  const toggleRememberKey = (() => setRememberKey(!rememberKey));

  return (
    <div>
      <h3>User settings</h3>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label class="form-switch">
            <input type="checkbox" checked={rememberKey} onClick={toggleRememberKey} />
            <i class="form-icon" /> remember my data
          </label>
        </div>
        <div class="form-group">
          <label class="form-label" for="user-name-input">Name</label>
          <div class="input-group">
            <input
              class="form-input"
              type="text"
              value={name}
              onInput={handleNameInput}
              id="user-name-input"
              placeholder="screen name / handle"
            />
            <button
              class={`btn btn-primary btn-action ${canSave ? '' : 'disabled'}`}
              type="submit"
            >
              <Save />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});

const UserDataBox = connect(mapToProps, actions)(UserDataBoxBase);

export { UserDataBox };
