'use strict';

function NewsController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location) {
  angular.extend(this, new BaseController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $location, this));

  $scope.listPage = 'app.news';
  $scope.newPage = 'app.news_new';
  $scope.entityType = 'news';
  $scope.sortingArray = {data: 'desc'};

  $scope.getBaseSearch = function (search, reqParams) {
    if (search && search.obj && search.obj.oggetto) {
      console.log('oggetto: ' + search.obj.oggetto);
      reqParams['obj.oggetto'] = search.obj.oggetto;
    }
    reqParams['obj.tipo'] = 6;
  };

  // inizializzazione a default dei valori di sectionXXX
  $scope.sectionTitle = 'Comunicati Stampa';
  $scope.sectionSubtitle = 'In questa sezione verranno presentati i comunicati stampa inviati alle testate giornalistiche.';
  $scope.sectionPath = ['news'];

  // anche dopo $scope.init() il valore di $scope.element non e' immediatamente disponibile. Si tratta di un promise non ancora risolto.
  // anche ng-init='function()...' viene invocata prima di quel momento e assegna i valori definitivi a $scope.sectionXXX prima del tempo.
  // ...e quindi...
  // funzione di callback. altre idee?
  $scope.getSuccess = function () {
    $scope.sectionTitle = $scope.element.oggetto;
    $scope.sectionSubtitle = $filter('date')($scope.element.data*1000, 'dd/MM/yyyy');
    $scope.sectionPath = ['news', $scope.element.id];
  };

  $scope.getFailure = function () {
    $scope.sectionTitle = 'Errori nel caricamento dei dati';
    $scope.sectionSubtitle = $filter('date')(new Date(), 'dd/MM/yyyy');
    $scope.sectionPath = ['news'];
  };

};

angular.module('pietraiajsApp')

  .controller('NewsController', ['$scope', '$stateParams', '$state', 'RsResource', 'popupService', 'NgTableParams', '$filter', '$location',
    function ($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location) {
      angular.extend(this, new NewsController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location));
      $scope.init();
    }])

  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('app.news', {
        url: '/news',
        views: {
          'content@': {
            templateUrl: 'views/news/list.html',
            controller: 'NewsController'
          }
        }
      })

      .state('app.news_view', {
        url: '/news/:id',
        views: {
          'content@': {
            controller: 'NewsController',
            templateUrl: 'views/news/view.html'
          }
        }
      })
  }])

;
