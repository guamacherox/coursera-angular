(function () {
  'use strict';

  angular.module('LunchCheck', [])

  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope){
    $scope.inputString = "";
    $scope.lunchList = [];
    $scope.message = "";
    $scope.class = "";

    $scope.textInputIsOk = function(){
      if($scope.class === "message-ok")
      {
        return true;
      }
      else
        return false;
    };

    $scope.textInputHasError = function(){
      if ($scope.class === "message-error") {
        return true;
      }
      return false;
    };

    $scope.spaceElementExclude = function(mealList){
      var cleanList = [];

      for(var i = 0; i < mealList.length; i++){
        mealList[i] = mealList[i].trim();
        if(mealList[i] !== "")
          cleanList.push(mealList[i]);
      }

      return cleanList;
    };

    $scope.listVerifier = function(mealList){

      if(mealList !== null && mealList != ""){
        var l = mealList.length;
        $scope.class = "message-ok";

        // This method cleans excludes space only elements from the meal list
        mealList = $scope.spaceElementExclude(mealList);

        if(l <= 3){
          $scope.message = "Enjoy!";
        }
        else{
          $scope.message = "Too much!";
        }
      }
      else{
        $scope.class = "message-error";
        $scope.message = "Please enter data first";
      }
    };

    $scope.splitter = function(){
      $scope.lunchList = $scope.inputString.split(",");
      $scope.listVerifier($scope.lunchList);
    };

  }

})();
