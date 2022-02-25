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
    //todo later
}

////get the signin data
module.exports.createSession = function(req, res){
    //todo
}