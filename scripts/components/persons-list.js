import { PersonListElem } from "./person-list-elem.js";

export const PersonList = {
    props: {
        persons: { type: Array, default: [] }
    },
    components: { PersonListElem },
    template: /*html*/ `
        <div>
            <ul role="list" class="divide-y divide-gray-200" v-if="persons.length > 0">
                <person-list-elem v-for="person in persons" 
                                  :person="person" 
                                  :key="person.id" 
                                  @on-person-selected="onPersonSelected">
                </person-list-elem>
            </ul>
            <h1 v-else class="text-2xl ml-2 font-semibold text-gray-500">Ни одного участника не найдено</h1>
        </div>
    `,
    methods: {
        onPersonSelected(person) {
            this.$emit("on-person-selected", person);
        }
    }
};
