'use strict';

// Configuring the Articles module
angular.module('jobfinders').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Jobfinders', 'jobfinders', 'dropdown', '/jobfinders(/create)?');
		Menus.addSubMenuItem('topbar', 'jobfinders', 'List Jobfinders', 'jobfinders');
		Menus.addSubMenuItem('topbar', 'jobfinders', 'New Jobfinder', 'jobfinders/create');
		// Menus.addSubMenuItem('topbar', 'jobfinders', 'Show Jobs', 'jobfinders');
	}
]);