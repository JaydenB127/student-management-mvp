# 🎓 Student Management MVP

Ứng dụng quản lý sinh viên đơn giản, xây dựng với React + TypeScript ở frontend và Express + SQLite ở backend — chạy trên một server duy nhất.

---

## 🛠 Tech Stack

| Thành phần | Công nghệ |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS v4, React Router v7 |
| Backend | Express.js, Node.js |
| Database | SQLite (`better-sqlite3`) |
| Build Tool | Vite 6 |
| Runtime | `tsx` (TypeScript trực tiếp) |

---

## ✨ Tính năng

- **Xem danh sách sinh viên** — hiển thị dạng bảng với mã SV, tên, ngành học và GPA
- **Thêm sinh viên mới** — form nhập liệu có validation
- **Chỉnh sửa thông tin** — cập nhật tên, ngành, năm sinh, GPA
- **Xoá sinh viên** — xác nhận trước khi xoá
- **GPA badge màu** — xanh (≥3.5), vàng (≥2.5), đỏ (<2.5)

---

## 🚀 Cài đặt & Chạy

### 1. Cài dependencies

```bash
npm install
```

### 2. Tạo file `.env`

```bash
cp .env.example .env
```

Điền các biến cần thiết vào `.env`:

```env
GEMINI_API_KEY="your_api_key_here"
APP_URL="http://localhost:3000"
```

### 3. (Tuỳ chọn) Seed dữ liệu mẫu

```bash
npm run seed
```

Lệnh này sẽ thêm 5 sinh viên mẫu vào database.

### 4. Chạy server

```bash
npm run dev
```

Mở trình duyệt tại **http://localhost:3000**

---

## 📁 Cấu trúc thư mục

```
├── src/
│   ├── components/
│   │   ├── StudentList.tsx   # Trang danh sách sinh viên
│   │   └── StudentForm.tsx   # Form thêm / chỉnh sửa
│   ├── App.tsx               # Router chính
│   ├── db.ts                 # Kết nối SQLite & khởi tạo schema
│   ├── types.ts              # TypeScript interfaces
│   └── main.tsx              # Entry point React
├── server.ts                 # Express server + API routes
├── seed.ts                   # Script seed dữ liệu mẫu
├── students.db               # File SQLite (tự tạo khi chạy)
├── .env.example              # Mẫu biến môi trường
└── package.json
```

---

## 🔌 API Endpoints

| Method | Endpoint | Mô tả |
|---|---|---|
| `GET` | `/api/students` | Lấy danh sách tất cả sinh viên |
| `POST` | `/api/students` | Thêm sinh viên mới |
| `PUT` | `/api/students/:id` | Cập nhật thông tin sinh viên |
| `DELETE` | `/api/students/:id` | Xoá sinh viên |

### Cấu trúc dữ liệu sinh viên

```json
{
  "student_id": "SV001",
  "name": "Alice Turing",
  "birth_year": 2003,
  "major": "Computer Science",
  "gpa": 3.9
}
```

---

## 📦 Scripts

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Chạy server phát triển (Express + Vite HMR) |
| `npm run build` | Build frontend cho production |
| `npm run seed` | Seed dữ liệu mẫu vào database |
| `npm run lint` | Kiểm tra TypeScript |
| `npm run clean` | Xoá thư mục `dist` |

---

## ⚠️ Lưu ý

- File `students.db` được tạo tự động khi server khởi động lần đầu.
- `student_id` là khoá chính — **không thể thay đổi** sau khi đã tạo.
- GPA hợp lệ trong khoảng **0.0 – 4.0**.
