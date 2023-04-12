export const TopMenu = {
    props: {
        menuItems: { type: Array, default: [] }
    },
    template: /*html*/ `
        <nav class="bg-white border-gray-200">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" class="flex items-center">
                    <img src="assets/icons/icon-128x128.png" class="h-8 mr-3" alt="Flowbite Logo" />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap">Планирование ВКС</span>
                </a>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span class="sr-only">Open main menu</span>
                    <svg
                        class="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </button>
                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul
                        class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white"
                    >
                        <li v-for="menuItem in menuItems">
                            <router-link
                                :to="menuItem.to"
                                :class="{
                                    'block py-2 pl-3 pr-4 rounded text-gray-500 hover:text-gray-600 md:p-0': routeName !== menuItem.to.name,
                                    'block py-2 pl-3 pr-4 rounded text-blue-700 md:p-0': routeName === menuItem.to.name,
                                }"
                                aria-current="page"
                                >{{ menuItem.title }}</router-link
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `,
    computed: {
        routeName() {
            return this.$route.name;
        }
    }
};
