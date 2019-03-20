import * as React from 'react';

import { StyledWrapper, StyledAnchor } from './styles';

interface IState {
  width: number;
}

interface IProps {
  minWidth: number;
  maxWidth: number;
}

export default class Resizable extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
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

  componentDidMount() {
    window.addEventListener('mouseup', this.onWindowMouseUp);
    window.addEventListener('mousemove', this.onWindowMouseMove);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onWindowMouseMove);
  }

  public onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.mouseDown = true;
    this.prevPos = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  public onWindowMouseUp = () => {
    this.mouseDown = false;
  };

  public onWindowMouseMove = (e: MouseEvent) => {
    if (!this.mouseDown) return;

    const { width } = this.state;
    const { minWidth, maxWidth } = this.props;

    const delta = e.clientX - this.prevPos.x;
    const elWidth = width + delta;

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
    const { minWidth, maxWidth } = this.props;
    return (
      <StyledWrapper style={{ width, minWidth, maxWidth }}>
        <StyledAnchor onMouseDown={this.onMouseDown} />
      </StyledWrapper>
    );
  }
}
