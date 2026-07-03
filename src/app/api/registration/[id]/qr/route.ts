/*
 * Owner: Mohiuddin
 * Status: skeleton (auth + ownership real; QR rendering TODO)
 *
 * GET returns the ticket data / QR for a registration. Only the owner or an
 * admin may read it.
 * TODO(Mohiuddin):
 *   1. Load registrations/{id}; 404 if missing.
 *   2. Authorize: registration.userId === user.uid OR user.admin.
 *   3. Return the ticketCode (and optionally render a PNG QR for email use).
 */
import { NextResponse, type NextRequest } from "next/server";

import { getCurrentUser } from "@/lib/auth/server";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO(Mohiuddin): load the registration, authorize owner/admin, return QR.
  return NextResponse.json(
    { error: "Not implemented", owner: "Mohiuddin", registrationId: id },
    { status: 501 },
  );
}
