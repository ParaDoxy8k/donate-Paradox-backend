## donate-paradox-backend

โปรเจคนี้จัดทำ RESTful API เพื่อจัดการธุรกรรมการ Donate จัดเก็บข้อมูลผู้บริจาคและสร้างรหัส QR PromptPay สำหรับการชำระเงิน เหมาะอย่างยิ่งสำหรับองค์กรไม่แสวงหากำไร แพลตฟอร์มระดมทุน หรือระบบใดๆ ที่ต้องการการประมวลผลการบริจาคที่ปลอดภัยและมีประสิทธิภาพ แอปพลิเคชันนี้ทำงานในสภาพแวดล้อม Docker เพื่อให้แน่ใจว่ามีความสอดคล้องกันในการตั้งค่าการพัฒนาและการผลิต

##  Features

- **Donation Management**: บันทึกการบริจาคพร้อมรายละเอียดเช่น จำนวนเงิน ชื่อผู้บริจาค และข้อความเพิ่มเติม
- **PromptPay Integration**: สร้างรหัส QR สำหรับการชำระเงิน PromptPay โดยใช้ PromptPay ID ที่สามารถกำหนดค่าได้
- **Data Persistence**: จัดเก็บข้อมูลการบริจาคทั้งหมดในฐานข้อมูล PostgreSQL พร้อมการจัดการโครงร่างผ่าน Prisma
- **Real-time Access**: ดึงข้อมูลการบริจาคผ่าน API endpoint
- **Scalable Deployment**: มี Container พร้อม Docker เพื่อการปรับใช้และปรับขนาดที่ง่ายดาย

## 📌 Installation & Set up

ควรตั้งค่าใน file .env ก่อนใช้งาน

file .env ควรมี variables ดังนี้:

```.env
DATABASE_URL="postgresql://admin:password@db:5432/donation_db?schema=public"
PROMPTPAY_ID="0987654321" #เปลี่ยนเบอร์ตรงนี้
```

สำหรับการติดตั้ง package ต่างๆ ในแอป:

```bash
bun i
```
*ในกรณีที่ไม่มี bun ในเครื่อง*

```powershell
powershell -c "irm bun.sh/install.ps1|iex"
```

สำหรับ build docker:

```bash
docker-compose up --build
```

เข้าใน container app:

```bash
docker exec -it <ชื่อ container app> sh
```

push prisma เข้าไปใน container app:

```bash
bunx prisma db push
```

จากนั้นทำการ down แล้ว build ใหม่อีกรอบ:

```bash
docker-compose down
```

## Prerequisites
- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your system
- [Bun](https://bun.sh/) installed (optional, for local development or manual dependency management)
- Git (to clone the repository)