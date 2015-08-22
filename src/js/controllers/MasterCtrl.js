/**
 * Master Controller
 */

angular.module('next')
    .controller('mainctrl', ['$scope', MasterCtrl])
    .config(function($mdIconProvider) {
  $mdIconProvider
    .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24);
});
//to do correcly master controller for slider menu

function MasterCtrl($scope) {
	 $scope.visible = true;

  $scope.toggleSidebar = function() {
    $scope.visible = !$scope.visible;
  };
}