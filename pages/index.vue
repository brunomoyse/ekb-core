<template>
    <div>
        <!-- Adding contact form-->
        <div class="mx-auto grid grid-cols-1">
            <form @submit.prevent="submitForm">
                <!-- Block 1 -->
                <!--
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            First Name
                        </label>
                        <input v-model="form.first_name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text">
                        <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Last Name
                        </label>
                        <input v-model="form.last_name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text">
                    </div>
                </div>
                -->
                <!-- Block 2 -->
                <!--
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-policy-number">
                            Insurance policy number
                        </label>
                        <input v-model="form.policy_number" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-policy-number" type="text">
                    </div>
                </div>
                -->
                <!-- Block 3 -->
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-phone-number">
                            Phone number
                        </label>
                        <input v-model="form.phone_number" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-phone-number" type="text">
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-expiration-date">
                            Expiration date
                        </label>
                        <input v-model="form.expiration_date" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-expiration-date" type="text">
                    </div>

                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/1 px-3">
                        <button :disabled="form.id && form.id > 0 || !formIsValid" @click="createContact" class="px-3 py-1 mr-2 text-white rounded-lg" :class="form.id && form.id > 0 || !formIsValid ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'">
                            Add
                        </button>
                        <button @click="resetForm" class="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded-lg">
                            Reset
                        </button>

                    </div>
                </div>
            </form>
        </div>

        <!-- Contacts list -->
        <table class="table-auto w-full text-left">
            <thead>
                <tr class="bg-gray-300">
                    <!--
                    <th class="px-4 py-2">First name</th>
                    <th class="px-4 py-2">Last name</th>
                    <th class="px-4 py-2">Policy Number</th>
                    -->
                    <th class="px-4 py-2">Phone number</th>
                    <th class="px-4 py-2">Expiration date</th>
                    <th class="px-4 py-2 w-40"></th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white" v-for="contact in contacts">
                    <!--
                    <td class="border px-4 py-2">{{ contact?.first_name }}</td>
                    <td class="border px-4 py-2">{{ contact?.last_name }}</td>
                    <td class="border px-4 py-2">{{ contact?.policy_number }}</td>
                    -->
                    <td class="border px-4 py-2" :class="contact.id === form.id ? 'bg-blue-100' : ''">
                        {{ formatPhoneNumberKazakhstan(contact?.phone_number) }}
                    </td>
                    <td class="border px-4 py-2" :class="contact.id === form.id ? 'bg-blue-100' : ''">
                        {{ formatDateForKazakhstan(contact?.expiration_date) }}
                    </td>
                    <td class="w-40 border px-4 py-2 flex justify-end" :class="contact.id === form.id ? 'bg-blue-100' : ''">
                        <button title='Edit' v-if="form.id !== contact.id && !currentlyLoading" @click="loadForm(contact)" class="w-12 h-12 bg-transparent text-blue-300 hover:text-blue-500 font-bold py-1 px-2 rounded-full flex items-center justify-center">
                            <span class="material-icons">edit</span>
                        </button>
                        <button title='Send' v-if="form.id !== contact.id && !currentlyLoading" @click="sendReminder(contact)" class="w-12 h-12 bg-transparent text-green-300 hover:text-green-500 font-bold py-1 px-2 rounded-full flex items-center justify-center">
                            <span class="material-icons" :class="loading.sending && form.id === contact.id ? 'animate-spin' : ''">
                                {{ loading.sending ? 'autorenew' : 'send' }}
                            </span>
                        </button>

                        <button title='Delete' v-if="form.id !== contact.id && !currentlyLoading" @click="deleteContact(contact)" class="w-12 h-12 bg-transparent text-red-300 hover:text-red-500 font-bold py-1 px-2 rounded-full flex items-center justify-center">
                            <span class="material-icons" :class="loading.deleting && form.id === contact.id ? 'animate-spin' : ''">
                                {{ loading.sending ? 'autorenew' : 'delete' }}
                            </span>
                        </button>

                        <button title='Save' v-if="form.id === contact.id && !currentlyLoading" @click="updateContact(contact.id)" :disabled="!formIsValid" class="w-12 h-12 bg-transparent text-green-400 hover:text-green-500 font-bold py-1 px-2 rounded-full flex items-center justify-center">
                            <span class="material-icons" :class="loading.updating && form.id === contact.id ? 'animate-spin' : ''">
                                {{ loading.updating ? 'autorenew' : 'save' }}
                            </span>
                        </button>
                        <button title='Cancel' v-if="form.id === contact.id && !currentlyLoading" @click="resetForm" class="w-12 h-12 bg-transparent text-red-400 hover:text-red-500 font-bold py-1 px-2 rounded-full flex items-center justify-center">
                            <span class="material-icons">cancel</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
    import { useContactStore} from '@/stores/contactStore';
    const contactStore = useContactStore();
    const config = useRuntimeConfig();

    let currentlyLoading = ref(false);
    let phoneErrorMessage = ref(null);
    let expirationDateErrorMessage = ref(null);

    // FORM

    const form = reactive({
        id: null,
        //first_name: 'Bruno',
        //last_name: null,
        //policy_number: null,
        phone_number: null,
        expiration_date: null,
        last_sent_at: null,
    });

    const loading = reactive({
        adding: false,
        updating: false,
        deleting: false,
        sending: false,
    });

    const formIsValid = computed(() => {
        // Copier les données du formulaire
        const expirationDate = form.expiration_date;
        const phoneNumber = form.phone_number;

        // Vérifier si la date est au format jj/mm/yyyy
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(expirationDate)) {
            console.log('Expiration date must be in the format dd/mm/yyyy');
            expirationDateErrorMessage = 'Expiration date must be in the format dd/mm/yyyy';
            return false;
        }

        // Vérifier si le numéro de téléphone comporte 11 chiffres
        const cleanedPhoneNumber = phoneNumber.replace(/\s/g, '');
        if (cleanedPhoneNumber.length !== 11) {
            console.log('Phone number must be 11 digits');
            phoneErrorMessage = 'Phone number must be 11 digits';
            return false;
        }

        // Vérifier si les 11 chiffres du numéro de téléphone sont des entiers
        if (!/^\d+$/.test(cleanedPhoneNumber)) {
            console.log('Phone number must be digits only');
            phoneErrorMessage = 'Phone number must be digits only';
            return false;
        }

        return true;
    });

    const isEditing = computed(() => {
        return form.id !== null;
    });

    const loadForm = (selectedContact) => {
        resetForm();
        form.id = selectedContact.id;
        //form.first_name = selectedContact.first_name;
        //form.last_name = selectedContact.last_name;
        //form.policy_number = selectedContact.policy_number;
        form.phone_number = formatPhoneNumberKazakhstan(selectedContact.phone_number);
        form.expiration_date = formatDateNormal(selectedContact.expiration_date);
    };

    const resetForm = () => {
        form.id = null;
        //form.first_name = null;
        //form.last_name = null;
        //form.policy_number = null;
        form.phone_number = null;
        form.expiration_date = null;
    };

    // CONTACTS
    await contactStore.getContacts();

    const contacts = computed(() => contactStore.contacts);

    const createContact = async () => {
        if (currentlyLoading.value) {
            return;
        }
        if (formIsValid) {
            currentlyLoading.value = true;
            loading.adding = true;
            const newContact = {
                ...form,
                phone_number: convertPhoneNumberToSQL(form.phone_number),
                expiration_date: convertDateToSQL(form.expiration_date)
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
            const updatedContact = {
                ...form,
                id: contact.id,
                phone_number: convertPhoneNumberToSQL(form.phone_number),
                expiration_date: convertDateToSQL(form.expiration_date)
            };
            await contactStore.updateContact(updatedContact);
            currentlyLoading.value = false;
            loading.updating = false;
            resetForm();
        }
    };

    const deleteContact = async (contact) => {
        if (currentlyLoading.value) {
            return;
        }
        if (formIsValid && contactId && contactId > 0) {
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
        contactStore.updateContact({
            last_sent_at: new Date()
        });
        const contactSent = await useFetch(config.public.apiUrl + '/payReminder/' + contact.id, {
                method: 'POST',
                initialCache: false,
        });
        await contactStore.updateContact(contactSent);
        currentlyLoading.value = false;
        loading.sending = false;
        resetForm();
    };

    // UTILS

    const formatDateForKazakhstan = (dateString) => {
        let date = new Date(dateString);

        let monthNames = [
            "янв", "фев", "мар", "апр", "май", "июн",
            "июл", "авг", "сен", "окт", "ноя", "дек"
        ];

        let monthIndex = date.getMonth();

        let monthName = monthNames[monthIndex];

        let formattedDate = date.getDate() + " " + monthName + " " + date.getFullYear();

        return formattedDate;
    }

    const formatPhoneNumberKazakhstan = (phoneNumber) => {
        if (phoneNumber?.length !== 11) {
            return phoneNumber;
        }

        return '8 ' + phoneNumber.substring(1, 4) + ' ' +
            phoneNumber.substring(4, 7) + ' ' +
            phoneNumber.substring(7, 9) + ' ' +
            phoneNumber.substring(9);
    }

    const formatDateNormal = (dateString) => {
        let date = new Date(dateString);

        let day = date.getDate().toString().padStart(2, "0");
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let year = date.getFullYear();

        let formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }

    function convertDateToSQL(dateString) {
        const parts = dateString.split('/');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return `${year}-${month}-${day}`;
    }

    function convertPhoneNumberToSQL(phoneNumber) {
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