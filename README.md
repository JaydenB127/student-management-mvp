# 🎓 Hệ Thống Quản Lý Sinh Viên

Ứng dụng web full-stack để quản lý thông tin sinh viên, xây dựng với React, Express và SQLite. Được tạo ban đầu từ [Google AI Studio](https://aistudio.google.com).

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white)

## ✨ Tính Năng

- 📋 Xem danh sách sinh viên dưới dạng bảng trực quan
- ➕ Thêm sinh viên mới với kiểm tra dữ liệu đầu vào
- ✏️ Chỉnh sửa thông tin sinh viên
- 🗑️ Xóa hồ sơ sinh viên
- 🎨 Huy hiệu GPA đổi màu theo mức điểm (xanh / vàng / đỏ)
- ⚡ Cơ sở dữ liệu SQLite nội bộ — không cần kết nối internet

## 🛠️ Công Nghệ Sử Dụng

| Tầng | Công nghệ |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router |
| Backend | Express.js (Node.js) |
| Cơ sở dữ liệu | SQLite via `better-sqlite3` |
| Ngôn ngữ | TypeScript |
| AI (tùy chọn) | Google Gemini API (`@google/genai`) |

## 📁 Cấu Trúc Thư Mục

```
student-management-mvp/
├── src/
│   ├── components/
│   │   ├── StudentList.tsx   # Bảng hiển thị danh sách sinh viên
│   │   └── StudentForm.tsx   # Form thêm / chỉnh sửa sinh viên
│   ├── App.tsx               # Component gốc & cấu hình routing
│   ├── db.ts                 # Kết nối SQLite & khởi tạo schema
│   ├── types.ts              # Định nghĩa TypeScript interfaces
│   ├── main.tsx              # Điểm khởi đầu React
│   └── index.css             # CSS toàn cục
├── server.ts                 # Express server + các API route
├── seed.ts                   # Script tạo dữ liệu mẫu
├── students.db               # File cơ sở dữ liệu SQLite
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🚀 Hướng Dẫn Cài Đặt

### Yêu Cầu

- [Node.js](https://nodejs.org) phiên bản 18 trở lên

### Các Bước Thực Hiện

1. **Clone repository về máy**
   ```bash
   git clone https://github.com/ten-cua-ban/student-management-mvp.git
   cd student-management-mvp
   ```

2. **Cài đặt các thư viện cần thiết**
   ```bash
   npm install
   ```

3. **Tạo file biến môi trường**

   Tạo file `.env.local` ở thư mục gốc của project:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   APP_URL=http://localhost:3000
   ```

   > 🔑 Lấy Gemini API Key miễn phí tại [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

4. **(Tùy chọn) Tạo dữ liệu mẫu**
   ```bash
   npm run seed
   ```

5. **Khởi động server**
   ```bash
   npm run dev
   ```

6. Mở trình duyệt và truy cập **[http://localhost:3000](http://localhost:3000)**

## 📦 Các Lệnh Có Sẵn

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Khởi động server phát triển |
| `npm run build` | Build cho môi trường production |
| `npm run preview` | Xem trước bản build production |
| `npm run seed` | Thêm dữ liệu sinh viên mẫu vào database |
| `npm run lint` | Kiểm tra lỗi TypeScript |

## 🗄️ Cấu Trúc Database

```sql
CREATE TABLE students (
  student_id  TEXT,
  name        TEXT NOT NULL,
  birth_year  INTEGER,
  major       TEXT,
  gpa         REAL
);
```

## 🔌 API Endpoints

| Phương thức | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/students` | Lấy danh sách tất cả sinh viên |
| POST | `/api/students` | Thêm sinh viên mới |
| PUT | `/api/students/:id` | Cập nhật thông tin sinh viên theo ID |
| DELETE | `/api/students/:id` | Xóa sinh viên theo ID |

## ⚠️ Xử Lý Lỗi Thường Gặp

**Lỗi `SqliteError: database disk image is malformed`**

File `students.db` bị hỏng. Xóa file đó đi và khởi động lại server — database sẽ được tạo lại tự động:
```bash
# Windows
del students.db

# macOS / Linux
rm students.db
```
Sau đó chạy `npm run seed` để thêm lại dữ liệu mẫu.

---

**Lỗi `npm is not recognized`**

Node.js chưa được cài đặt. Tải tại [nodejs.org](https://nodejs.org) hoặc cài qua winget:
```powershell
winget install OpenJS.NodeJS.LTS
```
Sau khi cài xong, **đóng và mở lại terminal** rồi thử lại.

## 📄 Giấy Phép

Dự án này sử dụng giấy phép Apache 2.0.
