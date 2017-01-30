(function(){
	'use strict';

	angular.module('data')
	.service('MenuDataService', MenuDataService)
	.constant('ApiBase','https://davids-restaurant.herokuapp.com');

	MenuDataService.$inject =['$http','ApiBase'];
	function MenuDataService($http, ApiBase){

		var service = this;

		service.getAllCategories = function(){

			return $http({
				method:"GET",
				url: (ApiBase + "/categories.json")
			})
			.then(function(response){
				return response.data;
			})
			.catch(function(error){
				return error;
			});
		};

		service.getItemsForCategory = function(categoryShortName){

			return $http({
				method:"GET",
				url: (ApiBase + "/menu_items.json"),
				params:{
					category:categoryShortName
				}
			})
			.then(function(response){
					return response.data;
				})

			.catch(function(error){
					return error;
			});
		};
	}
})();
