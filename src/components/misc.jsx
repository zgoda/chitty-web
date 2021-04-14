function Toast({ state, message, toggler }) {
  return (
    <div class={`toast toast-${state}`}>
      <button class="btn btn-clear float-right" onClick={toggler} />
      {message}
    </div>
  );
}

export { Toast };
