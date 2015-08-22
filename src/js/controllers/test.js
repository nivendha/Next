angular.module('next')
.controller('tableTest', tableTest);

// testing callback for custom context menu in splash table (nx-Context-Click) only in Desktop
//mobile device to do Andular cordova to get native menu in android and ios
function tableTest($mdDialog,$scope) {
  var vm = $scope;
  $scope.items=[];
  $scope.items.push({
      cont: "modal window",
      desc: "how is this weekend?",
      icon:"done",
      click:function(data){
        //alert(data);
        $mdDialog.show(
          $mdDialog.alert()
        .title('hi '+data)
        .content('this is the data poping on context callback of click :)')
        .ok('That went well')
         );
      }
    });
   $scope.items.push({
      cont: "imagePath 2",
      desc: "how is this weekend?",
      icon:"grade"
    });
    $scope.items.push({
      cont: "imagePath 3",
      desc: "how is this weekend?",
      icon:"thumb_up"
    });
  vm.notificationsEnabled = true;
  vm.toggleNotifications = function() {
    vm.notificationsEnabled = !vm.notificationsEnabled;
  };

}
