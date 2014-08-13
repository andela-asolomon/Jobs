'use strict';

// Configuring the Articles module
angular.module('jobfinders').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Jobs', 'jobfinders', 'dropdown', '/jobfinders(/create)?');
		Menus.addSubMenuItem('topbar', 'jobfinders', 'View Jobs', 'jobfinders');
		Menus.addSubMenuItem('topbar', 'jobfinders', 'Create Jobs', 'jobfinders/create');
	}
]);