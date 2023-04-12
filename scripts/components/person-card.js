export const PersonCard = {
    props: {
        person: { type: Object }
    },
    template: /*html*/ `
        <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <form class="space-y-6" action="#">
                <h5 class="text-xl font-medium text-gray-900">Карточка участника</h5>
                <div>
                    <label for="lastName" 
                           class="block mb-2 text-sm font-medium text-gray-900">
                        Фамилия
                    </label>
                    <input type="text" 
                           id="lastName" 
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                           v-model="model.lastName">
                </div>
                <div>
                    <label for="firstName" 
                           class="block mb-2 text-sm font-medium text-gray-900">
                        Имя
                    </label>
                    <input type="text" 
                           id="firstName" 
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                           v-model="model.firstName">
                </div>
                <div>
                    <label for="middleName" 
                           class="block mb-2 text-sm font-medium text-gray-900">
                        Отчество
                    </label>
                    <input type="text" 
                           id="middleName" 
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                           v-model="model.middleName">
                </div>
                <div class="flex flex-wrap items-center justify-start">
                    <div class="flex items-center mr-4">
                        <input id="organizer" 
                               name="role"
                               type="radio" 
                               value="organizer" 
                               v-model="model.role"
                               class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                        <label for="organizer" class="ml-2 text-sm font-medium text-gray-900">Организатор</label>
                    </div>
                    <div class="flex items-center">
                        <input id="subscriber" 
                               name="role"
                               type="radio" 
                               value="subscriber" 
                               v-model="model.role"
                               class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                        <label for="subscriber" class="ml-2 text-sm font-medium text-gray-900">Абонент</label>
                    </div>
                </div>
                <button type="button" 
                        :disabled="!isFormValid"
                        @click="onSaveButtonClicked"
                        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:hover:bg-blue-700">Сохранить изменения</button>
                <button type="button" 
                        @click="onDeleteOrCancelButtonClicked"
                        class="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        {{ person.id ? 'Удалить' : 'Отмена' }}
                </button>
            </form>
        </div>
    `,
    data() {
        return {
            model: { ...this.person, role: this.person.role || "organizer" }
        };
    },
    methods: {
        onSaveButtonClicked() {
            this.$emit("on-save", {
                id: this.person.id,
                lastName: this.model.lastName,
                firstName: this.model.firstName,
                middleName: this.model.middleName,
                role: this.model.role
            });
        },
        onDeleteOrCancelButtonClicked() {
            if (this.person.id) {
                this.$emit("on-delete", this.person);
            } else {
                this.$emit("on-cancel");
            }
        }
    },
    computed: {
        isFormValid() {
            return (
                this.model.lastName?.length > 0 && this.model.firstName?.length > 0 && this.model.middleName?.length > 0
            );
        }
    },
    watch: {
        person(newVal) {
            this.model = { ...newVal, role: newVal.role || "organizer" };
        }
    }
};
