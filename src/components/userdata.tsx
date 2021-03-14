import { h, JSX } from 'preact';
import { useState, useContext } from 'preact/hooks';
import { set, del } from 'idb-keyval';
import { Save } from 'preact-feather';

import {
  UserNameOperator, RememberUserOperator, USER_NAME_KEY
} from '../services/state';

const UserDataBox = ((): JSX.Element => {

  const nameOp = useContext(UserNameOperator);
  const rememberOp = useContext(RememberUserOperator);

  const [name, setName] = useState('');
  const [rememberKey, setRememberKey] = useState(true);

  const handleSubmit = (async (e: Event) => {
    e.preventDefault();
    nameOp.setName(name);
    rememberOp.setRemember(rememberKey);
    if (rememberKey) {
      await set(USER_NAME_KEY, name);
    } else {
      await del(USER_NAME_KEY);
    }
  });

  const handleNameInput = ((e: Event) => setName((e.target as HTMLInputElement).value));

  const toggleRememberKey = (() => setRememberKey(!rememberKey));

  return (
    <div>
      <h3>User settings</h3>
      <form onSubmit={handleSubmit}>
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
            <button class="btn btn-primary btn-action" type="submit">
              <Save />
            </button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-switch">
            <input type="checkbox" checked={rememberKey} onClick={toggleRememberKey} />
            <i class="form-icon" /> remember my data
          </label>
        </div>
      </form>
    </div>
  );
});

export { UserDataBox };
