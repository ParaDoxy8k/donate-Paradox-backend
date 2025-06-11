import { Elysia, t } from 'elysia';
import { prisma } from './db';
import { cors } from '@elysiajs/cors';
import QRCode from 'qrcode';

const generatePromptPayQR = async (phoneNumber: string, amount: number) => {
  const promptPayId = `000201010211${phoneNumber}5303764${amount.toFixed(2)}5802TH6304`;
  const crc = require('crc').crc16ccitt(promptPayId).toString(16).padStart(4, '0').toUpperCase();
  const payload = `${promptPayId}${crc}`;
  return await QRCode.toDataURL(payload);
};

const app = new Elysia()
  .use(
    cors({
      origin:['http://localhost:3000'],
      methods:['GET','POST'],
      allowedHeaders:['Content-Type'],
      credentials: true,
    })
  )
  .post(
    '/donate',
    async ({ body, set }) => {
      const { amount, donorName } = body;
      // Save donation to database
      const donation = await prisma.donation.create({
        data: {
          amount,
          donorName,
        },
      });
      // Generate PromptPay QR code (using a sample Thai mobile number)
      const qrCode = await generatePromptPayQR('0982864057', amount);
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