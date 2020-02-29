import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '~/renderer/app/store';
import { IContextMenuItem } from '~/renderer/interfaces';
import {
  StyledContextMenu,
  StyledItem,
  Accelerator,
  Text,
  Icon,
  Container,
  MenuDivider,
} from './style';

const Item = ({ data }: { data: IContextMenuItem }) => {
  const { onSelect, disabled, icon, iconSize, accelerator, label } = data;

  const onClick = React.useCallback(
    (e: React.MouseEvent) => {
      store.contextMenu.visible = false;
      if (onSelect) onSelect();
    },
    [onSelect],
  );

  return (
    <StyledItem
      onMouseDown={e => e.stopPropagation()}
      onClick={onClick}
      disabled={disabled}
    >
      <td style={{ paddingLeft: 10 }}></td>
      {icon && (
        <Icon
          className="context-menu-item-icon"
          iconSize={iconSize}
          disabled={disabled}
          style={{
            WebkitMaskImage: `url(${icon})`,
          }}
        ></Icon>
      )}
      <Text>{label}</Text>
      <Accelerator>{accelerator}</Accelerator>
    </StyledItem>
  );
};

export const ContextMenu = observer(() => {
  const { pos, visible, data } = store.contextMenu;

  return (
    <StyledContextMenu ref={store.contextMenu.ref} visible={visible}>
      {visible && (
        <Container>
          {data.map((r, index) => {
            if (r.hidden) return null;
            if (r.type === 'divider') return <MenuDivider key={index} />;
            return <Item key={r.label} data={r} />;
          })}
        </Container>
      )}
    </StyledContextMenu>
  );
});
