import React, { useState, useEffect } from 'react';
import { getStudents, createStudent, changeStudent, deleteStudent, getGroups } from '../../api/adminAPI';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGroup, setNewStudentGroup] = useState('');
  const [editStudentId, setEditStudentId] = useState(null);
  const [editStudentName, setEditStudentName] = useState('');
  const [editStudentGroup, setEditStudentGroup] = useState('');

  useEffect(() => {
    getStudents().then((data) => setStudents(data));
    getGroups().then((data) => setGroups(data));
  }, []);

  const handleCreateStudent = async () => {
    await createStudent({ name: newStudentName, group: newStudentGroup });
    getStudents().then((data) => setStudents(data));
    setNewStudentName('');
    setNewStudentGroup('');
  };

  const handleEditStudent = async (id) => {
    await changeStudent(id, { name: editStudentName, group: editStudentGroup });
    setStudents(students.map((student) => (student._id === id ? { ...student, name: editStudentName, group: editStudentGroup } : student)));
    setEditStudentId(null);
    setEditStudentName('');
    setEditStudentGroup('');
  };

  const handleDeleteStudent = async (id) => {
    await deleteStudent(id);
    setStudents(students.filter((student) => student._id !== id));
  };

  return (
    <div className="section animate__animated animate__fadeIn">
      <h2 className="section-title">Студенты</h2>
      <ul className="list">
        {students.map((student) => (
          <li key={student._id} className="list-item">
            {editStudentId === student._id ? (
              <>
                <input
                  type="text"
                  value={editStudentName}
                  onChange={(e) => setEditStudentName(e.target.value)}
                />
                <select
                  value={editStudentGroup}
                  onChange={(e) => setEditStudentGroup(e.target.value)}
                >
                  {groups.map((group) => (
                    <option key={group._id} value={group._id}>{group.name}</option>
                  ))}
                </select>
              </>
            ) : (
              <>
                {student.name}
                {' '}
                ({groups.find((group) => group._id === student.group._id)?.name})
              </>
            )}
            {editStudentId === student._id ? (
              <button className="button" onClick={() => handleEditStudent(student._id)}>Сохранить</button>
            ) : (
              <button className="button" onClick={() => { setEditStudentId(student._id); setEditStudentName(student.name); setEditStudentGroup(student.group); }}>Редактировать</button>
            )}
            <button className="button" onClick={() => handleDeleteStudent(student._id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newStudentName}
        onChange={(e) => setNewStudentName(e.target.value)}
        placeholder="Новое имя студента"
      />
      <select
        value={newStudentGroup}
        onChange={(e) => setNewStudentGroup(e.target.value)}
      >
        <option value="">Выберите группу</option>
        {groups.map((group) => (
          <option key={group._id} value={group._id}>{group.name}</option>
        ))}
      </select>
      <button className="button" onClick={handleCreateStudent}>Создать</button>
    </div>
  );
};

export default Students;
