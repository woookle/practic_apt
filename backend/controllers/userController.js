import Document from "../models/Document.js";
import path, { dirname } from "path";
import PizZip from "pizzip";
import fs from "fs";
import docxtemplater from "docxtemplater";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class UserController {
  // ВЫДАТЬ ВСЕ СВОИ ДОКУМЕНТЫ
  static getMyDocuments = async (req, res) => {
    try {
      const user = req.user;
      await user.populate("documents");

      return res.status(200).json({ documents: user.documents });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // СОЗДАТЬ НОВЫЙ ДОКУМЕНТ
  static createDocument = async (req, res) => {
    try {
      const dataContent = req.body.data;
      const title = req.body.title;
      const user = req.user;

      const data = { ...dataContent };

      const templatePath = path.resolve(
        __dirname,
        "../storage/templates/договор_образец.docx"
      );
      const content = fs.readFileSync(templatePath, "binary");

      const zip = new PizZip(content);
      const doc = new docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // Заменяем переменные в шаблоне на реальные данные
      doc.render(data);

      const file = `../storage/uploads/documents/${
        user.username
      }_${title}_${Date.now()}.docx`;
      const buffer = doc.getZip().generate({ type: "nodebuffer" });
      const filePath = path.resolve(__dirname, file);
      fs.writeFileSync(filePath, buffer);

      const newWordFile = new Document({
        file: file,
        data: dataContent,
        group: data.students[0].group,
        title,
      });
      await newWordFile.save();

      user.documents.push(newWordFile._id);
      await user.save();

      res
        .status(200)
        .json({ message: "Документ успешно создан!", file: newWordFile });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // СКАЧИВАНИЕ ДОКУМЕНТА
  static downloadDocument = async (req, res) => {
    try {
      const documentId = req.params.id;
      const user = req.user;

      const document = await Document.findById(documentId);
      if (!document) {
        return res.status(404).json({ message: "Документ не найден!" });
      }

      if (!user.documents.includes(documentId)) {
        return res
          .status(403)
          .json({ message: "У вас нет прав на доступ к этому документу!" });
      }

      const filePath = path.resolve(__dirname, document.file);

      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Файл не найден!" });
      }

      res.download(filePath, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Ошибка при скачивании файла" });
        }
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // УДАЛИТЬ ДОКУМЕНТ
  static deleteDocument = async (req, res) => {
    try {
      const documentId = req.params.id;
      const user = req.user;

      const document = await Document.findById(documentId);
      if (!document) {
        return res.status(404).json({ message: "Документ не найден!" });
      }

      if (!user.documents.includes(documentId)) {
        return res
          .status(403)
          .json({ message: "У вас нет прав на удаление этого документа!" });
      }

      const filePath = path.resolve(__dirname, document.file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      await Document.findByIdAndDelete(documentId);
      user.documents = user.documents.filter(
        (docId) => docId.toString() !== documentId.toString()
      );
      await user.save();

      res.status(200).json({ message: "Документ успешно удален!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // ИЗМЕНЕНИЕ АВАТАРКИ
  static changeAvatar = async (req, res) => {
    try {
      const user = req.user;

      const new_avatar = req.files["avatar"][0].filename;
      const imageUrl = "/storage/uploads/avatars/" + new_avatar;

      user.avatar = imageUrl;

      await user.save();

      return res
        .status(200)
        .json({ message: "Аватарка успешно изменена!", newPath: imageUrl });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // ИЗМЕНЕНИЕ ПРОФИЛЯ
  static changeAccount = async (req, res) => {
    try {
      const name = req.body.name;
      const user = req.user;
      if (!name) {
        return res.status(401).json({ message: "Нового имени нет!" });
      } else if (name.trim() === "") {
        return res.status(401).json({ message: "Новое имя не введено!" });
      }

      user.username = name;
      await user.save();

      return res
        .status(200)
        .json({ message: "Имя успешно изменено!", username: name });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export default UserController;
