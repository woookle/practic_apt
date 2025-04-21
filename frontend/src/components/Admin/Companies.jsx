import React, { useState, useEffect } from 'react';
import { getCompanies, createCompany, changeCompany, deleteCompany } from '../../api/adminAPI';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyAddress, setNewCompanyAddress] = useState('');
  const [editCompanyId, setEditCompanyId] = useState(null);
  const [editCompanyName, setEditCompanyName] = useState('');
  const [editCompanyAddress, setEditCompanyAddress] = useState('');

  useEffect(() => {
    getCompanies().then((data) => setCompanies(data));
  }, []);

  const handleCreateCompany = async () => {
    await createCompany({ name: newCompanyName, address: newCompanyAddress });
    getCompanies().then((data) => setCompanies(data));
    setNewCompanyName('');
  };

  const handleEditCompany = async (id) => {
    await changeCompany(id, { name: editCompanyName, address: editCompanyAddress });
    setCompanies(companies.map((company) => (company._id === id ? { ...company, name: editCompanyName, address: editCompanyAddress } : company)));
    setEditCompanyId(null);
    setEditCompanyName('');
  };

  const handleDeleteCompany = async (id) => {
    await deleteCompany(id);
    setCompanies(companies.filter((company) => company._id !== id));
  };

  return (
    <div className="section animate__animated animate__fadeIn">
      <h2 className="section-title">Компании</h2>
      <ul className="list">
        {companies.map((company) => (
          <li key={company._id} className="list-item">
            {editCompanyId === company._id ? (
              <>
              <input
                type="text"
                value={editCompanyName}
                onChange={(e) => setEditCompanyName(e.target.value)}
              />
              <input
                type="text"
                value={editCompanyAddress}
                onChange={(e) => setEditCompanyAddress(e.target.value)}
              />
              </>
            ) : (
              company.name + " | " + company.address
            )}
            {editCompanyId === company._id ? (
              <button className="button" onClick={() => handleEditCompany(company._id)}>Сохранить</button>
            ) : (
              <button className="button" onClick={() => { setEditCompanyId(company._id); setEditCompanyName(company.name); setEditCompanyAddress(company.address) }}>Редактировать</button>
            )}
            <button className="button" onClick={() => handleDeleteCompany(company._id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newCompanyName}
        onChange={(e) => setNewCompanyName(e.target.value)}
        placeholder="Новая компания"
      />
      <input
        type="text"
        value={newCompanyAddress}
        onChange={(e) => setNewCompanyAddress(e.target.value)}
        placeholder="Адрес новой компании"
      />
      <button className="button" onClick={handleCreateCompany}>Создать</button>
    </div>
  );
};

export default Companies;
