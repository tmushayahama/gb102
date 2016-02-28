
var adviceCtrl = function (
        _,
        ConstantsSrv,
        AdviceSrv,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-advice.css'
 }, $scope);

 vm.advice;
 var adviceData = {
 };

 vm.range = function (min, max) {
  return _.range(min, max);
 };

 vm.adviceIcons = [];
 vm.adviceIconsArray = [];

 var getRand = function (min, max) {
  return Math.floor((Math.random() * max) + min);
 }

 vm.getRandomAdviceIcons = function () {
  for (var i = 0; i < 5; i++) {
   var rowArray = [];
   for (var j = 0; j < vm.adviceIcons.length; j++) {
    var rand = getRand(0, vm.adviceIcons.length);
    rowArray.push(vm.adviceIcons[rand].name);
   }
   vm.adviceIconsArray.push(rowArray);
  }
 };


 vm.adviceId = $stateParams.adviceId;

 vm.adviceSrv = new AdviceSrv();
 vm.constantsSrv = new ConstantsSrv();

 vm.adviceFormDisplay = false;

 vm.getAdvice = function (id) {
  vm.adviceSrv.getAdvice(id).then(function (data) {
   vm.advice = data;
  });
 };




 vm.defaultAdviceData = {
  adviceId: $stateParams.adviceId,
  privacy: 0
 }
 vm.newAdviceData = angular.copy(vm.defaultAdviceData);

 vm.showForm = function () {
  vm.FormDisplay = true;
 };

 vm.createAdvice = function (data) {
  vm.adviceSrv.createAdvice(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newAdviceData = angular.copy(vm.defaultAdviceData);
   vm.adviceCopy = angular.copy(vm.adviceSrv.advice);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editAdvice = function (data) {
  vm.adviceSrv.editAdvice(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newAdviceData = angular.copy(vm.defaultAdviceData);
   vm.adviceCopy = angular.copy(vm.adviceSrv.advice);
  }, function (response) {
   console.log(response);
  });
 };



 //--------init------

 vm.getAdvice(vm.adviceId);
 vm.constantsSrv.getIcons(1).then(function (data) {
  vm.adviceIcons = data;
  vm.getRandomAdviceIcons();
 });
};

adviceCtrl.$inject = ['_',
 'ConstantsSrv',
 'AdviceSrv',
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

angular.module("app.advice").controller('AdviceCtrl', adviceCtrl);