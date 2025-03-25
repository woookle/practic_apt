import { ClipLoader } from "react-spinners";

const DropdownPractics = ({
  isLoadPractics,
  sortedPractics,
  handleFilterPractic,
  filterPractic,
  selectedPractic,
  setSelectedPractic,
  isOpenPractic,
  setIsOpenPractic,
  dropdownRef,
}) => {
  return (
    <div className="dropDownPractics">
      {isLoadPractics ? (
        <button className="dropDownTitle">
          <ClipLoader speedMultiplier={0.5} size={14} />
        </button>
      ) : (
        <button
          type="button"
          className="dropDownTitle"
          onClick={() => setIsOpenPractic(!isOpenPractic)}
        >
          {selectedPractic === "" ? "Выберите практику" : selectedPractic}
        </button>
      )}
      {isOpenPractic && (
        <div className="practicList" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Поиск группы..."
            value={filterPractic}
            onChange={handleFilterPractic}
          />
          <ul>
            {sortedPractics.length == 0 ? (
              <p className="animate__animated animate__fadeIn">
                Ничего не найдено!
              </p>
            ) : (
              sortedPractics.map((pr, key) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPractic(pr.name);
                      setIsOpenPractic(false);
                    }}
                  >
                    {pr.name}
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

export default DropdownPractics;
