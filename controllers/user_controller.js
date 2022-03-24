const User = require('../models/user');
const fs =require('fs');
const path = require('path');


module.exports.profile = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        return res.render('user_profile', {
            title: 'user profile',
            profile_user: user
        });

    });
    
    
}

module.exports.update = async function(req, res) {
    

    if(req.user.id == req.params.id) {
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err) {
                    console.log('******Multer error: ', err)
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file) {
                 //deleting profile pic if already available before updating
                    if(user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();
                return res.redirect('back');
                //console.log(req.file);
            });

        } catch(err) {
        req.flash('error', 'Unauthorized');
        return res.redirect('back');

        }
        
    } else {
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorised');
    }
}
//rendering signup page

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: " codial || signUp"
    })
}

//rendering signin page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "codial || signIn"
    })
}

//get the signup data
module.exports.create = function(req, res){
   
   if (req.body.password != req.body.confirm_password){
    return res.redirect('back');
}

User.findOne({email: req.body.email}, function(err, user){
    if(err){console.log('eror in finding user in signing up'); return}

    if(!user){
        User.create(req.body, function(err, user){
            if(err){console.log('eror in creating user while signing up'); return}

            return res.redirect('/users/sign-in');

        })
    } else {
    return res.redirect('back');

    }
});

}

////get the signin data
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

//sigining out session
module.exports.removeSession = function(req, res){
    req.logout();
    req.flash('success', 'You have Logged out');

    return res.redirect('/')

}