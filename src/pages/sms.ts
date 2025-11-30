const sms = async (element: HTMLDivElement, id: string) => {
    
    const getContact = await fetch(`http://localhost:3000/api/contacts/${id}`);
    const contact = await getContact.json();
    
    element.innerHTML = `
    <h2>${contact.fullName}</h2>
    <h3>${contact.tel}</h3>
    <form id="sms-form">
        <input id="sms-input" type="text" name="message" placeholder="Message" />
        <button type="submit">Send</button>
    </form>
    <div id="sms-response"></div>
    <button id="back-button">Back</button>
    `;

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const responseDiv = element.querySelector('#sms-response');
        const formData = new FormData(e.target as HTMLFormElement);
        const message = formData.get('message') as string;
        if (!message) {
            if (responseDiv) {
                responseDiv.textContent = 'Message is required';
            }
            return;
        }
        console.log(message);
        const postSms = await fetch(`http://localhost:3000/api/sms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message,  contactId: contact._id}),
        });
        if (!postSms.ok) {
            if (responseDiv) {
                responseDiv.textContent = 'Failed to send SMS';
            }
            return;
        }
        const sms = await postSms.json();
        console.log(sms);
        if (responseDiv) {
            responseDiv.textContent = 'SMS sent successfully';
        }
        const input = element.querySelector('#sms-input');
        if (input) {
            (input as HTMLInputElement).value = '';
        }
    };

    const form = element.querySelector('#sms-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    const backButton = element.querySelector('#back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = '/dashboard';
        });
    }   
}

export default sms;

    