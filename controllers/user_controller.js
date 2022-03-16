const User = require('../models/user');


module.exports.profile = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        return res.render('user_profile', {
            title: 'user profile',
            profile_user: user
        });

    });
    
    
}

module.exports.update = function(req, res) {
    if(req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, {name: req.body.name, email: req.body.email}, function(err, user) {
            return res.redirect('back');
        } );
    } else {
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
    return res.redirect('/');
}

//sigining out session
module.exports.removeSession = function(req, res){
    req.logout();
    return res.redirect('/')

}