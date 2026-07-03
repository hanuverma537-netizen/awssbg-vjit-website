import {
  type DocumentData,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
  type SnapshotOptions,
} from "firebase/firestore";

/**
 * Build a typed client-SDK converter for a collection whose documents include
 * an `id` field mirroring the doc id. Strips `id` on write, injects it on read.
 */
export function createConverter<
  T extends { id: string },
>(): FirestoreDataConverter<T> {
  return {
    toFirestore(model: T): DocumentData {
      const { id: _id, ...rest } = model;
      void _id;
      return rest;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions,
    ): T {
      const data = snapshot.data(options);
      return { ...(data as Omit<T, "id">), id: snapshot.id } as T;
    },
  };
}
