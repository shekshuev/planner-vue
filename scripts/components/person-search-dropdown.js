import { usePersonsStore } from "../store/use-persons.store.js";
import { formatPersonFullName } from "../helpers/utils.js";
import { SearchInput } from "./search-input.js";
const { Dropdown } = Flowbite.default;
const { mapState } = Pinia;

export const PersonSearchDropdown = {
    props: {
        event: { type: Object }
    },
    components: { SearchInput },
    template: /*html*/ `
        <div>
            <button id="dropdownSearchButton" 
                    ref="trigger"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center" 
                    type="button">
                <div class="w-full flex justify-between">
                <span>Участники (выбрано {{ event.persons ? event.persons.length : 0 }})</span> <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </button>
            <div ref="target" class="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                <div class="p-3">
                    <search-input v-model="searchString"></search-input>
                </div>
                <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700">
                    <li v-for="person in formattedPersons" :key="person.id">
                        <div class="flex items-center pl-2 rounded hover:bg-gray-100">
                            <input id="'person-id-' + person.id" 
                                   type="checkbox" 
                                   @change="e => onCheckboxChanged(person.id, e.target.checked)"
                                   :checked="event.persons && event.persons.includes(person.id)"
                                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
                            <label :for="'person-id-' + person.id" 
                                   class="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded">
                                   {{ person.name }}
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `,
    data: () => ({
        searchString: ""
    }),
    computed: {
        ...mapState(usePersonsStore, ["persons"]),
        formattedPersons() {
            if (this.searchString.length > 0) {
                return this.persons
                    .filter(
                        p =>
                            p.firstName.toLowerCase().startsWith(this.searchString.toLowerCase()) ||
                            p.middleName.toLowerCase().startsWith(this.searchString.toLowerCase()) ||
                            p.lastName.toLowerCase().startsWith(this.searchString.toLowerCase())
                    )
                    .map(p => ({
                        id: p.id,
                        name: formatPersonFullName(p)
                    }));
            } else {
                return this.persons.map(p => ({
                    id: p.id,
                    name: formatPersonFullName(p)
                }));
            }
        }
    },
    methods: {
        onCheckboxChanged(personId, isChecked) {
            if (isChecked) {
                this.$emit("on-person-checked", personId);
            } else {
                this.$emit("on-person-unchecked", personId);
            }
        }
    },
    mounted() {
        const options = {
            placement: "bottom",
            triggerType: "click",
            offsetSkidding: 0,
            offsetDistance: 10,
            delay: 300
        };
        new Dropdown(this.$refs.target, this.$refs.trigger, options);
    }
};
