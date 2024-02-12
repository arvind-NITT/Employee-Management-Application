const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

let port = 5000;

app.get("/", (req, res) => {
  var records = fs.readFileSync("./test.txt", "utf-8");
  console.log(records);

  var message = records.split("\n");
  message = message.map((Element) => {
    return Element.split(",");
  });
  res.json({ message });
});
 
app.post("/addemployee", (req, res) => {
  console.log(req.body);
  const { firstname,lastname, age, dob, salary, department } = req.body.data;
  // const { name, age, dob, salary, department } = req.body;

  var newrecord;
  var records = fs.readFileSync("./test.txt", "utf-8");
  if (records.length > 0)
    newrecord = `\n${firstname},${lastname},${age},${dob},${salary},${department}`;
  else {
    newrecord = `${firstname},${lastname},${age},${dob},${salary},${department}\n`;
  }
  fs.appendFileSync("./test.txt", newrecord);

  var records = fs.readFileSync("./test.txt", "utf-8");

  var message = records.split("\n");
  message = message.map((Element) => {
    return Element.split(",");
  });
  res.json({ message });
});

app.get("/getemployeebyage/:id", (req, res) => {
  const name = req.params.id;
  const data = fs.readFileSync("./test.txt", "utf-8");
  var lines = data.split("\n");
  lines = lines.map((Element) => {
    return Element.split(",");
  });
  console.log(name);
  for (let i = 0; i < lines.length; i++) {
    if (lines[i][2] != name) {
      console.log(i);
      lines.splice(i, 1);
      i--;
    }
  }

  const ans = lines.join("\n").split("\n");
  console.log(ans);
  res.send({ ans });
});
app.get("/getemployeebyname/:id", (req, res) => {
  var name = req.params.id;
  const data = fs.readFileSync("./test.txt", "utf-8");
  var lines = data.split("\n");
  name= name.split(' ')
  lines = lines.map((Element) => {
    return Element.split(",");
  });
  console.log(name,lines);
  for (let i = 0; i < lines.length; i++) {
    if (lines[i][0]!=name[0] && !lines[i][1]!=name[1]) {
      console.log(i);
      lines.splice(i, 1);
      i--;
    }
  }

  console.log(lines);
  const ans = lines.join("\n").split("\n");
  console.log(ans);
  res.send({ ans });
});

app.put("/updateemployee", (req, res) => {
  console.log("yha tk pahuch gaye he ");
  console.log(req.body);
  const data = fs.readFileSync("./test.txt", "utf-8");
  const lines = data.split("\n");
  const { index, firstname,lastname, age, dob, salary, department } = req.body;
  // console.log(name, age, dob, salary, department, index);
  const newrecord = `${firstname},${lastname},${age},${dob},${salary},${department}`;
  lines.splice(index, 1, newrecord);
  const ans = lines.join("\n");
  fs.writeFileSync("./test.txt", ans, "utf-8");
  var message = ans.split("\n");
  message = message.map((Element) => {
    return Element.split(",");
  });

  res.json({ message });
});

app.delete("/deleteemployee/:id", (req, res) => {
  const name = req.params.id;
  const data = fs.readFileSync("./test.txt", "utf-8");
  const lines = data.split("\n");
  console.log(name);

  lines.splice(name, 1);
  console.log(lines);
  const ans = lines.join("\n");
  fs.writeFileSync("./test.txt", ans);

  var message = lines;
  message = message.map((Element) => {
    return Element.split(",");
  });
  res.json({ message });
});

app.listen(port, (err) => {
  if (err) console.log(err);
  else {
    console.log("Server Listening at port: 5000");
  }
});
