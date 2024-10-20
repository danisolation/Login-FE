app.controller("MainController", function ($scope, dataService) {
  $scope.greeting = "Hello, AngularJS!";
  $scope.message = dataService.getMessage();
});
