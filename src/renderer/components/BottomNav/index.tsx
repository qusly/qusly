import * as React from 'react';

import { StyledContainer } from './styles';

interface IState {
  selectedItem: number;
}

export default class BottomNav extends React.PureComponent<{}, IState> {
  public state: IState = {
    selectedItem: 0,
  };

  private onItemClick = (id: number) => {
    this.setState({ selectedItem: id });
  };

  render() {
    const { selectedItem } = this.state;
    const { children } = this.props;

    return (
      <StyledContainer>
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
