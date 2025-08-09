
---

# **📌 Granite Chat AI**

## **1. Project Title**

Granite Chat AI

---

## **2. Description**

Granite Chat AI adalah website **AI Chat** berbasis web yang memanfaatkan [model IBM Granite 3.3-8B Instruct](https://replicate.com/ibm-granite/granite-3.3-8b-instruct) melalui [Replicate API](https://replicate.com/ibm-granite/granite-3.3-8b-instruct).
Website ini memungkinkan pengguna untuk berinteraksi langsung dengan AI secara real-time, mengatur parameter seperti *Min Token*, *Max Token*, dan *Temperature* untuk mengontrol gaya dan panjang jawaban AI.

Proyek ini dibuat sebagai bagian dari **Capstone Project** dan untuk mempermudah pengguna untuk melakukan akses pada **IBM Granite** dengan antarmuka yang mudah digunakan oleh pengguna yang awam dalam teknologi, Kenapa saya membuat proyek ini, karena saya mendapati beberapa keluhan dari teman-teman yang kurang familiar dengan UI/UX dari replicate, dengan tujuan mempermudah pengguna untuk melakukan akses kepada **Granite** dengan fokus pada:

* Integrasi API eksternal
* UI/UX responsif dan modern
* Fitur interaktif untuk pengguna
* Penyimpanan riwayat chat di browser

🚀 **Live Demo** → [https://granite-chat-app.vercel.app](https://granite-chat-app.vercel.app)

---

## **3. Technologies Used**

* **Next.js** → Frontend framework
* **React** → UI components
* **Tailwind CSS** → Styling modern & responsif
* **Lucide-react** → Ikon ringan
* **React-Markdown** + **Rehype-Highlight** → Render markdown & highlight syntax
* **Replicate API** → Akses model IBM Granite AI
* **replicate** (npm package) → Client API untuk komunikasi ke model AI

---

## **4. Features**

* 💬 **Chat interaktif** dengan AI
* ⚙️ **Pengaturan AI Parameters** (*Min Token*, *Max Token*, *Temperature*)
* 📜 **Riwayat percakapan** tersimpan di localStorage
* 📱 **UI responsif** untuk desktop & mobile
* 📄 **Markdown rendering** dengan highlight otomatis untuk kode
* 📋 **Fitur salin jawaban AI** (Copy to clipboard)
* 🔄 **Auto-scroll** ke pesan terbaru
* 🗑 **Hapus riwayat chat** per sesi
* 🌙 **Dark Theme** untuk pengalaman nyaman

---

## **5. Setup Instructions**

### **A. Clone Repository**

```bash
git clone https://github.com/slashMK303/granite-chat-app.git
cd granite-chat-app
```

### **B. Install Dependencies**

```bash
npm install
npm install replicate
```

### **C. Environment Variables**

Buat file `.env.local` di root proyek:

```env
REPLICATE_API_TOKEN=your_replicate_api_token
```

Dapatkan token API dari [https://replicate.com/account/api-tokens](https://replicate.com/account/api-tokens)

### **D. Run in Development Mode**

```bash
npm run dev
```

Akses di browser: [http://localhost:3000](http://localhost:3000)

### **E. Build for Production**

```bash
npm run build
npm start
```

---

## **6. AI Support Explanation**

Aplikasi ini menggunakan **IBM Granite 3.3-8B Instruct**, model AI *open-source* yang dirancang untuk memahami instruksi dan menghasilkan teks sesuai konteks.
Model diakses melalui **Replicate API** dengan parameter yang dapat disesuaikan:

* **Min Token** → Batas minimum token output
* **Max Token** → Batas maksimum token output
* **Temperature** → Kontrol kreativitas output

  * Rendah (0.1–0.5) → Lebih fokus & deterministik
  * Tinggi (1.0–2.0) → Lebih kreatif & variatif

---

## **7. Folder Structure**

```
granite-chat-app/
├── app/                # Halaman Next.js
├── components/         # Komponen UI (ChatArea, ChatMessage, Sidebar, Navbar, dll.)
├── public/             # Asset publik
├── styles/             # Styling global
├── package.json
└── README.md
```
---

## **8. Author**

👤 **Nanang Marvin Kurniawan**

* GitHub: [@slashMK303](https://github.com/slashMK303)
* Project Repo: [Granite Chat AI](https://github.com/slashMK303/granite-chat-app)

---
