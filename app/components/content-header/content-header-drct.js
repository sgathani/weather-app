(function() {
  function contentHeaderDrct($state) {
    return {
      restrict: 'E',
      templateUrl: 'components/content-header/content-header.html',
      scope: {
        hideLhp: '='
      },
      link: function(scope) {
        scope.state = $state;

        scope.toggleLhp = function() {
          scope.hideLhp = !scope.hideLhp;
        };
      }
    };
  }

  angular.module('weatherApp').directive('contentHeader', contentHeaderDrct);
}());
