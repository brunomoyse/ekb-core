import { defineStore } from 'pinia';

export const useContactStore = defineStore('contacts', {
    state: () => ({
        contacts: []
    }),
    actions: {
        async getContacts () {
            const { data: contacts } = await useApi(import.meta.env.VITE_API_URL + '/contacts');
            this.contacts = contacts;
        },
        async updateContact (form) {
            const updatedContact = await useApi(import.meta.env.VITE_API_URL + '/contacts/' + form.id, {
                method: 'PUT',
                body: JSON.stringify(form),
                initialCache: false,
            });

            let indexToUpdate = this.contacts.findIndex(c => c.id === form.id);
            this.contacts[indexToUpdate] = form;
            this.contacts = this.contacts.sort((a, b) => {
                const dateA = new Date(a.contract_end_date);
                const dateB = new Date(b.contract_end_date);
                if (dateA < dateB) return -1;
                if (dateA > dateB) return 1;
                return 0;
            });
        },
        async createContact (contact) {
            const newContactId = await useFetch(import.meta.env.VITE_API_URL + '/contacts', {
                method: 'POST',
                body: JSON.stringify(contact),
                initialCache: false,
                headers: {
                    Accept: "application/json",
                    "Authorization": "Bearer " + window.localStorage.getItem('auth_token')
                }
            });
            console.log(this.contacts);
            console.log(newContactId);
            const newContact = {
                ...contact,
                id: newContactId
            };
            console.log('this.contacts av', this.contacts);
            this.contacts.push(newContact);
            console.log('this.contacts ap', this.contacts);

            this.contacts = this.contacts.sort((a, b) => {
                const dateA = new Date(a.contract_end_date);
                const dateB = new Date(b.contract_end_date);
                if (dateA < dateB) return -1;
                if (dateA > dateB) return 1;
                return 0;
            });

        },
        async deleteContact (contact) {
            let indexToRemove = this.contacts.findIndex(c => c.id === contact.id);
            if (indexToRemove !== -1) {
                this.contacts.splice(indexToRemove, 1);
                await useApi(import.meta.env.VITE_API_URL + '/contacts/' + contact.id, {
                    method: 'DELETE',
                    key: contact.id.toString(),
                });
            }
        },
    }
});