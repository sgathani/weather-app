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

    svc.getBreadCrumbs = function() {
      var currentState = $state.$current;
      return svc.generateBreadCrumbsHelper(currentState, []);
    };

    svc.generateBreadCrumbsHelper = function(currentState, routeList) {
      routeList.unshift({
        title: currentState.route.name,
        stateName: currentState.route.state || currentState.self.name
      });

      if (angular.isDefined(currentState.parent) && angular.isDefined(currentState.parent.route)) {
        svc.generateBreadCrumbsHelper(currentState.parent, routeList);
      }

      return routeList;
    };

    return svc;
  }

  angular.module('weatherApp').factory('breadcrumbGenerator', breadcrumbGenerator);
}());
