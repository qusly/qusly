import React from 'react';

export const useLargeState = <T>(
  initialState: T,
): [T, (newState: Partial<T>) => void] => {
  const [state, _setState] = React.useState<T>(initialState);

  const setState = React.useCallback(
    newState => {
      _setState({ ...state, ...newState });
    },
    [state],
  );

  return [state, setState];
};
