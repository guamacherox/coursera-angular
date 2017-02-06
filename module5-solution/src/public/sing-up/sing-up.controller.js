(function(){
	'use strict';
	angular.module('public')
	.controller('SingInController',SingInController);

	SingInController.$inject = ['MenuService'];
	function SingInController(MenuService){
		var ctrl = this;
		var info = {};

		ctrl.submit=function(){
			info.info = ctrl.info;
			MenuService.setInfo(info);
			ctrl.completed = true;

		};

		ctrl.validateFavorite = function(shortName){

			MenuService.getMenuItem(shortName)
			.then(function(response){
					info.item = response.data;
		    	ctrl.invalidFavorite = false;
    		})
    		.catch(function(error){
      		ctrl.invalidFavorite = true;
    		});



		};

	}
})();
