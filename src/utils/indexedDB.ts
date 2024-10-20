import { openDB, DBSchema, IDBPDatabase } from "idb";

interface MyDB extends DBSchema {
  files: {
    key: string;
    value: {
      name: string;
      type: string;
      data: ArrayBuffer;
    };
  };
}

let dbPromise: Promise<IDBPDatabase<MyDB>>;

export const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<MyDB>("file-storage", 1, {
      upgrade(db) {
        db.createObjectStore("files");
      },
    });
  }
  return dbPromise;
};

export const saveFile = async (key: string, file: File) => {
  const db = await getDB();
  const arrayBuffer = await file.arrayBuffer();
  await db.put(
    "files",
    { name: file.name, type: file.type, data: arrayBuffer },
    key
  );
};

export const getFile = async (key: string): Promise<File | null> => {
  const db = await getDB();
  const record = await db.get("files", key);
  if (record) {
    const blob = new Blob([record.data], { type: record.type });
    return new File([blob], record.name, { type: record.type });
  }
  return null;
};

export const deleteFile = async (key: string) => {
  const db = await getDB();
  await db.delete("files", key);
};
