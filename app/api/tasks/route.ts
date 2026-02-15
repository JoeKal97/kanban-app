import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage (resets on deployment, but good for now)
let tasks: any[] = [];

export async function GET(request: NextRequest) {
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const task = {
    id: Date.now().toString(),
    title: body.title,
    description: body.description || '',
    priority: body.priority || 'Med',
    tags: body.tags || [],
    column: body.column || 'Backlog',
    createdDate: new Date().toISOString().split('T')[0],
    updatedDate: new Date().toISOString().split('T')[0],
  };
  
  tasks.push(task);
  return NextResponse.json(task, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  
  const index = tasks.findIndex(t => t.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
  
  tasks[index] = {
    ...tasks[index],
    ...body,
    updatedDate: new Date().toISOString().split('T')[0],
  };
  
  return NextResponse.json(tasks[index]);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }
  
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
  
  const [deleted] = tasks.splice(index, 1);
  return NextResponse.json(deleted);
}
