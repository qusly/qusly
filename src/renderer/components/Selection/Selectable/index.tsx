import React from 'react';

interface ISelectableProvided {
  innerRef: React.RefObject<any>;
}

interface Props {
  children?: (provided: ISelectableProvided) => JSX.Element;
}

export const Selectable = (props: Props) => {
  const ref = React.createRef<any>();

  const children = React.useMemo(() => {
    return props.children({ innerRef: ref });
  }, [props.children]);

  return children;
};
