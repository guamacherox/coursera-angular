(function(){
	'use strict';
	angular.module('MenuApp')
	.config(RoutesConfig);

	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function RoutesConfig($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		// set up states
		$stateProvider

		//home view
		.state('home',{
			url:'/',
			templateUrl:'src/menuapp/templates/home.template.html'
		})

		//categories view
		.state('categories',{
			url:'/categories',
			templateUrl:'src/menuapp/templates/list-categories.template.html',
			controller: 'CategoriesController as mainListCategories',
			resolve:{
				listCategories: ['MenuDataService',function(MenuDataService) {
					return MenuDataService.getAllCategories();
				}]
			}
		})

		//items view
		.state('categories.items',{
			url:'/items/{category}',
			templateUrl:'src/menuapp/templates/list-items.template.html',
			controller:'ItemsController as mainListItems',
			resolve:{
				listItems:['$stateParams','MenuDataService',function($stateParams,MenuDataService){
						return MenuDataService.getItemsForCategory($stateParams.category);
				}]
			}
		});
	}

})();
