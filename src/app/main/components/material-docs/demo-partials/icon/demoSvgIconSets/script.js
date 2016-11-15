
angular.module('appSvgIconSets', ['ngMaterial'])
  .controller('DemoCtrl', function($scope) {})
  .config(['$mdIconProvider', function($mdIconProvider) {
    $mdIconProvider
      .iconSet('social', 'src/assets/angular-material-assets/img/icons/sets/social-icons.svg', 24)
      .defaultIconSet('src/assets/angular-material-assets/img/icons/sets/core-icons.svg', 24);
  }]);
