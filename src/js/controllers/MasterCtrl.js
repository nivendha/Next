/**
 * Master Controller
 */

angular.module('next')
    .controller('mainctrl', ['$scope', MasterCtrl]);

function MasterCtrl($scope) {
	 $scope.visible = true;

  $scope.toggleSidebar = function() {
    $scope.visible = !$scope.visible;
  };
}