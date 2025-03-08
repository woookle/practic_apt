import { useState, useEffect } from 'react';
import { getGroups } from '../api/api';

const useGetGroups = () => {
  const [isLoadGroups, setIsLoadGroups] = useState(false);
  const [groups, setGroups] = useState([]);
  const [sortedGroups, setSortedGroups] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function getAllGroups() {
      try {
        setIsLoadGroups(true);
        const response = await getGroups();
        setGroups(response);
        setSortedGroups(response);
      } catch (error) {
        return false;
      } finally {
        setIsLoadGroups(false);
      }
    }
    getAllGroups();
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(filter.toLowerCase())
      );
      setSortedGroups(filteredGroups);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [filter, groups]);

  const handleFilterGroup = (event) => {
    setFilter(event.target.value);
  };

  return { isLoadGroups, sortedGroups, handleFilterGroup };
};

export default useGetGroups;