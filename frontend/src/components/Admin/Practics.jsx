import React, { useState, useEffect } from 'react';
import { getPractics, createPractic, changePractic, deletePractic } from '../../api/adminAPI';

const Practics = () => {
  const [practics, setPractics] = useState([]);
  const [newPracticName, setNewPracticName] = useState('');
  const [editPracticId, setEditPracticId] = useState(null);
  const [editPracticName, setEditPracticName] = useState('');

  useEffect(() => {
    getPractics().then((data) => setPractics(data));
  }, []);

  const handleCreatePractic = async () => {
    await createPractic({ name: newPracticName });
    getPractics().then((data) => setPractics(data));
    setNewPracticName('');
  };

  const handleEditPractic = async (id) => {
    await changePractic(id, { name: editPracticName });
    setPractics(practics.map((practic) => (practic._id === id ? { ...practic, name: editPracticName } : practic)));
    setEditPracticId(null);
    setEditPracticName('');
  };

  const handleDeletePractic = async (id) => {
    await deletePractic(id);
    setPractics(practics.filter((practic) => practic._id !== id));
  };

  return (
    <div className="section animate__animated animate__fadeIn">
      <h2 className="section-title">Практики</h2>
      <ul className="list">
        {practics.map((practic) => (
          <li key={practic._id} className="list-item">
            {editPracticId === practic._id ? (
              <input
                type="text"
                value={editPracticName}
                onChange={(e) => setEditPracticName(e.target.value)}
              />
            ) : (
              <p style={{ width: '600px' }}>{practic.name}</p>
            )}
            {editPracticId === practic._id ? (
              <button className="button" onClick={() => handleEditPractic(practic._id)}>Сохранить</button>
            ) : (
              <button className="button" onClick={() => { setEditPracticId(practic._id); setEditPracticName(practic.name); }}>Редактировать</button>
            )}
            <button className="button" onClick={() => handleDeletePractic(practic._id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newPracticName}
        onChange={(e) => setNewPracticName(e.target.value)}
        placeholder="Новая практика"
      />
      <button className="button" onClick={handleCreatePractic}>Создать</button>
    </div>
  );
};

export default Practics;
