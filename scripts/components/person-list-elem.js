export const PersonListElem = {
    props: {
        person: { type: Object, required: true }
    },
    template: /*html*/ `
        <li class="py-3 sm:py-4" @mouseover="showButton = true" @mouseleave="showButton = false">
            <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                    <img class="w-8 h-8 rounded-full" src="assets/avatar.png" alt="Neil image">
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">
                        {{ name }}
                    </p>
                    <p class="text-sm text-gray-500 truncate">
                        {{ role }}
                    </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900">
                    <transition name="fade">
                        <button v-if="showButton" class="text-sm font-medium text-blue-600 hover:underline">
                            Подробнее
                        </button>
                    </transition>
                </div>
            </div>
        </li>`,
    data: () => ({
        showButton: false
    }),
    computed: {
        name() {
            return `${this.person.lastName} ${this.person.firstName
                .substring(0, 1)
                .toUpperCase()}.${this.person.middleName.substring(0, 1).toUpperCase()}`;
        },
        role() {
            return this.person.role === "subscriber" ? "Абонент" : "Организатор";
        }
    },
    methods: {
        onPersonSelected(person) {
            this.$emit("on-person-selected", person);
        }
    }
};
