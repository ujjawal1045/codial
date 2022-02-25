const User = require('../models/user');


module.exports.profile = function(req, res) {
    // res.end('<h1> user profile</h1>');
    return res.render('user_profile', {
        title: 'user profile'
    })
}
//rendering signup page

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: " codial || signUp"
    })
}

//rendering signin page
module.exports.signIn = function(req, res){
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
    //todo
}