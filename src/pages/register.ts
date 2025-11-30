import { register as registerUser } from "../auth";

const register = (element: HTMLDivElement) => {
    element.innerHTML = `
    <h1>Register</h1>
    <form id="register-form">
        <input class="form-control" type="text" name="username" placeholder="Username" />
        <input class="form-control" type="password" name="password" placeholder="Password" />
        <input class="form-control" type="text" name="fullName" placeholder="Full Name" />
        <input class="form-control" type="email" name="email" placeholder="Email" />
        <input class="form-control" type="tel" name="tel" placeholder="Phone Number" />
        <button class="btn btn-primary" type="submit">Register</button>
    </form>
    `;

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const tel = formData.get('tel') as string;
        await registerUser(username, password, fullName, email, tel);
    };

    const form = element.querySelector('#register-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
}

export default register;