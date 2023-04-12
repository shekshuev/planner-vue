import { TimeLineElem } from "./time-line-elem.js";

export const TimeLine = {
    components: { TimeLineElem },
    props: {
        events: { type: Array, default: [] }
    },
    template: /*html*/ `
        <div>
            <ol class="relative border-l border-gray-200" v-if="events.length > 0">
                <time-line-elem v-for="event in events" 
                                :event="event" 
                                :key="event.id"
                                @on-event-selected="onEventSelected">
                </time-line-elem>
            </ol>
            <h1 v-else class="text-2xl ml-2 font-semibold text-gray-500">Ни одного ВКС не найдено</h1>
        </div>`,
    methods: {
        onEventSelected(event) {
            this.$emit("on-event-selected", event);
        }
    }
};
