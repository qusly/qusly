import React from 'react';
import { IFile } from 'qusly-core';

import { StyledThumb, Icon, Title, Count } from './style';

export interface IDragThumbProps {
  file?: IFile;
  count?: number;
  children?: React.ReactNode;
}

export const DragThumb = React.forwardRef(
  (props: IDragThumbProps, ref: React.Ref<HTMLDivElement>) => {
    const { file, count, children } = props;

    const icon = '';
    const opacity = 1;

    return (
      <StyledThumb ref={ref}>
        <Icon icon={icon} opacity={opacity} />
        <Title>{file?.name}</Title>
        {count > 1 && <Count>{count}</Count>}
      </StyledThumb>
    );
  },
);
