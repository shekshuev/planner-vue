import Datepicker from "../libs/datepicker.js";

export const EventCard = {
    props: {
        event: { type: Object }
    },
    template: /*html*/ `
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <form class="space-y-6" action="#">
                <h5 class="text-xl font-medium text-gray-900">Карточка ВКС</h5>
                <div>
                    <label for="title" 
                           class="block mb-2 text-sm font-medium text-gray-900">
                        Название
                    </label>
                    <input type="text" 
                           id="title" 
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                           v-model="model.title">
                </div>
                <div>
                    <label for="description" 
                           class="block mb-2 text-sm font-medium text-gray-900">
                        Описание
                    </label>
                    <textarea id="description" 
                              rows="4" 
                              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                              v-model="model.description"></textarea>
                </div>
                <div>
                    <label for="beginDate" 
                           class="block mb-2 text-sm font-medium text-gray-900">
                        Дата начала
                    </label>
                    <div class="relative max-w-sm">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input ref="beginDateRef" 
                               type="text" 
                               readonly
                               v-model="model.beginDate"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5">
                    </div>
                </div>
                <div>
                    <label for="endDate" 
                           class="block mb-2 text-sm font-medium text-gray-900">
                        Дата окончания
                    </label>
                    <div class="relative max-w-sm">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input ref="endDateRef" 
                               readonly
                               type="text" 
                               v-model="model.endDate"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5">
                    </div>
                </div>
                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Сохранить изменения</button>
                <button type="button" class="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Удалить</button>
            </form>
        </div>
    `,
    data() {
        return {
            model: {
                ...this.event,
                beginDate: moment(this.event.beginDate).format("DD.MM.yyyy"),
                endDate: moment(this.event.beginDate).format("DD.MM.yyyy")
            }
        };
    },
    mounted() {
        new Datepicker(this.$refs["beginDateRef"], {
            autohide: true,
            format: "dd.mm.yyyy"
        });
        new Datepicker(this.$refs["endDateRef"], {
            autohide: true,
            format: "dd.mm.yyyy"
        });
    }
};
