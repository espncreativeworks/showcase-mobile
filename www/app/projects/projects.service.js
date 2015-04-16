'use strict';

angular.module('espnCreativeworksShowcaseApp')
  .factory('Project', ['$resource', 'apiUrl', function ($resource, apiUrl) {
    var populate = ['sports', 'hero', 'brands'];
    return $resource(apiUrl + '/projects/:id/:controller', {
      id: '@_id'
    },
    {
      query: {
        method: 'GET',
        params: {
          populate: populate.join(',')
        },
        isArray: true
      },
      get: {
        method: 'GET',
        params: {
          populate: populate.join(',')
        }
      },
      featured: {
        method: 'GET',
        params: {
          id: 'featured',
          populate: populate.join(',')
        },
        isArray: true
      },
      search: {
        method: 'GET',
        params: {
          id: 'search'
        },
        isArray: true
      },
      executions: {
        method: 'GET',
        params: {
          controller: 'executions',
          populate: ['platform', 'images', 'videos', 'documents', 'tags', 'related'].join(',')
        },
        isArray: true
      }
    });
  }]);
