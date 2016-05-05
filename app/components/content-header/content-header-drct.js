(function() {
  function contentHeaderDrct($state) {
    return {
      restrict: 'E',
      templateUrl: 'components/content-header/content-header.html',
      scope: {},
      link: function(scope) {
        scope.state = $state;
      }
    };
  }

  angular.module('weatherApp').directive('contentHeader', contentHeaderDrct);
}());
