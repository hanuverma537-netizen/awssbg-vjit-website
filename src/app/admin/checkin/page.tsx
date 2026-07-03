"use client";

/*
 * Owner: Mohiuddin
 * Status: skeleton (scanner is wired; check-in POST is stubbed)
 * Acceptance criteria:
 *   - Let the admin pick which event they are checking into at the top.
 *   - On scan, POST { ticketCode, eventId } to /api/checkin.
 *   - Verify the HMAC signature server-side, look up the registration,
 *     guard against double check-in, and show clear success/failure UI.
 * Reference: src/components/qr/QRScanner.tsx; lib/qr/ticket.ts; /api/checkin.
 */
import * as React from "react";
import { toast } from "sonner";

import { PageShell } from "@/components/layout/PageShell";
import { QRScanner } from "@/components/qr/QRScanner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckinPage() {
  const [eventId, setEventId] = React.useState("");
  const [scanning, setScanning] = React.useState(false);

  async function handleScan(decoded: string) {
    if (!eventId) {
      toast.error("Pick an event before scanning.");
      return;
    }
    // TODO(Mohiuddin): POST { ticketCode: decoded, eventId } to /api/checkin,
    // then show success or failure based on the response.
    void decoded;
    toast.info("Check-in POST not wired yet (owner: Mohiuddin).");
  }

  return (
    <PageShell
      eyebrow="Admin"
      title="Check-in"
      description="Scan attendee tickets to mark attendance."
    >
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <Label htmlFor="event-id">Event ID</Label>
          <Input
            id="event-id"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            placeholder="Select or paste the event id"
          />
          <p className="text-muted-foreground text-sm">
            TODO(Mohiuddin): replace with an event picker of live/upcoming
            events.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setScanning((s) => !s)}
          className="text-orange text-sm font-medium underline-offset-4 hover:underline"
        >
          {scanning ? "Stop camera" : "Start camera"}
        </button>

        {scanning ? (
          <QRScanner
            onScan={handleScan}
            onError={(message) => toast.error(message)}
          />
        ) : null}
      </div>
    </PageShell>
  );
}
