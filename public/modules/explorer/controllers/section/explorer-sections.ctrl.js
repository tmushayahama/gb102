var explorerSectionsCtrl = function (
        ExplorerSectionsSrv,
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
 vm.explorerId = $stateParams.explorerId;
 vm.explorerSections = [];
 vm.explorerSectionsCopy;
 vm.explorerSectionsSrv = new ExplorerSectionsSrv();
 vm.sectionFormDisplay = false;
 vm.gridsterOpts = {
  defaultSizeX: 2,
  defaultSizeY: 1,
  mobileBreakPoint: 600,
  rowHeight: 108,
  draggable: {
   enabled: true,
   //handle: '.qf-grab-me',
   start: function (event, $element, widget) {}, // optional callback fired when drag is started,
   drag: function (event, $element, widget) {},
   stop: function (event, $element, widget) {
    //sortComponents();
   }
  }
 };

 vm.defaultExplorerSectionData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newExplorerSectionData = angular.copy(vm.defaultExplorerSectionData);

 vm.showSectionForm = function () {
  vm.sectionFormDisplay = true;
 };

 vm.getExplorerSections = function (explorerId) {
  vm.explorerSectionsSrv.getExplorerSections(explorerId).then(function (response) {
   vm.explorerSections = response;

   angular.forEach(response, function (question, key) {
    vm.explorerSectionsSrv.getSectionAnswersPreview(question.id, explorerId).then(function (answerResponse) {
     vm.explorerSections[key].answers = answerResponse;
     vm.explorerSections[key].explorer_id = explorerId;
     var minSizeY = 1 + Math.floor(answerResponse.length / 5);
     vm.explorerSections[key].gridMap = {
      'minSizeY': minSizeY,
      'maxSizeY': 4
     };
     //  sizeX: 3,
     //  sizeY: 1
     // }
    });
   });
  });
 };

 vm.createExplorerSection = function (data) {
  vm.explorerSectionsSrv.createExplorerSection(data).then(function (response) {
   vm.sectionFormDisplay = false;
   vm.newExplorerSectionData = angular.copy(vm.defaultExplorerSectionData);
   vm.explorerSections.unshift(response);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerSection = function (data) {
  vm.explorerSectionsSrv.editExplorerSection(data).then(function (response) {
   vm.sectionFormDisplay = false;
   vm.newExplorerSectionData = angular.copy(vm.defaultExplorerSectionData);
   vm.explorerSectionsCopy = angular.copy(vm.explorerSections);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerSectionSections = {
  details: function (explorerSectionId, detail) {
   var explorerSectionData = {
    explorerSectionId: explorerSectionId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorerSection(explorerSectionData);
  }
 }

 vm.cancelExplorerSection = function (form) {
  vm.sectionFormDisplay = false;
  vm.newExplorerSectionData = angular.copy(vm.defaultExplorerSectionData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };


 vm.editedSection = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.explorerSections;
 }), function () {
  //vm.remainingCount = filterFilter(explorerSections, {completed: false}).length;
  vm.doneCount = vm.explorerSections.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerSectionService.put(vm.explorerSections);
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




 vm.editSection = function (explorerSection) {
  vm.editedSection = explorerSection;
  // Clone the original explorerSection to restore it on demand.
  vm.originalSection = angular.copy(explorerSection);
 };


 vm.doneEditing = function (explorerSection) {
  vm.editedSection = null;
  explorerSection.title = explorerSection.title.trim();

  if (!explorerSection.title) {
   vm.removeSection(explorerSection);
  }
 };

 vm.openExplorerSection = function (explorerSection) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explorer-section-modal.html',
   controller: 'ExplorerSectionCtrl as explorerSectionCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    explorerSectionData: function () {
     return explorerSection;
    }
   }
  });

  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 vm.openExplorerSectionItem = function (explorerSectionItem) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explorer-section-item-modal.html',
   controller: 'ExplorerSectionItemCtrl as explorerSectionItemCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    explorerSectionData: function () {
     return explorerSectionItem;
    }
   }
  });

  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 vm.addToExplorerSection = function (data) {
  console.log("added", data);
  return vm.explorerSectionsSrv.createAnswer(data);
 };

 //--------init------
 vm.getExplorerSections(vm.explorerId);
};


explorerSectionsCtrl.$inject = [
 'ExplorerSectionsSrv',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.explorer").controller('ExplorerSectionsCtrl', explorerSectionsCtrl);
