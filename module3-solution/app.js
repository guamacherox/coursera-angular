(function(){

	'use strict';

	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	.directive('foundItems',FoundItems)
	.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com");

  //Directive
  function FoundItems(){
		var ddo={
			templateUrl:'loader/itemsloaderindicator.html',
			scope:{
				found:'<',
				message:'=',
				onRemove:'&'
			},
	    	controller: NarrowItDownController,
    		controllerAs: 'ctrl',
    		bindToController: true
 	 	};

  	return ddo;
	}

	MenuSearchService.$inject=['$http','ApiBasePath'];
	function MenuSearchService($http, ApiBasePath){
		var service= this;

		service.getMatchedMenuItems= function(toSearch){

			return $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			})

			.then(function (response){

				var foundItems=[];
				var data = response.data;
				var search = toSearch.toLowerCase();

				for(var i=0; i < data.menu_items.length; i++){

					var dataSearch = data.menu_items[i].description.toLowerCase();
					if(toSearch !== undefined && dataSearch.indexOf(search) >= 0){
						foundItems.push(data.menu_items[i]);
					}
				}
				return {foundItems:foundItems};
			})

			.catch(function (error){
				console.log(error);
			});
		};
	}


	NarrowItDownController.$inject=['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var ctrl = this;

		ctrl.NarrowIt= function(){
			ctrl.found = [];
			if (ctrl.toSearch === undefined || ctrl.toSearch === ""){
				ctrl.message=true;
			}
      else{
				ctrl.message=false;
				MenuSearchService.getMatchedMenuItems(ctrl.toSearch)

				.then( function(result){
					ctrl.found = result.foundItems;
					ctrl.message = ctrl.isEmpty(ctrl.found);
				});
			}
		};

		ctrl.removeItem= function(index){
				ctrl.found.splice(index,1);
				ctrl.message= ctrl.isEmpty(ctrl.found);
		};

		ctrl.isEmpty = function (list){
			if (list===undefined || list.length<1){
        //Nothing has been found message
				return true;
			}else{
        //Something has been found, message set to false.
				return false;
			}
		};
	}

})();
