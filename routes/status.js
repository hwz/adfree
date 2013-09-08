
/*
 * GET website status.
 */

exports.website = function(req, res){
  res.render('website', { title: 'Website Status' });
};

exports.task = function(req, res){
  res.render('task', { title: 'Task Details' });
};