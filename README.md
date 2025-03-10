# 🇷🇺 Practic APT

**✨ Practic APT** — это веб-приложение, предназначенное для преподавателей производственной практики техникума. Оно позволяет создавать и автоматически формировать документы, которые можно скачивать в удобном формате. Приложение упрощает процесс документооборота и экономит время преподавателей. 🕒📂

---

## Основные функции 🚀

- **Создание документов** 📝: Преподаватели могут создавать документы, заполняя необходимые данные через веб-интерфейс.
- **Автоматическая сборка документов** 🤖: Документы автоматически формируются на основе введенных данных.
- **Скачивание документов** ⬇️: Готовые документы можно скачать в формате `.docx`.
- **Удобный интерфейс** 🎨: Простой и интуитивно понятный интерфейс для работы с документами.

---

## Технологии 💻

### Backend 🛠️
- **Node.js** + **Express** — для создания серверной части приложения. 🖥️
- **Mongoose** — для работы с MongoDB. 🍃
- **docxtemplater** — для автоматической генерации документов в формате `.docx`. 📄
- **bcrypt** — для хеширования паролей. 🔐
- **jsonwebtoken** — для аутентификации пользователей. 🔑
- **multer** — для обработки загрузки файлов. 📤
- **nodemailer** — для отправки электронных писем. 📧
- **cors** — для обработки CORS-запросов. 🌐
- **dotenv** — для управления переменными окружения. ⚙️
- **express-validator** — для валидации данных. ✅
- **speakeasy** — для двухфакторной аутентификации. 🔒
- **uuid** — для генерации уникальных идентификаторов. 🆔

### Frontend 🎨
- **React** — для создания пользовательского интерфейса. ⚛️
- **Redux** + **@reduxjs/toolkit** — для управления состоянием приложения. 📓
- **React Router DOM** — для маршрутизации. 🗺️
- **Axios** — для отправки HTTP-запросов к серверу. 📡
- **React Toastify** — для уведомлений. 🔔
- **Animate.css** — для анимации элементов интерфейса. 🎬
- **FontAwesome** — для иконок. ✨
- **React Spinners** — для индикаторов загрузки. ⏳

---

## Установка и запуск 🛠️

### Требования
- Node.js (версия 16 или выше)
- MongoDB (локально или облачная версия)
- npm или yarn

### Шаги для запуска

1. **Клонируйте репозиторий**:
   ```bash
   git clone https://github.com/ваш-username/practic-apt.git
   cd practic-apt
   ```

2. **Установите зависимости**:
   - Для backend:
     ```bash
     cd backend
     npm install
     ```
   - Для frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Настройте переменные окружения**:
   - В корневой папке проекта создайте файл `.env` на основе `.env.example` и добавьте туда необходимые переменные:
     ```env
     # BACKEND
     MONGODB_URL=mongodb://localhost:27017/practicAPT
     JWT_SECRET=your_secret
     PORT=your_port
     EMAIL_USER=your_mail_user
     EMAIL_APP_PASSWORD='your_mail_password'
     EMAIL_COMPANY_NAME='Practic APT'
     COMPANY_LOGO_IMAGE='your_company_logo_url'

     # FRONTEND
     VITE_API='http://localhost:your_port'
     ```

4. **Запустите сервер**:
   - Перейдите в папку `backend` и выполните:
     ```bash
     npm start
     ```

5. **Запустите фронтенд**:
   - Перейдите в папку `frontend` и выполните:
     ```bash
     npm run dev
     ```

6. **Откройте приложение**:
   - Перейдите по адресу `http://localhost:5173` в браузере.

---

<br />

<div>
  <p align='center'>
    <img src='https://media1.tenor.com/m/oKZVauJ1LWEAAAAd/anime-fern.gif' />
  </p>
  <h2 align='center'>ᴛʜᴀɴᴋs ᴀɴᴅ ʜᴀᴠᴇ ᴀ ɴɪᴄᴇ ᴅᴀʏ 😊</h2>
</div>