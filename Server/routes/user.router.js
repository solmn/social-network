const
    path = require('path'),
    router = require('express').Router(),
    { userController } = require(path.join(__dirname, '..', 'controllers'));
router.post("/change-pic", userController.changeProfilePic);
router.post("/update-user", userController.updateUser);
router.get('/feetch-feeds',  userController.fetchFeed);
router.post("/create-post", userController.createPost);
router.post("/search-feeds", userController.searchFeeds);
router.get("/posts",userController.getPosts);
router.get("/get-post/:postId", userController.getPost);
// router.get("/posts/:p_Id",(req, res, next)=> {console.log("MMEEEEEEEEEE6"), req.body,next()}, userController.updatepostget);
router.post("/updatepost" ,userController.updatepost);
router.post("/deletePost/:d_id", userController.deletepost);
router.post("/add-comment/:postId", userController.addComment);
router.post("/like-post/:postId", userController.likePost);
router.post('/unlike-post/:postId', userController.unLikePost)
// router.get("/updateComment/:p_Id", (req, res, next)=> {console.log("MMEEEEEEEEEE12", req.body),next()},userController.updatecommentget);
router.post("/updateComment", userController.updatecomment);
router.post("/delete-comment", userController.deleteComment);
// router.post("/search-post", userController.searchposts);
router.post("/follow/:uid", userController.followUser);
router.post("/unfollow/:uid", userController.unFollowUser)
router.post("/posts", userController.getAllPosts);
router.get("/followings", userController.getFollowings);
router.get("/followers", userController.getFollowers);
router.get("/fetch-ads",userController.fetchAds);
router.get("/1/:id", userController.getUser);
router.get("/", userController.getAllUsers);


module.exports = router;