import * as React from 'react';

import { StyledWrapper, StyledAnchor } from './styles';

interface IState {
  width: number;
}

interface IProps {
  pos?: 'left' | 'right';
  minWidth?: number;
  maxWidth?: number;
}

export default class Resizable extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    pos: 'right',
    minWidth: 128,
    maxWidth: 512,
  };

  public state: IState = {
    width: 256,
  };

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

    const { width } = this.state;
    const { pos, minWidth, maxWidth } = this.props;

    const delta = e.clientX - this.prevPos.x;
    const elWidth = pos === 'left' ? width - delta : width + delta;

    this.prevPos = {
      x: e.clientX,
      y: e.clientY,
    };

    if (elWidth < minWidth || elWidth > maxWidth) {
      return;
    }

    this.setState({ width: elWidth });
  };

  render() {
    const { width } = this.state;
    const { pos, minWidth, maxWidth } = this.props;

    const wrapperStyle = { width, minWidth, maxWidth };

    return (
      <StyledWrapper style={wrapperStyle}>
        <StyledAnchor pos={pos} onMouseDown={this.onMouseDown} />
      </StyledWrapper>
    );
  }
}
