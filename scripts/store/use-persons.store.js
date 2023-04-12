const { defineStore } = Pinia;

export const usePersonsStore = defineStore({
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
        removePerson(person) {
            this.persons = this.persons.filter(p => p.id !== person.id);
            localStorage.setItem("vks.persons", JSON.stringify(this.persons));
        },
        updatePerson(person) {
            this.persons = this.persons.map(p => (p.id === person.id ? person : p));
            localStorage.setItem("vks.persons", JSON.stringify(this.persons));
        }
    }
});
