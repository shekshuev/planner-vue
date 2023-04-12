import { TabBar } from "../components/tab-bar.js";
import { DefaultLayout } from "../components/default-layout.js";
import { SearchInput } from "../components/search-input.js";

export const PersonsPage = {
    components: { TabBar, DefaultLayout, SearchInput },
    template: /*html*/ `
        <tab-bar :tabs="personsTabs" :selected-tab-id="selectedTabId" @tab-clicked="onTabSelected"></tab-bar>
        <default-layout>
            <template v-slot:left>
                <search-input v-model="searchString"></search-input>
                <div class="scrollable">
                    
                </div>
            </template>
        </default-layout>
    `,
    data: () => ({
        personsTabs: [
            {
                id: 0,
                title: "Все участники"
            },
            {
                id: 1,
                title: "Организаторы"
            },
            {
                id: 2,
                title: "Абоненты"
            }
        ],
        selectedTabId: 0,
        searchString: ""
    }),
    methods: {
        onTabSelected(id) {
            this.selectedTabId = id;
        }
    }
};
