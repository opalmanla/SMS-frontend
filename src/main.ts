import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import home from './pages/home'

const app = document.querySelector<HTMLDivElement>('#app');

if (window.location.pathname === '/') {
  home(app);
} else if (window.location.pathname === '/test') {
  app.innerHTML = 'Hello test';
}
