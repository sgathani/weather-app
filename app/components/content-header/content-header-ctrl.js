(function() {
  function contentHeaderCtrl($state) {
    var ctrl = this;
    ctrl.state = $state;

    ctrl.toggleLhp = function() {
      ctrl.hideLhp = !ctrl.hideLhp;
    };
  }

  angular.module('weatherApp').controller('contentHeaderCtrl', contentHeaderCtrl);
}());
