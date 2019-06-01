import * as React from 'react';

import { StyledResizable, StyledAnchor } from './styles';

interface Props {
  pos?: 'left' | 'right';
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  style?: any;
}

interface State {
  width?: number;
}

export default class Resizable extends React.PureComponent<Props, State> {
  static defaultProps: Props = {
    pos: 'right',
    defaultWidth: 256,
    minWidth: 128,
    maxWidth: 512,
  };

  public state: State = {
    width: null,
  };

  private root = React.createRef<HTMLDivElement>();

  private mouseDown = false;

  private prevPos = {
    x: 0,
    y: 0,
  };

  componentWillUnmount() {
    this.removeEvents();
  }

  private addEvents() {
    window.addEventListener('mouseup', this.onWindowMouseUp);
    window.addEventListener('mousemove', this.onWindowMouseMove);
  }

  private removeEvents() {
    window.removeEventListener('mouseup', this.onWindowMouseUp);
    window.removeEventListener('mousemove', this.onWindowMouseMove);
  }

  public onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.mouseDown = true;
    this.prevPos = {
      x: e.clientX,
      y: e.clientY,
    };

    this.addEvents();
  };

  public onWindowMouseUp = () => {
    this.mouseDown = false;
    this.removeEvents();
  };

  public onWindowMouseMove = (e: MouseEvent) => {
    if (!this.mouseDown) return;

    const { pos, minWidth, maxWidth, defaultWidth } = this.props;
    const width = this.state.width || defaultWidth;

    const delta = e.clientX - this.prevPos.x;
    const elWidth = pos === 'left' ? width - delta : width + delta;

    if (elWidth < minWidth || elWidth > maxWidth) {
      return;
    }

    this.prevPos = {
      x: e.clientX,
      y: e.clientY,
    };

    this.setState({
      width: elWidth,
    });
  };

  render() {
    const {
      pos,
      minWidth,
      maxWidth,
      children,
      defaultWidth,
      style,
    } = this.props;
    const { width } = this.state;

    return (
      <StyledResizable
        ref={this.root}
        minWidth={minWidth}
        maxWidth={maxWidth}
        style={{ ...style, width: width || defaultWidth }}
      >
        <StyledAnchor pos={pos} onMouseDown={this.onMouseDown} />
        {children}
      </StyledResizable>
    );
  }
}
