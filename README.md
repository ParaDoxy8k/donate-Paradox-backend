# donate-paradox-backend

## Overview

โปรเจคนี้จัดทำ RESTful API เพื่อจัดการธุรกรรมการ Donate จัดเก็บข้อมูลผู้บริจาคและสร้างรหัส QR PromptPay สำหรับการชำระเงิน เหมาะอย่างยิ่งสำหรับองค์กรไม่แสวงหากำไร แพลตฟอร์มระดมทุน หรือระบบใดๆ ที่ต้องการการประมวลผลการบริจาคที่ปลอดภัยและมีประสิทธิภาพ แอปพลิเคชันนี้ทำงานในสภาพแวดล้อม Docker เพื่อให้แน่ใจว่ามีความสอดคล้องกันในการตั้งค่าการพัฒนาและการผลิต

##  Features

- **Donation Management**: บันทึกการบริจาคพร้อมรายละเอียดเช่น จำนวนเงิน ชื่อผู้บริจาค และข้อความเพิ่มเติม
- **PromptPay Integration**: สร้างรหัส QR สำหรับการชำระเงิน PromptPay โดยใช้ PromptPay ID ที่สามารถกำหนดค่าได้
- **Data Persistence**: จัดเก็บข้อมูลการบริจาคทั้งหมดในฐานข้อมูล PostgreSQL พร้อมการจัดการโครงร่างผ่าน Prisma
- **Real-time Access**: ดึงข้อมูลการบริจาคผ่าน API endpoint
- **Scalable Deployment**: มี Container พร้อม Docker เพื่อการปรับใช้และปรับขนาดที่ง่ายดาย

## 📌 Installation & Set up

สำหรับการติดตั้ง package ต่างๆ ในแอป:

```bash
bun i
```

สำหรับ run แอป:

```bash
bun run index.ts
```

ควรตั้งค่าใน file .env ก่อนใช้งาน

file .env ควรมี variables ดังนี้:

```.env
DATABASE_URL="postgresql://admin:password@localhost:5432/donation_db?schema=public"
PROMPTPAY_ID="0987654321" #เปลี่ยนเบอร์ตรงนี้
```

## Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your system
- [Bun](https://bun.sh/) installed (optional, for local development or manual dependency management)
- Git (to clone the repository)

## ปล. การ setting docker นั้นข้อนข้างยากนิดนึงแนะนำถ้าจะใช้ให้เขียน frontend แล้ว deploy ด้วย vercel หรืออื่นๆ ใช้ไปเลย