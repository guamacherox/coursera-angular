(function(){
	'use strict';
	angular.module('MenuApp')
	.controller('CategoriesController', CategoriesController);

	CategoriesController.$inject=['listCategories'];
	function CategoriesController(listCategories){
		var mainListCategories=this;
		mainListCategories.listCategories=listCategories;
		

	}
})();