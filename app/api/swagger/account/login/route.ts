import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'users.json');

const readUsers = () => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeUsers = (users: any[]) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const users = readUsers();
  const user = users.find(
    (u: any) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    );
  }

  if (!user.accessToken) {
    user.accessToken = `fake-token-${crypto.randomUUID()}`;
    writeUsers(users);
  }

  return NextResponse.json(
    {
      accessToken: user.accessToken,
      refreshToken: 'fake-refresh-token',
      userId: user.id,
    },
    { status: 201 }
  );
}
