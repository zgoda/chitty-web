import { h, JSX } from 'preact';
import { useState } from 'preact/hooks';
import { Send } from 'preact-feather';

const MessageEditor = ((): JSX.Element => {

  const [messageText, setMessageText] = useState('');

  const handleMessageTextInput =
    ((e: Event) => setMessageText((e.target as HTMLInputElement).value));

  const handleSubmit = ((e: Event) => {
    e.preventDefault();
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label class="form-label" for="message-editor-input">Message:</label>
          <div class="input-group">
            <input
              class="form-input"
              type="text"
              value={messageText}
              onInput={handleMessageTextInput}
              id="message-editor-input"
              placeholder="message"
            />
            <button class="btn btn-primary btn-action" type="submit">
              <Send />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});

export { MessageEditor };
