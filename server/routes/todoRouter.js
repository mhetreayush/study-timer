const router = require("express").Router();
const auth = require("../middleware/auth");
const todoCtrl = require("../controllers/todoCtrl");

router.route("/").get(auth, todoCtrl.getTodo).post(auth, todoCtrl.createTodo);

router
  .route("/:id")
  .delete(auth, todoCtrl.deleteTodo)
  .put(auth, todoCtrl.updateTodo);

module.exports = router;
