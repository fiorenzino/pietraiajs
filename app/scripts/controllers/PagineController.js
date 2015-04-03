'use strict';

angular.module('pietraiajsApp')

  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('app.pagine', {
        url: 'pagine',
        views: {
          'content@': {
            templateUrl: 'views/pagine/list.html',
            controller: 'PagineController'
          }
        }
      })

      .state('app.pagine_view', {
        url: 'pagine/:id',
        views: {
          'content@': {
            templateUrl: 'views/pagine/view.html',
            controller: 'PagineController'
          }
        }
      })
  }])

  .state('app.libero', {
    url: ':id',
    views: {
      'content@': {
        templateUrl: function ($stateParams) {
          return 'views/libero/' + $stateParams.id + '.html';
        }
      }
    }
  })


  .controller('PagineController', ['$scope', '$stateParams', '$state', 'RsResource', 'popupService', 'NgTableParams', '$filter',
    function ($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter) {


      $scope.host = 'localhost:8080';
      $scope.listPage = 'app.pagine';
      $scope.newPage = 'app.pagine_new';
      $scope.entityType = 'pagine';
      $scope.sortingArray = {id: 'desc'};

      angular.extend(this, new BaseController($scope, $stateParams, $state, RsResource, popupService, NgTableParams));


      $scope.getBaseSearch = function (search, reqParams) {

      }

      $scope.init = function () {

      }
    }]);
