'use strict';

angular.module('espnCreativeworksShowcaseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tabs.projects', {
        url: '/projects',
        views: {
          'tab-projects-list': {
            templateUrl: 'app/projects/list/projects.list.html',
            controller: 'ProjectsListCtrl'
          }
        }
      });
  });