import React, { useState } from 'react';
import Groups from './Groups';
import Students from './Students';
import Users from './Users';
import Companies from './Companies';
import Practics from './Practics';
import Lessons from './Lessons';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('groups');
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'groups':
        return <Groups />;
      case 'students':
        return <Students />;
      case 'users':
        return <Users />;
      case 'companies':
        return <Companies />;
      case 'practics':
        return <Practics />;
      case 'lessons':
        return <Lessons />;
      default:
        return <Groups />;
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('groups')}
        >
          Группы
        </button>
        <button 
          className={`admin-tab ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Студенты
        </button>
        <button 
          className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Пользователи
        </button>
        <button 
          className={`admin-tab ${activeTab === 'companies' ? 'active' : ''}`}
          onClick={() => setActiveTab('companies')}
        >
          Компании
        </button>
        <button 
          className={`admin-tab ${activeTab === 'practics' ? 'active' : ''}`}
          onClick={() => setActiveTab('practics')}
        >
          Практики
        </button>
        <button 
          className={`admin-tab ${activeTab === 'lessons' ? 'active' : ''}`}
          onClick={() => setActiveTab('lessons')}
        >
          Предметы
        </button>
      </div>
      
      {renderTabContent()}
    </div>
  );
};

export default Admin;