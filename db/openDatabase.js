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

  return SQLite.openDatabase("contacts.db");
};

export default openDatabase;
