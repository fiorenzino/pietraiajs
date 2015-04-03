'use strict';

angular.module('pietraiajsApp')

  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('app.news', {
        url: 'news',
        views: {
          'content@': {
            templateUrl: 'views/news/list.html',
            controller: 'NewsController'
          }
        },
        onEnter: function ($stateParams) {

        }

      })

      .state('app.news_view', {
        url: 'news/:id',
        views: {
          'content@': {
            templateUrl: 'views/news/view.html',
            controller: 'NewsController'
          }
        }
      })
  }])


  .
  controller('NewsController', ['$scope', '$stateParams', '$state', 'RsResource', 'popupService', 'NgTableParams', '$filter', '$location',
    function ($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location) {


      $scope.host = 'localhost:8080';
      $scope.listPage = 'app.news';
      $scope.newPage = 'app.news_new';
      $scope.entityType = 'news';
      $scope.sortingArray = {data: 'desc'};

      angular.extend(this, new BaseController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $location));


      $scope.getBaseSearch = function (search, reqParams) {
        if (search && search.obj && search.obj.oggetto) {
          console.log('oggetto: ' + search.obj.oggetto);
          reqParams['obj.oggetto'] = search.obj.oggetto;
        }
        reqParams['obj.tipo'] = 6;
      }

      $scope.init = function () {

      }
    }]);
