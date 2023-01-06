<template>
    <div>
        <!-- Adding contact form-->
        <div class="mx-auto grid grid-cols-1">
            <form @submit.prevent="createContact">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-phone-number">
                            Контактные телефоны Страхователя
                        </label>
                        <input v-model="form.phone_number" placeholder="81234567890" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-phone-number" type="text">
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-expiration-date">
                            Дата окончания договора
                        </label>
                        <input v-model="form.contract_end_date" placeholder="31.12.2010" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-expiration-date" type="text">
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/1 px-3 flex justify-end">
                        <button type="reset" @click="resetForm" class="px-3 mr-2 py-1 bg-gray-500 hover:bg-gray-700 text-white rounded-lg">
                            Сбросить
                        </button>
                        <button type="submit" :disabled="form?.id && form?.id > 0 || !formIsValid" @click="createContact" class="px-3 py-1 text-white rounded-lg" :class="form?.id && form?.id > 0 || !formIsValid ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'">
                            Добавить
                        </button>

                    </div>
                </div>
            </form>
        </div>

        <!-- Contacts list -->
        <table class="table-auto w-full text-left">
            <thead>
                <tr class="bg-gray-300">
                    <th class="px-4 py-2">Контактные телефоны Страхователя</th>
                    <th class="px-4 py-2">Дата окончания договора</th>
                    <th class="px-4 py-2 w-32"></th>
                    <th class="px-4 py-2 w-32"></th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white" v-for="contact in contactItems">
                    <td class="border px-4 py-2" :class="contact?.id === form?.id ? 'bg-blue-100' : ''">
                        {{ displayPhoneNumber(contact?.phone_number) }}
                    </td>
                    <td class="border px-4 py-2" :class="contact?.id === form?.id ? 'bg-blue-100' : ''">
                        {{ displayDate(contact?.contract_end_date) }}
                    </td>
                    <td class="border px-4 py-2" :class="contact?.id === form?.id ? 'bg-blue-100' : ''">
                        <div class="flex justify-around" v-if="!(contact?.id === form?.id)">
                            <button title='Send' v-if="form?.id !== contact?.id" @click="toggleSendMessageDialog(contact)" :disabled="currentlyLoading || !isPossibleToSend(contact)" class="w-12 h-12 bg-transparent font-bold py-1 px-2 rounded-full flex items-center justify-center" :class="isPossibleToSend(contact) || (loading.sending && loading.contactId === contact?.id) ? 'text-green-300 hover:text-green-500' : 'text-gray-300'">
                                <span v-if="loading.sending && loading.contactId === contact?.id" class="material-icons animate-spin">
                                    autorenew
                                </span>
                                <span v-else class="material-icons">
                                    send
                                </span>
                            </button>

                            <div v-if="contact?.last_message_status === 'failed'" title='Failed' class="w-12 h-12 cursor-default bg-transparent text-red-300 font-bold py-1 px-2 rounded-full flex items-center justify-center">
                                <span class="material-icons">sms_failed</span>
                            </div>
                            <div v-else-if="contact?.last_message_status" class="w-12 h-12 py-1 px-2 flex items-center justify-center">
                                <nuxt-img
                                    :src="displayStatusIcon(contact.last_message_status)"
                                    alt="status icon"
                                    height="16px"
                                    width="23px"
                                />
                            </div>
                            <div v-else class="w-12 h-12"></div>
                        </div>
                    </td>

                    <td class="border px-4 py-2 " :class="contact?.id === form?.id ? 'bg-blue-100' : ''">
                        <div class="flex justify-around">
                            <button title='Edit' v-if="form?.id !== contact?.id" @click="loadForm(contact)" class="w-12 h-12 bg-transparent text-blue-300 hover:text-blue-500 font-bold py-1 px-2 rounded-full flex items-center justify-center">
                                <span class="material-icons">edit</span>
                            </button>

                            <button title='Delete' v-if="form?.id !== contact?.id" @click="toggleDeleteDialog(contact)" :disabled="currentlyLoading" class="w-12 h-12 bg-transparent text-red-300 hover:text-red-500 font-bold py-1 px-2 rounded-full flex items-center justify-center">
                                <span v-if="loading.deleting && loading.contactId === contact?.id" class="material-icons animate-spin">
                                    autorenew
                                </span>
                                <span v-else class="material-icons">
                                    delete
                                </span>
                            </button>

                            <button title='Save' v-if="form?.id === contact?.id && !currentlyLoading" @click="updateContact(contact)" :disabled="!formIsValid || currentlyLoading" class="w-12 h-12 bg-transparent text-green-400 hover:text-green-500 font-bold py-1 px-2 rounded-full flex items-center justify-center">
                                <span v-if="loading.updating && loading.contactId === contact?.id" class="material-icons animate-spin">
                                    autorenew
                                </span>
                                <span v-else class="material-icons">
                                    save
                                </span>
                            </button>
                            <button title='Cancel' v-if="form?.id === contact?.id && !currentlyLoading" @click="resetForm" class="w-12 h-12 bg-transparent text-red-400 hover:text-red-500 font-bold py-1 px-2 rounded-full flex items-center justify-center">
                                <span class="material-icons">cancel</span>
                            </button>
                        </div>


                    </td>
                </tr>
            </tbody>
        </table>
        <DeteleDialog v-if="deleteDialog" @close="toggleDeleteDialog" @delete="deleteContact(contactToDelete)" />
        <SendMessageDialog v-if="sendDialog" @close="toggleSendMessageDialog" @send="sendReminder(contactToSend)" />

    </div>
