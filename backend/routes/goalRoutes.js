//@ desc  this is the routing file, all function can be access trough the router with the CRUD functions


const express = require("express");
const router = express.Router();
//all functions are implemented in ('../controller/goalController')
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controller/goalController');

//  Each 2 func has the same route, so we can chain them and use the route
router.route('/').get(getGoals).post(setGoal);

router.route('/:id').put(updateGoal).delete(deleteGoal);

// router.get('/', getGoals);
// router.post('/', setGoal);
// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);



module.exports = router;
// const 