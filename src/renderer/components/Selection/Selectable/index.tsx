import React from 'react';

import { SelectionContext } from '../SelectionArea';

interface Props {
  data: any;
  children?: (ref: React.Ref<any>) => JSX.Element;
}

let _id = 0;

export const Selectable = (props: Props) => {
  const { registry } = React.useContext(SelectionContext);

  const id = React.useRef(_id++);
  const ref = React.useRef<any>();

  const setRef = React.useCallback((el: HTMLElement) => {
    ref.current = el;
  }, []);

  React.useLayoutEffect(() => {
    registry.register({ id: id.current, data: props.data, ref });

    return () => {
      registry.unregister(id.current);
    };
  }, [registry]);

  return props.children(setRef);
};
