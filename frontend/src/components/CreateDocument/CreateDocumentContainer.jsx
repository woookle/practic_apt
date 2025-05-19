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
  const {
    isLoadStudents,
    filteredStudents,
    findStudentByGroup,
    handleFilterStudent,
    filterStudents,
  } = useGetStudents();
  const { isLoadGroups, sortedGroups, handleFilterGroup, filterGroups } =
    useGetGroups();
  const {
    isLoadCompanyes,
    filteredCompanyes,
    handleFilterCompany,
    filterComp,
  } = useGetCompanyes();
  const { isLoadPractics, sortedPractics, handleFilterPractic, filterPractic } =
    useGetPractics();
  const { isLoadLessons, sortedLessons, handleFilterLesson, filterLesson } =
    useGetLessons();

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenGroup, setIsOpenGroup] = useState(false);
  const [isOpenStudent, setIsOpenStudent] = useState(false);
  const [isOpenCompany, setIsOpenCompany] = useState(false);
  const [isOpenPractic, setIsOpenPractic] = useState(false);
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
  const [address, setAddress] = useState("");
  const [selectedPractic, setSelectedPractic] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  const [selectedSpecialComponent, setSelectedSpecialComponent] = useState("");

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
        {
          id: (selectedStudents.length + 1).toString(),
          name: selectedStudent,
          group: selectedGroup,
        },
      ]);
    }
  };

  const removeStudent = (studentToRemove) => {
    setSelectedStudents(
      selectedStudents.filter((student) => student.name !== studentToRemove)
    );
    toast.success("Студент удален из списка");
  };

  const handleAddNewLesson = () => {
    if (selectedPractic && startTwoDate && endTwoDate) {
      setLessons([
        ...lessons,
        {
          lessonName: selectedPractic,
          dateFromAndTo: `${FormatPracticDate(
            startTwoDate
          )} по ${FormatPracticDate(endTwoDate)}`,
        },
      ]);
      setSelectedPractic("");
      setStartTwoDate("");
      setEndTwoDate("");
      setIsOpenModal(false);
    } else {
      toast.error("Пожалуйста, заполните все поля");
    }
  };

  const deleteLesson = (index) => {
    setLessons(lessons.filter((lesson, i) => i !== index));
  };

  const createDocument = async () => {
    try {
      const requiredFields = {
        title,
        numberDate,
        number,
        selectedCompany,
        course,
        selectedStudents,
        lessons,
      };
      
      const isAnyFieldEmpty = Object.values(requiredFields).some(
        (value) =>
          value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
      );

      if (isAnyFieldEmpty) {
        toast.info("Заполните все поля!");
        return false;
      }

      setIsCreatingDocument(true);
      const data = {
        title: title,
        data: {
          number: "№" + number,
          dateAndNumber: `${FormatDocumentDate(numberDate)} №${number}`,
          topDateAndNumber: FormatPracticDate(numberDate),
          dateFromAndTo: `${FormatPracticDate(
            startDate
          )} по ${FormatPracticDate(endDate)}`,
          lesson: selectedLesson,
          companyName: selectedCompany,
          companyAddress: address,
          practicNameComponent: selectedSpecialComponent,
          course: course,
          students: selectedStudents,
          lessons: lessons,
        },
      };

      await uploadDocument(data);
      navigate("/main");
    } catch (error) {
      return false;
    } finally {
      setIsCreatingDocument(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenGroup(false);
        setIsOpenStudent(false);
        setIsOpenCompany(false);
        setIsOpenPractic(false);
        setIsOpenLesson(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    setIsOpenCompany,
    setIsOpenGroup,
    setIsOpenStudent,
    setIsOpenPractic,
    setIsOpenLesson,
  ]);

  const createDocumentProps = {
    isLoadStudents,
    filteredStudents,
    handleFilterStudent,
    isLoadGroups,
    sortedGroups,
    handleFilterGroup,
    findStudentByGroup,
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
    isCreatingDocument,

    lessons,
    setIsOpenModal,
    isOpenModal,
    handleAddNewLesson,
    setStartTwoDate,
    setEndTwoDate,
    deleteLesson,
    setAddress,
    setSelectedSpecialComponent,
    selectedSpecialComponent
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
