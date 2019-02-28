import * as React from 'react';
import { render } from 'react-dom';

import App from './components/App';

render(<App />, document.getElementById('app'));

// react-hot-loader
if ((module as any).hot) {
  (module as any).hot.accept();
}
