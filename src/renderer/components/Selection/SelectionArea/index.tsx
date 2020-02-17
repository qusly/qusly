import React from 'react';

import {
  useLargeState,
  getScrollMousePos,
  updateBoxRect,
  isBoxVisible,
} from '~/renderer/utils';
import { IPos } from '~/renderer/interfaces';
import { Container, Box } from './style';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  distance?: number;
  children?: React.ReactNode;
}

interface State {
  active?: boolean;
  boxVisible?: boolean;
}

export const SelectionArea = ({ children, ...props }: Props) => {
  const [state, setState] = useLargeState<State>({
    active: false,
    boxVisible: false,
  });

  const ref = React.useRef<HTMLDivElement>();
  const boxRef = React.useRef<HTMLDivElement>();

  const startPos = React.useRef<IPos>();
  const mousePos = React.useRef<IPos>(); // without scroll offset

  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    setState({ active: true });

    startPos.current = getScrollMousePos(e, ref.current);

    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, []);

  const onMouseUp = React.useCallback(() => {
    window.removeEventListener('mousemove', onWindowMouseMove);
    window.removeEventListener('mouseup', onMouseUp);

    startPos.current = null;
    mousePos.current = null;

    setState({ active: false, boxVisible: false });
  }, []);

  const onWindowMouseMove = React.useCallback((e: MouseEvent) => {
    mousePos.current = [e.pageX, e.pageY];

    updateBoxRect(
      ref.current,
      boxRef.current,
      mousePos.current,
      startPos.current,
    );
  }, []);

  const onScroll = React.useCallback(() => {
    if (!state.active) return;

    updateBoxRect(
      ref.current,
      boxRef.current,
      mousePos.current,
      startPos.current,
    );
  }, [state.active]);

  const onMouseMove = React.useCallback(() => {
    if (!state.active) return;

    const visible = isBoxVisible(
      mousePos.current,
      startPos.current,
      ref.current,
      props.distance,
    );

    if (state.boxVisible !== visible) {
      setState({ boxVisible: visible });
    }
  }, [state]);

  return (
    <Container
      ref={ref}
      {...props}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onScroll={onScroll}
    >
      {children}
      <Box
        ref={boxRef}
        style={{ display: state.boxVisible ? 'block' : 'none' }}
      />
    </Container>
  );
};

SelectionArea.defaultProps = {
  distance: 5,
} as Props;
