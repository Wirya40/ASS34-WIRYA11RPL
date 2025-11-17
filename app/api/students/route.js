let students = [
  { id: 1, name: "Alice", email: "alice@mail.com", city: "Jakarta" },
  { id: 2, name: "Bob", email: "bob@mail.com", city: "Bandung" },
];


export async function GET() {
  return Response.json(students);
}


export async function POST(req) {
  const body = await req.json();
  const newStudent = { id: Date.now(), ...body };
  students.push(newStudent);
  return Response.json(newStudent, { status: 201 });
}
