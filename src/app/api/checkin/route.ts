/*
 * Owner: Mohiuddin
 * Status: skeleton (admin auth + validation + signature check real; write TODO)
 *
 * POST marks attendance from a scanned ticket. Admin only.
 * TODO(Mohiuddin):
 *   1. verifyTicketCode already rejects tampered codes below.
 *   2. Confirm the decoded eventId matches the body eventId.
 *   3. Load the registration; 404 if missing.
 *   4. Guard against double check-in (status already "attended").
 *   5. In a transaction set status "attended", attendedAt now, checkedInBy uid.
 *   6. Return the member + event summary for the success UI.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth/server";
import { verifyTicketCode } from "@/lib/qr/ticket";

export const runtime = "nodejs";

const bodySchema = z.object({
  ticketCode: z.string().min(1),
  eventId: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !user.admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const decoded = verifyTicketCode(parsed.data.ticketCode);
  if (!decoded || decoded.eventId !== parsed.data.eventId) {
    return NextResponse.json({ error: "Invalid ticket" }, { status: 400 });
  }

  // TODO(Mohiuddin): load registration, guard double check-in, mark attended.
  return NextResponse.json(
    { error: "Not implemented", owner: "Mohiuddin" },
    { status: 501 },
  );
}
