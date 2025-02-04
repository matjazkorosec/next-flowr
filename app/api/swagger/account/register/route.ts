import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'users.json');

// Ensure the data folder exists
if (!fs.existsSync(path.dirname(filePath))) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

// Read users from file (or return empty array if file doesn't exist)
const readUsers = () => {
  try {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

// Write users to file
const writeUsers = (users: any[]) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

// Register user API
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, firstName, lastName, dateOfBirth } = body;

  if (!email || !password || !firstName || !lastName || !dateOfBirth) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 }
    );
  }

  const users = readUsers();

  if (users.some((user: any) => user.email === email)) {
    return NextResponse.json(
      { message: 'User already exists' },
      { status: 409 }
    );
  }

  // Generate a fake access token (in production, use JWT)
  const accessToken = `fake-token-${crypto.randomUUID()}`;

  // New user object
  const newUser = {
    id: crypto.randomUUID(),
    email,
    firstName,
    lastName,
    dateOfBirth,
    password,
    accessToken,
  };

  users.push(newUser);
  writeUsers(users);

  return NextResponse.json(
    {
      accessToken,
      refreshToken: 'fake-refresh-token',
      userId: newUser.id,
    },
    { status: 201 }
  );
}
