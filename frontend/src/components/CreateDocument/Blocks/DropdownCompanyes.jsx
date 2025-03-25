import { ClipLoader } from "react-spinners";

const DropdownCompanyes = ({
  isLoadCompanyes,
  filteredCompanyes,
  handleFilterCompany,
  setSelectedCompany,
  selectedCompany,
  isOpenCompany,
  setIsOpenCompany,
  dropdownRef,
  filterComp
}) => {
  return (
    <div className="dropDownCompanyes">
      <button
        type="button"
        className="companyBtn"
        disabled={isLoadCompanyes}
        onClick={() => setIsOpenCompany(!isOpenCompany)}
      >
        {isLoadCompanyes ? (
          <ClipLoader speedMultiplier={0.5} size={14} />
        ) : selectedCompany === "" ? (
          "Выберите организацию"
        ) : (
          selectedCompany
        )}
      </button>
      {isOpenCompany && (
        <div className="companyList" ref={dropdownRef}>
          <input
            type="text"
            onChange={handleFilterCompany}
            value={filterComp}
            placeholder="Поиск организации..."
          />
          <ul>
            {filteredCompanyes.length == 0 ? (
              <p className="animate__animated animate__fadeIn">Ничего не найдено!</p>
            ) : (
              filteredCompanyes.map((comp, key) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCompany(comp.name);
                      setIsOpenCompany(false);
                    }}
                  >
                    {comp.name}
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

export default DropdownCompanyes;