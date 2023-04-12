export function formatPersonFullName(person) {
    return `${person.lastName.substring(0, 1).toUpperCase()}${person.lastName
        .substring(1)
        .toLowerCase()} ${person.firstName.substring(0, 1).toUpperCase()}.${person.middleName
        .substring(0, 1)
        .toUpperCase()}.`;
}
