/* Database functions  */

// TODO: Install the following package:
import { openDB } from "idb";

// TODO: Complete the initDb() function below:
export const initDb = async (callback) => {
  const iContact_DB = await openDB("iContact_DB", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("iContact_DB")) {
        console.log("iContact database already exists.");
      } else {
        db.createObjectStore("iContact", {
          keyPath: "id",
          autoIncrement: true,
        });
        console.log("iContact database created.");
      }
    },
  }).then(callback());
};

// TODO: Complete the postDb() function below:
export const postDb = async (content) => {
  console.log("Post to the iContact database.");
  const iContact_DB = await openDB("iContact_DB", 1);
  const tx = iContact_DB.transaction("iContact", "readwrite");
  const store = tx.objectStore("iContact");
  const request = store.add({ contact: content });
  const result = await request;
  console.log("🚀 - data saved to the iContact database.", result);
};

export const getAllDb = async () => {
  console.log("GET all from the iContact database.");
  const iContact_DB = await openDB("iContact_DB", 1);
  const tx = iContact_DB.transaction("iContact", "readonly");
  const store = tx.objectStore("iContact");
  const request = store.getAll();
  const result = await request;
  console.log("result.value", result);
  return result;
};

// TODO: Complete the getDb() function below:
export const getDb = async (id) => {
  console.log("GET one item from the iContact database.");
  const iContact_DB = await openDB("iContact_DB", 1);
  console.log(iContact_DB);
  const tx = iContact_DB.transaction("iContact", "readonly");
  const store = tx.objectStore("iContact");
  const request = store.get(id);
  const result = await request;
  console.log("result.value", result);
  return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
  console.log("DELETE from the iContact database.", id);
  const iContact_DB = await openDB("iContact_DB", 1);
  const tx = iContact_DB.transaction("iContact", "readwrite");
  const store = tx.objectStore("iContact");
  const request = store.delete(id);
  const result = await request;
  console.log("result.value", result);
  return result;
};

export const putDb = async (id, content) => {
  console.log("PUT to the iContact database.");
  const iContact_DB = await openDB("iContact_DB", 1);
  const tx = iContact_DB.transaction("iContact", "readwrite");
  const store = tx.objectStore("iContact");
  const request = store.put({ id: id, contact: content });
  const result = await request;
  console.log("🚀 - data saved to the iContact database.", result);
};

/* We will call initDb in cards.js just before using the database.  */
