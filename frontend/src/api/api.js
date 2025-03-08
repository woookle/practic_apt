import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API}/api`,
  withCredentials: true,
});

// ЗАПРОСЫ ДЛЯ РЕГИСТРАЦИИ
export const register = async (userData) => {
  try {
    if (userData.password !== userData.verifyPassword) {
      toast.error("Пароли не совпадают");
      return null;
    } else {
      const response = await instance.post("/auth/register", userData);
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error) {
    if (!error.response.data.message) {
      for (let i = 0; i < error.response.data.length; i++) {
        toast.error(error.response.data[i].msg);
      }
    } else {
      toast.error(error.response.data.message);
    }
    return rejectWithValue(error.response.data.message);
  }
};

export const verifyRegister = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/send-code", userData);
      toast.success(response.data.message);
      return response.data.user;
    } catch (error) {
      if (!error.response.data.message) {
        for (let i = 0; i < error.response.data.length; i++) {
          toast.error(error.response.data[i].msg);
        }
      } else {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

// ЗАПРОСЫ ДЛЯ ЛОГИРОВАНИЯ
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/login", userData);
      if (response.data.is2FA) {
        toast.success(response.data.message);
        return response.data;
      } else {
        toast.success(response.data.message);
        return response.data.user;
      }
    } catch (error) {
      if (!error.response.data.message) {
        for (let i = 0; i < error.response.data.length; i++) {
          toast.error(error.response.data[i].msg);
        }
      } else {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyLogin = createAsyncThunk(
  "auth/verifyLogin",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/verify-otp", userData);
      toast.success(response.data.message);
      return response.data.user;
    } catch (error) {
      if (!error.response.data.message) {
        for (let i = 0; i < error.response.data.length; i++) {
          toast.error(error.response.data[i].msg);
        }
      } else {
        toast.error(error.response.data.message);
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

// ВЫДАТЬ ИНФОРМАЦИЮ АККАУНТА
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/auth/me");
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ИЗМЕНЕНИЕ АВАТАРКИ АККАУНТА
export const changeAvatarProfile = createAsyncThunk(
  "auth/account/avatar",
  async (file, { rejectWithValue }) => {
    try {
      const response = await instance.patch("/user/account/avatar", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      return response.data.newPath;
    } catch (error) {
      toast.error("Ошибка при изменении аккаунта!");
      return rejectWithValue(error.response.data);
    }
  }
);

// ИЗМЕНЕНИЕ ИМЕНИ АККАУНТА
export const changeAccountName = createAsyncThunk(
  "auth/account/name",
  async (username, { rejectWithValue }) => {
    try {
      const response = await instance.patch("/user/account/name", username);
      toast.success("Имя успешно изменено!");
      return response.data.username;
    } catch (error) {
      toast.error("Ошибка при изменнии имени!");
      return rejectWithValue(error.response.data);
    }
  }
);

// ВЫХОД ИЗ АККАУНТА
export const logoutFromAcc = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/logout");
      toast.success("Вы вышли с аккаунта!");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// СОЗДАТЬ ДОКУМЕНТ
export const createDocument = async (document) => {
  try {
    const response = await instance.post('/user/documents', document);
    toast.success(response.data.message)
  } catch (error) {
    toast.error(error.response.data.message)
  }
}

// ВЫДАТЬ СВОИ ДОКУМЕНТЫ
export const getMyDocuments = createAsyncThunk(
  "user/documents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/user/documents");
      return response.data.documents;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// УДАЛИТЬ ДОКУМЕНТ
export const deleteDocument = createAsyncThunk(
  "user/documents/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.delete('/user/documents/' + id);
      toast.success(response.data.message);
      return id;
    } catch (error) {
      toast.error("Ошибка при удалении документа!");
      return rejectWithValue(error.response.data)
    }
  }
)

// СКАЧАТЬ ДОКУМЕНТ ПО АЙДИ
export const downloadDocumentById = async (documentId) => {
  try {
    const response = await instance.get(
      `/user/documents/download/${documentId}`,
      {
        responseType: "blob",
      }
    );
    return response;
  } catch (error) {
    toast.error("Ошибка при скачивании документа!");
  }
};

// ВЫДАТЬ ВСЕХ СТУДЕНТОВ
export const getStudentsGroup = async (groupId) => {
  try {
    const response = await instance.get('/user/student/' + groupId);
    return response.data.students
  } catch (error) {
    toast.error("Не удалось получить список студентов!")
  }
}

// ВЫДАТЬ ВСЕ ГРУППЫ
export const getGroups = async () => {
  try {
    const response = await instance.get('/user/group');
    return response.data.groups
  } catch (error) {
    toast.error("Не удалось получить группы студентов!")
  }
}

// ВЫДАТЬ ВСЕ КОМПАНИИ
export const getCompanyes = async () => {
  try {
    const response = await instance.get('/user/company')
    return response.data.companyes
  } catch (error) {
    toast.error("Не удалось получить компании!")
  }
}

// ВЫДАТЬ ВСЕ НАЗВАНИЯ ПРАКТИК
export const getPractics = async () => {
  try {
    const response = await instance.get('/user/practic');
    return response.data.practics
  } catch (error) {
    toast.error("Не удалось получить названия практик!")
  }
}