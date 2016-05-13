(function() {
  function lhpTabDrct() {
    return {
      restrict: 'E',
      templateUrl: 'components/lhp/lhp-tab.html',
      controller: 'lhpTabCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      scope: {
        title: '<'
      }
    };
  }

  angular.module('weatherApp').directive('lhpTab', lhpTabDrct);
}());
