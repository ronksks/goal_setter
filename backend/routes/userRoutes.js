//@ desc  this is the routing file, all function can be access trough the router with the CRUD functions


const express = require("express");
const router = express.Router();
//all functions are implemented in ('../controller/goalController')
const { registerUser, getMe, loginUser} = require('../controller/userController.js');

const {protect} = require('../middleware/authMiddleware');


//  Each 2 func has the same route, so we can chain them and use the route
// router.route('/').get(getUserInfo).post(registerUser).post(login);

router.post('/', registerUser)
router.post('/login', loginUser);
router.get('/me',protect, getMe);


// router.route('/:id').put(updateGoal).delete(deleteGoal);

// router.get('/', getGoals);
// router.post('/', setGoal);
// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);



module.exports = router;

