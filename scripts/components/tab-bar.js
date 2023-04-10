export const TabBar = {
    props: {
        tabs: { type: Array, default: [] },
        selectedTabId: { type: Number }
    },
    template: /*html*/ `
        <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
            <ul class="flex flex-wrap -mb-px" v-if="tabs.length > 0">
                <li class="mr-2" v-for="tab in tabs" :key="tab.id" @click="() => tabClicked(tab.id)">
                    <span
                    :class="{
                        'inline-block cursor-pointer p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300': selectedTabId !== tab.id,
                        'inline-block cursor-pointer p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active': selectedTabId === tab.id
                    }">{{ tab.title }}</span>
                </li>
            </ul>
        </div>`,
    methods: {
        tabClicked(id) {
            this.$emit("tab-clicked", id);
        }
    }
};
