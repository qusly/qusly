import * as React from 'react';

import { StyledWrapper, StyledAnchor } from './styles';

interface IProps {
  pos?: 'left' | 'right';
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
}

export default class Resizable extends React.PureComponent<IProps> {
  static defaultProps: IProps = {
    pos: 'right',
    defaultWidth: 256,
    minWidth: 128,
    maxWidth: 512,
  };

  public wrapper = React.createRef<HTMLDivElement>();

  public width: number;

  private mouseDown = false;

  private prevPos = {
    x: 0,
    y: 0,
  };

  componentDidMount() {
    const { defaultWidth } = this.props;
    this.width = defaultWidth;
    this.updateWidth();
  }

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

  private updateWidth() {
    this.wrapper.current.style.width = `${this.width}px`;
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

    const { pos, minWidth, maxWidth } = this.props;

    const delta = e.clientX - this.prevPos.x;
    const elWidth = pos === 'left' ? this.width - delta : this.width + delta;

    this.prevPos = {
      x: e.clientX,
      y: e.clientY,
    };

    if (elWidth >= minWidth && elWidth <= maxWidth) {
      this.width = elWidth;
      this.updateWidth();
    }
  };

  render() {
    const { pos, minWidth, maxWidth, children } = this.props;

    return (
      <StyledWrapper ref={this.wrapper} minWidth={minWidth} maxWidth={maxWidth}>
        <StyledAnchor pos={pos} onMouseDown={this.onMouseDown} />
        {children}
      </StyledWrapper>
    );
  }
}
