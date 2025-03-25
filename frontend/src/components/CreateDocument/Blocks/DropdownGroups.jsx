import { ClipLoader } from "react-spinners";

const DropdownGroups = ({
  isOpenGroup,
  setIsOpenGroup,
  isLoadGroups,
  sortedGroups,
  handleFilterGroup,
  selectedGroup,
  setSelectedGroup,
  findStudentByGroup,
  setSelectedStudent,
  dropdownRef,
  filterGroups,
  setCourse
}) => {
  return (
    <div className="dropDownGroups">
      {isLoadGroups ? (
        <button className="dropDownTitle">
          <ClipLoader speedMultiplier={0.5} size={14} />
        </button>
      ) : (
        <button type="button" className="dropDownTitle" onClick={() => setIsOpenGroup(!isOpenGroup)}>
          {selectedGroup === "" ? "Выберите группу" : selectedGroup}
        </button>
      )}
      {isOpenGroup && (
        <div className="groupList" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Поиск группы..."
            value={filterGroups}
            onChange={handleFilterGroup}
          />
          <ul>
            {sortedGroups.length == 0
              ? <p className="animate__animated animate__fadeIn">Ничего не найдено!</p>
              : sortedGroups.map((gr, key) => (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedGroup(gr.name);
                        findStudentByGroup(gr._id);
                        setCourse(gr.course);
                        setSelectedStudent("");
                        setIsOpenGroup(false);
                      }}
                    >
                      {gr.name}
                    </button>
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownGroups;
