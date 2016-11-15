angular.module('listDemo2', ['ngMaterial'])
.config(function($mdIconProvider) {
  $mdIconProvider
    .iconSet('social', 'src/assets/angular-material-assets/img/icons/sets/social-icons.svg', 24)
    .iconSet('device', 'src/assets/angular-material-assets/img/icons/sets/device-icons.svg', 24)
    .iconSet('communication', 'src/assets/angular-material-assets/img/icons/sets/communication-icons.svg', 24)
    .defaultIconSet('src/assets/angular-material-assets/img/icons/sets/core-icons.svg', 24);
})
.controller('ListCtrl', function($scope, $mdDialog) {
  $scope.toppings = [
    { name: 'Pepperoni', wanted: true },
    { name: 'Sausage', wanted: false },
    { name: 'Black Olives', wanted: true },
    { name: 'Green Peppers', wanted: false }
  ];

  $scope.settings = [
    { name: 'Wi-Fi', extraScreen: 'Wi-fi menu', icon: 'device:network-wifi', enabled: true },
    { name: 'Bluetooth', extraScreen: 'Bluetooth menu', icon: 'device:bluetooth', enabled: false },
  ];

  $scope.messages = [
    {id: 1, title: "Message A", selected: false},
    {id: 2, title: "Message B", selected: true},
    {id: 3, title: "Message C", selected: true},
  ];

  $scope.people = [
    { name: 'Janet Perkins', img: 'src/assets/angular-material-assets/img/100-0.jpeg', newMessage: true },
    { name: 'Mary Johnson', img: 'src/assets/angular-material-assets/img/100-1.jpeg', newMessage: false },
    { name: 'Peter Carlsson', img: 'src/assets/angular-material-assets/img/100-2.jpeg', newMessage: false }
  ];

  $scope.goToPerson = function(person, event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Navigating')
        .textContent('Inspect ' + person)
        .ariaLabel('Person inspect demo')
        .clickOutsideToClose(true)
        .parent(angular.element(document.body))
        .ok('Neat!')
        .targetEvent(event)
    );
  };

  $scope.navigateTo = function(to, event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Navigating')
        .textContent('Imagine being taken to ' + to)
        .ariaLabel('Navigation demo')
        .ok('Neat!')
        .targetEvent(event)
          .clickOutsideToClose(true)
          .parent(angular.element(document.body))
    );
  };

  $scope.doPrimaryAction = function(event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Primary Action')
        .textContent('Primary actions can be used for one click actions')
        .ariaLabel('Primary click demo')
        .ok('Awesome!')
        .targetEvent(event)
          .clickOutsideToClose(true)
          .parent(angular.element(document.body))
    );
  };

  $scope.doSecondaryAction = function(event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Secondary Action')
        .textContent('Secondary actions can be used for one click actions')
        .ariaLabel('Secondary click demo')
        .ok('Neat!')
        .targetEvent(event)
          .clickOutsideToClose(true)
          .parent(angular.element(document.body))
    );
  };

});
