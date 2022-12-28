<template>
    <div class="container mx-auto px-2">
        <header>
            <div class="w-10 h-10" ref="animationElement"></div>
            <!-- nav-->
            <nav class="p-6">
                <div class="flex items-center justify-center flex-wrap">
                    <nuxt-link class="flex items-center flex-shrink-0 mr-6 cursor-pointer" to="/">
                        <picture>
                            <!--
                            <source srcSet="/img/lpc_logo_resized.avif" type="image/avif" />
                            <source srcSet="/img/lpc_logo_resized.webp" type="image/webp" />
                            -->
                            <nuxt-img
                                src="/img/eurasia.png"
                                alt="Logo Eurasia"
                                height="52px"
                            />
                        </picture>
                    </nuxt-link>
                </div>
            </nav>

        </header>
        <!-- horizontal line -->
        <hr class="border-1 border-black-400 pb-8">
        <!-- main container -->
        <div class="container mx-auto px-4 mb-24">
            <slot />
        </div>
        <!-- horizontal line -->
        <hr class="border-1 border-black-400 pt-4">
        <footer class="text-center lg:text-left text-xs">
            <div class="text-gray-700 text-center p-4">
                developed by:
                <a class="text-gray-800 hover:text-red-600" target="_blank" href="https://brunomoyse.be/">@bmoyse</a>
            </div>
        </footer>
    </div>
</template>

<script setup>
    import { ref  } from 'vue';

    let menu = ref(false);
    const toggleDropdownMenu = () => {
        menu.value = !menu.value;
        console.log(menu.value);
    }
</script>
