
angular.module('cardDemo3', ['ngMaterial'])

.config(['$mdIconProvider', function($mdIconProvider) {
  $mdIconProvider.icon('md-toggle-arrow', 'src/assets/angular-material-assets/img/icons/toggle-arrow.svg', 48);
}])
.controller('AppCtrl', function($scope) {
  $scope.imagePath = 'src/assets/angular-material-assets/img/washedout.png';
});
