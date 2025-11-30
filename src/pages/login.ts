import { login as authLogin } from "../auth";

const login = (element: HTMLDivElement) => {
  element.innerHTML = `
  <h1>Login</h1>
  <form id="login-form">
    <input class="form-control" type="text" name="username" placeholder="Username" />
    <input class="form-control" type="password" name="password" placeholder="Password" />
    <button class="btn btn-primary"type="submit">Login</button>
  </form>
  `;

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    authLogin(username, password);
  };

  const form = element.querySelector('form');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
}

export default login;
