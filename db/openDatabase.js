import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

const openDatabase = async () => {
  const database = SQLite.openDatabase("contacts.db");
  database._db.close();

  // if (
  //   !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
  //     .exists
  // ) {
  //   await FileSystem.makeDirectoryAsync(
  //     FileSystem.documentDirectory + "SQLite",
  //   );
  // }
  // await FileSystem.downloadAsync(
  //   Asset.fromModule(require("./contacts.db")).uri,
  //   FileSystem.documentDirectory + "SQLite/contacts.db",
  // );

  const db = SQLite.openDatabase("contacts.db");

  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists contacts (id integer primary key autoincrement, firstName text, lastName text, favourites integer, company text, notes text)",
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists phoneNumbers (id integer primary key autoincrement, contactId integer, label text, value text)",
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists emails (id integer primary key autoincrement, contactId integer, label text, value text)",
    );
  });

  return db;
};

export default openDatabase;
