"use client";

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase/client";
import { createConverter } from "@/lib/firestore/converters";
import type { Member, MemberFormValues, MemberSocials } from "@/lib/types";

/*
 * Client-SDK write path for the members collection. These run in the browser
 * with the signed-in user's ID token, so an admin's custom claim satisfies the
 * Firestore rules. Server-side reads live in members.server.ts (Admin SDK).
 *
 * REFERENCE IMPLEMENTATION for team CRUDs. Mirror this shape for events,
 * projects, and roadmap.
 */

const membersRef = collection(db, "members").withConverter(
  createConverter<Member>(),
);

/** Firestore rejects `undefined`; drop empty social keys before writing. */
function cleanSocials(socials: MemberFormValues["socials"]): MemberSocials {
  const entries = Object.entries(socials).filter(
    ([, value]) => value !== undefined && value !== "",
  );
  return Object.fromEntries(entries) as MemberSocials;
}

export async function checkUsernameAvailable(
  username: string,
  forUid?: string,
): Promise<boolean> {
  const snap = await getDoc(doc(db, "usernames", username));
  if (!snap.exists()) return true;
  return forUid !== undefined && snap.data().uid === forUid;
}

/**
 * Create a member and atomically reserve their username. `uid` should be the
 * member's Firebase Auth UID. Throws if the username is already taken.
 */
export async function createMember(
  uid: string,
  values: MemberFormValues,
): Promise<void> {
  await runTransaction(db, async (tx) => {
    const usernameRef = doc(db, "usernames", values.username);
    const usernameSnap = await tx.get(usernameRef);
    if (usernameSnap.exists() && usernameSnap.data().uid !== uid) {
      throw new Error(`Username @${values.username} is already taken`);
    }

    tx.set(doc(db, "members", uid), {
      ...values,
      socials: cleanSocials(values.socials),
      id: uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    tx.set(usernameRef, { uid });
  });
}

/**
 * Update a member. If the username changed, move the reservation atomically.
 */
export async function updateMember(
  uid: string,
  values: MemberFormValues,
): Promise<void> {
  await runTransaction(db, async (tx) => {
    const current = await tx.get(doc(db, "members", uid));
    if (!current.exists()) throw new Error("Member not found");
    const previousUsername = current.data().username as string;

    if (previousUsername !== values.username) {
      const nextRef = doc(db, "usernames", values.username);
      const nextSnap = await tx.get(nextRef);
      if (nextSnap.exists() && nextSnap.data().uid !== uid) {
        throw new Error(`Username @${values.username} is already taken`);
      }
      tx.set(nextRef, { uid });
      tx.delete(doc(db, "usernames", previousUsername));
    }

    tx.set(
      doc(db, "members", uid),
      {
        ...values,
        socials: cleanSocials(values.socials),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  });
}

/** Delete a member and release their username reservation. */
export async function deleteMember(uid: string): Promise<void> {
  const snap = await getDoc(doc(db, "members", uid));
  if (snap.exists()) {
    const username = snap.data().username as string | undefined;
    if (username) await deleteDoc(doc(db, "usernames", username));
  }
  await deleteDoc(doc(db, "members", uid));
}

export { membersRef };
