(function() {
  function lhpTabDrct($state) {
    return {
      restrict: 'E',
      templateUrl: 'components/lhp/lhp-tab.html',
      scope: {
        title: '='  //TODO SG One way binding
      },
      link: function(scope) {
        scope.goToRoute = function(routeName) {
          $state.go('base.' + routeName.toLowerCase());
        };
      }
    };
  }

  angular.module('weatherApp').directive('lhpTab', lhpTabDrct);
}());

/**
 * TODO: Remove tooltips on hover
 * One way binding
 * image compression/ sprites
 */
