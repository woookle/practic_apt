import React, { useState, useEffect } from 'react';
import { getUsers, changeUser, deleteUser } from '../../api/adminAPI';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUsername, setEditUsername] = useState('');

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  const handleEditUser = async (id) => {
    await changeUser(id, { username: editUsername });
    setUsers(users.map((user) => (user._id === id ? { ...user, username: editUsername } : user)));
    setEditUserId(null);
    setEditUsername('');
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <div className="section animate__animated animate__fadeIn">
      <h2 className="section-title">Пользователи</h2>
      <ul className="list">
        {users.map((user) => (
          <li key={user._id} className="list-item">
            {editUserId === user._id ? (
              <input
                type="text"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
              />
            ) : (
              <p style={{ width: "250px" }}>{user.username}</p>
            )}
            {editUserId === user._id ? (
              <button className="button" onClick={() => handleEditUser(user._id)}>Сохранить</button>
            ) : (
              <button className="button" onClick={() => { setEditUserId(user._id); setEditUsername(user.username); }}>Редактировать</button>
            )}
            <button className="button" onClick={() => handleDeleteUser(user._id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
