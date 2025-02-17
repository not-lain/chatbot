import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as hub from "@huggingface/hub";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const storedState = (await cookies()).get('oauth_state')?.value;

  // Verify state
  if (!state || !storedState || state !== storedState) {
    return NextResponse.redirect(new URL('/?error=invalid_state', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const tokenResponse = await fetch("https://huggingface.co/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.OAUTH_CLIENT_ID!,
        client_secret: process.env.OAUTH_CLIENT_SECRET!,
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.OAUTH_CLIENT_REDIRECT_URI!,
      }),
    });

    const data = await tokenResponse.json();
    const {name: username} = await hub.whoAmI({accessToken: data['access_token']});
    // console.log(data);
    console.log(`username = ${username}`)
    console.log();
    
    
    // Clear the oauth state cookie
    (await cookies()).delete('oauth_state');
    
    // Redirect to home page with success
    return NextResponse.redirect(new URL('/?success=true', request.url));
  } catch (error) {
    console.error("Token exchange error:", error);
    return NextResponse.redirect(new URL('/?error=auth_failed', request.url));
  }
}
