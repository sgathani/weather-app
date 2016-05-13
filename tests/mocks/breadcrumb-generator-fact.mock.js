(function() {
  function breadcrumbGenerator() {
    var svc = {};

    svc.getBreadcrumbs = function() {
      return [];
    };

    return svc;
  }

  angular.module('weatherApp.mocks.breadcrumbGenerator', []).factory('breadcrumbGenerator', breadcrumbGenerator);
}());
