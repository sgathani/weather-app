(function() {
  function breadcrumbsDrct() {
    return {
      restrict: 'E',
      templateUrl: 'components/breadcrumbs/breadcrumbs.html',
      controller: 'breadcrumbsCtrl',
      scope: {},
    };
  }

  angular.module('weatherApp').directive('breadcrumbs', breadcrumbsDrct);
}());
