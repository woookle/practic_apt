import { useState, useEffect } from "react";
import { getStudentsGroup } from "../api/api";

const useGetStudents = () => {
  const [isLoadStudents, setIsLoadStudents] = useState(false);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filter, setFilter] = useState('');

  const findStudentByGroup = async (groupId) => {
    try {
      setIsLoadStudents(true);
      const response = await getStudentsGroup(groupId);
      setStudents(response);
      setFilteredStudents(response);
    } catch (error) {
      return false;
    } finally {
      setIsLoadStudents(false);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const filtered = students.filter(student =>
        student.name.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredStudents(filtered);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [filter, students]);

  const handleFilterStudent = (event) => {
    setFilter(event.target.value);
  };

  return { isLoadStudents, filteredStudents, findStudentByGroup, handleFilterStudent };
};

export default useGetStudents;