import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API}/api/admin`,
  withCredentials: true,
});

// Groups
export const getGroups = async () => {
  try {
    const response = await instance.get("/group");
    return response.data.groups;
  } catch (error) {
    toast.error(error.response.data.message);
    return [];
  }
};

export const createGroup = async (groupData) => {
  try {
    const response = await instance.post("/group", groupData);
    toast.success(response.data.message);
    return response.data.group;
  } catch (error) {
    toast.error(error.response.data.message);
    return null;
  }
};

export const changeGroup = async (id, groupData) => {
  try {
    const response = await instance.patch(`/group/${id}`, groupData);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

export const deleteGroup = async (id) => {
  try {
    const response = await instance.delete(`/group/${id}`);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

// Students
export const getStudents = async () => {
  try {
    const response = await instance.get("/student");
    return response.data.students;
  } catch (error) {
    toast.error(error.response.data.message);
    return [];
  }
};

export const getStudentsByGroup = async (id) => {
  try {
    const response = await instance.get(`/student/${id}`);
    return response.data.students;
  } catch (error) {
    toast.error(error.response.data.message);
    return [];
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await instance.post("/student", studentData);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

export const changeStudent = async (id, studentData) => {
  try {
    const response = await instance.patch(`/student/${id}`, studentData);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await instance.delete(`/student/${id}`);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

// Users
export const getUsers = async () => {
  try {
    const response = await instance.get("/user");
    return response.data.users;
  } catch (error) {
    toast.error(error.response.data.message);
    return [];
  }
};

export const changeUser = async (id, userData) => {
  try {
    const response = await instance.patch(`/user/${id}`, userData);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await instance.delete(`/user/${id}`);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

// Companies
export const getCompanies = async () => {
  try {
    const response = await instance.get("/company");
    return response.data.companyes;
  } catch (error) {
    toast.error(error.response.data.message);
    return [];
  }
};

export const createCompany = async (companyData) => {
  try {
    const response = await instance.post("/company", companyData);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

export const changeCompany = async (id, companyData) => {
  try {
    const response = await instance.patch(`/company/${id}`, companyData);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

export const deleteCompany = async (id) => {
  try {
    const response = await instance.delete(`/company/${id}`);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

// Practics
export const getPractics = async () => {
  try {
    const response = await instance.get("/practic");
    return response.data.practics;
  } catch (error) {
    toast.error(error.response.data.message);
    return [];
  }
};

export const createPractic = async (practicData) => {
  try {
    const response = await instance.post("/practic", practicData);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

export const changePractic = async (id, practicData) => {
  try {
    const response = await instance.patch(`/practic/${id}`, practicData);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

export const deletePractic = async (id) => {
  try {
    const response = await instance.delete(`/practic/${id}`);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

// Lessons
export const getLessons = async () => {
  try {
    const response = await instance.get("/lesson");
    return response.data.lessons;
  } catch (error) {
    toast.error(error.response.data.message);
    return [];
  }
};

export const createLesson = async (lessonData) => {
  try {
    const response = await instance.post("/lesson", lessonData);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

export const changeLesson = async (id, lessonData) => {
  try {
    const response = await instance.patch(`/lesson/${id}`, lessonData);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

export const deleteLesson = async (id) => {
  try {
    const response = await instance.delete(`/lesson/${id}`);
    toast.success(response.data.message);
    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};
