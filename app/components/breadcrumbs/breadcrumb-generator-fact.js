(function() {
  /**
   * @ngdoc service
   * @module weatherApp
   * @name
   *
   * @description
   * This factory is responsible for
   */
  function breadcrumbGenerator($state) {
    var svc = {};

    svc.getBreadcrumbs = function() {
      var currentState = $state.$current;
      return svc._generateBreadcrumbs(currentState, []);
    };

    svc._generateBreadcrumbs = function(currentState, routeList) {
      routeList.unshift({
        title: currentState.route.name,
        stateName: currentState.route.state || currentState.self.name
      });

      if (angular.isDefined(currentState.parent) && angular.isDefined(currentState.parent.route)) {
        svc._generateBreadcrumbs(currentState.parent, routeList);
      }

      return routeList;
    };

    return svc;
  }

  angular.module('weatherApp').factory('breadcrumbGenerator', breadcrumbGenerator);
}());
