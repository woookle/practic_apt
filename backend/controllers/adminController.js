import Company from "../models/Company.js";
import Group from "../models/Group.js";
import Lesson from "../models/Lesson.js";
import Practic from "../models/Practic.js";
import Student from "../models/Student.js";
import User from "../models/User.js";

class AdminController {
  // ВЫДАТЬ ГРУППЫ
  static getGroups = async (req, res) => {
    try {
      const groups = await Group.find();

      return res.status(200).json({ groups });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // СОЗДАТЬ ГРУППУ
  static createGroup = async (req, res) => {
    try {
      const { name, course } = req.body;
      const isHaveGroup = await Group.findOne({ name });

      if (isHaveGroup) {
        return res
          .status(400)
          .json({ message: "Такая группа уже существует!" });
      }

      const newGroup = await Group({ name, course });
      await newGroup.save();

      return res
        .status(201)
        .json({ message: "Группа успешно создана!", group: newGroup });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // ИЗМЕНИТЬ ГРУППУ
  static changeGroup = async (req, res) => {
    try {
      const newName = req.body.name;
      const id = req.params.id;

      const group = await Group.findById(id);
      if (!group) {
        return res.status(404).json({ message: "Группа не найдена!" });
      }

      const isAlreadyGroup = await Group.findOne({ name: newName });
      if (isAlreadyGroup) {
        return res
          .status(400)
          .json({ message: "Группа с таким названием уже существует!" });
      }

      group.name = newName;
      await group.save();

      return res.status(200).json({ message: "Название группы изменено!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // УДАЛИТЬ ГРУППУ
  static deleteGroup = async (req, res) => {
    try {
      const id = req.params.id;

      await Student.deleteMany({ group: id });
      await Group.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ message: "Группа и связанные студенты успешно удалены!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // ВЫДАТЬ ВСЕХ СТУДЕНТОВ
  static getStudents = async (req, res) => {
    try {
      const students = await Student.find().populate("group");

      return res.status(200).json({ students });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // ВЫДАТЬ СТУДЕНТОВ ПО ГРУППЕ
  static getStudentsByGroup = async (req, res) => {
    try {
      const groupId = req.params.id;
      const students = await Student.find({ group: groupId });

      return res.status(200).json({ students });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // СОЗДАТЬ СТУДЕНТА
  static createStudent = async (req, res) => {
    try {
      const { name, group } = req.body;
      const isHaveStudent = await Student.findOne({ name });
      if (isHaveStudent) {
        return res
          .status(401)
          .json({ message: "Такой студент уже существует!" });
      }

      const student = new Student({
        name,
        group,
      });
      await student.save();

      return res.status(200).json({ message: "Студент успешно создан!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // ИЗМЕНИТЬ СТУДЕНТА
  static changeStudent = async (req, res) => {
    try {
      const { name, group } = req.body;
      const id = req.params.id;
      const isHaveStudent = await Student.findOne({ name });
      if (isHaveStudent) {
        return res
          .status(401)
          .json({ message: "Имя студента уже используется!" });
      }

      const stud = await Student.findById(id);
      stud.name = name;
      stud.group = group;
      await stud.save();

      return res.status(200).json({ message: "Имя студента изменено!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // УДАЛИТЬ СТУДЕНТА
  static deleteStudent = async (req, res) => {
    try {
      const id = req.params.id;
      await Student.findByIdAndDelete(id);

      return res.status(200).json({ message: "Студент успешно удален!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // ВЫДАТЬ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
  static getUsers = async (req, res) => {
    try {
      const users = await User.find();

      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // ИЗМЕНИТЬ АККАУНТ ПОЛЬЗОВАТЕЛЯ
  static changeUser = async (req, res) => {
    try {
      const id = req.params.id;
      const username = req.body.username;
      if (username.trim() === "") {
        return res.status(401).json({ message: "Введите имя!" });
      }

      const user = await User.findById(id);
      if (!user) {
        return res.status(401).json({ message: "Пользователь не найден!" });
      }

      user.username = username;
      await user.save();

      return res.status(200).json({ message: "Имя пользователя изменено!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // УДАЛИТЬ ПОЛЬЗОВАТЕЛЯ
  static deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      await User.findByIdAndDelete(id);

      return res.status(200).json({ message: "Пользователь успешно удален!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // ВЫДАТЬ ВСЕ УЧЕБНЫЕ ПРАКТИКИ
  static getPractics = async (req, res) => {
    try {
      const practics = await Practic.find();

      return res.status(200).json({ practics });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // СОЗДАТЬ УЧЕБНУЮ ПРАКТИКУ
  static createPractic = async (req, res) => {
    try {
      const name = req.body.name;
      const isHave = await Practic.findOne({ name });
      if (isHave) {
        return res
          .status(401)
          .json({ message: "Такое название уже существует!" });
      }
      const prac = new Practic({
        name,
      });
      await prac.save();

      return res
        .status(200)
        .json({ message: "Учебная практика успешно создана!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // ИЗМЕНИТЬ УЧЕБНУЮ ПРАКТИКУ
  static changePractic = async (req, res) => {
    try {
      const newName = req.body.name;
      const id = req.params.id;
      const isHave = await Practic.find({ name: newName });
      if (isHave) {
        return res
          .status(401)
          .json({ message: "Такое название практики уже используется!" });
      }
      const prac = await Practic.findById(id);
      prac.name = newName;
      await prac.save();

      return res
        .status(200)
        .json({ message: "Название практики успешно обновлено!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // УДАЛИТЬ УЧЕБНУЮ ПРАКТИКУ
  static deletePractic = async (req, res) => {
    try {
      const id = req.params.id;
      await Practic.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ message: "Учебная практика успешно удалена!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // ВЫДАТЬ ВСЕ КОМПАНИИ
  static getCompanyes = async (req, res) => {
    try {
      const companyes = await Company.find();

      return res.status(200).json({ companyes });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // СОЗДАТЬ КОМПАНИЮ
  static createCompany = async (req, res) => {
    try {
      const name = req.body.name;
      const isHave = await Company.findOne({ name });
      if (isHave) {
        return res.status(401).json({ message: "Такая компания уже есть!" });
      }
      const comp = new Company({
        name,
      });
      await comp.save();

      return res.status(200).json({ message: "Компания успешно создана!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // ИЗМЕНИТЬ НАЗВАНИЕ КОМПАНИИ
  static changeCompany = async (req, res) => {
    try {
      const newName = req.body.name;
      const id = req.params.id;
      const isHave = await Company.find({ name: newName });
      if (isHave) {
        return res
          .status(401)
          .json({ message: "Такое название уже используется!" });
      }
      const comp = await Company.findById(id);
      comp.name = newName;
      await comp.save();

      return res
        .status(200)
        .json({ message: "Название компании успешно обновлено!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // УДАЛИТЬ КОМПАНИЮ
  static deleteCompany = async (req, res) => {
    try {
      const id = req.params.id;
      await Company.findByIdAndDelete(id);

      return res.status(200).json({ message: "Компания успешно удалена!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

    // ВЫДАТЬ ВСЕ УЧЕБНЫЕ ПРАКТИКИ
    static getLessons = async (req, res) => {
      try {
        const lessons = await Lesson.find();
  
        return res.status(200).json({ lessons });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };
  
    // СОЗДАТЬ УЧЕБНУЮ ПРАКТИКУ
    static createLesson = async (req, res) => {
      try {
        const name = req.body.name;
        const isHave = await Lesson.findOne({ name });
        if (isHave) {
          return res
            .status(401)
            .json({ message: "Такое название уже существует!" });
        }
        const lesson = new Lesson({
          name,
        });
        await lesson.save();
  
        return res
          .status(200)
          .json({ message: "Учебный предмет успешно создан!" });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };
  
    // ИЗМЕНИТЬ УЧЕБНУЮ ПРАКТИКУ
    static changeLesson = async (req, res) => {
      try {
        const newName = req.body.name;
        const id = req.params.id;
        const isHave = await Lesson.find({ name: newName });
        if (isHave) {
          return res
            .status(401)
            .json({ message: "Такое название предмета уже используется!" });
        }
        const lesson = await Lesson.findById(id);
        lesson.name = newName;
        await lesson.save();
  
        return res
          .status(200)
          .json({ message: "Название предмета успешно обновлено!" });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };
  
    // УДАЛИТЬ УЧЕБНЫЙ ПРЕДМЕТ
    static deleteLesson = async (req, res) => {
      try {
        const id = req.params.id;
        await Lesson.findByIdAndDelete(id);
  
        return res
          .status(200)
          .json({ message: "Учебный предмет успешно удален!" });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };
}

export default AdminController;
