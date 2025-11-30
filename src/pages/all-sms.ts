import { isAuthenticated } from "../auth";

const allSms = async (element: HTMLDivElement) => {

    if (!isAuthenticated()) {
        window.location.href = '/login';
    }
    
    const getSMS = await fetch('http://localhost:3000/api/sms', {
        method: 'GET',
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    });
    const sms = await getSMS.json();

    const getContacts = await fetch('http://localhost:3000/api/contacts', {
        method: 'GET',
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    });
    const contacts = await getContacts.json();

    const smsWithContacts = sms.map((item: any) => {
        item.contact = contacts.find((contact: any) => contact._id === item.contactId);
        return item;
    });

    element.innerHTML = `
    <h1>All SMS</h1>
    <button id="back">Back</button>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Message</th>
                <th>Send Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            ${smsWithContacts.map((item: any) => `
                <tr>
                    <td>${item.contact.fullName}</td>
                    <td>${item.message}</td>
                    <td>${item.createdAt}</td>
                    <td>
                        <button id="sms-${item.contact._id}">New SMS</button>
                        <button id="delete-${item._id}">Delete</button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    </table>
    `;

    const backBtn = element.querySelector('#back');
    backBtn?.addEventListener('click', () => {
        window.location.href = '/dashboard';
    });

    smsWithContacts.forEach((item: any) => {
        const smsBtn = element.querySelector(`#sms-${item.contact._id}`);
        smsBtn?.addEventListener('click', () => {
            window.location.href = `/sms/${item.contact._id}`;
        });
        const deleteBtn = element.querySelector(`#delete-${item._id}`);
        deleteBtn?.addEventListener('click', async () => {
            await fetch(`http://localhost:3000/api/sms/${item._id}`, {
                method: 'DELETE',
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            });
            window.location.reload();
        });
    });
}

export default allSms;