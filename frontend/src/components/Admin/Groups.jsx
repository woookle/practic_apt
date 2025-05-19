import React, { useState, useEffect } from 'react';
import { getGroups, createGroup, changeGroup, deleteGroup } from '../../api/adminAPI';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [editGroupId, setEditGroupId] = useState(null);
  const [editGroupName, setEditGroupName] = useState('');

  useEffect(() => {
    getGroups().then((data) => setGroups(data));
  }, []);

  const handleCreateGroup = async () => {
    const newGroup = await createGroup({ name: newGroupName, course: newCourse });
    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setNewCourse('');
  };

  const handleEditGroup = async (id) => {
    await changeGroup(id, { name: editGroupName });
    setGroups(groups.map((group) => (group._id === id ? { ...group, name: editGroupName } : group)));
    setEditGroupId(null);
    setEditGroupName('');
  };

  const handleDeleteGroup = async (id) => {
    await deleteGroup(id);
    setGroups(groups.filter((group) => group._id !== id));
  };

  return (
    <div className="section animate__animated animate__fadeIn">
      <h2 className="section-title">Группы</h2>
      <ul className="list">
        {groups.map((group) => (
          <li key={group._id} className="list-item">
            {editGroupId === group._id ? (
              <input
                type="text"
                value={editGroupName}
                onChange={(e) => setEditGroupName(e.target.value)}
              />
            ) : (
              <>
                <p style={{ width: "600px" }}>Группа: {group.name} | Курс: {group.course}</p>
              </>
            )}
            {editGroupId === group._id ? (
              <button className="button" onClick={() => handleEditGroup(group._id)}>Сохранить</button>
            ) : (
              <button className="button" onClick={() => { setEditGroupId(group._id); setEditGroupName(group.name); }}>Редактировать</button>
            )}
            <button className="button" onClick={() => handleDeleteGroup(group._id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
        placeholder="Новая группа"
      />
      <input
        type="text"
        value={newCourse}
        onChange={(e) => setNewCourse(e.target.value)}
        placeholder="Курс"
      />
      <button className="button" onClick={handleCreateGroup}>Создать</button>
    </div>
  );
};

export default Groups;
