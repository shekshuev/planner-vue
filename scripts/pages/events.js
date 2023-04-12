import { TimeLine } from "../components/time-line.js";
import { TabBar } from "../components/tab-bar.js";
import { EventCard } from "../components/event-card.js";
import { useEventsStore } from "../store/use-event-store.js";
const { mapState, mapActions } = Pinia;

export const EventsPage = {
    components: { TimeLine, TabBar, EventCard },
    template: /*html*/ `
        <tab-bar :tabs="eventTabs" :selected-tab-id="selectedTabId" @tab-clicked="onTabSelected"></tab-bar>
        <div class="grid grid-cols-7 gap-4 pt-6">
            <div class="col-span-4">
                <div class="relative mb-4">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" 
                        id="search" 
                        v-model="searchString"
                        class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Поиск ВКС">
                </div>
                <div class="scrollable">
                    <time-line :events="filteredEvents" @on-event-selected="onEventSelected"></time-line>
                </div>
            </div>
            <div class="col-span-3">
                <div class="scrollable">
                    <event-card v-if="selectedEvent" 
                                :event="selectedEvent" 
                                @on-save="onSaveEvent"
                                @on-delete="onDeleteEvent"
                                @on-cancel="onCancelEvent"
                                class="mb-10"></event-card>
                    <button type="button" 
                            v-else
                            @click="onCreateEventButtonClicked"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Создать ВКС
                    </button>
                </div>
            </div>
        </div>
        
    `,
    data: () => ({
        eventTabs: [
            {
                id: 0,
                title: "Все мероприятия"
            },
            {
                id: 1,
                title: "Прошедшие"
            },
            {
                id: 2,
                title: "Будущие"
            }
        ],
        searchString: "",
        selectedTabId: 0,
        selectedEvent: null
    }),
    computed: {
        ...mapState(useEventsStore, ["events"]),
        filteredEvents() {
            let filtered = [];
            if (this.selectedTabId === 0) {
                filtered = this.events.sort((a, b) => a.beginDate.getTime() - b.beginDate.getTime());
            } else if (this.selectedTabId === 1) {
                const now = Date.now();
                filtered = this.events
                    .filter(e => e.beginDate.getTime() < now)
                    .sort((a, b) => a.beginDate.getTime() - b.beginDate.getTime());
            } else if (this.selectedTabId === 2) {
                const now = Date.now();
                filtered = this.events
                    .filter(e => e.beginDate.getTime() >= now)
                    .sort((a, b) => a.beginDate.getTime() - b.beginDate.getTime());
            }
            if (this.searchString.length > 0) {
                filtered = filtered.filter(
                    e =>
                        e.title.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0 ||
                        e.description.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0
                );
            }
            return filtered;
        }
    },
    methods: {
        ...mapActions(useEventsStore, ["addEvent", "updateEvent", "removeEvent"]),
        onTabSelected(id) {
            this.selectedTabId = id;
        },
        onEventSelected(event) {
            this.selectedEvent = event;
        },
        onCreateEventButtonClicked() {
            this.selectedEvent = {};
        },
        onSaveEvent(event) {
            if (event.id) {
                this.updateEvent(event);
            } else {
                this.addEvent(event);
            }
            this.selectedEvent = null;
        },
        onDeleteEvent(event) {
            this.removeEvent(event);
            this.selectedEvent = null;
        },
        onCancelEvent() {
            this.selectedEvent = null;
        }
    }
};
