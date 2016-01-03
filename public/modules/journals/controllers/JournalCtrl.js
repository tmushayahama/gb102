
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

 vm.journal = [];
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

 vm.getJournal = function (id, data) {
  vm.journalManager.getJournal(id, data).success(function (response) {
   vm.journal = response;
  }).error(function (response) {
   console.log(response);
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

 vm.editJournalSections = {
  details: function (journalId, detail) {
   var journalData = {
    journalId: journalId,
    title: detail.title,
    description: detail.description
   };
   vm.editJournal(journalData);
  }
 }

 vm.cancelJournal = function (form) {
  vm.FormDisplay = false;
  vm.newJournalData = angular.copy(vm.defaultJournalData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertJournal = function (journal, journalCopy) {
  journal = journalCopy;
  /*
   $filter('filter')
   (vm.journalManager.journal, {id: journalId}, true)[0]
   = angular.copy($filter('filter')
   (vm.journalCopy, {id: journalId}, true)[0]);
   if (journal.length && journalCopy.length) {
   // vm.journalManager.journal angular.copy(vm.journalCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.journal;
 }), function () {
  //vm.remainingCount = filterFilter(journal, {completed: false}).length;
  vm.doneCount = vm.journalManager.journal.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //JournalService.put(vm.journal);
 }, true);
 /*
  $scope.$watch(angular.bind(this, function () {
  return vm.location.path();
  }), function (path) {
  vm.statusFilter = (path === '/active') ?
  {completed: false} : (path === '/completed') ?
  {completed: true} : null;
  });
  */




 vm.edit = function (journal) {
  vm.edited = journal;
  // Clone the original journal to restore it on demand.
  vm.original = angular.copy(journal);
 };


 vm.doneEditing = function (journal) {
  vm.edited = null;
  journal.title = journal.title.trim();

  if (!journal.title) {
   vm.remove(journal);
  }
 };

 //--------init------
 vm.journalManager.getJournal(vm.journalId);
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

angular.module("app.journals").controller('JournalCtrl', journalCtrl);