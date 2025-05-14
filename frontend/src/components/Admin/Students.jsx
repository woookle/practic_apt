import React, { useState, useEffect } from 'react';
import { getStudents, createStudent, changeStudent, deleteStudent, getGroups } from '../../api/adminAPI';
import * as XLSX from 'xlsx';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGroup, setNewStudentGroup] = useState('');
  const [editStudentId, setEditStudentId] = useState(null);
  const [editStudentName, setEditStudentName] = useState('');
  const [editStudentGroup, setEditStudentGroup] = useState('');
  const [importMode, setImportMode] = useState(false);
  const [file, setFile] = useState(null);
  const [previewStudents, setPreviewStudents] = useState([]);
  const [editingPreviewIndex, setEditingPreviewIndex] = useState(null);
  const [editPreviewName, setEditPreviewName] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [studentsData, groupsData] = await Promise.all([
      getStudents(),
      getGroups()
    ]);
    setStudents(studentsData);
    setGroups(groupsData);
  };

  const handleCreateStudent = async () => {
    if (!newStudentName || !newStudentGroup) return;
    await createStudent({ name: newStudentName, group: newStudentGroup });
    loadData();
    setNewStudentName('');
  };

  const handleEditStudent = async (id) => {
    await changeStudent(id, { name: editStudentName, group: editStudentGroup });
    loadData();
    setEditStudentId(null);
  };

  const handleDeleteStudent = async (id) => {
    await deleteStudent(id);
    loadData();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);

      const nameColumn = Object.keys(jsonData[0] || []).find(key => 
        key.toLowerCase().includes('фио') || 
        key.toLowerCase().includes('fio') ||
        key.toLowerCase().includes('имя') ||
        key.toLowerCase().includes('name')
      );

      if (!nameColumn) return;

      const students = jsonData
        .map(row => row[nameColumn]?.toString().trim())
        .filter(name => name && name.length > 0)
        .map(name => ({ name, group: newStudentGroup }));

      setPreviewStudents(students);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleImportStudents = async () => {
    if (!previewStudents.length || !newStudentGroup) return;
    
    for (const student of previewStudents) {
      await createStudent(student);
    }
    
    loadData();
    setPreviewStudents([]);
    setFile(null);
  };

  const removeFromPreview = (index) => {
    setPreviewStudents(previewStudents.filter((_, i) => i !== index));
  };

  const startEditingPreview = (index) => {
    setEditingPreviewIndex(index);
    setEditPreviewName(previewStudents[index].name);
  };

  const savePreviewEdit = () => {
    const updated = [...previewStudents];
    updated[editingPreviewIndex] = {
      ...updated[editingPreviewIndex],
      name: editPreviewName
    };
    setPreviewStudents(updated);
    setEditingPreviewIndex(null);
  };

  return (
    <div className="section">
      <h2 className="section-title">Студенты</h2>
      
      <div className="mode-switcher">
        <button 
          className={!importMode ? 'active' : ''} 
          onClick={() => setImportMode(false)}
        >
          Одиночное добавление
        </button>
        <button 
          className={importMode ? 'active' : ''} 
          onClick={() => setImportMode(true)}
        >
          Импорт из Excel
        </button>
      </div>

      {!importMode ? (
        <div className="student-form">
          <input
            type="text"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            placeholder="ФИО студента"
          />
          <select
            value={newStudentGroup}
            onChange={(e) => setNewStudentGroup(e.target.value)}
          >
            <option value="">Выберите группу</option>
            {groups.map(group => (
              <option key={group._id} value={group._id}>{group.name}</option>
            ))}
          </select>
          <button onClick={handleCreateStudent}>Добавить</button>
        </div>
      ) : (
        <div className="import-section">
          <div className="import-section-top">
            <div className="group-select">
              <select
                value={newStudentGroup}
                onChange={(e) => setNewStudentGroup(e.target.value)}
              >
                <option value="">Выберите группу</option>
                {groups.map(group => (
                  <option key={group._id} value={group._id}>{group.name}</option>
                ))}
              </select>
            </div>
            
            <input 
              type="file" 
              accept=".xlsx, .xls" 
              onChange={handleFileUpload} 
            />
          </div>
          
          {previewStudents.length > 0 && (
            <div className="preview-section">
              <h3>Будут добавлены ({previewStudents.length}):</h3>
              <ul className="preview-list">
                {previewStudents.map((student, index) => (
                  <li key={index}>
                    {editingPreviewIndex === index ? (
                      <>
                        <input
                          value={editPreviewName}
                          onChange={(e) => setEditPreviewName(e.target.value)}
                        />
                        <button onClick={savePreviewEdit}>✓</button>
                      </>
                    ) : (
                      <>
                        <p>{student.name}</p>
                        <button onClick={() => startEditingPreview(index)}>✎</button>
                        <button onClick={() => removeFromPreview(index)}>×</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <button onClick={handleImportStudents}>Подтвердить импорт</button>
            </div>
          )}
        </div>
      )}

      <ul className="students-list">
        {students.map(student => (
          <li key={student._id}>
            {editStudentId === student._id ? (
              <>
                <input
                  value={editStudentName}
                  onChange={(e) => setEditStudentName(e.target.value)}
                />
                <select
                  value={editStudentGroup}
                  onChange={(e) => setEditStudentGroup(e.target.value)}
                >
                  {groups.map(group => (
                    <option key={group._id} value={group._id}>{group.name}</option>
                  ))}
                </select>
                <button onClick={() => handleEditStudent(student._id)}>✓</button>
              </>
            ) : (
              <>
                <span>{student.name}</span>
                <span>({groups.find(g => g._id === student.group?._id)?.name || ''})</span>
                <button onClick={() => {
                  setEditStudentId(student._id);
                  setEditStudentName(student.name);
                  setEditStudentGroup(student.group);
                }}>✎</button>
                <button onClick={() => handleDeleteStudent(student._id)}>🗑</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;