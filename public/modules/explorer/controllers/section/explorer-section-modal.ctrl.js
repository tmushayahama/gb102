var explorerSectionCtrl = function (
        ExplorerSectionsSrv,
        $uibModalInstance,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $log,
        explorerSectionData) {
 var vm = this;
 vm.explorerSectionsSrv = new ExplorerSectionsSrv();
 vm.explorerSection = explorerSectionData;
 vm.answers;

 vm.sectionFormDisplay = false;
 vm.ok = function () {
  $uibModalInstance.close();
 };
 vm.close = function () {
  $uibModalInstance.dismiss('cancel');
 };
 // vm.newExplorerSectionData = vm.defaultExplorerSectionData;


 vm.getSectionAnswers = function (sectionId, explorerId) {
  vm.explorerSectionsSrv.getSectionAnswers(sectionId, explorerId).then(function (answerResponse) {
   vm.explorerSections.answers = answerResponse;
  });
 };

 vm.editExplorerSection = function (data) {
  vm.explorerSectionsSrv.editExplorerSection(data).then(function (response) {
   vm.editDecriptionMode = false;
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerSectionSections = {
  details: function () {
   var explorerSectionData = {
    explorerSectionId: vm.explorerSection.section.id,
    title: vm.explorerSection.section.title,
    description: vm.explorerSection.section.description
   };
   vm.editExplorerSection(explorerSectionData);
  }
 };
 vm.showSectionForm = function () {
  vm.sectionFormDisplay = true;
 };
 //--------init------
 //vm.getExplorerSection(vm.explorerId, vm.sectionId);
 vm.getSectionAnswers(vm.explorerSection.id, vm.explorerSection.explorer_id);
};
explorerSectionCtrl.$inject = [
 'ExplorerSectionsSrv',
 '$uibModalInstance',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$log',
 'explorerSectionData'];
angular.module("app.explorer").controller('ExplorerSectionCtrl', explorerSectionCtrl);
