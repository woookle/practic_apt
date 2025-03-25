import { useState, useEffect } from "react";
import { getPractics } from "../api/api";

const useGetPractics = () => {
  const [isLoadPractics, setIsLoadPractics] = useState(false);
  const [practics, setPractics] = useState([]);
  const [sortedPractics, setSortedPractics] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function getAllPractics() {
      try {
        setIsLoadPractics(true);
        const response = await getPractics();
        setPractics(response);
        setSortedPractics(response);
      } catch (error) {
        return false;
      } finally {
        setIsLoadPractics(false);
      }
    }
    getAllPractics();
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const filteredPractics = practics.filter((practic) =>
        practic.name.toLowerCase().includes(filter.toLowerCase())
      );
      setSortedPractics(filteredPractics);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [filter, practics]);

  const handleFilterPractic = (event) => {
    setFilter(event.target.value);
  };

  return { isLoadPractics, sortedPractics, handleFilterPractic, filterPractic: filter };
};

export default useGetPractics;
