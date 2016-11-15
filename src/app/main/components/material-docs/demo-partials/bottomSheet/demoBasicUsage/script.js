angular.module('bottomSheetDemo1', ['ngMaterial'])
.config(function($mdIconProvider) {
    $mdIconProvider
      .icon('share-arrow', 'src/assets/angular-material-assets/img/icons/share-arrow.svg', 24)
      .icon('upload', 'src/assets/angular-material-assets/img/icons/upload.svg', 24)
      .icon('copy', 'src/assets/angular-material-assets/img/icons/copy.svg', 24)
      .icon('print', 'src/assets/angular-material-assets/img/icons/print.svg', 24)
      .icon('hangout', 'src/assets/angular-material-assets/img/icons/hangout.svg', 24)
      .icon('mail', 'src/assets/angular-material-assets/img/icons/mail.svg', 24)
      .icon('message', 'src/assets/angular-material-assets/img/icons/message.svg', 24)
      .icon('copy2', 'src/assets/angular-material-assets/img/icons/copy2.svg', 24)
      .icon('facebook', 'src/assets/angular-material-assets/img/icons/facebook.svg', 24)
      .icon('twitter', 'src/assets/angular-material-assets/img/icons/twitter.svg', 24);
  })
.controller('BottomSheetExample', function($scope, $timeout, $mdBottomSheet, $mdToast) {
  $scope.alert = '';

  $scope.showListBottomSheet = function() {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'bottom-sheet-list-template.html',
      controller: 'ListBottomSheetCtrl'
    }).then(function(clickedItem) {
      $scope.alert = clickedItem['name'] + ' clicked!';
    });
  };

  $scope.showGridBottomSheet = function() {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'bottom-sheet-grid-template.html',
      controller: 'GridBottomSheetCtrl',
      clickOutsideToClose: false
    }).then(function(clickedItem) {
      $mdToast.show(
            $mdToast.simple()
              .textContent(clickedItem['name'] + ' clicked!')
              .position('top right')
              .hideDelay(1500)
          );
    });
  };
})

.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {

  $scope.items = [
    { name: 'Share', icon: 'share-arrow' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})
.controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Hangout', icon: 'hangout' },
    { name: 'Mail', icon: 'mail' },
    { name: 'Message', icon: 'message' },
    { name: 'Copy', icon: 'copy2' },
    { name: 'Facebook', icon: 'facebook' },
    { name: 'Twitter', icon: 'twitter' },
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})
.run(function($templateRequest) {

    var urls = [
      'src/assets/angular-material-assets/img/icons/share-arrow.svg',
      'src/assets/angular-material-assets/img/icons/upload.svg',
      'src/assets/angular-material-assets/img/icons/copy.svg',
      'src/assets/angular-material-assets/img/icons/print.svg',
      'src/assets/angular-material-assets/img/icons/hangout.svg',
      'src/assets/angular-material-assets/img/icons/mail.svg',
      'src/assets/angular-material-assets/img/icons/message.svg',
      'src/assets/angular-material-assets/img/icons/copy2.svg',
      'src/assets/angular-material-assets/img/icons/facebook.svg',
      'src/assets/angular-material-assets/img/icons/twitter.svg'
    ];

    angular.forEach(urls, function(url) {
      $templateRequest(url);
    });

  });
