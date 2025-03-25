import { useState, useEffect } from "react";
import { getCompanyes } from "../api/api";

const useGetCompanyes = () => {
  const [isLoadCompanyes, setIsLoadCompanyes] = useState(false);
  const [companyes, setCompanyes] = useState([]);
  const [filteredCompanyes, setFilteredCompanyes] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function findCompanyes() {
      try {
        setIsLoadCompanyes(true);
        const response = await getCompanyes();
        setCompanyes(response);
        setFilteredCompanyes(response);
      } catch (error) {
        return false;
      } finally {
        setIsLoadCompanyes(false);
      }
    }
    findCompanyes();
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const filtered = companyes.filter((comp) =>
        comp.name.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredCompanyes(filtered);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [filter, companyes]);

  const handleFilterCompany = (event) => {
    setFilter(event.target.value);
  };

  return { isLoadCompanyes, filteredCompanyes, handleFilterCompany, filterComp: filter };
};

export default useGetCompanyes;
