import { TabBar } from "../components/tab-bar.js";

export const PersonsPage = {
    components: { TabBar },
    template: /*html*/ `
        <tab-bar :tabs="personsTabs" :selected-tab-id="selectedTabId" @tab-clicked="onTabSelected"></tab-bar>
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
        selectedTabId: 0
    }),
    methods: {
        onTabSelected(id) {
            this.selectedTabId = id;
        }
    }
};
