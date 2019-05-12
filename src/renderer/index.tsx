import * as React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import store from './store';

store.tabs.addTab({ active: true });

render(<App />, document.getElementById('app'));
