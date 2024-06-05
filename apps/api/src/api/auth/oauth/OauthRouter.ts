import { Request, Response } from 'express';
import { Router } from 'express';
import * as dotenv from 'dotenv';
import { google } from 'googleapis';
import { prisma } from './../../../lib/PrismaClient';
import { createToken } from '@/helpers/Token';

const router = Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:8000/auth/oauth/google/callback',
);

const scope = ['profile', 'email'];

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scope,
  include_granted_scopes: true,
});

router.get('/google', (req: Request, res: Response) => {
  res.redirect(authorizationUrl);
});

router.get('/google/callback', async (req: Request, res: Response) => {
  const { code } = req.query;

  const { tokens } = await oauth2Client.getToken(code as string);

  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2',
  });

  const { data } = await oauth2.userinfo.get();
  console.log(data);

  if (!data.email || !data.name) {
    return res.json({
      data: data,
    });
  }

  let user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        fullname: data.name,
        email: data.email,
        userImageUrl: data.picture,
        verify: 'VERIFIED',
      },
    });
  }

  const accestoken = await createToken({ uid: user.uid });

  return res.json({
    data: {
      accestoken: accestoken,
      name: user.fullname,
      email: user.email,
      role: user.roleId,
    },
  });
});

export default router;
