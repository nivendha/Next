/**
 * Widget Body Directive
 */

angular
    .module('next')
    .directive('nxContextClick', nxContextClick);

function nxContextClick() {
    var directive = {
        scope: {
            width: '@?',
            button:'@?',
            classes: '@?'
        },
        transclude: true,
        templateUrl: 'templates/table-context-click.html',
        restrict: 'E'
    };
    return directive;
};