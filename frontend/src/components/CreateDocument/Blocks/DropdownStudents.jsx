import { ClipLoader } from "react-spinners";

const DropdownStudents = ({
  isOpenStudent,
  setIsOpenStudent,
  selectedStudent,
  setSelectedStudent,
  selectedGroup,
  filteredStudents,
  handleFilterStudent,
  isLoadStudents,
  dropdownRef,
  filterStudents
}) => {
  return (
    <div className="dropDownStudents">
      {selectedGroup === "" ? (
        <p>Группа не выбрана!</p>
      ) : isLoadStudents ? (
        <ClipLoader speedMultiplier={0.5} size={14} />
      ) : (
        <button
          className="dropDownButton"
          onClick={() => setIsOpenStudent(!isOpenStudent)}
        >
          {selectedStudent === "" ? "Выберите студента" : selectedStudent}
        </button>
      )}
      {isOpenStudent && (
        <div className="studentList" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Поиск студента..."
            value={filterStudents}
            onChange={handleFilterStudent}
          />
          <ul>
            {filteredStudents.length == 0
              ? <p className="animate__animated animate__fadeIn">Ничего не найдено!</p>
              : filteredStudents.map((stud, key) => (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedStudent(stud.name);
                        setIsOpenStudent(false)
                      }}
                    >
                      {stud.name}
                    </button>
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownStudents;
