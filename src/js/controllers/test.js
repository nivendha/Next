angular.module('next')
.controller('mainctrl', function($scope) {
  var imagePath = 'img/list/60.jpeg';

  $scope.todos = [];
  for (var i = 0; i < 15; i++) {
    $scope.todos.push({
      face: imagePath,
      what: "Brunch this weekend?",
      who: "Min Li Chan",
      notes: "I'll be in your neighborhood doing errands."
    });
  }
})
.controller('AppCtrl', function($scope) {
  $scope.title1 = 'Button';
  $scope.title4 = 'Warn';
  $scope.isDisabled = true;
  $scope.googleUrl = 'http://google.com';
}).controller('BasicDemoCtrl', DemoCtrl);


function DemoCtrl($mdDialog) {
  var vm = this;
  vm.notificationsEnabled = true;
  vm.toggleNotifications = function() {
    vm.notificationsEnabled = !vm.notificationsEnabled;
  };
  vm.redial = function(e) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Modat title')
        .content('this is the main content area for populating the data :)')
        .ok('That went well')
    );
  };
}
