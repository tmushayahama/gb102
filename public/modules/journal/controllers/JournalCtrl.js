
var journalCtrl = function (
        _,
        ConstantsManager,
        JournalManager,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-journal.css'
 }, $scope);

 vm.journal;
 var journalData = {
 };

 vm.range = function (min, max) {
  return _.range(min, max);
 };

 vm.journalIcons = [];
 vm.journalIconsArray = [];

 var getRand = function (min, max) {
  return Math.floor((Math.random() * max) + min);
 }

 vm.getRandomJournalIcons = function () {
  for (var i = 0; i < 5; i++) {
   var rowArray = [];
   for (var j = 0; j < vm.journalIcons.length; j++) {
    var rand = getRand(0, vm.journalIcons.length);
    rowArray.push(vm.journalIcons[rand].name);
   }
   vm.journalIconsArray.push(rowArray);
  }
 };


 vm.journalId = $stateParams.journalId;

 vm.journalManager = new JournalManager();
 vm.constantsManager = new ConstantsManager();

 vm.journalFormDisplay = false;

 vm.getJournal = function (id) {
  vm.journalManager.getJournal(id).then(function (data) {
   vm.journal = data;
  });
 };




 vm.defaultJournalData = {
  journalId: $stateParams.journalId,
  privacy: 0
 }
 vm.newJournalData = angular.copy(vm.defaultJournalData);

 vm.showForm = function () {
  vm.FormDisplay = true;
 };

 vm.createJournal = function (data) {
  vm.journalManager.createJournal(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newJournalData = angular.copy(vm.defaultJournalData);
   vm.journalCopy = angular.copy(vm.journalManager.journal);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournal = function (data) {
  vm.journalManager.editJournal(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newJournalData = angular.copy(vm.defaultJournalData);
   vm.journalCopy = angular.copy(vm.journalManager.journal);
  }, function (response) {
   console.log(response);
  });
 };



 //--------init------

 vm.getJournal(vm.journalId);
 vm.constantsManager.getIcons(1).then(function (data) {
  vm.journalIcons = data;
  vm.getRandomJournalIcons();
 });
};

journalCtrl.$inject = ['_',
 'ConstantsManager',
 'JournalManager',
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

angular.module("app.journal").controller('JournalCtrl', journalCtrl);