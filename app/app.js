angular.module('weatherApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/home");
      $stateProvider
        .state('base', {
          abstract: true,
          templateUrl: 'components/app-container/app-container.html',
          route: {
            name: 'Adobe Marketing Cloud',
            state: 'base.home'
          }
        })
        .state('base.home', {
          url: '/home',
          templateUrl: 'components/home/home.html',
          route: {
            name: 'Home',
          }
        })
        .state('base.weather', {
          url: '/weather',
          templateUrl: 'components/weather/weather.html',
          controller: 'weatherDataCtrl',
          route: {
            name: 'Weather',
          }
        });
    }]);
