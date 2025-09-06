export function getRangeHint(value, maxRange, segments = 7) {
  const size = Math.floor((maxRange + 1) / segments) || 1;

  for (let i = 0; i < segments; i++) {
    const min = i * size;
    const max = i === segments - 1 ? maxRange : (i + 1) * size - 1;
    if (value >= min && value <= max) {
      return `The number is between ${min} and ${max}.`;
    }
  }

  return `The number is between 0 and ${maxRange}.`;
}
