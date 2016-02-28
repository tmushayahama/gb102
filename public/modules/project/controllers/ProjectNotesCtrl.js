var projectNotesCtrl = function (
        ProjectNotesSrv,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter) {

 var vm = this;
 vm.projectId = $stateParams.projectId;
 vm.projectNotesCopy;
 vm.projectNotesSrv = new ProjectNotesSrv();
 vm.noteFormDisplay = false;

 vm.defaultProjectNoteData = {
  projectId: $stateParams.projectId,
  privacy: 0
 }
 vm.newProjectNoteData = angular.copy(vm.defaultProjectNoteData);

 vm.showNoteForm = function () {
  vm.noteFormDisplay = true;
 };

 vm.createProjectNote = function (data) {
  vm.projectNotesSrv.createProjectNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newProjectNoteData = angular.copy(vm.defaultProjectNoteData);
   vm.projectNotesCopy = angular.copy(vm.projectNotesSrv.projectNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectNote = function (data) {
  vm.projectNotesSrv.editProjectNote(data).then(function (response) {
   vm.noteFormDisplay = false;
   vm.newProjectNoteData = angular.copy(vm.defaultProjectNoteData);
   vm.projectNotesCopy = angular.copy(vm.projectNotesSrv.projectNotes);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editProjectNoteSections = {
  details: function (projectNoteId, detail) {
   var projectNoteData = {
    projectNoteId: projectNoteId,
    title: detail.title,
    description: detail.description
   };
   vm.editProjectNote(projectNoteData);
  }
 }

 vm.cancelProjectNote = function (form) {
  vm.noteFormDisplay = false;
  vm.newProjectNoteData = angular.copy(vm.defaultProjectNoteData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertProjectNote = function (projectNote, projectNoteCopy) {
  projectNote = projectNoteCopy;
  /*
   $filter('filter')
   (vm.projectNotesSrv.projectNotes, {id: projectNoteId}, true)[0]
   = angular.copy($filter('filter')
   (vm.projectNotesCopy, {id: projectNoteId}, true)[0]);
   if (projectNote.length && projectNoteCopy.length) {
   // vm.projectNotesSrv.projectNotes angular.copy(vm.projectNotesCopy);
   }
   */
 };






 vm.editedNote = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.projectNotes;
 }), function () {
  //vm.remainingCount = filterFilter(projectNotes, {completed: false}).length;
  vm.doneCount = vm.projectNotesSrv.projectNotes.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ProjectNoteService.put(vm.projectNotes);
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




 vm.editNote = function (projectNote) {
  vm.editedNote = projectNote;
  // Clone the original projectNote to restore it on demand.
  vm.originalNote = angular.copy(projectNote);
 };


 vm.doneEditing = function (projectNote) {
  vm.editedNote = null;
  projectNote.title = projectNote.title.trim();

  if (!projectNote.title) {
   vm.removeNote(projectNote);
  }
 };

 vm.openProjectNote = function (projectNote) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'project-note-modal.html',
   controller: 'ProjectNoteCtrl as projectNoteCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    projectNoteData: function () {
     return projectNote;
    }
   }
  });

  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };



 //--------init------
 vm.projectNotesSrv.getProjectNotes(vm.projectId);
};


projectNotesCtrl.$inject = [
 'ProjectNotesSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.project").controller('ProjectNotesCtrl', projectNotesCtrl);
