import { ClipLoader } from "react-spinners";

const DropdownLesson = ({
  isLoadLessons,
  sortedLessons,
  handleFilterLesson,
  filterLesson,
  selectedLesson,
  setSelectedLesson,
  isOpenLesson,
  setIsOpenLesson,
  dropdownRef
}) => {
  return (
    <div className="dropDownPractics">
      {isLoadLessons ? (
        <button className="dropDownTitle">
          <ClipLoader speedMultiplier={0.5} size={14} />
        </button>
      ) : (
        <button
          type="button"
          className="dropDownTitle"
          onClick={() => setIsOpenLesson(!isOpenLesson)}
        >
          {selectedLesson === "" ? "Выберите учебный предмет" : selectedLesson}
        </button>
      )}
      {isOpenLesson && (
        <div className="practicList" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Поиск группы..."
            value={filterLesson}
            onChange={handleFilterLesson}
          />
          <ul>
            {sortedLessons.length == 0 ? (
              <p className="animate__animated animate__fadeIn">
                Ничего не найдено!
              </p>
            ) : (
              sortedLessons.map((lesson, key) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLesson(lesson.name);
                      setIsOpenLesson(false);
                    }}
                  >
                    {lesson.name}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownLesson;