const router = require("express").Router();
const postRoutes = require("./postRoutes.js");
const userRoutes = require("./userRoutes.js");
const commentRoutes=require("./commentRoutes.js");1

router.use("/post", postRoutes);
router.use("/user", userRoutes); 
router.use("/comment", commentRoutes);

module.exports = router;