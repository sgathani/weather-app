angular.module('weatherApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/home");
      $stateProvider
        .state('default', {
          abstract: true,
          templateUrl: 'components/app-container/app-container.html',
          route: {
            name: 'Adobe Marketing Cloud',
            state: 'default.home'
          }
        })
        .state('default.home', {
          url: '/home',
          templateUrl: 'components/home/home.html',
          route: {
            name: 'Home',
          }
        })
        .state('default.weather', {
          url: '/weather',
          templateUrl: 'components/weather/weather.html',
          controller: 'weatherDataCtrl',
          route: {
            name: 'Weather',
          }
        });
    }]);
