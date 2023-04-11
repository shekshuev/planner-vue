import { TopMenu } from "./components/top-menu.js";
import { EventsPage } from "./pages/events.js";
import { PersonsPage } from "./pages/persons.js";

const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;
const { createPinia } = Pinia;

const routes = [
    { path: "/events", name: "event-list", component: EventsPage },
    { path: "/persons", name: "person-list", component: PersonsPage }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
});

const pinia = createPinia();

const app = createApp({
    components: { TopMenu },
    data() {
        return {
            menuItems: [
                {
                    to: { name: "event-list" },
                    title: "Список ВКС"
                },
                {
                    to: { name: "person-list" },
                    title: "Участники"
                }
            ]
        };
    }
});
app.use(router);
app.use(pinia);
app.mount("#app");
