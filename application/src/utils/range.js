/**
 * Provides a hint about the range in which a given value falls.
 *
 * The function divides the range from 0 to `maxRange` into equal segments
 * (default: 7). Based on the provided `value`, it returns a string indicating
 * the inclusive lower and upper bounds of the segment that contains the value.
 *
 * Example:
 *   getRangeHint(23, 99, 5) -> "The number is between 20 and 39."
 */

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
