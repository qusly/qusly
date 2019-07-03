import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import PathItem from '../PathItem';
import { StyledPathView, Input, Container } from './styles';

const input = React.createRef<HTMLInputElement>();

const onClick = (e: React.MouseEvent) => {
  e.stopPropagation();

  const page = store.pages.current;

  if (!page.pathInputVisible) {
    page.pathInputVisible = true;

    requestAnimationFrame(() => {
      input.current.value = page.location.path;
      input.current.focus();
      input.current.select();
    });
  }
};

const onKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    const page = store.pages.current;

    page.location.path = input.current.value.trim();
    page.pathInputVisible = false;
    page.fetchFiles();
  }
};

export default observer(() => {
  const page = store.pages.current;

  return (
    <StyledPathView onClick={onClick}>
      <Container visible={!page.pathInputVisible}>
        {page.location.pathItems.map((label, index) => (
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
