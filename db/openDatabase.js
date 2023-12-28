import * as SQLite from "expo-sqlite";

const dbName = "c6.db";

const openDatabase = async () => {
  // This is to make sure that the DB does not go to read only mode.
  const database = SQLite.openDatabase(dbName);
  database._db.close();

  const db = SQLite.openDatabase(dbName);

  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists contacts (id integer primary key autoincrement, firstName string, lastName string, favourite boolean, company text, notes text)",
      [],
      () => null,
      (_, error) => {
        console.log(error);
      },
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists phoneNumbers (id integer primary key autoincrement, contactId integer, label string, value string, foreign key(contactId) references contacts(id))",
      [],
      () => null,
      (_, error) => {
        console.log(error);
      },
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists emails (id integer primary key autoincrement, contactId integer, label string, value string, foreign key(contactId) references contacts(id))",
      [],
      () => null,
      (_, error) => {
        console.log(error);
      },
    );
  });

  return db;
};

export default openDatabase;
