'use strict';

function ScultureController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location) {
  angular.extend(this, new BaseController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $location, this));

  $scope.listPage = 'app.sculture';
  $scope.newPage = 'app.sculture_new';
  $scope.entityType = 'sculture';
  $scope.sortingArray = {data: 'desc'};

  $scope.getBaseSearch = function (search, reqParams) {
    if (search && search.obj && search.obj.oggetto) {
      reqParams['obj.titolo'] = search.obj.titolo;
    }
    if (search && search.obj && search.obj.materia) {
      reqParams['obj.materia'] = search.obj.materia;
    }
    if (search && search.obj && search.obj.descrizione) {
      reqParams['obj.descrizione'] = search.obj.descrizione;
    }
  };

  // inizializzazione a default dei valori di sectionXXX
  $scope.sectionTitle = 'Sculture';
  $scope.sectionSubtitle = 'In questa sezione verranno descritte le opere esposte all\'interno dell\'area. Verrà fornita una descrizione delle opere, la data in cui sono state concepite/realizzate, i materiali usati.';
  $scope.sectionPath = ['sculture'];

  // dopo $scope.init() il valore di $scope.element non e' immediatamente disponibile. Si tratta di un promise non ancora risolto.
  // anche ng-init='function()...' viene invocata prima di quel momento e assegna i valori definitivi a $scope.sectionXXX prima del tempo.
  // ...e quindi...
  // funzione di callback. altre idee?
  $scope.getSuccess = function () {
    $scope.sectionTitle = $scope.element.titolo;
    $scope.sectionSubtitle = $scope.element.data;
    $scope.sectionPath = ['sculture', $scope.element.id];
  };

  $scope.getFailure = function () {
    $scope.sectionTitle = 'Errori nel caricamento dei dati';
    $scope.sectionSubtitle = $filter('date')(new Date(), 'dd/MM/yyyy');
    $scope.sectionPath = ['sculture'];
  };

};

angular.module('pietraiajsApp')

  .controller('ScultureController', ['$scope', '$stateParams', '$state', 'RsResource', 'popupService', 'NgTableParams', '$filter', '$location',
    function ($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location) {
      angular.extend(this, new ScultureController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location));
      $scope.init();
    }])

  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('app.sculture', {
        url: '/sculture',
        views: {
          'content@': {
            templateUrl: 'views/sculture/list.html',
            controller: 'ScultureController'
          }
        }
      })

      .state('app.sculture_view', {
        url: '/sculture/:id',
        views: {
          'content@': {
            controller: 'ScultureController',
            templateUrl: 'views/sculture/view.html'
          }
        }
      })
  }])

;
