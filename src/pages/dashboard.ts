import { logout, isAuthenticated } from "../auth";

const dashboard = async (element: HTMLDivElement) => {
    if (!isAuthenticated()) {
        window.location.href = '/login';
    } else {
        const getContacts = await fetch('http://localhost:3000/api/contacts', {
            method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });
        const contacts = await getContacts.json();
        
        element.innerHTML = `
        <button id="logout-btn">Logout</button>
        <button id="add-contact-btn">Add Contact</button>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Telephone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${contacts.map((contact: any) => `
                    <tr>
                        <td>${contact.fullName}</td>
                        <td>${contact.tel}</td>
                        <td>
                            <button id="send-${contact._id}">New SMS</button>
                            <button id="delete-${contact._id}">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        `;

        const logoutBtn = element.querySelector('#logout-btn');
        logoutBtn?.addEventListener('click', () => {
            logout();
            window.location.href = '/login';
        });

        contacts.forEach((contact: any) => {
            const sendBtn = element.querySelector(`#send-${contact._id}`);
            sendBtn?.addEventListener('click', () => {
                window.location.href = `/sms/${contact._id}`;
            });
            const deleteBtn = element.querySelector(`#delete-${contact._id}`);
            deleteBtn?.addEventListener('click', async () => {
                await fetch(`http://localhost:3000/api/contacts/${contact._id}`, {
                    method: 'DELETE',
                    headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
                });
                window.location.reload();
            });
        });

        const addBtn = element.querySelector('#add-contact-btn');
        addBtn?.addEventListener('click', () => {
            window.location.href = '/add';
        });
    }
}

export default dashboard;