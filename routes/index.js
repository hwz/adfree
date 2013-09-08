
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.compare = function(req, res){
  res.render('compare', { title: 'Express' });
};