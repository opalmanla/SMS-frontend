import { isAuthenticated } from "../auth";

const addContact = (element: HTMLDivElement) => {
    
    if (!isAuthenticated()) {
        window.location.href = '/login';
    }

    element.innerHTML = `
    <h1>Add Contact</h1>
    <form>
        <input type="text" placeholder="Name" id="fullName">
        <input type="text" placeholder="Telephone" id="tel">
        <button type="submit">Add</button>
        <div id="add-response"></div>
        <button type="button" id="back-btn">Back</button>
    </form>
    `;

    const form = element.querySelector('form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const addResponse = element.querySelector('#add-response');
            const fullName = (element.querySelector('#fullName') as HTMLInputElement).value;
            const tel = (element.querySelector('#tel') as HTMLInputElement).value;
            const response = await fetch('http://localhost:3000/api/contacts', {
                method: 'POST',
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
                body: JSON.stringify({fullName, tel})
            });
            if (!response.ok) {
                if (addResponse) {
                    addResponse.textContent = 'Failed to add contact';
                }
                return;
            }
            if (addResponse) {
                addResponse.textContent = 'Contact added successfully';
            }

            (element.querySelector('#fullName') as HTMLInputElement).value = '';
            (element.querySelector('#tel') as HTMLInputElement).value = '';

        });
    }

    const backBtn = element.querySelector('#back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = '/dashboard';
        });
    }
}

export default addContact;