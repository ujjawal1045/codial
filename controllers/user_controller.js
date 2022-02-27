const User = require('../models/user');


module.exports.profile = function(req, res) {
    // res.end('<h1> user profile</h1>');
    
    if(req.cookies.user_id) {
        User.findById(req.cookies.user_id, function(err,user){
            if(user) {
                return res.render('user_profile', {
                    title: 'user profile',
                    user:user
                })
            }
            return res.redirect('/users/sign-in');

        });
    

    } else {
        return res.redirect('/users/sign-in');
    }
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
    //finding user present or not
    User.findOne({email:req.body.email}, function(err, user){
        if(err){console.log('error in finding the user in signing In'); return}

        //if user found handle it
        if(user) {

            //handle if password mismatch
            if(user.password != req.body.password){
             //    console.log('invalid password');
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        } else {
            //if user not found handle it
            return res.redirect('back');

        }

    });
    
    

    

    


}