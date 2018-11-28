const webIcon = require('../shared/resources/icons/web.svg');

window.onload = () => {
  const app = document.getElementById('app');

  app.append(process.env.desktop ? 'desktop (electron)' : 'client');
};
