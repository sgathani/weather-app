(function() {
  function breadcrumbsCtrl($scope, $rootScope, breadcrumbGenerator) {
    var ctrl = this;

    ctrl._populateBreadcrumbs = function() {
      $scope.breadcrumbs = breadcrumbGenerator.getBreadCrumbs();
    };
    ctrl._populateBreadcrumbs();

    $rootScope.$on('$stateChangeSuccess', function() {
      ctrl._populateBreadcrumbs();
    });
  }

  angular.module('weatherApp').controller('breadcrumbsCtrl', breadcrumbsCtrl);
}());
