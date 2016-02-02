
var teachCtrl = function (
        _,
        ConstantsManager,
        TeachManager,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter,
        $css) {

 var vm = this;
 $css.bind({
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-teach.css'
 }, $scope);

 vm.teach;
 var teachData = {
 };

 vm.range = function (min, max) {
  return _.range(min, max);
 };

 vm.teachIcons = [];
 vm.teachIconsArray = [];

 var getRand = function (min, max) {
  return Math.floor((Math.random() * max) + min);
 }

 vm.getRandomTeachIcons = function () {
  for (var i = 0; i < 5; i++) {
   var rowArray = [];
   for (var j = 0; j < vm.teachIcons.length; j++) {
    var rand = getRand(0, vm.teachIcons.length);
    rowArray.push(vm.teachIcons[rand].name);
   }
   vm.teachIconsArray.push(rowArray);
  }
 };


 vm.teachId = $stateParams.teachId;

 vm.teachManager = new TeachManager();
 vm.constantsManager = new ConstantsManager();

 vm.teachFormDisplay = false;

 vm.getTeach = function (id) {
  vm.teachManager.getTeach(id).then(function (data) {
   vm.teach = data;
  });
 };




 vm.defaultTeachData = {
  teachId: $stateParams.teachId,
  privacy: 0
 }
 vm.newTeachData = angular.copy(vm.defaultTeachData);

 vm.showForm = function () {
  vm.FormDisplay = true;
 };

 vm.createTeach = function (data) {
  vm.teachManager.createTeach(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newTeachData = angular.copy(vm.defaultTeachData);
   vm.teachCopy = angular.copy(vm.teachManager.teach);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editTeach = function (data) {
  vm.teachManager.editTeach(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newTeachData = angular.copy(vm.defaultTeachData);
   vm.teachCopy = angular.copy(vm.teachManager.teach);
  }, function (response) {
   console.log(response);
  });
 };



 //--------init------

 vm.getTeach(vm.teachId);
 vm.constantsManager.getIcons(1).then(function (data) {
  vm.teachIcons = data;
  vm.getRandomTeachIcons();
 });
};

teachCtrl.$inject = ['_',
 'ConstantsManager',
 'TeachManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter',
 '$css'];

angular.module("app.teach").controller('TeachCtrl', teachCtrl);