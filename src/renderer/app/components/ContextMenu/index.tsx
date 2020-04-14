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

const onItemMouseDown = (e: React.MouseEvent) => {
  e.stopPropagation();
};

const Item = ({
  data,
  forceIcon,
}: {
  data: IContextMenuItem;
  forceIcon: boolean;
}) => {
  const { onSelect, disabled, icon, iconSize, accelerator, label } = data;

  const onClick = React.useCallback(() => {
    store.contextMenu.visible = false;
    if (onSelect && !disabled) onSelect();
  }, [onSelect]);

  return (
    <StyledItem
      onMouseDown={onItemMouseDown}
      onClick={onClick}
      disabled={disabled}
    >
      <td style={{ paddingLeft: 10 }}></td>
      {(icon || forceIcon) && (
        <Icon
          className="context-menu-item-icon"
          iconSize={iconSize}
          disabled={disabled}
          style={
            icon
              ? {
                  WebkitMaskImage: `url(${icon})`,
                }
              : { opacity: 0 }
          }
        ></Icon>
      )}
      <Text>{label}</Text>
      <Accelerator>{accelerator}</Accelerator>
    </StyledItem>
  );
};

export const ContextMenu = observer(() => {
  const { visible, data } = store.contextMenu;

  return (
    <StyledContextMenu ref={store.contextMenu.ref} visible={visible}>
      {visible && (
        <Container>
          {data.items.map((r, index) => {
            if (r.hidden) return null;
            if (r.type === 'divider') return <MenuDivider key={index} />;
            return <Item key={r.label} data={r} forceIcon={data.forceIcons} />;
          })}
        </Container>
      )}
    </StyledContextMenu>
  );
});
