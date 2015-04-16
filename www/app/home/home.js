'use strict';

angular.module('espnCreativeworksShowcaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tabs.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      });
  });