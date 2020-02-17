export const arraysEqual = (first: any[], second: any[]) => {
  if (first == null && second == null) return true;

  if (first == null || second == null) return false;

  if (first.length !== second.length) return false;

  for (let i = first.length; i--; ) {
    if (first[i] !== second[i]) {
      return false;
    }
  }

  return true;
};
