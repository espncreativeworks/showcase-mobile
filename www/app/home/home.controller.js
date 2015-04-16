'use strict';

angular.module('espnCreativeworksShowcaseApp')
  .controller('HomeCtrl', ['$scope', 'Project', '$ionicSlideBoxDelegate', function ($scope, Project, $ionicSlideBoxDelegate) {
    $scope.projects = Project.featured();
    $scope.projects.$promise.then(function (){
      $ionicSlideBoxDelegate.update();
    });

    $scope.sliderClass = {
      'scroll-content': true, 
      'ionic-scroll': true, 
      'has-header': true,
      'has-tabs': ionic.Platform.isIOS(),
      'has-tabs-top': ionic.Platform.isAndroid()
    };

    // $scope.reel = Video.get({ id: 'espn-creativeworks' });

    // $scope.watchReel = function (){
    //   var modalInstance;
    //   modalInstance = $modal.open({
    //     templateUrl: 'app/videos/modal/videos.modal.html',
    //     controller: 'VideosModalCtrl',
    //     size: 'lg',
    //     resolve: {
    //       video: function (){ return $scope.reel; }
    //     }
    //   });
    // };
    $scope.activeSlide = null;
    $scope.slideHasChanged = function (){
      // TODO: track slide view
    };
  }]);
