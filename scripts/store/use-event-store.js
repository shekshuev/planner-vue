const { defineStore } = Pinia;

export const useEventsStore = defineStore({
    id: "events",
    state: () => {
        let initialEvents = [];
        try {
            initialEvents = (JSON.parse(localStorage.getItem("vks.events")) ?? []).map(e => ({
                ...e,
                beginDate: new Date(Date.parse(e.beginDate)),
                endDate: new Date(Date.parse(e.endDate))
            }));
        } catch {}
        return {
            events: initialEvents
        };
    },
    actions: {
        addEvent(event) {
            setTimeout(() => {
                this.events.push({ ...event, id: Date.now() });
                localStorage.setItem("vks.events", JSON.stringify(this.events));
            }, 10);
        },
        removeEvent(event) {
            this.events = this.events.filter(e => e.id !== event.id);
            localStorage.setItem("vks.events", JSON.stringify(this.events));
        },
        updateEvent(event) {
            this.events = this.events.map(e => (e.id === event.id ? event : e));
            localStorage.setItem("vks.events", JSON.stringify(this.events));
        }
    }
});
