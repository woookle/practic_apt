import DropdownCompanyes from "./Blocks/DropdownCompanyes";
import DropdownGroups from "./Blocks/DropdownGroups";
import DropdownStudents from "./Blocks/DropdownStudents";
import StudentsList from "./Blocks/StudentsList";
import DropdownLesson from "./Blocks/DropdownLesson";
import AddLessonModal from "./Blocks/AddLessonModal";

const CreateDocument = ({
  isLoadStudents,
  filteredStudents,
  handleFilterStudent,
  isLoadGroups,
  findStudentByGroup,
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
  isLoadCompanyes,
  filteredCompanyes,
  handleFilterCompany,
  setSelectedCompany,
  selectedCompany,
  isOpenCompany,
  setIsOpenCompany,
  dropdownRef,
  filterComp,
  setCourse,
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
  isLoadLessons,
  sortedLessons,
  handleFilterLesson,
  filterLesson,
  selectedLesson,
  setSelectedLesson,
  isOpenLesson,
  setIsOpenLesson,
  setNumber,
  setNumberDate,
  createDocument,
  isCreatingDocument,
  lessons,
  setIsOpenModal,
  isOpenModal,
  handleAddNewLesson,
  setStartTwoDate, 
  setEndTwoDate,
  deleteLesson,
  setAddress,
  setSelectedSpecialComponent,
  selectedSpecialComponent
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
          <input
            type="text"
            placeholder="Введите номер документа"
            onChange={(txt) => setNumber(txt.target.value)}
          />
        </div>
        <div>
          <p>Введите дату</p>
          <input
            type="date"
            onChange={(dt) => setNumberDate(dt.target.value)}
          />
        </div>
      </div>  
      <div className="checkCompany">
        <p>Выберите компанию:</p>
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
          setAddress={setAddress}
        />
      </div>
      <div className="checkCompany">
        <p>Выберите специальность:</p>
        <DropdownLesson
          isLoadLessons={isLoadLessons}
          sortedLessons={sortedLessons}
          handleFilterLesson={handleFilterLesson}
          filterLesson={filterLesson}
          selectedSpecialComponent={selectedSpecialComponent}
          setSelectedSpecialComponent={setSelectedSpecialComponent}
          isOpenLesson={isOpenLesson}
          setIsOpenLesson={setIsOpenLesson}
          dropdownRef={dropdownRef}
        />
      </div>
      <div className="lessonsList">
        <div className="lessonContainer">
        { lessons.length === 0 ? <p>Вы не добавили учебные предметы!</p> : lessons.map((les, key) => (
          <div className="lessonBlock" key={key}>
            {les.lessonName} ({les.dateFromAndTo}) 
            <button type="button" onClick={() => deleteLesson(key)}>Удалить</button>
          </div>
        )) }
        </div>
        <div className="addNewLessonButton">
          Добавить учебные предметы
        <button type="button" className="addNewLesson" onClick={() => setIsOpenModal(true)}>
          +
        </button>
        </div>
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
          setSelectedStudent={setSelectedStudent}
          dropdownRef={dropdownRef}
          filterGroups={filterGroups}
          findStudentByGroup={findStudentByGroup}
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
        <button
          type="button"
          onClick={createDocument}
          disabled={isCreatingDocument}
        >
          Создать
        </button>
      </div>

      {isOpenModal && <AddLessonModal 
        handleAddNewLesson={handleAddNewLesson} 
        isOpenPractic={isOpenPractic} 
        setIsOpenPractic={setIsOpenPractic} 
        isLoadPractics={isLoadPractics} 
        sortedPractics={sortedPractics} 
        handleFilterPractic={handleFilterPractic} 
        filterPractic={filterPractic} 
        selectedPractic={selectedPractic} 
        setSelectedPractic={setSelectedPractic} 
        dropdownRef={dropdownRef}
        setStartTwoDate={setStartTwoDate} 
        setEndTwoDate={setEndTwoDate} 
        setIsOpenModal={setIsOpenModal}
      />}
    </div>
  );
};

export default CreateDocument;
