import Button from "./Button";
function HelpItem({ id, label, revealedText, onReveal, disabled = false }) {
  if (revealedText) {
    return <div id={id}>{revealedText}</div>;
  }

  return (
    <Button id={id} content={label} onClick={onReveal} disabled={disabled} />
  );
}

export default HelpItem;
