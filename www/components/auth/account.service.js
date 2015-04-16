'use strict';

angular.module('espnCreativeworksShowcaseApp')
  .factory('Account', ['$resource', 'apiUrl', function ($resource, apiUrl) {
    return $resource(apiUrl + '/api/accounts/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      changeEmail: {
        method: 'PUT',
        params: {
          controller:'email'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  }
]);
