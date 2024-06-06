import { Request, Response, NextFunction } from 'express';
import { google } from 'googleapis';
import {
  userRegisterByGoogleOauth,
  findUserByEmailService,
  updateUserImageByGoogleOauth,
} from './OauthService';
import { createOauthToken } from '@/helpers/Token';

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

export const googleOuath = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.redirect(authorizationUrl);
  } catch (error) {
    next(error);
  }
};

export const googleOauthCallback = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code as string);

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });

    const { data } = await oauth2.userinfo.get();

    if (!data.email || !data.name || !data.picture) {
      return res.json({
        data: data,
      });
    }

    let user = await findUserByEmailService({ email: data.email });

    if (!user) {
      user = await userRegisterByGoogleOauth({
        name: data.name,
        email: data.email,
        picture: data.picture,
      });
    }

    if (user?.userImageUrl == null) {
      await updateUserImageByGoogleOauth({
        email: data.email,
        picture: data.picture,
      });
    }

    const accestoken = await createOauthToken({ uid: user.uid });

    return res.redirect(201, `${process.env.APP_URL}/oauth/${accestoken}`);
  } catch (error) {
    next(error);
  }
};
