/*
 * Owner: Mohiuddin
 * Status: skeleton (auth + validation real; core logic TODO)
 *
 * TODO(Mohiuddin): implement the registration flow.
 *   1. requireApiAuth below already rejects unauthenticated callers.
 *   2. Load the event; reject if not found.
 *   3. Enforce every edge case BEFORE writing:
 *        - registration closed (registrationOpen === false)
 *        - deadline passed (registrationDeadline < now)
 *        - event already ended (endAt < now)
 *        - capacity full (count registrations for the event vs capacity)
 *        - duplicate registration (unique eventId + userId) -> return existing
 *   4. In a transaction: create the registration doc (status "registered"),
 *      then generate the signed ticketCode with generateTicketCode(regId, eventId)
 *      and write it back.
 *   5. Send the ticket email via sendEmail + renderEventTicketEmail.
 *   6. Return { registrationId }.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth/server";

export const runtime = "nodejs";

const bodySchema = z.object({ eventId: z.string().min(1) });

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // TODO(Mohiuddin): everything described in the header comment.
  return NextResponse.json(
    { error: "Not implemented", owner: "Mohiuddin" },
    { status: 501 },
  );
}
