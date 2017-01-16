(function () {
  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOff', ShoppingListCheckOffService);


  //Controller For Buy List
  ToBuyController.$inject = ["ShoppingListCheckOff"];
  function ToBuyController(ShoppingListCheckOff) {
    var buy = this;

    buy.items = ShoppingListCheckOff.getItemsToBuy();

    buy.BuyAction = function(item, index){
      ShoppingListCheckOff.Buy(item, index);
    };

  }

  //Controller For Bought List
  AlreadyBoughtController.$inject = ["ShoppingListCheckOff"];
  function AlreadyBoughtController(ShoppingListCheckOff) {
    var bought = this;
    bought.items = ShoppingListCheckOff.getItemsBought();
  }

  // Here comes the Service Definition.
  function ShoppingListCheckOffService(){
      var service = this;

      var listToBuy = [
                        {name:"Apples", quantity: 7},
                        {name:"Mango", quantity:5},
                        {name:"Oatmeal", quantity:4},
                        {name:"Energy Drinks", quantity:3},
                        {name:"Cookies", quantity:10}
                      ];

      var listBought = [];

      service.getItemsToBuy = function(){
        return listToBuy;
      };

      service.getItemsBought = function(){
        return listBought;
      };

      service.Buy = function(item,index){
        listBought.push(item);
        listToBuy.splice(index,1);
      };

  }



})();
