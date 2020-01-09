var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  	res.render('../views/modules/home/home', {
		title: 'R&D App',
		headerData : {
			title: 'Home',
		},
		cssList : [
			'modules/home/home'
		],
		jsList : [
			'/js/modules/home/home.js'
		],
		layout:'../views/themes/r_nd_d_app.html'
	});
});

router.get('/projects', function(req, res, next) {
  	res.render('../views/modules/projects/projects', {
		title: 'R&D App',
		headerData : {
			title: 'Projects',
		},
		cssList : [
			'modules/projects/projects'
		],
		jsList : [
			'/js/modules/projects/projects.js'
		],
		layout:'../views/themes/r_nd_d_app.html'
	});
});

router.get('/aboutus', function(req, res, next) {
  	res.render('../views/modules/aboutus/aboutus', {
		title: 'R&D App',
		headerData : {
			title: 'aboutus',
		},
		cssList : [
			'modules/aboutus/aboutus'
		],
		jsList : [
			'/js/modules/aboutus/aboutus.js'
		],
		layout:'../views/themes/r_nd_d_app.html'
	});
});

router.get('/products', function(req, res, next) {
	res.render('../views/modules/products/products', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Products',
	  },
	  cssList : [
		  'modules/products/products'
	  ],
	  jsList : [
		  '/js/modules/products/products-data.js',
		  '/js/modules/products/products-helper.js',
		  '/js/modules/products/products.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/isearch', function(req, res, next) {
	res.render('../views/modules/internal-search/internal-search', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Internal Search',
	  },
	  cssList : [
		  //'modules/internal-search/internal-search'		  
	  ],
	  jsList : [
		  '/js/modules/internal-search/internal-search-data.js',
		  '/js/modules/internal-search/internal-search-helper.js',
		  '/js/modules/internal-search/internal-search.js'
	  ],
	  layout:'../views/themes/internal-search.html'
  });
});

router.get('/magnifier-glass', function(req, res, next) {
	res.render('../views/modules/magnifier-glass/magnifier-glass', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Magnifier Glass',
	  },
	  cssList : [
		  'modules/magnifier-glass/magnifier-glass'		  
	  ],
	  jsList : [
		  '/js/modules/magnifier-glass/lightzoom.js',
		  //'/js/modules/magnifier-glass/magnifier-glass-data.js',
		  //'/js/modules/magnifier-glass/magnifier-glass-helper.js',
		  '/js/modules/magnifier-glass/magnifier-glass.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/magnifier-glass2', function(req, res, next) {
	res.render('../views/modules/magnifier-glass2/magnifier-glass', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Magnifier Glass2',
	  },
	  cssList : [
		  'modules/magnifier-glass2/magnifier-glass'		  
	  ],
	  jsList : [
		  '/js/modules/magnifier-glass/lightzoom.js',
		  //'/js/modules/magnifier-glass/magnifier-glass-data.js',
		  //'/js/modules/magnifier-glass/magnifier-glass-helper.js',
		  '/js/modules/magnifier-glass2/magnifier-glass.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/my-videos', function(req, res, next) {
	res.render('../views/modules/my-videos/my-videos', {
	  title: 'R&D App',
	  headerData : {
		  title: 'My Videos',
	  },
	  cssList : [
		  'modules/my-videos/my-videos'
	  ],
	  jsList : [
		  '/js/modules/my-videos/my-videos.js',
		  '/js/modules/my-videos/video-plugin.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/my-site', function(req, res, next) {
	res.render('../views/modules/my-site/my-site', {
	  title: 'R&D App',
	  headerData : {
		  title: 'My site',
	  },
	  cssList : [
		  'modules/my-site/my-site'
	  ],
	  jsList : [
		  '/js/modules/my-site/my-site.js',
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});


module.exports = router;
