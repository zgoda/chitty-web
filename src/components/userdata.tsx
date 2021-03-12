import { h, JSX } from 'preact';
import { useState, useContext } from 'preact/hooks';

import { UserNameOperator, RememberUserOperator } from '../services/state';

const UserDataBox = ((): JSX.Element => {

  const nameOp = useContext(UserNameOperator);
  const rememberOp = useContext(RememberUserOperator);

  const [name, setName] = useState('');
  const [remenberKey, setRememberKey] = useState(true);

  const handleSubmit = ((e: Event) => {
    e.preventDefault();
    nameOp.setName(name);
    rememberOp.setRemember(remenberKey);
  });

  const handleNameInput = ((e: Event) => setName((e.target as HTMLInputElement).value));

  const toggleRememberKey = (() => setRememberKey(!remenberKey));

  return (
    <div>
      <h3>User settings</h3>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label class="form-label" for="user-name-input">Name</label>
          <input
            class="form-input"
            type="text"
            value={name}
            onInput={handleNameInput}
            id="user-name-input"
            placeholder="screen name / handle"
          />
        </div>
        <div class="form-group">
          <label class="form-switch">
            <input type="checkbox" checked={remenberKey} onClick={toggleRememberKey} />
            <i class="form-icon" /> remember my data
          </label>
        </div>
      </form>
    </div>
  );
});

export { UserDataBox };
