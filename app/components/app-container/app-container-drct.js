(function() {
  function appContainerDrct() {
    return {
      restrict: 'E',
      templateUrl: 'components/app-container/app-container.html',
    };
  }

  angular.module('weatherApp').directive('appContainer', appContainerDrct);
}());
