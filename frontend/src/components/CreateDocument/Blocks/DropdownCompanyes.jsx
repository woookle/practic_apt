import { ClipLoader } from "react-spinners";

const DropdownCompanyes = ({
  isLoadCompanyes,
  filteredCompanyes,
  handleFilterCompany,
  setSelectedCompany,
  selectedCompany,
  isOpenCompany,
  setIsOpenCompany,
}) => {
  return (
    <div className="dropDownCompanyes">
      <button type="button" className="companyBtn" disabled={isLoadCompanyes} onClick={() => setIsOpenCompany(!isOpenCompany)}>
        {isLoadCompanyes ? (
          <ClipLoader speedMultiplier={0.5} />
        ) : selectedCompany === "" ? (
          "Выберите организацию"
        ) : (
          selectedCompany
        )}
      </button>
      {isOpenCompany && (
        <div className="companyList">
          <input
            type="text"
            onChange={handleFilterCompany}
            placeholder="Поиск организации..."
          />
          <ul>
            {filteredCompanyes.length == 0
              ? <p className="animate__animated animate__fadeIn">Ничего не найдено!</p>
              : filteredCompanyes.map((comp, key) => (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCompany(comp.name);
                        setIsOpenCompany(false)
                      }}
                    >
                      {comp.name}
                    </button>
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownCompanyes;
