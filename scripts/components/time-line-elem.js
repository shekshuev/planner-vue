export const TimeLineElem = {
    props: {
        event: { type: Object, required: true }
    },
    template: /*html*/ `
        <li class="mb-10 ml-4" @mouseover="showButton = true" @mouseleave="showButton = false">
            <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
            <time class="mb-1 text-sm font-normal leading-none text-gray-400">{{ date }}</time>
            <h3 class="text-lg font-semibold text-gray-900">{{ event.title }}</h3>
            <p class="mb-4 text-base font-normal text-gray-500">{{ event.description }}</p>
            <button v-if="showButton" @click="onButtonClick" type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">Подробнее</button>
        </li>`,
    data: () => ({
        showButton: false
    }),
    computed: {
        date() {
            return "Начало в " + moment(this.event.beginDate).format("HH:mm DD.MM.yyyy");
        }
    },
    methods: {
        onButtonClick() {
            this.$emit("on-event-selected", this.event);
        }
    }
};
