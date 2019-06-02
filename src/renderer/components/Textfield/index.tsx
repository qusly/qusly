import * as React from 'react';

import { StyledTextfield, Input, Label, Indicator } from './styles';

interface Props {
  color?: string;
  label?: string;
  placeholder?: string;
}

interface State {
  activated: boolean;
  focused: boolean;
}

export default class Textfield extends React.PureComponent<Props, State> {
  public inputRef = React.createRef<HTMLInputElement>();

  static defaultProps: Props = {
    color: '#673AB7',
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

  render() {
    const { color, label, placeholder } = this.props;
    const { activated, focused } = this.state;

    const isLabel = label != null && label !== '';

    return (
      <StyledTextfield onClick={this.onClick}>
        <Input
          ref={this.inputRef}
          color={color}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          isLabel={isLabel}
          placeholder={placeholder}
        />
        {isLabel && (
          <Label activated={activated} focused={focused} color={color}>
            {label}
          </Label>
        )}
        <Indicator focused={focused} color={color} />
      </StyledTextfield>
    );
  }
}
