const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const items = require("./user");
const workitems = require("./work");
const { json } = require("body-parser");
const today = require(__dirname + "/today.js");
const app = express();
console.log(today);
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
let task = [];
let work = [];
let list = "work";
//mongose connection
mongoose
  .connect(
    "mongodb+srv://deepanshubaluni07:ZVNpKXKazLvk3r1e@cluster0.mpqmv3i.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connect");
  })
  .catch((e) => {
    console.log(e);
  });
async function find() {
  try {
    const result = await items.find();
    task = [];
    result.forEach((Element) => {
      task.push(Element.items);
    });
  } catch (e) {
    console.log(e);
  }
}
async function findwork() {
  try {
    const result = await workitems.find();
    work = [];
    result.forEach((Element) => {
      work.push(Element.items);
    });
  } catch (e) {
    console.log(e);
  }
}
//get for root
app.get("/", async (req, res) => {
  list = today.today();
  await find();
  res.render("index", { list: list, newtask: task, button: "newtak" });
});
//get for work
app.get("/work", async (req, res) => {
  await findwork();
  res.render("index", { list: "work", newtask: work, button: "newwork" });
});
//post to enter new items
app.post("/", (req, res) => {
  const add = req.body.add;
  if (list === "work") {
    //console.log("hello");
    const create = async () => {
      try {
        const result = await workitems.create({ items: add });
      } catch (e) {
        console.log(e);
      }
    };
    create();
    work.push(req.body.add);
    res.redirect("/work");
  } else {
    //console.log("hi");
    const create = async () => {
      try {
        const result = await items.create({ items: add });
      } catch (e) {
        console.log(e);
      }
    };
    create();
    const find = async () => {
      try {
        const result = await items.find();
        task = [];
        result.forEach((Element) => {
          task.push(Element.items);
        });
      } catch (e) {
        console.log(e);
      }
    };
    find();
    res.redirect("/");
  }
});
//delete
app.post("/del", async (req, res) => {
  if (list === "work") {
    //console.log(list);
    const result = await workitems.findOneAndDelete({
      items: req.body.taskname,
    });
    res.redirect("/work");
  } else {
    const result = await items.findOneAndDelete({ items: req.body.taskname });
    res.redirect("/");
  }
});
app.listen(3000, () => {
  console.log("server on port 3000");
});
//mongodb password:ZVNpKXKazLvk3r1e
