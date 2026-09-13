# 🏠 Maskan AI (Student Housing AI) — Frontend Platform

[![React](https://img.shields.io/badge/React-18%2B-61DAFB?logo=react&logoColor=black)](https://react.js.org/)
[![Vite](https://img.shields.io/badge/Vite-5%2B-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3%2B-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Design System](https://img.shields.io/badge/Design_System-Warm_Earthy_Minimalist-8e4e1f)](https://fonts.google.com/specimen/Plus+Jakarta+Sans)

> **منصة السكن الطلابي الذكية (Maskan AI)** — واجهة أمامية حديثة، متكاملة، ومبنية بدقة بالملي (Pixel-Perfect) لخدمة الطلاب، أصحاب العقارات، والمشرفين بدعم متكامل للذكاء الاصطناعي.

---

## 🌟 مميزات المنصة (Key Features)

- **🔍 بحث ذكي وفلترة متقدمة (AI-Powered Natural Search):** استخراج معايير وتفضيلات البحث من النص الطبيعي تلقائياً عبر بوابات الـ AI (`/ai/extract-requirements`).
- **🎯 مؤشر التوافق الذكي (AI Match Score):** فحص نسبة توافق كل سكن مع تفضيلات الطالب والجامعة وشرح تفصيلي لنقاط القوة والمفاضلة.
- **📄 محلل عقود الإيجار (AI Lease Analyzer):** أداة ذكية لرفع وفحص مسودات عقود الإيجار واستخراج البنود الحرجة، تقييم نسبة المخاطرة، وتوصيات السلامة القانونية.
- **⚖️ مقارنة الشقق (Property Comparison):** مقارنة تفصيلية جنباً إلى جنب بين مختلف الوحدات السكنية في الأسعار، المسافة للحرم الجامعي، والمرافق.
- **🛡️ منظومة توثيق معتمدة (Verified Student Housing):** رفع أوراق الملكية وفحصها من قبل المشرفين قبل نشر العقارات لضمان أمان وموثوقية السكن للطلاب.
- **💬 شات ومواعيد معاينة تفاعلية (Tours & Messaging):** طلب وجدولة جولات المعاينة ومحادثة مباشرة بين الطالب وصاحب العقار.
- **📊 لوحات تحكم متعددة الأدوار (Role-Based Dashboards):** تجربة مخصصة لكل من: الطالب (`STUDENT`)، المالك (`OWNER`)، والمشرف/المدير (`SUPERVISOR`/`ADMIN`).

---

## 🎨 نظام التصميم (Design System)

تم بناء الواجهة بناءً على نظام التصميم المعتمد **`Warm Earthy Minimalist`**:
- **الألوان الأساسية:** درجات الـ Warm Neutrals (`#fcf9f3`)، الـ Terracotta (`#8e4e1f`)، والأخضر الزيتوني الداكن (`#1a2719`).
- **الخط الأساسي:** `Plus Jakarta Sans` مع ضبط مقاسات وأوزان الـ Typography بدقة.
- **الأيقونات:** `Material Symbols Outlined`.

---

## 🏗️ الهيكل البرمجي (Architecture & Folder Structure)

تم تنظيم المشروع باتباع أفضل ممارسات الـ **Feature-based Architecture** مع الالتزام التام بقاعدة **عدم تجاوز أي ملف كود حاجز الـ 1000 سطر**:

```text
src/
├── api/                   # عميل الـ API والخدمات المقسمة (Axios/Fetch + Interceptors)
│   ├── client.ts          # عميل الشبكة الموحد ومعالجة التوكن والأخطاء
│   ├── auth.api.ts        # خدمات المصادقة وتسجيل الحسابات
│   ├── listings.api.ts    # خدمات استعراض والبحث في العقارات
│   ├── ai.api.ts          # بوابات الذكاء الاصطناعي (Match, Search, Lease)
│   ├── interactions.api.ts# المفضلة، المعاينات، الرسائل، الإشعارات
│   ├── owner.api.ts       # خدمات المالك ورفع العقارات
│   └── admin.api.ts       # خدمات المشرف وقائمة المراجعة
├── components/            # المكونات العامة المشتركة
│   ├── ui/                # Buttons, Modals, Cards, Badges, Inputs
│   ├── layout/            # Navbar, Footer, Sidebar, Shells
│   └── feedback/          # Toast Notifications, Skeleton Loaders
├── features/              # وحدات النظام المنفصلة (كل ميزة معزولة)
│   ├── auth/              # شاشات الدخول، التسجيل، واختيار الدور
│   ├── home/              # الصفحة الرئيسية واستعراض المناطق
│   ├── explore/           # البحث المتقدم، الفلاتر، كروت الشقق
│   ├── details/           # تفاصيل العقار، المعرض، وحجز المعاينة
│   ├── compare/           # جدول المقارنة الشامل
│   ├── lease-analyzer/    # محلل العقود ورفع المستندات
│   ├── messages/          # نظام المحادثات الفورية
│   ├── viewings/          # جدول وإدارة مواعيد المعاينة
│   ├── owner-dashboard/   # إضافة العقارات وإرسالها للتوثيق
│   └── admin-dashboard/   # قائمة التوثيق وإدارة المستخدمين
├── hooks/                 # الـ Custom Hooks لإعادة استخدام المنطق
├── context/               # إدارة الحالة العامة (Auth, Favorites, UI)
├── types/                 # تعريفات الـ TypeScript الموحدة
└── utils/                 # دوال التنسيق المساعدة والتحقق من الملفات
```

---

## 🔌 الربط مع الـ Backend (API & Environment)

* **الـ Backend Base URL:** `https://student-housing-backend-api.azurewebsites.net/api/v1`
* **المتغيرات البيئية (`.env`):**
  ```env
  VITE_API_BASE_URL=https://student-housing-backend-api.azurewebsites.net/api/v1
  ```
* **نمط الترويسات (Headers):**
  ```http
  Authorization: Bearer <jwt_token>
  Content-Type: application/json
  ```
* **هيكل الاستجابة الموحد (Envelope):**
  * النجاح: `{ "data": ..., "meta": ... }`
  * الخطأ: `{ "error": { "code": "...", "message": "...", "details": {} } }`

---

## 🚀 البدء والتشغيل (Getting Started)

### المتطلبات (Prerequisites)
- [Node.js](https://nodejs.org/) الإصدار 18 أو أحدث.
- مدير الحزم `npm` أو `pnpm` أو `yarn`.

### خطوات التثبيت والتشغيل
1. **استنساخ المستودع (Clone Repo):**
   ```bash
   git clone https://github.com/KhaledYasser3/Maskan_AI-.git
   cd Maskan_AI-
   ```

2. **تثبيت الاعتماديات (Install Dependencies):**
   ```bash
   npm install
   ```

3. **إنشاء ملف البيئة (`.env`):**
   ```bash
   cp .env.example .env
   ```

4. **تشغيل الخادم المحلي (Run Local Dev Server):**
   ```bash
   npm run dev
   ```

5. **بناء النسخة الإنتاجية (Production Build):**
   ```bash
   npm run build
   ```

---

## 📜 معايير الجودة والتطوير (Code Standards)

* **Modularity:** لا يزيد أي ملف كود عن 1000 سطر، مع فصل تام بين طبقة الـ UI وطبقة الـ Logic.
* **Pixel-Perfect:** مطابقة تامة مع تصميم الـ UI والألوان والمسافات.
* **Error Handling:** معالجة أخطاء الشبكة والـ 401/403 وتنبيه المستخدم برسائل واضحة.
* **Upload Limits:** التحقق من حجم المرفقات قبل إرسالها (أقصى حد 10MB) بصيغة `multipart/form-data` واسم الحقل `file`.