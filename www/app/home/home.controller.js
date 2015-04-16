'use strict';

angular.module('espnCreativeworksShowcaseApp')
  .controller('HomeCtrl', ['$scope', 'Project', '$ionicSlideBoxDelegate', '$ionicLoading', function ($scope, Project, $ionicSlideBoxDelegate, $ionicLoading) {

    $ionicLoading.show();

    $scope.projects = Project.featured();
    $scope.projects.$promise.then(function (){
      $ionicSlideBoxDelegate.update();
      $ionicLoading.hide();
    });

    $scope.initSlider = function (){
      $ionicSlideBoxDelegate.update();
    };

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
    $scope.activeSlide = 'intro';
    $scope.slideHasChanged = function (index){
      
      if (index){
        $scope.activeSlide = $scope.projects[index - 1];  
      } else {
        $scope.activeSlide = 'intro';
      }
      // TODO: track slide view
    };
  }]);
