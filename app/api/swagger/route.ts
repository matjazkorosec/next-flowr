import { NextResponse } from 'next/server';
import openapiSchema from '@/lib/swagger/openapi';

export function GET() {
  return NextResponse.json(openapiSchema);
}
