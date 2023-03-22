import personService from "../services/persons";

const Persons = ({ persons, newFilter, setPersons, setErrorMessage }) => {
  const personsToShow = persons.filter((p) => {
    console.log("p");
    const person = p.name.toLowerCase().includes(newFilter.toLowerCase());
    return person;
  });

  const handleDelete = (id) => {
    const personToDelete = persons.filter((p) => p.id === id);
    const name = personToDelete[0].name;
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter((p) => p.id !== id)))
        .catch((error) => {
          setErrorMessage(`Person ${name} was already removed from the server`);
        });
    }
  };

  return (
    <ul>
      {personsToShow.map((p) => (
        <>
          <li key={p.name}>
            {p.name} {p.number}
            <button onClick={() => handleDelete(p.id)}>delete</button>
          </li>
        </>
      ))}
    </ul>
  );
};

export default Persons;
