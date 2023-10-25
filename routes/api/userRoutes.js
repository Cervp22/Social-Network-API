const router = require("express").Router();
const {
  getAllUsers,
  getUserId,
  createUser,
  deleteUser,
  updateData,
  postfriend,
  deletefriend,
} = require("../../contoller/user-controller");

//This will be end points only and then methods/logic will be imported
router.route("/").get(getAllUsers).post(createUser);

router.route("/:userId").get(getUserId).delete(deleteUser).put(updateData);

router
  .route("/:userId/friends/:friendId")
  .post(postfriend)
  .delete(deletefriend);

module.exports = router;
