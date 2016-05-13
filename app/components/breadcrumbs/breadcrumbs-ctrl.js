(function() {
  function breadcrumbsCtrl($rootScope, breadcrumbGenerator) {
    var ctrl = this;

    ctrl._populateBreadcrumbs = function() {
      ctrl.breadcrumbs = breadcrumbGenerator.getBreadcrumbs();
    };
    ctrl._populateBreadcrumbs();

    $rootScope.$on('$stateChangeSuccess', function() {
      ctrl._populateBreadcrumbs();
    });
  }

  angular.module('weatherApp').controller('breadcrumbsCtrl', breadcrumbsCtrl);
}());
