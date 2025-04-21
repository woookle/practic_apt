import React, { useState, useEffect } from 'react';
import { getLessons, createLesson, changeLesson, deleteLesson } from '../../api/adminAPI';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [newLessonName, setNewLessonName] = useState('');
  const [editLessonId, setEditLessonId] = useState(null);
  const [editLessonName, setEditLessonName] = useState('');

  useEffect(() => {
    getLessons().then((data) => setLessons(data));
  }, []);

  const handleCreateLesson = async () => {
    await createLesson({ name: newLessonName });
    getLessons().then((data) => setLessons(data));
    setNewLessonName('');
  };

  const handleEditLesson = async (id) => {
    await changeLesson(id, { name: editLessonName });
    setLessons(lessons.map((lesson) => (lesson._id === id ? { ...lesson, name: editLessonName } : lesson)));
    setEditLessonId(null);
    setEditLessonName('');
  };

  const handleDeleteLesson = async (id) => {
    await deleteLesson(id);
    setLessons(lessons.filter((lesson) => lesson._id !== id));
  };

  return (
    <div className="section animate__animated animate__fadeIn">
      <h2 className="section-title">Предметы</h2>
      <ul className="list">
        {lessons.map((lesson) => (
          <li key={lesson._id} className="list-item">
            {editLessonId === lesson._id ? (
              <input
                type="text"
                value={editLessonName}
                onChange={(e) => setEditLessonName(e.target.value)}
              />
            ) : (
              lesson.name
            )}
            {editLessonId === lesson._id ? (
              <button className="button" onClick={() => handleEditLesson(lesson._id)}>Сохранить</button>
            ) : (
              <button className="button" onClick={() => { setEditLessonId(lesson._id); setEditLessonName(lesson.name); }}>Редактировать</button>
            )}
            <button className="button" onClick={() => handleDeleteLesson(lesson._id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newLessonName}
        onChange={(e) => setNewLessonName(e.target.value)}
        placeholder="Новый предмет"
      />
      <button className="button" onClick={handleCreateLesson}>Создать</button>
    </div>
  );
};

export default Lessons;
