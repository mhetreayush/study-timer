const router = require("express").Router();
const auth = require("../middleware/auth");
const timerCtrl = require("../controllers/timerCtrl");

router
  .route("/")
  .get(auth, timerCtrl.getTime)
  .post(auth, timerCtrl.createTimer);

router
  .route("/:id")
  .get(auth, timerCtrl.getParticularTimer)
  .put(auth, timerCtrl.updateTimer)
  .delete(auth, timerCtrl.deleteTimer);

module.exports = router;
