import DropdownCompanyes from "./Blocks/DropdownCompanyes";
import DropdownGroups from "./Blocks/DropdownGroups";
import DropdownStudents from "./Blocks/DropdownStudents";
import StudentsList from "./Blocks/StudentsList";

const CreateDocument = ({
  isLoadStudents,
  filteredStudents,
  findStudentByGroup,
  handleFilterStudent,
  isLoadGroups,
  sortedGroups,
  handleFilterGroup,
  isOpenGroup,
  setIsOpenGroup,
  isOpenStudent,
  setIsOpenStudent,
  selectedGroup,
  setSelectedGroup,
  selectedStudent,
  setSelectedStudent,
  selectedStudents,
  addStudent,
  removeStudent,
  setTitle,
  setStartDate,
  setEndDate,
  isLoadCompanyes,
  filteredCompanyes,
  handleFilterCompany,
  setSelectedCompany,
  selectedCompany,
  isOpenCompany,
  setIsOpenCompany,
}) => {
  return (
    <div className="createDoc">
      <h1 className="title animate__animated animate__fadeInDown">Создание документа</h1>
      <div className="titleInput animate__animated animate__fadeInLeft">
        <input
          type="text"
          onChange={(txt) => setTitle(txt.target.value)}
          placeholder="Введите название документа"
        />
      </div>
      <div className="dateInputs animate__animated animate__fadeInLeft">
        <div>
          <p>От</p>
          <input type="date" onChange={(dt) => setStartDate(dt.target.value)} />
        </div>
        <div>
          <p>До</p>
          <input type="date" onChange={(dt) => setEndDate(dt.target.value)} />
        </div>
      </div>
      <div className="checkCompany animate__animated animate__fadeInLeft">
        <p>Выберите организацию:</p>
        <DropdownCompanyes
          isLoadCompanyes={isLoadCompanyes}
          filteredCompanyes={filteredCompanyes}
          handleFilterCompany={handleFilterCompany}
          setSelectedCompany={setSelectedCompany}
          selectedCompany={selectedCompany}
          isOpenCompany={isOpenCompany}
          setIsOpenCompany={setIsOpenCompany}
        />
      </div>
      <div className="groupAndStudents animate__animated animate__fadeInRight">
        <DropdownGroups
          isOpenGroup={isOpenGroup}
          setIsOpenGroup={setIsOpenGroup}
          isLoadGroups={isLoadGroups}
          sortedGroups={sortedGroups}
          handleFilterGroup={handleFilterGroup}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          findStudentByGroup={findStudentByGroup}
          setSelectedStudent={setSelectedStudent}
        />
        <DropdownStudents
          isOpenStudent={isOpenStudent}
          setIsOpenStudent={setIsOpenStudent}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          selectedGroup={selectedGroup}
          filteredStudents={filteredStudents}
          handleFilterStudent={handleFilterStudent}
          isLoadStudents={isLoadStudents}
        />
        <button type="button" className="addStudentBtn" onClick={addStudent}>
          Добавить
        </button>
      </div>
      <StudentsList
        selectedStudents={selectedStudents}
        removeStudent={removeStudent}
      />
      <div className="createBtn animate__animated animate__fadeInRight">
        <button type="button">Создать</button>
      </div>
    </div>
  );
};

export default CreateDocument;
