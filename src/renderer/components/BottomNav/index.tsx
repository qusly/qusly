import * as React from 'react';

import { StyledContainer } from './styles';

interface IState {
  selectedItem: number;
}

interface IProps {
  defaultSelected?: number;
  style?: any;
}

export default class BottomNav extends React.PureComponent<IProps, IState> {
  static defaultProps: IProps = {
    defaultSelected: 0,
  };

  public state: IState = {
    selectedItem: 0,
  };

  componentDidMount() {
    const { defaultSelected } = this.props;
    this.setState({ selectedItem: defaultSelected });
  }

  private onItemClick = (id: number) => {
    this.setState({ selectedItem: id });
  };

  render() {
    const { selectedItem } = this.state;
    const { children, style } = this.props;

    return (
      <StyledContainer style={style}>
        {React.Children.map(children, (e: React.ReactElement<any>, index) => {
          return React.cloneElement(e, {
            id: index,
            selected: selectedItem === index,
            onClick: this.onItemClick,
          });
        })}
      </StyledContainer>
    );
  }
}
