import DropdownPractics from "./DropdownPractics";

const AddLessonModal = ({
  handleAddNewLesson,
  isOpenPractic,
  setIsOpenPractic,
  isLoadPractics,
  sortedPractics,
  handleFilterPractic,
  filterPractic,
  selectedPractic,
  setSelectedPractic,
  dropdownRef,
  setStartTwoDate,
  setEndTwoDate,
  setIsOpenModal
}) => {
  const handleAddLesson = () => {
    if (selectedPractic && setStartTwoDate && setEndTwoDate) {
      handleAddNewLesson();
    }
  };

  return (
    <div className="addLessonModule animate__animated animate__fadeIn">
      <div className="cont">
        <div className="closeModal" onClick={() => setIsOpenModal(false)}>закрыть</div>
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
        <div className="dateInputs">
          <div>
            <p>От</p>
            <input
              type="date"
              onChange={(dt) => setStartTwoDate(dt.target.value)}
            />
          </div>
          <div>
            <p>До</p>
            <input
              type="date"
              onChange={(dt) => setEndTwoDate(dt.target.value)}
            />
          </div>
        </div>
        <button onClick={handleAddLesson} className="addNewLessonBtn">Добавить</button>
      </div>
    </div>
  );
};

export default AddLessonModal;
