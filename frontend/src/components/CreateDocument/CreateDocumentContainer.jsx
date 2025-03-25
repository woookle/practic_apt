import { useEffect, useRef, useState } from "react";
import useGetGroups from "../../hooks/useGetGroups";
import useGetStudents from "../../hooks/useGetStudents";
import CreateDocument from "./CreateDocument";
import { toast } from "react-toastify";
import useGetCompanyes from "../../hooks/useGetCompanyes";
import useGetPractics from "../../hooks/useGetPractics";
import useGetLessons from "../../hooks/useGetLessons";
import FormatDocumentDate from "../../utils/FormatDocumentDate";
import FormatPracticDate from "../../utils/FormatPracticDate";
import { uploadDocument } from "../../api/api";
import { useNavigate } from "react-router-dom";

const CreateDocumentContainer = () => {
  const { isLoadStudents, filteredStudents, findStudentByGroup, handleFilterStudent, filterStudents } = useGetStudents();
  const { isLoadGroups, sortedGroups, handleFilterGroup, filterGroups } = useGetGroups();
  const {isLoadCompanyes, filteredCompanyes, handleFilterCompany, filterComp} = useGetCompanyes();
  const { isLoadPractics, sortedPractics, handleFilterPractic, filterPractic } = useGetPractics();
  const { isLoadLessons, sortedLessons, handleFilterLesson, filterLesson } = useGetLessons();

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [isOpenGroup, setIsOpenGroup] = useState(false);
  const [isOpenStudent, setIsOpenStudent] = useState(false);
  const [isOpenCompany, setIsOpenCompany] = useState(false);
  const [isOpenPractic, setIsOpenPractic] = useState(false);
  const [isOpenTwoPractic, setIsOpenTwoPractic] = useState(false);
  const [isOpenLesson, setIsOpenLesson] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTwoDate, setStartTwoDate] = useState("");
  const [endTwoDate, setEndTwoDate] = useState("");
  const [course, setCourse] = useState("");
  
  const [number, setNumber] = useState("");
  const [numberDate, setNumberDate] = useState("");

  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedPractic, setSelectedPractic] = useState("");
  const [selectedTwoPractic, setSelectedTwoPractic] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");

  const [isCreatingDocument, setIsCreatingDocument] = useState(false);

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

  const createDocument = async () => {
    try {
      const requiredFields = {
        title,
        numberDate,
        number,
        startDate,
        endDate,
        startTwoDate,
        endTwoDate,
        selectedCompany,
        selectedLesson,
        selectedPractic,
        selectedTwoPractic,
        course,
        selectedStudents
      };

      const isAnyFieldEmpty = Object.values(requiredFields).some(
        (value) => value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)
      );
  
      if (isAnyFieldEmpty) {
        toast.info('Заполните все поля!');
        return false;
      }
  
      setIsCreatingDocument(true);
      const data = {
        title: title,
        data: {
          dateAndNumber: `${FormatDocumentDate(numberDate)} ${number}`,
          dateFromAndTo: `${FormatPracticDate(startDate)} по ${FormatPracticDate(endDate)}`,
          practicDateFromAndTo: `${FormatPracticDate(startTwoDate)} по ${FormatPracticDate(endTwoDate)}`,
          companyName: selectedCompany,
          lesson: selectedLesson,
          practicName: selectedPractic,
          practicNameComponent: selectedTwoPractic,
          course: course,
          students: selectedStudents,
        }
      }
  
      await uploadDocument(data);
      navigate('/main');
    } catch (error) {
      return false;
    } finally {
      setIsCreatingDocument(false);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenGroup(false);
        setIsOpenStudent(false);
        setIsOpenCompany(false);
        setIsOpenPractic(false);
        setIsOpenTwoPractic(false);
        setIsOpenLesson(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpenCompany, setIsOpenGroup, setIsOpenStudent, setIsOpenPractic, setIsOpenTwoPractic, setIsOpenLesson]);

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
    setStartTwoDate,
    setEndTwoDate,

    isLoadCompanyes,
    filteredCompanyes,
    handleFilterCompany,
    setSelectedCompany,
    selectedCompany,
    isOpenCompany,
    setIsOpenCompany,
    dropdownRef,
    filterComp,
    setCourse,
    
    filterGroups,
    filterStudents,

    isLoadPractics,
    sortedPractics,
    handleFilterPractic,
    filterPractic,
    selectedPractic,
    setSelectedPractic,
    isOpenPractic,
    setIsOpenPractic,

    selectedTwoPractic,
    setSelectedTwoPractic,
    isOpenTwoPractic,
    setIsOpenTwoPractic,

    isLoadLessons,
    sortedLessons,
    handleFilterLesson,
    filterLesson,
    selectedLesson,
    setSelectedLesson,
    isOpenLesson,
    setIsOpenLesson,

    setNumber,
    setNumberDate,
    
    createDocument,
    isCreatingDocument
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
