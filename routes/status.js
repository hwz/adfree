
/*
 * GET website status.
 */

exports.website = function(req, res){
  res.render('website', { title: 'Website Status' });
};