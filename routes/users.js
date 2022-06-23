const express = require("express");

const {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const auth = require('../middleware/auth'
)

const router = express.Router();

router.route("/").get(auth,getAllUsers).post(addUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

/* router.post("/", async (req, res) => {
  res.send(req.body);
}); */

module.exports = router;