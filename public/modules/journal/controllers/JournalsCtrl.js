
var journalsCtrl = function (
        level_categories,
        ConstantsManager,
        SearchManager,
        JournalsManager,
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

 vm.journalsManager = new JournalsManager();
 vm.constantsManager = new ConstantsManager();
 $rootScope.appName = 'JOURNALR';
 vm.journalLevels;
 vm.journalTypes;


 $scope.superhero = {
  selected: 'Batman'
 };

 $scope.$watch('superhero.selected', function (newVal, oldVal) {
  /*      if (newVal !== oldVal) {
   if ($scope.superheroes.indexOf(newVal) === -1) {
   $scope.superheroes.unshift(newVal);
   }
   }*/
 });

 vm.createJournal = function (data) {
  vm.journalsManager.createJournal(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newJournalData = angular.copy(vm.defaultJournalData);
   vm.journalsCopy = angular.copy(vm.journalsManager.journals);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editJournal = function (data) {
  vm.journalsManager.editJournal(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newJournalData = angular.copy(vm.defaultJournalData);
   vm.journalsCopy = angular.copy(vm.journalsManager.journals);
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
   (vm.journalsManager.journals, {id: journalId}, true)[0]
   = angular.copy($filter('filter')
   (vm.journalsCopy, {id: journalId}, true)[0]);
   if (journal.length && journalCopy.length) {
   // vm.journalsManager.journals angular.copy(vm.journalsCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.journals;
 }), function () {
  //vm.remainingCount = filterFilter(journals, {completed: false}).length;
  vm.doneCount = vm.journalsManager.journals.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //JournalService.put(vm.journals);
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

 $rootScope.openAddExploreModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'create-journal-modal.html',
   controller: 'CreateJournalCtrl as createJournalCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    journalTypes: function () {
     return vm.journalTypes;
    }
   }
  });

  modalInstance.result.then(function (journal) {
   vm.journalsManager.createJournal(journal);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 vm.constantsManager.getLevel(level_categories.journal).then(function (data) {
  vm.journalTypes = data;
 });
 vm.constantsManager.getLevel(level_categories.journal).then(function (data) {
  vm.journalLevels = data;
 });
};

journalsCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'SearchManager',
 'JournalsManager',
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

angular.module("app.journal").controller('JournalsCtrl', journalsCtrl);