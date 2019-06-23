import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import PathItem from '../PathItem';
import { StyledPathView, Input, Container } from './styles';

const input = React.createRef<HTMLInputElement>();

const onClick = (e: React.MouseEvent) => {
  e.stopPropagation();

  const page = store.pages.current;
  if (page.pathInputVisible) return;

  page.pathInputVisible = true;

  requestAnimationFrame(() => {
    input.current.value = page.path;
    input.current.focus();
    input.current.select();

    window.addEventListener('click', onWindowClick);
  });
};

const onWindowClick = () => {
  window.removeEventListener('click', onWindowClick);
  store.pages.current.pathInputVisible = false;
};

const onKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    store.pages.current.updatePath(input.current.value.trim());
    store.pages.current.pathInputVisible = false;
  }
};

export default observer(() => {
  const page = store.pages.current;

  return (
    <StyledPathView onClick={onClick}>
      <Container visible={!page.pathInputVisible}>
        {page.pathItems.map((label, index) => (
          <PathItem key={index} pathIndex={index} label={label} />
        ))}
      </Container>
      <Input
        ref={input}
        type="text"
        visible={page.pathInputVisible}
        onKeyDown={onKeyDown}
      />
    </StyledPathView>
  );
});
