'use strict';

function PercorsoTattileController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location) {
  angular.extend(this, new BaseController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $location, this));

  $scope.listPage = 'app.tattile';
  $scope.newPage = 'app.tattile_new';
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
    reqParams['obj.mp3'] = 'not_null';
  };

  // inizializzazione a default dei valori di sectionXXX
  $scope.sectionTitle = 'Percorso tattile';
  $scope.sectionSubtitle = 'In questa sezione verranno descritte le opere accessibili ai non vedenti nello stesso ordine spaziale del percorso reale.'
  + '<br/>' + 'All\'interno dell\'area è previsto un camminamento segnalato da passamano, lungo il quale delle targhe con descrizione in Braille avvertono la presenza dell\'opera disponibile alla visione tattile.'
  + '<br/>' + 'Per le sculture di maggiori dimensioni è prevista una riproduzione in scala.'
  + '<br/>' + 'A richiesta è possibile utilizzare dei lettori mp3 con la descrizione dettagliata delle opere, la stessa presente e scaricabile in queste pagine web.';
  $scope.sectionPath = ['tattile'];

  // dopo $scope.init() il valore di $scope.element non e' immediatamente disponibile. Si tratta di un promise non ancora risolto.
  // anche ng-init='function()...' viene invocata prima di quel momento e assegna i valori definitivi a $scope.sectionXXX prima del tempo.
  // ...e quindi...
  // funzione di callback. altre idee?
  $scope.getSuccess = function () {
    $scope.sectionTitle = $scope.element.titolo;
    $scope.sectionSubtitle = $filter('date')($scope.element.data, 'dd/MM/yyyy');
    $scope.sectionPath = ['tattile', $scope.element.id];
  };

  $scope.getFailure = function () {
    $scope.sectionTitle = 'Errori nel caricamento dei dati';
    $scope.sectionSubtitle = $filter('date')(new Date(), 'dd/MM/yyyy');
    $scope.sectionPath = ['tattile'];
  };

};

angular.module('pietraiajsApp')

  .controller('PercorsoTattileController', ['$scope', '$stateParams', '$state', 'RsResource', 'popupService', 'NgTableParams', '$filter', '$location',
    function ($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location) {
      angular.extend(this, new PercorsoTattileController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location));
      $scope.init();
    }])

  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('app.tattile', {
        url: '/tattile',
        views: {
          'content@': {
            templateUrl: 'views/tattile/list.html',
            controller: 'PercorsoTattileController'
          }
        }
      })

      .state('app.tattile_view', {
        url: '/tattile/:id',
        views: {
          'content@': {
            controller: 'PercorsoTattileController',
            templateUrl: 'views/tattile/view.html'
          }
        }
      })
  }])

;
