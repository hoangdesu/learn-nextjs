//https://nextjs.org/docs/app/building-your-application/routing/route-handlers

// Make sure to use `app router`, note `page router`

import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { sql } from '@vercel/postgres';
import { db } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export async function GET(request: NextRequest) {
  console.log('>> request:', request);
  const req = request.json();
  return NextResponse.json(
    { message: 'seed user GET route', request: req },
    { status: 200 },
  );
}

export async function POST(request: NextRequest) {
  try {
    const dbClient = await db.connect();

    const body = await request.json();
    console.log('body >', body);

    const newUser = {
      id: uuidv4(),
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    };

    const insertedUser = await dbClient.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${newUser.id}, ${newUser.name}, ${newUser.email}, ${newUser.password})
        ON CONFLICT (id) DO NOTHING;
    `;

    console.log(`Seeded user: ${JSON.stringify(newUser)}`);

    return NextResponse.json(
      {
        message: 'OK',
        body,
        //   dbClient,
        user: newUser,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Internal Server Error', error: err },
      { status: 500 },
    );
  }
}
