import * as React from 'react';

import {
  StyledDropdown,
  Label,
  DropIcon,
  Menu,
  Indicator,
  Value,
} from './styles';

interface Props {
  label?: string;
  color?: string;
  defaultValue?: string;
  children?: any;
  style?: any;
}

interface State {
  activated: boolean;
  selected?: string;
}

export class Dropdown extends React.PureComponent<Props, State> {
  static defaultProps: Props = {
    label: 'Label',
    color: '#673AB7',
  };

  public state: State = {
    activated: false,
  };

  public componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  public onClick = () => {
    this.setState({ activated: true });

    requestAnimationFrame(() => {
      window.addEventListener('click', this.onWindowClick);
    });
  };

  public onWindowClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    requestAnimationFrame(() => {
      this.setState({ activated: false });

      window.removeEventListener('click', this.onWindowClick);
    });
  };

  public onItemClick = (label: string) => () => {
    if (label == null) return;

    this.setState({ selected: label });
  };

  public get value() {
    const { defaultValue } = this.props;
    const { selected } = this.state;
    return selected || defaultValue;
  }

  render() {
    const { label, color, children, style } = this.props;
    const { activated, selected } = this.state;

    return (
      <StyledDropdown
        activated={activated}
        onClick={this.onClick}
        style={style}
      >
        <Label
          color={color}
          activated={activated}
          focused={selected != null || activated}
        >
          {label}
        </Label>
        <Value>{selected}</Value>
        <DropIcon activated={activated} />
        <Menu visible={activated}>
          {React.Children.map(children, child => {
            const { label } = child.props;
            return React.cloneElement(child, {
              selected: this.value === label,
              onClick: this.onItemClick(label),
            });
          })}
        </Menu>
        <Indicator activated={activated} color={color} />
      </StyledDropdown>
    );
  }
}
