import { defineStore } from 'pinia';
const config = useRuntimeConfig();

export const useContactStore = defineStore('contacts', {
    state: () => ({
        contacts: []
    }),
    actions: {
        async getContacts () {
            const { data: contacts } = await useFetch(config.public.apiUrl + '/contacts');
            this.contacts = contacts;
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
            await useFetch(config.public.apiUrl + '/contacts/' + contact.id, {
                method: 'PUT',
                body: JSON.stringify(contact),
                initialCache: false,
            });

        },
        async createContact (contact) {
            let newContactId = await useFetch(config.public.apiUrl + '/contacts', {
                method: 'POST',
                body: JSON.stringify(contact),
                initialCache: false,
            });
            this.contacts.push({
                ...contact,
                id: newContactId
            });
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
                await useFetch(config.public.apiUrl + '/contacts/' + contact.id, {
                    method: 'DELETE',
                });
            }
        },
    }
});