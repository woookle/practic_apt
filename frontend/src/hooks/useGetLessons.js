import { useEffect, useState } from "react";
import { getLessons } from "../api/api";

const useGetLessons = () => {
  const [isLoadLessons, setIsLoadLessons] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [sortedLessons, setSortedLessons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function getAllLessons() {
      try {
        setIsLoadLessons(true);
        const response = await getLessons();
        setLessons(response);
        setSortedLessons(response);
      } catch (error) {
        return false;
      } finally {
        setIsLoadLessons(false);
      }
    }
    getAllLessons();
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const filteredLessons = lessons.filter((lesson) =>
        lesson.name.toLowerCase().includes(filter.toLowerCase())
      );
      setSortedLessons(filteredLessons);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [filter, lessons]);

  const handleFilterLesson = (event) => {
    setFilter(event.target.value);
  };

  return {
    isLoadLessons,
    sortedLessons,
    handleFilterLesson,
    filterLesson: filter,
  };
};

export default useGetLessons;
