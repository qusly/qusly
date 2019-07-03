import * as React from 'react';

import Resizable from '../Resizable';

export default () => {
  return (
    <Resizable
      pos="left"
      style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.08)' }}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
      perferendis repellendus, odio earum dolore aut, alias quaerat rerum fuga
      explicabo facere ad sequi ut quas sunt velit! Sunt, vitae officiis!
    </Resizable>
  );
};
