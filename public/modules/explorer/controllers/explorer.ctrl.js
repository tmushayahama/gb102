
var explorerCtrl = function (
        _,
        level_categories,
        ConstantsSrv,
        ExplorerSrv,
        ExplorerSectionsSrv,
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

 /*
  $css.bind({
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-explorer.css'
  }, $scope);
  */
 vm.explorer = [];

 vm.editDescriptionMode = {
  visible: false,
  show: function () {
   vm.editDescriptionMode.visible = true;
   vm.editDescriptionMode.data = {
    explorer_id: vm.explorerSrv.explorer.id,
    title: vm.explorerSrv.explorer.title,
    description: vm.explorerSrv.explorer.description
   };
  },
  hide: function () {
   vm.editDescriptionMode.visible = false;
  },
  edit: function () {
   vm.explorerSrv.editExplorer(vm.editDescriptionMode.data).then(function (response) {
    vm.editDescriptionMode.hide();
    vm.explorerSrv.explorer = response;
   }, function (response) {
    console.log(response);
   });
  }
 };
 var explorerData = {};


 vm.explorerId = $stateParams.explorerId;

 vm.explorerSrv = new ExplorerSrv();
 vm.constantsSrv = new ConstantsSrv();

 vm.explorerFormDisplay = false;

 vm.getExplorer = function (id) {
  vm.explorerSrv.getExplorer(id).then(function (response) {
   //vm.explorer = response;
  });
 };

 vm.defaultExplorerData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 }
 vm.newExplorerData = angular.copy(vm.defaultExplorerData);

 vm.showForm = function () {
  vm.FormDisplay = true;
 };

 vm.createExplorer = function (data) {
  vm.explorerSrv.createExplorer(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newExplorerData = angular.copy(vm.defaultExplorerData);
   vm.explorerCopy = angular.copy(vm.explorerSrv.explorer);
  }, function (response) {
   console.log(response);
  });
 };



 vm.editExplorerSections = {
  details: function (explorerId, detail) {
   var explorerData = {
    explorerId: explorerId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorer(explorerData);
  }
 }

 vm.cancelExplorer = function (form) {
  vm.FormDisplay = false;
  vm.newExplorerData = angular.copy(vm.defaultExplorerData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertExplorer = function (explorer, explorerCopy) {
  explorer = explorerCopy;
  /*
   $filter('filter')
   (vm.explorerSrv.explorer, {id: explorerId}, true)[0]
   = angular.copy($filter('filter')
   (vm.explorerCopy, {id: explorerId}, true)[0]);
   if (explorer.length && explorerCopy.length) {
   // vm.explorerSrv.explorer angular.copy(vm.explorerCopy);
   }
   */
 };


 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.explorer;
 }), function () {
  //vm.remainingCount = filterFilter(explorer, {completed: false}).length;
  vm.doneCount = vm.explorerSrv.explorer.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerService.put(vm.explorer);
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




 vm.edit = function (explorer) {
  vm.edited = explorer;
  // Clone the original explorer to restore it on demand.
  vm.original = angular.copy(explorer);
 };


 vm.doneEditing = function (explorer) {
  vm.edited = null;
  explorer.title = explorer.title.trim();

  if (!explorer.title) {
   vm.remove(explorer);
  }
 };

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

 //--------init------
 vm.explorerSrv.getExplorer(vm.explorerId).then(function (data) {
  $css.bind({
   href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-' + data.app_type.name.toLowerCase() + '.css'
  }, $scope);
 });

 vm.explorerSrv.getSubExplorers(vm.explorerId, level_categories.explorer_relationship.application);

 vm.getSubExplorersStats = function (explorerId) {
  vm.explorerSrv.getSubExplorersStats(explorerId).then(function (data) {
   vm.subExplorersStats = data;
  });
 };

 //vm.getSubExplorersStats(vm.explorerId);
};

explorerCtrl.$inject = ['_',
 'level_categories',
 'ConstantsSrv',
 'ExplorerSrv',
 'ExplorerSectionsSrv',
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

angular.module("app.explorer").controller('ExplorerCtrl', explorerCtrl);