import * as React from 'react';

import { StyledTextfield, Input, Label, Indicator, Icon } from './styles';

interface Props {
  color?: string;
  label?: string;
  placeholder?: string;
  icon?: any;
  onIconClick?: (target: Textfield) => void;
  inputType?: 'text' | 'email' | 'password' | 'number';
  style?: any;
}

interface State {
  activated: boolean;
  focused: boolean;
}

export class Textfield extends React.PureComponent<Props, State> {
  public inputRef = React.createRef<HTMLInputElement>();

  static defaultProps: Props = {
    color: '#673AB7',
    inputType: 'text',
  };

  public state: State = {
    activated: false,
    focused: false,
  };

  public get value() {
    return this.inputRef.current.value;
  }

  onClick = () => {
    this.inputRef.current.focus();
  };

  public onFocus = () => {
    this.setState({
      activated: true,
      focused: true,
    });
  };

  public onBlur = () => {
    this.setState({
      activated: this.value.length !== 0,
      focused: false,
    });
  };

  public onIconClick = (e: React.SyntheticEvent<any>) => {
    e.stopPropagation();
    e.preventDefault();

    const { onIconClick } = this.props;

    if (typeof onIconClick === 'function') {
      onIconClick(this);
    }
  };

  render() {
    const { color, label, placeholder, icon, inputType, style } = this.props;
    const { activated, focused } = this.state;

    const hasLabel = label != null && label !== '';
    const hasIcon = icon != null && icon !== '';

    return (
      <StyledTextfield onClick={this.onClick} style={style}>
        <Input
          ref={this.inputRef}
          type={inputType}
          color={color}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          hasLabel={hasLabel}
          hasIcon={hasIcon}
          placeholder={label == null || focused ? placeholder : null}
          spellCheck={false}
        />
        {hasLabel && (
          <Label activated={activated} focused={focused} color={color}>
            {label}
          </Label>
        )}
        {hasIcon && <Icon src={icon} onClick={this.onIconClick} />}
        <Indicator focused={focused} color={color} />
      </StyledTextfield>
    );
  }
}
