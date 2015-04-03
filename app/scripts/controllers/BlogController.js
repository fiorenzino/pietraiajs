'use strict';

function BlogController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location) {
  angular.extend(this, new BaseController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $location, this));

  $scope.listPage = 'app.blog';
  $scope.newPage = 'app.blog_new';
  $scope.entityType = 'news';
  $scope.sortingArray = {data: 'desc'};

  $scope.getBaseSearch = function (search, reqParams) {
    if (search && search.obj && search.obj.oggetto) {
      console.log('oggetto: ' + search.obj.oggetto);
      reqParams['obj.oggetto'] = search.obj.oggetto;
    }
    reqParams['obj.tipo'] = 10;
  }

  // inizializzazione a default dei valori di sectionXXX
  $scope.sectionTitle = 'Pietraia Live';
  $scope.sectionSubtitle = 'Il Blog della Pietraia dei Poeti.';
  $scope.sectionPath = ['blog'];

  // anche dopo $scope.init() il valore di $scope.element non e' immediatamente disponibile. Si tratta di un promise non ancora risolto.
  // anche ng-init='function()...' viene invocata prima di quel momento e assegna i valori definitivi a $scope.sectionXXX prima del tempo.
  // ...e quindi...
  // funzione di callback. altre idee?
  $scope.getSuccess = function () {
    $scope.sectionTitle = $scope.element.oggetto;
    $scope.sectionSubtitle = $filter('date')($scope.element.data*1000, 'dd/MM/yyyy');
    $scope.sectionPath = ['blog', $scope.element.id];
  };

  $scope.getFailure = function () {
    $scope.sectionTitle = 'Errori nel caricamento dei dati';
    $scope.sectionSubtitle = $filter('date')(new Date(), 'dd/MM/yyyy');
    $scope.sectionPath = ['blog'];
  };

};

angular.module('pietraiajsApp')

  .controller('BlogController', ['$scope', '$stateParams', '$state', 'RsResource', 'popupService', 'NgTableParams', '$filter', '$location',
    function ($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location) {
      angular.extend(this, new BlogController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location));
      $scope.init();
    }])

  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider

      .state('app.blog', {
        url: '/blog',
        views: {
          'content@': {
            controller: 'BlogController',
            templateUrl: 'views/blog/list.html'
          }
        }
      })

      .state('app.blog_view', {
        url: '/blog/:id',
        views: {
          'content@': {
            controller: 'BlogController',
            templateUrl: 'views/blog/view.html'
          }
        }
      })
  }])

;
