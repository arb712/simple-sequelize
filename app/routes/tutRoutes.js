const express = require("express");
const tutorials = require("../controllers/tut.controller.js");
const router = express.Router();

module.exports = (app) => {
  router.post("/create", tutorials.create);
  router.get("/findAllTut", tutorials.findAll);
  router.get("/published", tutorials.findAllPublished);
  router.get("/:id", tutorials.findOne);
  router.put(":id", tutorials.update);
  router.delete("/delete", tutorials.delete);
  router.delete("/deleteAll", tutorials.deleteAll);
  app.use("/api/tutorials", router);
};
