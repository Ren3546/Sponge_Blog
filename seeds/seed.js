const sequelize = require(`../config/connection`);
const {Comment, User, Post } = require(`../models`);

const userData = [
    {
        username: `Spongebob`,
        password: `gary`,
    },
    {
        username: `Patrick`,
        password: `rock`,
    },
    {
        username: `Krabs`,
        password: `money`,
    },
    {
        username: `Squidward`,
        password: `music`,
    }
]

const postData = [
    {
        title: `first post`,
        content: `Hello everyone`,
        userid: 1,
    },{
        title: `post`,
        content: `hi!`,
        userid: 2,
    },{
        title: `my post`,
        content: `hello`,
        userid: 3,
    },{
        title: `this post`,
        content: `no`,
        userid: 4,
    }
]

const commentData = [
    {
        content: `hi!`,
        userid: 2,
        postid: 1,
    }, {
        content: `No`,
        userid: 3,
        postid: 1,
    }, 
]

const seedMe = async()=>{
    await sequelize.sync({force:true});
    
    const dbUsers = await User.bulkCreate(userData,{
        individualHooks: true
    });

    console.table(dbUsers.map(user=>user.toJSON()));

    const dbPosts = await Post.bulkCreate(postData);
    console.table(dbPosts.map(post=>post.toJSON()));

    const dbComment = await Comment.bulkCreate(commentData);
    console.table(dbComment.map(comment=>comment.toJSON()));

    process.exit(0);
}

seedMe();