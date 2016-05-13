(function() {
  function lhpTabCtrl($state, appConstants) {
    var ctrl = this;

    ctrl.goToRoute = function(routeName) {
      $state.go(appConstants.defaultWeatherRoute + '.' + routeName.toLowerCase());
    };
  }

  angular.module('weatherApp').controller('lhpTabCtrl', lhpTabCtrl);
}());
