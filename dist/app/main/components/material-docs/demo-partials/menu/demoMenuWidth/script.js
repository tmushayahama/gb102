angular.module('menuDemoWidth', ['ngMaterial']).config(function($mdIconProvider) {
  $mdIconProvider
    .iconSet("call", 'src/assets/angular-material-assets/img/icons/sets/communication-icons.svg', 24)
    .iconSet("social", 'src/assets/angular-material-assets/img/icons/sets/social-icons.svg', 24);
}).controller('WidthDemoCtrl', function($mdDialog) {
  var vm = this;

  this.announceClick = function(index) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('You clicked!')
        .textContent('You clicked the menu item at index ' + index)
        .ok('Nice')
        .parent(angular.element(document.body))
    );
  };
});
