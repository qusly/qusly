import * as React from 'react';

import { ERROR_COLOR } from '~/renderer/constants';
import { StyledTextfield, Input, Label, Indicator, Icon } from './styles';

export type ValidationFunction = (str: string) => boolean;

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
  error: boolean;
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
    error: true,
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

  public validate(fn: ValidationFunction) {
    const correct = fn(this.value.trim());
    this.setState({ error: !correct });
    return correct;
  }

  render() {
    const { color, label, placeholder, icon, inputType, style } = this.props;
    const { activated, focused, error } = this.state;

    const hasLabel = label != null && label !== '';
    const hasIcon = icon != null && icon !== '';

    const primaryColor = error ? ERROR_COLOR : color;

    return (
      <StyledTextfield onClick={this.onClick} style={style}>
        <Input
          ref={this.inputRef}
          type={inputType}
          color={primaryColor}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          hasLabel={hasLabel}
          hasIcon={hasIcon}
          placeholder={label == null || focused ? placeholder : null}
          spellCheck={false}
        />
        {hasLabel && (
          <Label activated={activated} focused={focused} color={primaryColor}>
            {label}
          </Label>
        )}
        {hasIcon && <Icon src={icon} onClick={this.onIconClick} />}
        <Indicator focused={focused} color={primaryColor} />
      </StyledTextfield>
    );
  }
}
