<template>
    <!-- The modal container -->
    <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
    <!-- The modal card -->
    <div class="bg-white rounded-lg shadow-lg p-6">
        <!-- The modal header -->
        <div class="mb-4">
            <h1 class="text-lg font-bold">Confirm Deletion</h1>
        </div>
        <!-- The modal body -->
        <div class="text-gray-700 mb-4">
            Are you sure you want to delete this element?
        </div>
        <!-- The modal footer -->
        <div class="flex justify-between">
            <button class="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600">
                Yes, delete it
            </button>
            <button class="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300">
                No, cancel
            </button>
        </div>
    </div>
    </div>
</template>