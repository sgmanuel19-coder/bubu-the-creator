export function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const ua = request.headers.get('user-agent') ?? 'unknown';
  console.warn(`[BOT-TRAP] ip=${ip} ua=${ua}`);
  return new Response(null, { status: 404 });
}
