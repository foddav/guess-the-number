function Button({ id, onClick, content, disabled = false }) {
  return (
    <button id={id} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}

export default Button;
