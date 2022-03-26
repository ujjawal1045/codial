const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res) {


    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });


    return res.json(200, {
        message: "list of posts",
        posts: posts
    })
}


module.exports.destroy = async function(req, res) {

    try {
        let post = await Post.findById(req.params.id); 
        //.id means converting the object id to string otherwise ._id will use for number

    //if(post.user == req.user.id) {
        post.remove();
        //req.flash('error', 'Post deleted');

       await Comment.deleteMany({post: req.params.id});

    //    if(req.xhr) {
    //        return res.status(200).json({
    //            data: {
    //                post_id: req.params.id
    //            },
    //            message: "post deleted"
    //        });
    //    }
       return res.json(200, {
           message: "post and associated comment deleted successfully!"
       });


    // } else {
    //     return res.redirect('back');
    // }

    }catch(err) {
        // console.log('Error', err);
        console.log('***', err);
        return res.json(500, {
            message:" internal server error "
        });
    }
    
}