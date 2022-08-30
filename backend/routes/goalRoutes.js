//@ desc  this is the routing file, all function can be access trough the router with the CRUD functions

const express = require("express");
const router = express.Router();
//all functions are implemented in ('../controller/goalController')
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controller/goalController");
const { protect } = require("../middleware/authMiddleware");

//  Each 2 func has the same route, so we can chain them and use the route
// all functions are protecte, this meand that only if a user is logged in
// and posses a valid token then the user can use the goals functions
router.route("/").get(protect, getGoals).post(protect, setGoal);

router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

// router.get('/', getGoals);
// router.post('/', setGoal);
// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);

module.exports = router;
// const
