// const { remove } = require('../models/post');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });


        if(req.xhr) {
            post = await post.populate('user', 'name');
            return res.status(200).json({
                data: {
                    post: post
                }, 
                message: "post created!",

            });

        }
        

        req.flash('success', 'Post published');
        return res.redirect('back');

    } catch(err) {
        console.log(err);
        req.flash('Error', err);
        return res.redirect('back');
        //return;


    }
      
    
    
}

module.exports.destroy = async function(req, res) {

    try {
        let post = await Post.findById(req.params.id); 
        //.id means converting the object id to string otherwise ._id will use for number

    if(post.user == req.user.id) {

        //CHANGE:: delete the assosated like for the post and comment
        
        await Like.deleteMany({likeable: post, onModel: 'Post'});
        await Like.deleteMany({_id: {$in: post.comments}});

        
        post.remove();
       await Comment.deleteMany({post: req.params.id});

       if(req.xhr) {
           return res.status(200).json({
               data: {
                   post_id: req.params.id
               },
               message: "post deleted"
           });
       }

       req.flash('error', 'Post deleted');

       return res.redirect('back');


    } else {
        req.flash('error', 'You cannot delete this post');

        return res.redirect('back');
    }

    }catch(err) {
        req.flash('Error', err);
        return res.redirect('back');
    }
    
}