const router = require("express").Router();
const {
  getThoughts,
  getUserThought,
  postThought,
  postupdate,
  deletethought,
  postReaction,
  deleteReaction,
} = require("../../contoller/thoughts-controller");

//endpoints start here
router.route("/").get(getThoughts).post(postThought);

router
  .route("/:thoughtId")
  .get(getUserThought)
  .put(postupdate)
  .delete(deletethought);

  //must add username to make reaction
router.route("/:thoughtId/reactions").post(postReaction);
// must have username too here at this json body endpoint!
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
