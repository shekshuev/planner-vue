import { TabBar } from "../components/tab-bar.js";
import { DefaultLayout } from "../components/default-layout.js";
import { SearchInput } from "../components/search-input.js";
import { PersonList } from "../components/persons-list.js";
import { usePersonsStore } from "../store/use-persons.store.js";
const { mapState, mapActions } = Pinia;

export const PersonsPage = {
    components: { TabBar, DefaultLayout, SearchInput, PersonList },
    template: /*html*/ `
        <tab-bar :tabs="personsTabs" :selected-tab-id="selectedTabId" @tab-clicked="onTabSelected"></tab-bar>
        <default-layout>
            <template v-slot:left>
                <search-input v-model="searchString"></search-input>
                <div class="scrollable">
                    <person-list :persons="filteredPersons" @on-person-selected="onPersonSelected"></person-list>
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
        searchString: "",
        selectedPerson: null
    }),
    computed: {
        ...mapState(usePersonsStore, ["persons"]),
        filteredPersons() {
            let filtered = [];
            if (this.selectedTabId === 0) {
                filtered = this.persons;
            } else if (this.selectedTabId === 1) {
                filtered = this.persons.filter(p => p.role === "organizer");
            } else if (this.selectedTabId === 2) {
                filtered = this.persons.filter(p => p.role === "subscriber");
            }
            return this.searchString.length > 0
                ? filtered.filter(
                      p =>
                          p.firstName.toLowerCase().startsWith(this.searchString.toLowerCase()) ||
                          p.middleName.toLowerCase().startsWith(this.searchString.toLowerCase()) ||
                          p.lastName.toLowerCase().startsWith(this.searchString.toLowerCase())
                  )
                : filtered;
        }
    },
    methods: {
        ...mapActions(usePersonsStore, ["addPerson", "updatePerson", "removePerson"]),
        onTabSelected(id) {
            this.selectedTabId = id;
        },
        onPersonSelected(person) {
            this.selectedPerson = person;
        }
    }
};
