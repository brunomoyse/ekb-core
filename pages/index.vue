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
                        <button :disabled="form.id && form.id > 0" @click="createContact" class="px-3 py-1 mr-2 text-white rounded-lg" :class="form.id && form.id > 0 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'">
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
                    <th class="px-4 py-2"></th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white" v-for="contact in contacts">
                    <!--
                    <td class="border px-4 py-2">{{ contact?.first_name }}</td>
                    <td class="border px-4 py-2">{{ contact?.last_name }}</td>
                    <td class="border px-4 py-2">{{ contact?.policy_number }}</td>
                    -->
                    <td class="border px-4 py-2" :class="contact.id === form.id ? 'bg-blue-200' : ''">
                        {{ formatPhoneNumberKazakhstan(contact?.phone_number) }}
                    </td>
                    <td class="border px-4 py-2" :class="contact.id === form.id ? 'bg-blue-200' : ''">
                        {{ formatDateForKazakhstan(contact?.expiration_date) }}
                    </td>
                    <td class="border px-4 py-2" :class="contact.id === form.id ? 'bg-blue-200' : ''">
                        <button :disabled="!formIsValid" v-if="contact.id === form.id" @click="updateContact(contact.id)" class="px-3 py-1 text-white rounded-lg" :class="formIsValid ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500 hover:bg-gray-700'">
                            Save
                        </button>
                        <button v-else-if="contact === form" @click="resetForm" class="px-3 py-1 bg-blue-800 hover:bg-blue-500 text-white rounded-lg">
                            Cancel
                        </button>
                        <button v-else @click="loadForm(contact)" class="px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-lg">
                            Edit
                        </button>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
    //const config = useRunTimeConfig();
    let contactUpdating = ref(false);
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

    //const { data: contacts } = await useFetch(process.env.NUXT_PUBLIC_API_BASE_URL + '/contacts');
    const { data: contacts } = await useFetch('http://127.0.0.1:8080/api/contacts');

    const createContact = async () => {
        const newContact = await useFetch('http://127.0.0.1:8080/api/contacts', {
            method: 'POST',
            body: { ...form },
        });
        resetForm();
    };

    const updateContact = async (contactId) => {
        if (contactUpdating.value) {
            return;
        }
        console.log('contactId', contactId);
        if (contactId && contactId > 0) {
            contactUpdating.value = true;
            await useFetch('http://127.0.0.1:8080/api/contacts/' + contactId, {
                initialCache: false,
                method: 'PATCH',
                body: { ...form },
            });
            contactUpdating.value = false;
            resetForm();
        }
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
        if (phoneNumber.length !== 11) {
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

</script>