</template>

<script setup>
    import { useContactStore } from '@/stores/contactStore';
    const contactStore = useContactStore();

    let currentlyLoading = ref(false);
    let deleteDialog = ref(false);
    let sendDialog = ref(false);
    let contactToDelete = ref(null);
    let contactToSend = ref(null);

    // FORM

    let form = reactive({
        id: null,
        phone_number: null,
        contract_end_date: null,
        last_sent_at: null,
    });

    const loading = reactive({
        contactId: null,
        adding: false,
        updating: false,
        deleting: false,
        sending: false,
    });

    const displayStatusIcon = (status) => {
        if (status === 'sent') {
            return '/img/sent.png'
        } else if (status === 'delivered') {
            return '/img/delivered.png'
        } else if (status === 'read') {
            return '/img/read.png'
        } else if (status === 'failed') {
            return '';
        }
    };

    const isPossibleToSend = (contact) => {
        if (import.meta.env.VITE_IS_DEMO === 'true') return false;
        const lastSentAt = contact.last_sent_at;
        if (!lastSentAt) return true;
        return false;
    };

    const formIsValid = computed(() => {
        const expirationDate = form.contract_end_date;
        const phoneNumber = form.phone_number;
        if (!expirationDate || !phoneNumber) {
            return false;
        }
        const dateRegex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\.(0[1-9]|1[012])\.\d\d\d\d$/;
        if (!dateRegex.test(expirationDate)) {
            return false;
        }

        const cleanedPhoneNumber = phoneNumber.replace(/\s/g, '');
        const phoneRegex = /^\d{11}$/;
        if (!phoneRegex.test(cleanedPhoneNumber)) {
            return false;
        }

        return true;
    });

    const isEditing = computed(() => {
        return form?.id !== null;
    });

    const loadForm = (selectedContact) => {
        resetForm();
        let contactCopy = { ...selectedContact };
        form.id = contactCopy.id;
        form.phone_number = displayPhoneNumber(contactCopy.phone_number);
        form.contract_end_date = displayDate(contactCopy.contract_end_date);
    };

    const resetForm = () => {
        form.id = null;
        form.phone_number = null;
        form.contract_end_date = null;
        form.last_sent_at = null;
    };

    // CONTACTS
    await contactStore.getContacts();
    const contactItems = computed(() => contactStore.contacts);

    const createContact = async () => {
        if (!form.phone_number || !form.contract_end_date) {
            return;
        }
        if (currentlyLoading.value) {
            return;
        }
        if (formIsValid) {
            currentlyLoading.value = true;
            loading.adding = true;
            const newContact = {
                ...form,
                phone_number: convertPhoneNumberToSQL(form.phone_number),
                contract_end_date: convertDateToSQL(form.contract_end_date)
            };
            await contactStore.createContact(newContact);
            currentlyLoading.value = false;
            loading.adding = false;
            resetForm();
        }
    };

    const updateContact = async (contact) => {
        if (currentlyLoading.value) {
            return;
        }
        if (formIsValid && contact.id && contact.id > 0) {
            currentlyLoading.value = true;
            loading.updating = true;
            loading.id = contact.id;
            const updatedContact = {
                ...form,
                id: contact.id,
                phone_number: convertPhoneNumberToSQL(form.phone_number),
                contract_end_date: convertDateToSQL(form.contract_end_date)
            };
            await contactStore.updateContact(updatedContact);
            currentlyLoading.value = false;
            loading.updating = false;
            loading.id = null;
            resetForm();
        }
    };

    const deleteContact = async (contact) => {
        if (currentlyLoading.value) {
            return;
        }
        if (formIsValid && contact.id && contact.id > 0) {
            currentlyLoading.value = true;
            loading.deleting = true;
            await contactStore.deleteContact(contact);
            currentlyLoading.value = false;
            loading.deleting = false;
            resetForm();
        }
    };

    const sendReminder = async (contact) => {
        if (currentlyLoading.value) {
            return;
        }
        currentlyLoading.value = true;
        loading.sending = true;
        loading.contactId = contact.id;

        const contactSent = await useApi(import.meta.env.VITE_API_URL + '/payReminder/' + contact.id, {
            method: 'POST',
            initialCache: false,
        });
        await contactStore.updateContact({
            ...contact,
            last_sent_at: new Date()
        });
        form.id = null;
        setTimeout(() => {
            currentlyLoading.value = false;
            loading.sending = false;
            loading.contactId = null;
            resetForm();
        }, 1000);
    };

    // DIALOGS
    const toggleDeleteDialog = (contact) => {
        if (contact) {
            deleteDialog.value = true;
            contactToDelete.value = contact;
        } else {
            deleteDialog.value = false;
            contactToDelete.value = null;
        }
    };

    const toggleSendMessageDialog = (contact) => {
        if (contact) {
            sendDialog.value = true;
            contactToSend.value = contact;
        } else {
            sendDialog.value = false;
            contactToSend.value = null;
        }
    };


    // UTILS

    const displayPhoneNumber = (phoneNumber) => {
        if (phoneNumber?.length !== 11) {
            return phoneNumber;
        }

        return '8 ' + phoneNumber.substring(1, 4) + ' ' +
            phoneNumber.substring(4, 7) + ' ' +
            phoneNumber.substring(7, 9) + ' ' +
            phoneNumber.substring(9);
    }

    const displayDate = (dateString) => {
        let date = new Date(dateString);

        let day = date.getDate().toString().padStart(2, "0");
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let year = date.getFullYear();

        let formattedDate = `${day}.${month}.${year}`;

        return formattedDate;
    }

    const convertDateToSQL = (dateString) => {
        if (!dateString) return dateString;
        const parts = dateString.split('.');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return `${year}-${month}-${day}`;
    }

    const convertPhoneNumberToSQL = (phoneNumber) => {
        if (!phoneNumber) return phoneNumber;
        phoneNumber = phoneNumber.replace(/\s/g, '');
        if (phoneNumber.length !== 11) return phoneNumber;
        phoneNumber = '7' + phoneNumber.substr(1);
        return phoneNumber;
    }
</script>
<style>
    .animate-spin {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>