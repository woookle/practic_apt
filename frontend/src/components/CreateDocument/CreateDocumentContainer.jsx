import { useState } from "react";
import useGetGroups from "../../hooks/useGetGroups";
import useGetStudents from "../../hooks/useGetStudents";
import CreateDocument from "./CreateDocument";
import { toast } from "react-toastify";
import useGetCompanyes from "../../hooks/useGetCompanyes";

const CreateDocumentContainer = () => {
  const { isLoadStudents, filteredStudents, findStudentByGroup, handleFilterStudent } = useGetStudents();
  const { isLoadGroups, sortedGroups, handleFilterGroup } = useGetGroups();
  const {isLoadCompanyes, filteredCompanyes, handleFilterCompany} = useGetCompanyes();

  const [isOpenGroup, setIsOpenGroup] = useState(false);
  const [isOpenStudent, setIsOpenStudent] = useState(false);
  const [isOpenCompany, setIsOpenCompany] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const addStudent = () => {
    if (!selectedStudent || !selectedGroup) {
      toast.error("Выберите студента и группу");
      return;
    }
    const isStudentAlreadyAdded = selectedStudents.some(
      (student) => student.name === selectedStudent
    );
    if (isStudentAlreadyAdded) {
      toast.error("Вы уже добавили этого студента");
    } else {
      setSelectedStudents([
        ...selectedStudents,
        { id: (selectedStudents.length + 1).toString(), name: selectedStudent, group: selectedGroup },
      ]);
      toast.success("Студент успешно добавлен");
    }
  };

  const removeStudent = (studentToRemove) => {
    setSelectedStudents(
      selectedStudents.filter(
        (student) =>
          student.name !== studentToRemove
      )
    );
    toast.success("Студент удален из списка");
  };

  const createDocumentProps = {
    isLoadStudents,
    filteredStudents,
    findStudentByGroup,
    handleFilterStudent,
    isLoadGroups,
    sortedGroups,
    handleFilterGroup,
    isOpenGroup,
    setIsOpenGroup,
    isOpenStudent,
    setIsOpenStudent,
    selectedGroup,
    setSelectedGroup,
    selectedStudent,
    setSelectedStudent,
    selectedStudents,
    addStudent,
    removeStudent,
    setTitle,
    setStartDate,
    setEndDate,
    isLoadCompanyes,
    filteredCompanyes,
    handleFilterCompany,
    setSelectedCompany,
    selectedCompany,
    isOpenCompany,
    setIsOpenCompany
  };

  return (
    <div className="createDocumentBlock">
      <div className="container">
        <CreateDocument {...createDocumentProps} />
      </div>
    </div>
  );
};

export default CreateDocumentContainer;
