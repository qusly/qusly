import React from 'react';

import { getRandomNumber } from '~/renderer/utils';
import { Skeleton, SkeletonCircle } from './style';

const SkeletonText = ({
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const _style = React.useMemo<React.CSSProperties>(
    () => ({
      width: `${getRandomNumber(30, 100)}%`,
      height: 24,
      ...style,
    }),
    [style],
  );

  return <Skeleton style={_style} {...props} />;
};

export { Skeleton, SkeletonCircle, SkeletonText };
