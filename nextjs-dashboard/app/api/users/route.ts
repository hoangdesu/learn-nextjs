import { User } from '@/app/lib/definitions';
import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const dbClient = await db.connect();

    const results = await dbClient.sql<User>`SELECT * FROM users;`;
    return NextResponse.json(results.rows, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const dbClient = await db.connect();
    const { email } = await req.json();
    console.log('deleting email > ', email);

    const deletedUser =
      await dbClient.sql`DELETE FROM users WHERE email=${email};`;
      // await dbClient.sql`SELECT * FROM users WHERE email=${email};`;

    return NextResponse.json(deletedUser.rows, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' });
  }
}
