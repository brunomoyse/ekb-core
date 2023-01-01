<template>
    <div class="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-50">
        <!-- The modal container -->
        <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <!-- The modal card -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <!-- The modal header -->
                <div class="mb-4">
                    <h1 class="text-lg font-bold">Подтвердить удаление</h1>
                </div>
                <!-- The modal body -->
                <div class="text-gray-700 mb-4">
                    Вы уверены, что хотите удалить этот элемент?
                </div>
                <!-- The modal footer -->
                <div class="flex justify-between">
                    <button @click="deleteContact" class="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600">
                        Да, удалить
                    </button>
                    <button @click="close" class="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300">
                        Нет, отменить
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const emit = defineEmits(['delete', 'close']);

const deleteContact = () => {
    emit('delete');
    emit('close');
}

const close = () => {
    emit('close');
}

</script>