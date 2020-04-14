import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { StyledThumb, Icon, Title, Count } from './style';

export const DragThumb = observer(
  (props: any, ref: any) => {
    const page = store.pages.current;
    const file = page?.files.anchorFile;
    const count = page?.files.selected.length;

    const icon = React.useMemo(() => {
      return store.icons.getFileIcon(file);
    }, [file]);

    const iconStyle: React.CSSProperties = {
      backgroundImage: `url(${icon?.data})`,
      opacity: icon?.opacity,
    };

    return (
      <StyledThumb ref={ref}>
        <Icon style={iconStyle} />
        <Title>{file?.name}</Title>
        {count > 1 && <Count>{count}</Count>}
      </StyledThumb>
    );
  },
  { forwardRef: true },
);
