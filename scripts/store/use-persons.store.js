const { defineStore } = Pinia;

export const useEventsStore = defineStore({
    id: "persons",
    state: () => {
        let initialPersons = [];
        try {
            initialPersons = JSON.parse(localStorage.getItem("vks.persons")) ?? [];
        } catch {}
        return {
            persons: initialPersons
        };
    },
    actions: {
        addPerson(person) {
            setTimeout(() => {
                this.persons.push({ ...person, id: Date.now() });
                localStorage.setItem("vks.persons", JSON.stringify(this.persons));
            }, 10);
        },
        removeEvent(person) {
            this.persons = this.persons.filter(p => p.id !== person.id);
            localStorage.setItem("vks.persons", JSON.stringify(this.persons));
        },
        updateEvent(person) {
            this.persons = this.persons.map(p => (p.id === person.id ? person : p));
            localStorage.setItem("vks.persons", JSON.stringify(this.persons));
        }
    }
});
