// Reuse the same "students" array from memory
import { NextResponse } from "next/server";

let students = [
  { id: 1, name: "Alice", email: "alice@mail.com", city: "Jakarta" },
  { id: 2, name: "Bob", email: "bob@mail.com", city: "Bandung" },
];

// PUT (update)
export async function PUT(req, { params }) {
  const id = parseInt(params.id);
  const body = await req.json();
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  students[index] = { ...students[index], ...body };
  return NextResponse.json(students[index]);
}

// DELETE
export async function DELETE(req, { params }) {
  const id = parseInt(params.id);
  students = students.filter((s) => s.id !== id);
  return NextResponse.json({ message: "Deleted successfully" });
}
