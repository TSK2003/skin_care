# OrthoCare - Advanced Institute of Orthopedics, Robotic Joint Replacement & Trauma Surgery

An enterprise-grade, modern healthcare and orthopedic surgical platform built with **React 19**, **Tailwind CSS 4**, and **Firebase** (Project ID: `ortho-3d717`).

---



## 🌟 Key Platform Features

- **Orthopedic Surgical Specialties**: 9 subspecialties covering Robotic Joint Replacement, Arthroscopy & Sports Medicine, Minimally Invasive Spine Surgery, 24/7 Level-1 Complex Fracture Trauma & Ilizarov Deformity Correction, Pediatric Orthopedics (Ponseti Clubfoot / DDH), Hand & Microvascular Surgery, Foot & Ankle Reconstruction, Orthopedic Oncology (Bone Tumors), and Osteoporosis Bone Health (Hologic DEXA).
- **Robotic Surgical Suites & High-Tech Infrastructure**: Stryker Mako 4th Gen Robotic Arm, Medtronic 3D O-Arm Navigation, Karl Storz 4K Arthroscopy Towers, Cadwell 32-Channel Intraoperative Neuro-Monitoring (IONM), Hologic Horizon Dual-Energy DEXA, and Class-100 (ISO Class 5) Laminar Airflow Operation Theatres.
- **Dynamic Surgeon OPD Scheduling & Booking**:
  - Live doctor consultation availability and real-time appointment booking.
  - Multi-channel receipt generation: Download OPD Consultation Slip, Print Receipt, and WhatsApp clinical desk integration.
  - Unique orthopedic token generator (`ORT001`, `ORT002`, `ORT003`, etc.).
- **Inpatient Robotic ICU & Orthopedic Beds ERP**:
  - Real-time tracking of beds across Robotic Surgery ICU, Spine Step-Down HDU, Trauma & Fracture Wards, and Deluxe Ortho Recovery Suites.
  - Patient surgical admission, bed transfer, post-op discharge, and Class-100 UV sanitization workflows.
- **Surgical Team & Workforce Management**:
  - Roster of Chief Orthopedic Surgeons (MS Ortho, MCh, AO Spine/Trauma fellows), Scrub Nurses, Plaster Technicians, C-Arm Radiographers, and Inpatient Ortho Nurses.
  - Real-time duty status toggle (On Duty / Off Duty / On Leave).
- **Patient Orthopedic Portal**:
  - Active consultation token verification and printable surgical slips.
  - Titanium Implant Warranty Card and serial barcode verification (FDA approved Stryker / DePuy).
  - Prescribed post-op physical rehabilitation protocols (CPM Continuous Passive Motion, Isometric Quads, DVT Ankle Pumps).
- **100% Cashless Surgery & Insurance Desk**: Empaneled with all major TPAs, Private Insurers, and Government Healthcare Schemes (PM-JAY, CGHS, ECHS).
- **Firebase Configuration & CI/CD**: Configured with user's Firebase Project `ortho-3d717`.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router v7, Framer Motion, Lucide React
- **Styling**: Tailwind CSS v4, Vanilla CSS (Outfit & Plus Jakarta Sans typography, Deep Blue & Royal Indigo surgical palette)
- **Backend & Cloud**: Firebase SDK (App, Analytics, Firestore, Auth, Hosting)
- **Tooling & Build**: Vite v8

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Validation
```bash
npm run build
```

---

## 🔥 Firebase Deployment & Live Site

- **Live Production URL**: [https://ortho-3d717.web.app](https://ortho-3d717.web.app)
- **Alternative Domain**: [https://ortho-3d717.firebaseapp.com](https://ortho-3d717.firebaseapp.com)
- **Firebase Project Console**: [https://console.firebase.google.com/project/ortho-3d717/overview](https://console.firebase.google.com/project/ortho-3d717/overview)

### Manual Deploy Command
```bash
npm run build
npx firebase-tools deploy --only hosting --project ortho-3d717
```

---

## 🔐 Credentials & Portals

### Surgeon & Admin ERP Portal
- **URL**: `/admin-panel-login` or `/login` or `/admin`
- **Username**: `admin`
- **Password**: `admin123`
- *(Includes 1-Click Demo Login button)*

### Patient Orthopedic Portal
- **URL**: `/patient/portal`
- **Patient Mobile**: `+91 63807 67265`

---

## 📦 Git Repository Commands

To push this project to your GitHub repository (`https://github.com/TSK2003/ortho.git`):

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/TSK2003/ortho.git
git push -u origin main
```

---

## 📄 License
MIT License
