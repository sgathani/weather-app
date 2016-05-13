(function() {
  function breadcrumbsDrct() {
    return {
      restrict: 'E',
      templateUrl: 'components/breadcrumbs/breadcrumbs.html',
      controller: 'breadcrumbsCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      scope: {},
    };
  }

  angular.module('weatherApp').directive('breadcrumbs', breadcrumbsDrct);
}());
