import home from './pages/home'
import login from './pages/login'
import dashboard from './pages/dashboard'
import sms from './pages/sms'
import addContact from './pages/add-contact'
import allSms from './pages/all-sms'
import register from './pages/register'
import { isAuthenticated } from './auth'

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
    throw new Error("The root element not found");
}

app.innerHTML = `
    <header class="mb-3">
        <h1 class="text-center">SMS platform</h1>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
                ${isAuthenticated() ? `
                <li class="nav-item"><a href="/dashboard" class="nav-link">Dashboard</a></li>
                <li class="nav-item"><a href="/sms" class="nav-link">SMS</a></li>
                <li class="nav-item"><a href="/logout" class="nav-link">Logout</a></li>
                ` : `<li class="nav-item"><a href="/login" class="nav-link">Login</a></li>
                <li class="nav-item"><a href="/register" class="nav-link">Register</a></li>`}
            </ul>
        </nav>
    </header>
    <main>
        <div class="container" id="main"></div>
    </main>
    <footer class="container px-4 text-center">
        <p>&copy; 2025 SMS platform. All rights reserved.</p>
    </footer>
`;

const main = app.querySelector<HTMLDivElement>('#main');

if (!main) {
    throw new Error("The main element not found");
}

if (window.location.pathname === '/') {
  home(main);
} else if (window.location.pathname === '/login') {
  login(main);
} else if (window.location.pathname === '/register') {
  register(main);
} else if (window.location.pathname === '/dashboard') {
  dashboard(main);
} else if (/^\/sms\/[a-zA-Z0-9-]+$/.test(window.location.pathname)) {
  const id = window.location.pathname.split('/')[2];
  sms(main, id);
} else if (window.location.pathname === '/add') {
  addContact(main);
} else if (window.location.pathname === '/sms') {
  allSms(main);
} else {
  main.innerHTML = '404 Not Found';
}