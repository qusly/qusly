import './styles.scss';

window.onload = () => {
  const app = document.getElementById('app');

  app.append(process.env.desktop ? 'desktop (electron)' : 'client');
};
