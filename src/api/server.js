import express from "express";
import cors from "cors";
import supabase from "./db.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*");
    res.send(data);
  } catch (error) {}
});

//Get user by id
app.get("/users/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", req.params.id);
    if (error) {
      console.log("error fetching user : " + error);
    }
    if (data) {
      res.send(data);
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/update", async (req, res) => {
  try {
    const column = req.body.column;
    const username = req.body.username;
    const value = req.body.value;

    const { data, error } = await supabase
      .from("users")
      .update({ image: value })
      .eq(column, username)
      .select();
    if (error) {
      console.log("error updating : " + error);
    }
    if (data) {
      res.send("Updated successfully");
    }
  } catch (error) {}
});

app.delete("/users", async (req, res) => {
  try {
    const response = await supabase
      .from("users")
      .delete()
      .eq("id", req.body.id);
    res.send("Deleted seccessfully");
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`running in port ${port}`);
});
