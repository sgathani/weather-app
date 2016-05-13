(function() {
  function appContainerDrct() {
    return {
      restrict: 'E',
      templateUrl: 'components/app-container/app-container.html',
      scope: {}
    };
  }

  angular.module('weatherApp').directive('appContainer', appContainerDrct);
}());
