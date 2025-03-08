const StudentsList = ({ selectedStudents, removeStudent }) => {
  return (
    <div className="studentsList animate__animated animate__fadeIn">
      {selectedStudents.length === 0 ? (
        <p>Вы не добавили студентов!</p>
      ) : (
        selectedStudents.map((stud, key) => (
          <ul key={key}>
            <li>
              <p>
                {stud.id} | ФИО: {stud.name} | Группа: {stud.group}
              </p>
              <button type="button" onClick={() => removeStudent(stud.name)}>
                Удалить
              </button>
            </li>
          </ul>
        ))
      )}
    </div>
  );
};

export default StudentsList;
