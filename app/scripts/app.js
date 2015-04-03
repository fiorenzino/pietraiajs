'use strict';

/**
 * @ngdoc overview
 * @name pietraiajsApp
 * @description
 * # pietraiajsApp
 *
 * Main module of the application.
 */
angular
  .module('pietraiajsApp', ['ngResource', 'ui.router', 'ngTable', 'ui.bootstrap', 'ngSanitize'])

  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })

  .service('popupService', function ($window) {
    this.showPopup = function (message) {
      return $window.confirm(message);
    }
  })

  .filter('newlines', function () {
    return function (text) {
      if (text)
        return text.replace(/\n/g, '<br/>');
      return '';
    }
  })

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('home', {
        url: '/',
        views: {
          'header': {
            templateUrl: 'templates/header.html'
          },
          'slider': {
            templateUrl: 'templates/slider.html'
          },
          'content': {
            templateUrl: 'views/home.html'
          },
          'footer': {
            templateUrl: 'templates/footer.html'
          }
        }
      })

      .state('app', {
        abstract: true,
        views: {
          'header': {
            templateUrl: 'templates/header.html'
          },
          'slider': {
            template: ''
          },
          'footer': {
            templateUrl: 'templates/footer.html'
          }
        }
      })

  }]);
