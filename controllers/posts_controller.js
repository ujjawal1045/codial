const { remove } = require('../models/post');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });


        if(req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                }, 
                message: "post created!",

            })

        }
        

        req.flash('success', 'Post published');
        return res.redirect('back');

    } catch(err) {
        console.log('Error', err);
        return;


    }
      
    
    
}

module.exports.destroy = async function(req, res) {

    try {
        let post = await Post.findById(req.params.id); 
        //.id means converting the object id to string otherwise ._id will use for number

    if(post.user == req.user.id) {
        post.remove();
        req.flash('error', 'Post deleted');

       await Comment.deleteMany({post: req.params.id});

       if(req.xhr) {
           return res.status(200).json({
               data: {
                   post_id: req.params.id
               },
               message: "post deleted"
           })
       }
       return res.redirect('back');


    } else {
        return res.redirect('back');
    }

    }catch(err) {
        console.log('Error', err);
        return;
    }
    
}