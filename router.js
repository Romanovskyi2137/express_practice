const Express = require("express");
const router = new Express.Router();
const Post = require("./post");
const PostController = require("./PostController");


router.post("/posts", PostController.create);
router.get("/posts", PostController.getAll);
router.get("/posts/:id", PostController.getOne);
router.put("/posts", PostController.update);
router.delete("/posts/:id", PostController.delete);


module.exports = router