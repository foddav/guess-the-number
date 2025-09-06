import HelpItem from "./HelpItem";

function HelpList({
  hintEvenOdd,
  hintDiv3,
  hintRange,
  revealEvenOdd,
  revealDivBy3,
  revealRange,
}) {
  return (
    <div id="helpList">
      <HelpItem
        id="firstHelp"
        label="1. Help: Even or Odd"
        revealedText={hintEvenOdd}
        onReveal={revealEvenOdd}
      />
      <HelpItem
        id="secondHelp"
        label="2. Help: Is it divisible by three?"
        revealedText={hintDiv3}
        onReveal={revealDivBy3}
      />
      <HelpItem
        id="thirdHelp"
        label="3. Help: Range hint"
        revealedText={hintRange}
        onReveal={revealRange}
      />
    </div>
  );
}

export default HelpList;
