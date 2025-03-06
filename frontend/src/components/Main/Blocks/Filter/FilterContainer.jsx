import { useDispatch } from "react-redux";
import Filter from "./Filter";
import { useState } from "react";
import { useEffect } from "react";
import { filterDocuments } from "../../../../redux/slices/documentSlice";

const FilterContainer = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [group, setGroup] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [isChanged, setIsChanged] = useState(true);
  
  useEffect(() => {
    dispatch(filterDocuments({ startDate, endDate, title, group }));
    setIsChanged(title === "" && group === "" && startDate === "" && endDate === "");
  }, [title, group, startDate, endDate]);

  const clearFilter = () => {
    setTitle('');
    setGroup('');
    setStartDate('');
    setEndDate('');
  }

  return (
    <Filter
      group={group}
      setGroup={setGroup}
      title={title}
      setTitle={setTitle}
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      clearFilter={clearFilter}
      isChanged={isChanged}
    />
  );
};

export default FilterContainer;
