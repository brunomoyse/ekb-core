import { defineStore } from 'pinia';

export const useContactStore = defineStore('contacts', {
    state: () => ({
        contacts: []
    }),
    actions: {
        async getContacts () {
            const { data: contacts } = await useApi(import.meta.env.VITE_API_URL + '/contacts');
            this.contacts = contacts;
            console.log('this.contacts get', this.contacts);
        },
        async updateContact (contact) {
            let indexToUpdate = this.contacts.findIndex(c => c.id === contact.id);
            this.contacts[indexToUpdate] = contact;
            this.contacts = this.contacts.sort((a, b) => {
                const dateA = new Date(a.expiration_date);
                const dateB = new Date(b.expiration_date);
                if (dateA < dateB) return -1;
                if (dateA > dateB) return 1;
                return 0;
            });
            await useApi(import.meta.env.VITE_API_URL + '/contacts/' + contact.id, {
                method: 'PUT',
                body: JSON.stringify(contact),
                initialCache: false,
            });

        },
        async createContact (form) {
            console.log('contacts 1', this.contacts);
            const newId = await useApi(import.meta.env.VITE_API_URL + '/contacts', {
                method: 'POST',
                body: JSON.stringify(form),
                initialCache: false,
            });

            console.log('contacts 2', this.contacts);
            const newContact = {
                ...contact,
                id: newContactId
            };
            console.log('contacts 3', this.contacts);
            this.contacts.push(newContact);
            console.log('contacts', this.contacts);
            this.contacts = this.contacts.sort((a, b) => {
                const dateA = new Date(a.expiration_date);
                const dateB = new Date(b.expiration_date);
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