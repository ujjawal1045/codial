const { remove } = require('../models/post');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res) {
      Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err, post) {
        if(err) {
            console.log('error in creating post');
            return;
    }
    

    req.flash('success', 'Post published');
    return res.redirect('back');
    });
    
}

module.exports.destroy = function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        //.id means converting the object id to string otherwise ._id will use for number
        if(post.user == req.user.id) {
            post.remove();
            req.flash('error', 'Post deleted');

            Comment.deleteMany({post: req.params.id}, function(err) {
                return res.redirect('back');

            });

        } else {
            return res.redirect('back');
        }
    });
}