import { TimeLine } from "../components/time-line.js";
import { TabBar } from "../components/tab-bar.js";
import { EventCard } from "../components/event-card.js";

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
                    <event-card v-if="selectedEvent" :event="selectedEvent" class="mb-10"></event-card>
                </div>
            </div>
        </div>
        
    `,
    data: () => ({
        events: [
            {
                id: Date.now() + Math.random(),
                beginDate: new Date(),
                endDate: new Date(),
                title: "Event 1",
                description: "Lorem ipsum",
                members: []
            }
        ],
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
        filteredEvents() {
            if (this.selectedTabId === 0) {
                return this.events;
            } else if (this.selectedTabId === 1) {
                const now = Date.now();
                return this.events.filter(e => e.beginDate.getTime() < now);
            } else if (this.selectedTabId === 2) {
                const now = Date.now();
                return this.events.filter(e => e.beginDate.getTime() >= now);
            }
        }
    },
    methods: {
        onTabSelected(id) {
            this.selectedTabId = id;
        },
        onEventSelected(event) {
            this.selectedEvent = event;
        }
    }
};
