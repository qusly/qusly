import * as React from 'react';
import { hot } from 'react-hot-loader/root';

import { Titlebar } from '../Titlebar';
import * as style from './style.scss';

const App = () => {
  return (
    <div className={style.appContainer}>
      <Titlebar />
    </div>
  );
};

export default hot(App);
