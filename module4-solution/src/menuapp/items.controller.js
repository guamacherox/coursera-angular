(function(){
	'use strict';
	angular.module('MenuApp')
	.controller('ItemsController',ItemsController);

	ItemsController.$inject=['listItems'];
	function ItemsController(listItems){

		var mainListItems=this;
		mainListItems.listItems=listItems;

	}
})();
