const Timer = require("../models/timerModel");

const timerCtrl = {
  getTime: async (req, res) => {
    try {
      const timer = await Timer.find({
        user_id: req.user.id,
      });
      res.json(timer);
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },

  createTimer: async (req, res) => {
    try {
      const time = new Date();
      const { noOfHoursStudied, date } = req.body;

      const newTimer = new Timer({
        noOfHoursStudied,
        date,
        user_id: req.user.id,
        name: req.user.name,
      });
      await newTimer.save();
      res.json({
        newTimer,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },

  deleteTimer: async (req, res) => {
    try {
      await Timer.findByIdAndDelete(req.params.id);
      res.json({
        msg: "Deleted a note!",
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },

  updateTimer: async (req, res) => {
    try {
      const { noOfHoursStudied, date } = req.body;
      await Timer.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        {
          noOfHoursStudied,
          date,
        }
      );
      res.json({
        msg: "Updated a note.",
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },

  getParticularTimer: async (req, res) => {
    try {
      const timer = await Timer.findById(req.params.id);
      res.json(timer);
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },
};

module.exports = timerCtrl;
