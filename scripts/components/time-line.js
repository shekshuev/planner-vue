import { TimeLineElem } from "./time-line-elem.js";

export const TimeLine = {
    components: { TimeLineElem },
    props: {
        events: { type: Array, default: [] }
    },
    template: /*html*/ `
        <div>
            <ol class="relative border-l border-gray-200">
                <time-line-elem v-for="event in events" :event="event" @on-event-selected="onEventSelected"/>
            </ol>
        </div>`,
    methods: {
        onEventSelected(event) {
            this.$emit("on-event-selected", event);
        }
    }
};
