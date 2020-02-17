import React from 'react';

import {
  useLargeState,
  getScrollMousePos,
  updateBoxRect,
  isBoxVisible,
  elementsCollide,
  arraysEqual,
} from '~/renderer/utils';
import { IPos } from '~/renderer/interfaces';
import { Container, Box } from './style';

export interface ISelectionItem {
  ref: React.RefObject<HTMLElement>;
  data: any;
}

interface Props {
  onSelect?: (items: any[]) => void;
  distance?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface State {
  active?: boolean;
  boxVisible?: boolean;
}

interface IContext {
  registry?: Registry;
}

export const SelectionContext = React.createContext<IContext>(null);

export interface IRegistryMap {
  [key: number]: IRegistryItem;
}

export interface IRegistryItem {
  ref: React.RefObject<any>;
  id: number;
  data?: any;
}

export class Registry {
  public items: IRegistryMap = {};

  protected lastSelected: any[];

  constructor(public boxRef: React.RefObject<any>) {}

  public register(item: IRegistryItem) {
    this.items[item.id] = item;
  }

  public unregister(id: number) {
    delete this.items[id];
  }

  public getSelected() {
    const selected = Object.values(this.items).filter(r => {
      return elementsCollide(r.ref.current, this.boxRef.current);
    });

    const same = arraysEqual(selected, this.lastSelected);

    if (!same) {
      this.lastSelected = selected;

      return selected.map(r => r.data);
    }

    return false;
  }
}

export const SelectionArea = (props: Props) => {
  const [state, setState] = useLargeState<State>({
    active: false,
    boxVisible: false,
  });

  const ref = React.useRef<HTMLDivElement>();
  const boxRef = React.useRef<HTMLDivElement>();

  const startPos = React.useRef<IPos>();
  const mousePos = React.useRef<IPos>(); // without scroll offset

  const provider = React.useMemo<IContext>(
    () => ({
      registry: new Registry(boxRef),
    }),
    [boxRef],
  );

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
    resize();
  }, []);

  const onScroll = React.useCallback(() => {
    if (!state.active) return;
    resize();
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

  const resize = React.useCallback(() => {
    updateBoxRect(
      ref.current,
      boxRef.current,
      mousePos.current,
      startPos.current,
    );

    const selected = provider.registry.getSelected();

    if (selected !== false) {
      props.onSelect(selected);
    }
  }, []);

  React.useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <Container
      ref={ref}
      className={props.className}
      style={props.style}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onScroll={onScroll}
    >
      <SelectionContext.Provider value={provider}>
        {props.children}
      </SelectionContext.Provider>
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
