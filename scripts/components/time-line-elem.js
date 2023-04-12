import { formatPersonFullName } from "../helpers/utils.js";
import { usePersonsStore } from "../store/use-persons.store.js";
const { mapState } = Pinia;

export const TimeLineElem = {
    props: {
        event: { type: Object, required: true }
    },
    template: /*html*/ `
        <li class="mb-10 ml-4">
            <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
            <time class="mb-1 text-sm font-normal leading-none text-gray-400">{{ date }}</time>
            <h3 class="text-lg font-semibold text-gray-900">{{ event.title }}</h3>
            <p class="mb-4 text-base font-normal text-gray-500">{{ event.description }}</p>
            <div class="flex flex-wrap mb-3" v-if="event.persons">
                <span v-for="person in formattedPersons" 
                      :key="person.id" 
                      class="px-2 py-1.5 mr-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
                    {{ person.name }}
                </span>
            </div>
            <button @click="onButtonClick" 
                type="button" 
                class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                Подробнее
            </button>
        </li>`,
    computed: {
        ...mapState(usePersonsStore, ["persons"]),
        date() {
            return "Начало в " + moment(this.event.beginDate).format("HH:mm DD.MM.yyyy");
        },
        formattedPersons() {
            return (
                this.persons
                    .filter(p => this.event.persons?.includes?.(p.id))
                    .map(p => ({
                        id: p.id,
                        name: formatPersonFullName(p)
                    })) || []
            );
        }
    },
    methods: {
        onButtonClick() {
            this.$emit("on-event-selected", this.event);
        }
    }
};
