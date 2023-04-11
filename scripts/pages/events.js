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
        selectedTabId: 0,
        selectedEvent: null
    }),
    computed: {
        ...mapState(useEventsStore, ["events"]),
        filteredEvents() {
            if (this.selectedTabId === 0) {
                return this.events.sort((a, b) => a.beginDate.getTime() - b.beginDate.getTime());
            } else if (this.selectedTabId === 1) {
                const now = Date.now();
                return this.events
                    .filter(e => e.beginDate.getTime() < now)
                    .sort((a, b) => a.beginDate.getTime() - b.beginDate.getTime());
            } else if (this.selectedTabId === 2) {
                const now = Date.now();
                return this.events
                    .filter(e => e.beginDate.getTime() >= now)
                    .sort((a, b) => a.beginDate.getTime() - b.beginDate.getTime());
            }
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
