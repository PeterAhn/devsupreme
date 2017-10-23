var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var util     = require('../util');

router.get('/', function(req,res){
  var page = Math.max(1, req.query.page);
  var limit = 10;
  Post.count({}, function(err, count){
    if(err) return res.json({success:false, message:err});
    var skip = (page-1) * limit;
    var maxPage = Math.ceil(count/limit);

    Post.find({}).populate("author").sort('-createAt')
    // Post.find({}).populate("author").sort('-createAt').skip(skip).limit(limit)
    .exec(function(err,posts){
        res.json(err||!posts? util.successFalse(err): util.successTrue({posts:posts, page:page, maxPage:maxPage}));
    });
  });
}); // index

// router.get('/new', util.isLoggedin, function(req,res){
//   res.render("posts/new", {user:req.user});
// }); // new

router.post('/', util.isLoggedin, function(req,res){
  var newPost = new Post(req.body);
  console.log(req.body);
  newPost.save(function(err,post){
    console.log(post);
    res.json(err||!post? util.successFalse(err): util.successTrue(post));
  });

  // Post.create(req.body.post, function(err,post){
  //   console.log(err + post);
  //   return res.json(err||!post? util.successFalse(err): util.successTrue(post));
    
  // });
}); // create;

router.get('/:id', function(req,res){
  console.log('Request! from' + req.params.id);
  Post.findById(req.params.id).populate("author").exec(function(err,post){
    res.json(err||!post? util.successFalse(err): util.successTrue({post:post, page:req.query.page}));
  });
}); // show

// router.get('/:id/edit', util.isLoggedin, function(req,res){
//   Post.findById(req.params.id, function(err,post){
//     if(err) return res.json({success:true, message:err});
//     if(!req.user._id.equals(post.author)) return res.json({success:false, message:"Unauthrized Attempt"});
//     res.render("posts/edit", {post:post, user:req.user});
//   });
// }); // edit

// router.put('/:id', util.isLoggedin, function(req,res){
//   req.body.post.updatedAt=Date.now();
//   Post.findByIdAndUpdate({_id:req.params.id, author:req.user._id}, req.body.post, function(err,post){
//     if(err) return res.json({success:false, message:err});
//     if(!post) return res.json({success:false, message:"No data found to update"});
//     res.redirect('/posts/'+req.params.id);
//   });
// }); // update

// router.delete('/:id', function(req,res){
//   Post.findByIdAndRemove({_id:req.params.id, author:req.user._id}, function(err,post){
//     if(err) return res.json({success:false, message:err});
//     if(!post) return res.json({success:false, message:"No data found to delete"});
//     res.redirect('/posts');
//   });
// }); // destroy

module.exports = router;
