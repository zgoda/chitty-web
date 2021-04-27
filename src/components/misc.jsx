/**
 * @typedef {Object} ToastProps
 * @property {string} state
 * @property {string} message
 * @property {Function<MouseEvent>} toggler
 */

/**
 * 
 * @param {ToastProps} props
 * @returns JSX.Element
 */
function Toast({ state, message, toggler }) {
  return (
    <div class={`toast toast-${state}`}>
      <button class="btn btn-clear float-right" onClick={toggler} />
      {message}
    </div>
  );
}

export { Toast };
