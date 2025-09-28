import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { prisma } from './db';
import QRCode from 'qrcode';
import dotenv from 'dotenv';
import generatePromptPayQR from 'promptpay-qr';

dotenv.config();
if (!process.env.PROMPTPAY_ID){
  console.error('Error: PROMPTPAY_ID is not defilned in .env');
  process.exit(1);
}

const createPromptPayQR = async (phoneNumber: string, amount: number) => {
  const payload = generatePromptPayQR(phoneNumber, { amount });
  return await QRCode.toDataURL(payload);
};

const app = new Elysia()
  .use(
    cors({
      origin: ['http://localhost:3000','http://localhost:5173'],
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true,
    })
  )
  .post(
    '/donate',
    async ({ body, set }) => {
      const { amount, donorName, message } = body;
      try {
        const donation = await prisma.donation.create({
          data: {
            amount,
            donorName,
            message,
          },
        });
        if (!process.env.PROMPTPAY_ID) {
          set.status = 500;
          throw new Error('PROMPTPAY_ID is not configured');
        }
        const qrCode = await createPromptPayQR(process.env.PROMPTPAY_ID, amount);
        return { success: true, donation, qrCode };
        } catch (error) {
          set.status = 500;
          return { success: false, error: 'Failed to process donation' };
      }
    },
    {
      body: t.Object({
        amount: t.Number({ minimum: 1 }),
        donorName: t.String({ minLength: 1 }),
        message: t.Optional(t.String()),
      }),
    }
  )
  .get('/donations', async () => {
    return await prisma.donation.findMany();
  })
  .listen(4000);

console.log(`🦊 Elysia is running at http://localhost:${app.server?.port}`);