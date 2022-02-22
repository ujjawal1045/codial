module.exports.tester = function(req, res) {
     // res.end('<h1> testing profile</h1>');
     return res.render('test', {
          title: "test front"
     });

}