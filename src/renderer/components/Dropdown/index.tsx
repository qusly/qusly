import * as React from 'react';

import {
  StyledItem,
  Items,
  Text,
} from '~/renderer/app/components/ContextMenu/style';
import { StyledDropdown, Menu, Label, DropIcon } from './styles';

export const DropdownItem = ({ children }: { children: any }) => {
  return (
    <StyledItem>
      <Text>{children}</Text>
    </StyledItem>
  );
};

interface Props {
  children?: any;
  defaultValue?: any;
  onChange?: (newValue?: any, oldValue?: any) => void;
  style?: React.CSSProperties;
}

interface State {
  expanded: boolean;
  value: any;
  label: any;
}

export class Dropdown extends React.PureComponent<Props, State> {
  public state: State = {
    expanded: false,
    value: null,
    label: '',
  };

  public componentDidMount() {
    const { defaultValue } = this.props;

    if (defaultValue) {
      this.setValue(defaultValue, false);
    }
  }

  public componentDidUpdate(prevProps: Props) {
    const { defaultValue } = this.props;

    if (defaultValue !== prevProps.defaultValue) {
      this.setValue(defaultValue, false);
    }
  }

  public componentWillUnmount() {
    window.removeEventListener('mousedown', this.onWindowMouseDown);
  }

  private onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { expanded } = this.state;
    this.toggle(!expanded);
  };

  private onItemMouseClick = (newValue: any) => (e: React.MouseEvent) => {
    e.stopPropagation();

    const { onChange } = this.props;
    const { value } = this.state;

    if (onChange) onChange(value, newValue);

    this.setValue(newValue);
    this.toggle(false);
  };

  public get value() {
    const { defaultValue } = this.props;
    const { value } = this.state;
    return value || defaultValue;
  }

  public set value(value: string) {
    this.setValue(value);
  }

  private setValue(value: string, emitEvent = true) {
    const { onChange, children } = this.props;
    const oldValue = this.state.value;
    const el = children.find((r: any) => r.props.value === value);

    if (el) {
      this.setState({
        value,
        label: el.props.children,
      });

      if (emitEvent && onChange) {
        onChange(value, oldValue);
      }
    }
  }

  private onWindowMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    this.toggle(false);
  };

  private toggle(value: boolean) {
    this.setState({ expanded: value });

    requestAnimationFrame(() => {
      if (value) {
        window.addEventListener('mousedown', this.onWindowMouseDown);
      } else {
        window.removeEventListener('mousedown', this.onWindowMouseDown);
      }
    });
  }

  render() {
    const { style, children } = this.props;
    const { value, label, expanded } = this.state;

    return (
      <StyledDropdown
        className="dropdown"
        onMouseDown={this.onMouseDown}
        style={style}
      >
        <Label>{label}</Label>
        <DropIcon expanded={expanded} />
        <Menu visible={expanded}>
          <Items>
            {React.Children.map(children, child => {
              const { props } = child;

              return React.cloneElement(child, {
                selected: value === props.value,
                onMouseDown: (e: React.MouseEvent) => e.stopPropagation(),
                onClick: this.onItemMouseClick(props.value),
              });
            })}
          </Items>
        </Menu>
      </StyledDropdown>
    );
  }
}
