var express = require('express');
var router = express.Router();

router.get('/posts', function(req, res, next) {
	res.render('../views/modules/erail/posts/posts', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Erail Posts',
	  },
	  cssList : [
        'modules/data-table/data-table',
        'modules/erail/posts/posts',
        'theme/datepicker'			  
	  ],
	  jsList : [
          '/js/modules/erail/posts/posts-header-config.js',
          '/js/modules/erail/posts/posts-data.js',
          '/js/theme/datepicker.js',
		  '/js/theme/i18n/datepicker.en.js',
          '/js/modules/data-table/data-table-helper.js',
		  '/js/modules/data-table/data-table.js',
		  '/js/modules/erail/posts/posts-helper.js',
		  '/js/modules/erail/posts/posts.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

module.exports = router;