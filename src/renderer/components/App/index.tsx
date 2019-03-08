import * as React from 'react';

import Ripple from '../Ripple';
import { IconTest, Btn } from './styles';

export default class App extends React.Component {
  render() {
    return (
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos totam aut
        repellat ex, sunt placeat voluptas accusamus provident! Est, harum
        explicabo tenetur dicta quis aperiam. Cum culpa deleniti natus illum!
        <IconTest />
        <Btn>
          BUTTON
          <Ripple />
        </Btn>
      </div>
    );
  }
}
