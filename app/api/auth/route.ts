import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from 'crypto';

export async function GET() {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const redirectUri = process.env.OAUTH_CLIENT_REDIRECT_URI;
  
  // Generate random state
  const state = crypto.randomBytes(16).toString('hex');
  
  // Store state in cookies
  (await cookies()).set('oauth_state', state, { httpOnly: true, secure: true });
  
  const authUrl = `https://huggingface.co/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent('openid profile inference-api')}&prompt=consent&state=${state}`;
  
  return NextResponse.json({ authUrl });
}
