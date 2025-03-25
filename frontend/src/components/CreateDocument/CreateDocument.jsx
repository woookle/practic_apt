import DropdownCompanyes from "./Blocks/DropdownCompanyes";
import DropdownGroups from "./Blocks/DropdownGroups";
import DropdownStudents from "./Blocks/DropdownStudents";
import DropdownPractics from "./Blocks/DropdownPractics";
import StudentsList from "./Blocks/StudentsList";
import DropdownLesson from "./Blocks/DropdownLesson";

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
  dropdownRef,
  filterComp,
  filterGroups,
  filterStudents,
  isLoadPractics,
  sortedPractics,
  handleFilterPractic,
  filterPractic,
  selectedPractic,
  setSelectedPractic,
  isOpenPractic,
  setIsOpenPractic,
  selectedTwoPractic,
  setSelectedTwoPractic,
  isOpenTwoPractic,
  setIsOpenTwoPractic,
  isLoadLessons,
  sortedLessons,
  handleFilterLesson,
  filterLesson,
  selectedLesson,
  setSelectedLesson,
  isOpenLesson,
  setIsOpenLesson,
  setStartTwoDate,
  setEndTwoDate,
  setCourse,
  setNumber,
  setNumberDate,
  createDocument,
  isCreatingDocument
}) => {
  return (
    <div className="createDoc">
      <h1 className="title animate__animated animate__fadeInDown">
        Создание документа
      </h1>
      <div className="titleInput animate__animated animate__fadeInLeft">
        <input
          type="text"
          onChange={(txt) => setTitle(txt.target.value)}
          placeholder="Введите название документа"
        />
      </div>
      <div className="dateInputs">
        <div>
          <p>Введите номер документа:</p>
          <input type="text" placeholder="Введите номер документа" onChange={(txt) => setNumber(txt.target.value)} />
        </div>
        <div>
          <p>Введите дату</p>
          <input type="date" onChange={(dt) => setNumberDate(dt.target.value)} />
        </div>
      </div>
      <div className="dateInputs">
        <div>
          <p>От</p>
          <input type="date" onChange={(dt) => setStartDate(dt.target.value)} />
        </div>
        <div>
          <p>До</p>
          <input type="date" onChange={(dt) => setEndDate(dt.target.value)} />
        </div>
      </div>
      <div className="dateInputs">
        <div>
          <p>От</p>
          <input type="date" onChange={(dt) => setStartTwoDate(dt.target.value)} />
        </div>
        <div>
          <p>До</p>
          <input type="date" onChange={(dt) => setEndTwoDate(dt.target.value)} />
        </div>
      </div>
      <div className="checkCompany">
        <p>Выберите организацию:</p>
        <DropdownCompanyes
          isLoadCompanyes={isLoadCompanyes}
          filteredCompanyes={filteredCompanyes}
          handleFilterCompany={handleFilterCompany}
          setSelectedCompany={setSelectedCompany}
          selectedCompany={selectedCompany}
          isOpenCompany={isOpenCompany}
          setIsOpenCompany={setIsOpenCompany}
          dropdownRef={dropdownRef}
          filterComp={filterComp}
        />
      </div>
      <div className="checkCompany">
        <p>Выберите учебный предмет:</p>
        <DropdownLesson
          isLoadLessons={isLoadLessons}
          sortedLessons={sortedLessons}
          handleFilterLesson={handleFilterLesson}
          filterLesson={filterLesson}
          selectedLesson={selectedLesson}
          setSelectedLesson={setSelectedLesson}
          isOpenLesson={isOpenLesson}
          setIsOpenLesson={setIsOpenLesson}
          dropdownRef={dropdownRef}
        />
      </div>
      <div className="checkPractic">
        <p>Выберите практику:</p>
        <DropdownPractics
          dropdownRef={dropdownRef}
          isLoadPractics={isLoadPractics}
          sortedPractics={sortedPractics}
          handleFilterPractic={handleFilterPractic}
          filterPractic={filterPractic}
          selectedPractic={selectedPractic}
          setSelectedPractic={setSelectedPractic}
          isOpenPractic={isOpenPractic}
          setIsOpenPractic={setIsOpenPractic}
        />
      </div>
      <div className="checkPractic">
        <p>Выберите вторую практику:</p>
        <DropdownPractics
          dropdownRef={dropdownRef}
          isLoadPractics={isLoadPractics}
          sortedPractics={sortedPractics}
          handleFilterPractic={handleFilterPractic}
          filterPractic={filterPractic}
          selectedPractic={selectedTwoPractic}
          setSelectedPractic={setSelectedTwoPractic}
          isOpenPractic={isOpenTwoPractic}
          setIsOpenPractic={setIsOpenTwoPractic}
        />
      </div>
      <div className="groupAndStudents">
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
          dropdownRef={dropdownRef}
          filterGroups={filterGroups}
          setCourse={setCourse}
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
          dropdownRef={dropdownRef}
          filterStudents={filterStudents}
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
        <button type="button" onClick={createDocument} disabled={isCreatingDocument}>Создать</button>
      </div>
    </div>
  );
};

export default CreateDocument;
