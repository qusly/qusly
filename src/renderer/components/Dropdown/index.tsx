import * as React from 'react';

import { StyledItem } from '~/renderer/app/components/ContextMenu/style';
import { StyledDropdown, Menu, Label, DropIcon } from './styles';

export const DropdownItem = StyledItem;

interface Props {
  children?: any;
  defaultValue?: any;
  onChange?: (newValue?: any, oldValue?: any) => void;
  style?: any;
}

export const Dropdown = ({ defaultValue, onChange, children }: Props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);
  const [label, setLabel] = React.useState<string>(null);

  const onWindowMouseDown = React.useCallback(() => {
    setExpanded(false)
  }, [expanded]);

  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  }, []);

  const onItemMouseClick = (newValue: any, label: string) => () => {
    if (onChange) onChange(value, newValue);

    setValue(newValue);
    setLabel(label);
    setExpanded(false);
  }

  React.useEffect(() => {
    if (!label && defaultValue) {
      const item = children.find((r: any) => r.props.value === defaultValue);
      if (item) setLabel(item.props.children);
    }
  }, [label]);

  React.useEffect((): any => {
    if (expanded) {
      window.addEventListener('mousedown', onWindowMouseDown);
      return () => window.removeEventListener('mousedown', onWindowMouseDown);
    }
  }, [expanded]);

  return (
    <StyledDropdown onMouseDown={onMouseDown}>
      <Label>{label}</Label>
      <DropIcon expanded={expanded} />
      <Menu visible={expanded}>
        {React.Children.map(children, child => {
          const { props } = child;

          return React.cloneElement(child, {
            selected: value === props.value,
            onMouseDown: (e: React.MouseEvent) => e.stopPropagation(),
            onClick: onItemMouseClick(props.value, props.children)
          });
        })}
      </Menu>
    </StyledDropdown>
  );
}
