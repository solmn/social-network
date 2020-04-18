const
    path = require('path'),
    router = require('express').Router(),
    { userController } = require(path.join(__dirname, '..', 'controllers'));
router.post("/change-pic",(req, res, next)=> {console.log("MMEEEEEEEEEE1", req.body),next()}, userController.changeProfilePic);
router.post("/update-user", userController.updateUser);
router.get('/feetch-feeds',(req, res, next)=> {console.log("MMEEEEEEEEEE2", req.body),next()}, userController.fetchFeed);
router.post("/create-post",(req, res, next)=> {console.log("MMEEEEEEEEEE3", req.body),next()}, userController.createPost);
router.post("/search-feeds",(req, res, next)=> {console.log("MMEEEEEEEEEE4", req.body),next()}, userController.searchFeeds);
router.get("/posts",(req, res, next)=> {console.log("MMEEEEEEEEEE5", req.body),next()}, userController.getPosts);
router.get("/get-post/:postId", userController.getPost);
// router.get("/posts/:p_Id",(req, res, next)=> {console.log("MMEEEEEEEEEE6"), req.body,next()}, userController.updatepostget);
router.post("/updatepost", (req, res, next)=> {console.log("MMEEEEEEEEEE7", req.body),next()},userController.updatepost);
router.post("/deletePost/:d_id",(req, res, next)=> {console.log("MMEEEEEEEEEE8", req.body),next()}, userController.deletepost);
router.post("/add-comment/:postId",(req, res, next)=> {console.log("MMEEEEEEEEEE9", req.body),next()}, userController.addComment);
router.post("/like-post/:postId",(req, res, next)=> {console.log("MMEEEEEEEEEE10", req.body),next()}, userController.likePost);
router.post('/unlike-post/:postId',(req, res, next)=> {console.log("MMEEEEEEEEEE11", req.body),next()}, userController.unLikePost)
// router.get("/updateComment/:p_Id", (req, res, next)=> {console.log("MMEEEEEEEEEE12", req.body),next()},userController.updatecommentget);
router.post("/updateComment", (req, res, next)=> {console.log("MMEEEEEEEEEE13", req.body),next()},userController.updatecomment);
router.post("/delete-comment",(req, res, next)=> {console.log("MMEEEEEEEEEE14", req.body),next()}, userController.deleteComment);
// router.post("/search-post", userController.searchposts);
router.post("/follow/:uid",(req, res, next)=> {console.log("MMEEEEEEEEEE15", req.body),next()}, userController.followUser);
router.post("/unfollow/:uid",(req, res, next)=> {console.log("MMEEEEEEEEEE16", req.body),next()}, userController.unFollowUser)
router.post("/posts",(req, res, next)=> {console.log("MMEEEEEEEEEE17", req.body),next()}, userController.getAllPosts);
router.get("/followings",(req, res, next)=> {console.log("MMEEEEEEEEEE18", req.body),next()}, userController.getFollowings);
router.get("/followers", (req, res, next)=> {console.log("MMEEEEEEEEEE19", req.body),next()},userController.getFollowers);
router.get("/fetch-ads",(req, res, next)=> {console.log("MMEEEEEEEEEE20", req.body),next()},userController.fetchAds);
router.get("/1/:id",(req, res, next)=> {console.log("MMEEEEEEEEEE21", req.body),next()}, userController.getUser);
router.get("/", userController.getAllUsers);


module.exports = router;