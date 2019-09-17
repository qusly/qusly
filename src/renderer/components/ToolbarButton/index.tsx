import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { transparency } from '~/renderer/constants/transparency';
import { Button, Icon, Circle } from './style';

interface Props {
  onClick?: (e?: React.SyntheticEvent<HTMLDivElement>) => void;
  onMouseDown?: (e?: React.SyntheticEvent<HTMLDivElement>) => void;
  size?: number;
  style?: any;
  icon: string;
  divRef?: (ref: HTMLDivElement) => void;
  disabled?: boolean;
  className?: string;
  children?: any;
  opacity?: number;
}

export const ToolbarButton = observer(
  ({
    icon,
    onClick,
    onMouseDown,
    size,
    disabled,
    className,
    divRef,
    children,
    opacity,
    style,
  }: Props) => {
    style = { ...style };

    return (
      <Button
        onClick={onClick}
        onMouseDown={onMouseDown}
        className={'toolbar-button ' + (className || '')}
        style={style}
        ref={(r: HTMLDivElement) => {
          if (typeof divRef === 'function') {
            divRef(r);
          }
        }}
        disabled={disabled}
      >
        <Icon
          style={{ backgroundImage: `url(${icon})` }}
          size={size}
          disabled={disabled}
          opacity={opacity}
        />
        <Circle></Circle>
        {children}
      </Button>
    );
  },
);

(ToolbarButton as any).defaultProps = {
  size: 20,
  opacity: transparency.icons.inactive,
  autoInvert: true,
};
