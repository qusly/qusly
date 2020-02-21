import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { transparency } from '~/renderer/constants/transparency';
import { Button, Icon, Circle } from './style';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  size?: number;
  icon?: string;
  disabled?: boolean;
}

export const ToolbarButton = observer(
  (
    { icon, size, disabled, children, opacity, ...props }: Props,
    ref: React.RefObject<HTMLDivElement>,
  ) => {
    return (
      <Button ref={ref} disabled={disabled} {...props}>
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
  { forwardRef: true },
);

(ToolbarButton as any).defaultProps = {
  size: 20,
  opacity: transparency.icons.inactive,
  autoInvert: true,
} as Props;
