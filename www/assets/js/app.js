// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
// angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
var app = angular.module('espnCreativeworksShowcaseApp', [
  'ionic',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'cloudinary',
  'ngUnderscore'
]);
app.constant('apiUrl', '/api'); 
// app.constant('apiUrl', 'http://showcase.espncreativeworks.com/api'); 
app.constant('jQuery', window.jQuery);
app.constant('Modernizr', window.Modernizr);
app.constant('async', window.async);
app.config([
  '$stateProvider', 
  '$urlRouterProvider', 
  '$locationProvider', 
  '$httpProvider', 
  '$sceDelegateProvider', 
  function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $sceDelegateProvider) {
    
    $urlRouterProvider.otherwise('/tabs/projects');

    // $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

    $sceDelegateProvider.resourceUrlWhitelist([
      'self', // Allow same origin resource loads
      'http://res.cloudinary.com/**', // Allow loading from CDN. Notice the difference between * and **
      'https://res.cloudinary.com/**',
      'http://cdn.embedly.com/**', 
      'https://cdn.embedly.com/**',
      'http://*.vimeo.com/**', 
      'https://*.vimeo.com/**',
      'http://*.youtube.com/**', 
      'https://*.youtube.com/**',
      'http://*.go.com/**', 
      'https://*.go.com/**',
      'http://i.ytimg.com/**',
      'https://i.ytimg.com/**'
    ]);
  }
]);

app.factory('authInterceptor', [
  '$rootScope', 
  '$q', 
  '$cookieStore', 
  '$location', 
  function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }
]);

app.run([
  '$ionicPlatform',
  '$rootScope', 
  '$location', 
  '$state', 
  '$stateParams', 
  'Auth',
  function ($ionicPlatform, $rootScope, $location, $state, $stateParams, Auth) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }

      // Redirect to login if route requires auth and you're not logged in
      $rootScope.$on('$stateChangeStart', function (event, next) {
        Auth.isLoggedInAsync(function (loggedIn) {
          if (next.authenticate && !loggedIn) {
            $location.path('/login');
          }
        });
      });

      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    });
  }
]);
