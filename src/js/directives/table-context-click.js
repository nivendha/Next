/**
 * Widget Body Directive
 */

angular
    .module('next')
    .directive('nxContextClick', nxContextClick);

function nxContextClick($parse) {
    var directive = {
        scope: {
            width: '@?',
            button:'@?',
            classes: '@?'
        },
        controller:function($scope){
        $scope.menuIt=$scope.$parent.items;

       },
        link: function(scope,element,attrs) {
            scope.data='nive';
            scope.element=element;
            scope.attrs=attrs;
             scope.boom=function(e,index){
                var callback=scope.$parent.items[index].click;
                 if('function' == typeof callback){
                callback(scope.data,scope.element,scope.attrs,scope,e);
                }
            }
        },
        transclude: true,
        templateUrl: 'templates/table-context-click.html',
        restrict: 'E'
    };
    return directive;
};