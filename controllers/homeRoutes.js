const { Post, User, Comment } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

//home page
router.get("/", async (req, res) => {
  try {
    console.log(req.session)
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("home", {posts, logged_in: req.session.logged_in,});
  } catch (err) {
    res.status(500).json(err);
  }
});

//render dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { userid: req.session.user_id },
      include: [{ model: User, attributes: ["username"] }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//render createPost page
router.get("/createPost", (req, res) => {
  if (req.session.logged_in) {
    res.render("createPost");
    return;
  }
  res.redirect("/login");
});

//render editpost page
router.get("/editpost/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("editpost", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

//logout
router.get("/signUp", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signUp");
});


// module exports router
module.exports = router;






