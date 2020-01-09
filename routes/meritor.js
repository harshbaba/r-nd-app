var express = require('express');
var router = express.Router();

router.get('/meritor/checklist', function(req, res, next) {
	res.render('../views/modules/meritor/check-list', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Check List',
	  },
	  cssList : [
		  'modules/meritor/check-list/check-list'		  
	  ],
	  jsList : [
		  '/js/modules/meritor/check-list/check-list-data.js',
		  '/js/modules/meritor/check-list/check-list-helper.js',
		  '/js/modules/meritor/check-list/check-list.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/meritor/notifications-settings', function(req, res, next) {
	res.render('../views/modules/meritor/notifications-settings', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Notification Settings',
	  },
	  cssList : [
		  'modules/meritor/notifications-settings/notifications-settings'		  
	  ],
	  jsList : [
		  '/js/modules/meritor/notifications-settings/notifications-settings.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/data-table', function(req, res, next) {
	res.render('../views/modules/data-table/data-table', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Data Table',
	  },
	  cssList : [
		  'modules/data-table/data-table'		  
	  ],
	  jsList : [
		  '/js/modules/data-table/data-table-data.js',
		  '/js/modules/data-table/data-table-helper.js',
		  '/js/modules/data-table/data-table.js',
		  '/js/modules/data-table/mypage.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/meritor/my-invoice', function(req, res, next) {
	res.render('../views/modules/meritor/my-invoice', {
	  title: 'R&D App',
	  headerData : {
		  title: 'My Invoices',
	  },
	  cssList : [
		  'modules/data-table/data-table',
			'modules/meritor/my-invoice/my-invoice',
			'theme/datepicker'			  
	  ],
	  jsList : [
		  '/js/modules/data-table/data-table-helper.js',
		  '/js/modules/data-table/data-table.js',
			'/js/modules/meritor/my-invoice/my-invoice-data.js',
			'/js/theme/datepicker.js',
			'/js/theme/i18n/datepicker.en.js',
		  '/js/modules/meritor/my-invoice/my-invoice.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/meritor/plp-view', function(req, res, next) {
	res.render('../views/modules/meritor/plp-view', {
	  title: 'R&D App',
	  headerData : {
		  title: 'PLP View',
	  },
	  cssList : [
		  'modules/data-table/data-table',
			'modules/meritor/plp-view/plp-view',
			'theme/datepicker'			  
	  ],
	  jsList : [
		  '/js/modules/data-table/data-table-helper.js',
		  '/js/modules/data-table/data-table.js',
			'/js/modules/meritor/plp-view/plp-view-data.js',
			// '/js/theme/datepicker.js',
			// '/js/theme/i18n/datepicker.en.js',
		  '/js/modules/meritor/plp-view/plp-view.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});


router.get('/meritor/return', function(req, res, next) {
	res.render('../views/modules/meritor/return', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Return',
	  },
	  cssList : [
			'modules/data-table/data-table',
			'modules/meritor/return/return',
			'theme/datepicker'				  
	  ],
	  jsList : [
		'/js/modules/data-table/data-table-helper.js',
		'/js/modules/data-table/data-table.js',
		'/js/modules/meritor/return/my-return-data.js',
		'/js/theme/datepicker.js',
		'/js/theme/i18n/datepicker.en.js',
		'/js/modules/meritor/return/return.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/meritor/return-history', function(req, res, next) {
	res.render('../views/modules/meritor/return-history', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Return History',
	  },
	  cssList : [
			'modules/data-table/data-table',
			'modules/meritor/return/return-history',
			'theme/datepicker'				  
	  ],
	  jsList : [
		'/js/modules/data-table/data-table-helper.js',
		'/js/modules/data-table/data-table.js',
		'/js/modules/meritor/return/return-history-data.js',
		'/js/theme/datepicker.js',
		'/js/theme/i18n/datepicker.en.js',
		'/js/modules/meritor/return/return-history.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/meritor/open-orders', function(req, res, next) {
	res.render('../views/modules/meritor/open-orders', {
	  title: 'R&D App',
	  headerData : {
			title: 'Open Orders',
			pageClass: 'meritor-page'
	  },
	  cssList : [
			'modules/data-table/data-table',
			'modules/meritor/open-orders/open-order',
			'theme/datepicker'				  
	  ],
	  jsList : [
		'/js/modules/data-table/data-table-helper.js',
		'/js/modules/data-table/data-table.js',
		'/js/modules/meritor/open-orders/open-orders-header-config.js',
		'/js/modules/meritor/open-orders/open-orders-data.js',
		'/js/theme/datepicker.js',
		'/js/theme/i18n/datepicker.en.js',
		'/js/modules/meritor/open-orders/open-orders.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/meritor/open-order-details', function(req, res, next) {
	res.render('../views/modules/meritor/open-order-details', {
	  title: 'R&D App',
	  headerData : {
			title: 'Open Order Details',
			pageClass: 'meritor-page'
	  },
	  cssList : [
			'modules/data-table/data-table',
			'modules/meritor/open-order-details/open-order-details',
			'theme/datepicker'				  
	  ],
	  jsList : [
		'/js/modules/data-table/data-table-helper.js',
		'/js/modules/data-table/data-table.js',
		'/js/modules/meritor/open-order-details/open-order-details-header-config.js',
		'/js/modules/meritor/open-order-details/open-order-details-data.js',
		'/js/theme/datepicker.js',
		'/js/theme/i18n/datepicker.en.js',
		'/js/modules/meritor/open-order-details/open-order-details.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/meritor/order-details', function(req, res, next) {
	res.render('../views/modules/meritor/order-details', {
	  title: 'R&D App',
	  headerData : {
			title: 'Order Details',
			pageClass: 'meritor-page'
	  },
	  cssList : [
			'modules/data-table/data-table',
			'modules/meritor/order-details/order-details',
			'theme/datepicker'				  
	  ],
	  jsList : [
		'/js/modules/data-table/data-table-helper.js',
		'/js/modules/data-table/data-table.js',
		'/js/modules/meritor/order-details/order-details-header-config.js',
		'/js/modules/meritor/order-details/order-details-data.js',
		'/js/theme/datepicker.js',
		'/js/theme/i18n/datepicker.en.js',
		'/js/modules/meritor/order-details/order-details.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/meritor/orders-history', function(req, res, next) {
	res.render('../views/modules/meritor/orders-history', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Orders History',
	  },
	  cssList : [
			'modules/data-table/data-table',
			'modules/meritor/orders-history/orders-history',
			'theme/datepicker'				  
	  ],
	  jsList : [
		'/js/modules/data-table/data-table-helper.js',
		'/js/modules/data-table/data-table.js',
		'/js/modules/meritor/orders-history/orders-history-header-config.js',
		'/js/modules/meritor/orders-history/orders-history-data.js',
		'/js/theme/datepicker.js',
		'/js/theme/i18n/datepicker.en.js',
		'/js/modules/meritor/orders-history/orders-history.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/meritor/order-notifications', function(req, res, next) {
	res.render('../views/modules/meritor/order-notifications', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Order Notifications',
	  },
	  cssList : [
			'modules/data-table/data-table',
			'modules/meritor/order-notifications/order-notifications',
			'theme/datepicker'				  
	  ],
	  jsList : [
		'/js/modules/data-table/data-table-helper.js',
		'/js/modules/data-table/data-table.js',
		'/js/modules/meritor/order-notifications/order-notifications-header-config.js',
		'/js/modules/meritor/order-notifications/order-notifications-data.js',
		'/js/theme/datepicker.js',
		'/js/theme/i18n/datepicker.en.js',
		'/js/modules/meritor/order-notifications/order-notifications.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});



router.get('/meritor/box', function(req, res, next) {
	res.render('../views/modules/meritor/box', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Box',
	  },
	  cssList : [
		'modules/meritor/box/box'			  
	  ],
	  jsList : [
		'/js/modules/meritor/box/box.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/meritor/box2', function(req, res, next) {
	res.render('../views/modules/meritor/box2', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Box2',
	  },
	  cssList : [
		'modules/meritor/box/box2'			  
	  ],
	  jsList : [
		//'/js/modules/meritor/box/box2.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/meritor/product-details', function(req, res, next) {
	res.render('../views/modules/meritor/product-details', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Product Details',
	  },
	  cssList : [
		'modules/meritor/product/product-details'			  
	  ],
	  jsList : [
		//'/js/modules/meritor/box/box2.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/form-changes', function(req, res, next) {
	res.render('../views/modules/form-changes/form-changes', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Form Changes',
	  },
	  cssList : [
		  'modules/form-changes/form-changes'		  
	  ],
	  jsList : [
		  //'/js/modules/form-changes/form-changes-data.js',
		  //'/js/modules/form-changes/form-changes-helper.js',
		  '/js/modules/form-changes/form-changes.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

router.get('/meritor/contact-customer-service', function(req, res, next) {
	res.render('../views/modules/meritor/contact-customer-service', {
	  title: 'R&D App',
	  headerData : {
		  title: 'Contact Customer Service',
	  },
	  cssList : [
		'modules/meritor/customer-service/customer-service'			  
	  ],
	  jsList : [
		'/js/modules/meritor/customer-service/customer-service.js'
	  ],
	  layout:'../views/themes/r_nd_d_app.html'
  });
});

module.exports = router;