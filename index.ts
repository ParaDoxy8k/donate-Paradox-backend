import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { prisma } from './db';
import QRCode from 'qrcode';
import generatePromptPayQR from 'promptpay-qr';

const createPromptPayQR = async (phoneNumber: string, amount: number) => {
  const payload = generatePromptPayQR(phoneNumber, { amount });
  return await QRCode.toDataURL(payload);
};

const app = new Elysia()
  .use(
    cors({
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true,
    })
  )
  .post(
    '/donate',
    async ({ body, set }) => {
      const { amount, donorName } = body;
      const donation = await prisma.donation.create({
        data: {
          amount,
          donorName,
        },
      });
      // Generate PromptPay QR code (using a sample Thai mobile number)
      const qrCode = await createPromptPayQR('0982864057', amount);
      return { success: true, donation, qrCode };
    },
    {
      body: t.Object({
        amount: t.Number({ minimum: 1 }),
        donorName: t.String({ minLength: 1 }),
      }),
    }
  )
  .get('/donations', async () => {
    return await prisma.donation.findMany();
  })
  .listen(4000);

console.log(`🦊 Elysia is running at http://localhost:${app.server?.port}`);