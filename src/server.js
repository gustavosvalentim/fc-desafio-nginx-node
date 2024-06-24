const express = require("express");
const mysql = require("mysql2/promise");

let con;

async function createConnection() {
  return await mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "root",
    database: "fullcycle",
  });
}

async function saveName(name) {
  try {
    await con.query("insert into people (name) values (?)", [name]);
  } catch (err) {
    console.error(err);
  }
}

async function getNames() {
  try {
    const [result, _] = await con.query("select name from people");
    return result.map((r) => r.name);
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function generateName() {
  try {
    const response = await fetch("https://randomuser.me/api?results=1", {
      headers: {
        Accept: "application/json",
      },
    });
    if (response.status != 200) {
      return null;
    }
    const body = await response.json();
    return body.results[0].name.first;
  } catch (ex) {
    console.error(ex);
    return null;
  }
}

async function startApp() {
  const app = express();

  con = await createConnection();

  app.get("/", async (req, res) => {
    const newName = await generateName();
    await saveName(newName);
    const names = await getNames();
    const template = `
    <h1>Full Cycle Rocks!</h1>
    <ul>
      ${names.map((name) => `<li>${name}</li>`).join("\n")}
    </ul>
    `;
    res.send(template);
  });

  app.listen(3000, "0.0.0.0", () => {
    console.log("Aplicação iniciada na porta 3000");
  });
}

startApp();
