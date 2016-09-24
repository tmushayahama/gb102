
var explorerCtrl = function (
        _,
        level_categories,
        ConstantsSrv,
        ExplorerSrv,
        ExplorerSectionsSrv,
        ExplorerComponentsSrv,
        ExplorerContributionsSrv,
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

 //Explorer General
 vm.explorerSrv = new ExplorerSrv();
 vm.constantsSrv = new ConstantsSrv();
 vm.explorer = [];
 vm.explorerId = $stateParams.explorerId;
 vm.subExplorerLimitTo = 5;
 vm.explorerFormDisplay = false;
 vm.newColumnData = {
  title: ""
 };

//Explorer Section
 vm.explorerSections = [];
 vm.explorerSectionsCopy;
 vm.explorerSectionsSrv = new ExplorerSectionsSrv();
 vm.sectionFormDisplay = false;
 vm.defaultExplorerSectionData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 };
 vm.newExplorerSectionData = angular.copy(vm.defaultExplorerSectionData);

//Explorer Component
 vm.explorerComponentBuckets = [];
 vm.explorerComponentsCopy;
 vm.explorerComponentsSrv = new ExplorerComponentsSrv();
 vm.componentFormDisplay = false;
 vm.defaultExplorerComponentData = {
  explorerId: vm.explorerId,
  typeId: level_categories.component.none,
  title: "",
  description: "",
  privacy: 0
 };
 vm.newExplorerComponentData = angular.copy(vm.defaultExplorerComponentData);

//Explorer Contribution
 vm.explorerContributions;
 vm.explorerContributionTypes;
 vm.explorerContributionsCopy;
 vm.constantsSrv = new ConstantsSrv();
 vm.explorerContributionsSrv = new ExplorerContributionsSrv();
 vm.contributionFormDisplay = false;
 vm.defaultExplorerContributionData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 };
 vm.newExplorerContributionData = angular.copy(vm.defaultExplorerContributionData);
 vm.showContributionForm = function () {
  vm.contributionFormDisplay = true;
 };

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


 vm.getExplorer = function (id) {
  vm.explorerSrv.getExplorer(id).then(function (response) {
  });
 };

 vm.defaultExplorerData = {
  explorerId: $stateParams.explorerId,
  privacy: 0
 };
 vm.newExplorerData = angular.copy(vm.defaultExplorerData);


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
 };

 vm.cancelExplorerSection = function (form) {
  vm.sectionFormDisplay = false;
  vm.newExplorerSectionData = angular.copy(vm.defaultExplorerSectionData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

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



 vm.explorerSrv.getSubExplorers(vm.explorerId, level_categories.explorer_relationship.application);

 vm.getSubExplorersStats = function (explorerId) {
  vm.explorerSrv.getSubExplorersStats(explorerId).then(function (data) {
   vm.subExplorersStats = data;
  });
 };


 //Components



 vm.getExplorerComponents = function (explorerId) {
  vm.explorerComponentsSrv.getExplorerComponents(explorerId).then(function (response) {
   vm.explorerComponentBuckets = response;
   /*
    angular.forEach(response, function (subComponent, key) {
    vm.explorerComponentsSrv.getExplorerSubComponents(explorerId, subComponent.component_id).then(function (subComponentResponse) {
    vm.explorerComponentBuckets[key].explorerComponents = subComponentResponse;
    //angularGridInstance.components.refresh();
    });
    });
    */
  });
 };


 vm.createExplorerComponent = function () {
  vm.explorerComponentsSrv.createExplorerComponent(vm.newExplorerComponentData).then(function (response) {
   vm.newExplorerComponentData = angular.copy(vm.defaultExplorerComponentData);
   vm.explorerComponentBuckets.push(response);
  }, function (response) {
   console.log(response);
  });
 };


 vm.editExplorerComponent = function (data) {
  vm.explorerComponentsSrv.editExplorerComponent(data).then(function (response) {
   vm.componentFormDisplay = false;
   vm.newExplorerComponentData = angular.copy(vm.defaultExplorerComponentData);
   vm.explorerComponentsCopy = angular.copy(vm.explorerComponents);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editExplorerComponentSections = {
  details: function (explorerComponentId, detail) {
   var explorerComponentData = {
    explorerComponentId: explorerComponentId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorerComponent(explorerComponentData);
  }
 }

 vm.cancelExplorerComponent = function (form) {
  vm.componentFormDisplay = false;
  vm.newExplorerComponentData = angular.copy(vm.defaultExplorerComponentData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };



 vm.editComponent = function (explorerComponent) {
  vm.editedComponent = explorerComponent;
  // Clone the original explorerComponent to restore it on demand.
  vm.originalComponent = angular.copy(explorerComponent);
 };


 vm.doneEditing = function (explorerComponent) {
  vm.editedComponent = null;
  explorerComponent.title = explorerComponent.title.trim();

  if (!explorerComponent.title) {
   vm.removeComponent(explorerComponent);
  }
 };

 vm.openExplorerComponent = function (explorerComponent) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explorer-component-modal.html',
   controller: 'ExplorerComponentCtrl as explorerComponentCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    explorerComponentData: function () {
     return explorerComponent;
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
 vm.getExplorerComponents(vm.explorerId);

 //Contributors


 vm.createExplorerContribution = function (data) {
  vm.explorerContributionsSrv.createExplorerContribution(data).then(function (response) {
   vm.contributionFormDisplay = false;
   vm.newExplorerContributionData = angular.copy(vm.defaultExplorerContributionData);
   vm.explorerContributionsCopy = angular.copy(vm.explorerContributionsSrv.explorerContributions);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editExplorerContribution = function (data) {
  vm.explorerContributionsSrv.editExplorerContribution(data).then(function (response) {
   vm.contributionFormDisplay = false;
   vm.newExplorerContributionData = angular.copy(vm.defaultExplorerContributionData);
   vm.explorerContributionsCopy = angular.copy(vm.explorerContributionsSrv.explorerContributions);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editExplorerContributionSections = {
  details: function (explorerContributionId, detail) {
   var explorerContributionData = {
    explorerContributionId: explorerContributionId,
    title: detail.title,
    description: detail.description
   };
   vm.editExplorerContribution(explorerContributionData);
  }
 }

 vm.cancelExplorerContribution = function (form) {
  vm.contributionFormDisplay = false;
  vm.newExplorerContributionData = angular.copy(vm.defaultExplorerContributionData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };
 vm.revertExplorerContribution = function (explorerContribution, explorerContributionCopy) {
  explorerContribution = explorerContributionCopy;
  /*
   $filter('filter')
   (vm.explorerContributionsSrv.explorerContributions, {id: explorerContributionId}, true)[0]
   = angular.copy($filter('filter')
   (vm.explorerContributionsCopy, {id: explorerContributionId}, true)[0]);
   if (explorerContribution.length && explorerContributionCopy.length) {
   // vm.explorerContributionsSrv.explorerContributions angular.copy(vm.explorerContributionsCopy);
   }
   */
 };
 vm.editedContribution = null;
 $scope.$watch(angular.bind(this, function () {
  return vm.explorerContributions;
 }), function () {
  //vm.remainingCount = filterFilter(explorerContributions, {completed: false}).length;
  vm.doneCount = vm.explorerContributionsSrv.explorerContributions.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //ExplorerContributionService.put(vm.explorerContributions);
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




 vm.editContribution = function (explorerContribution) {
  vm.editedContribution = explorerContribution;
  // Clone the original explorerContribution to restore it on demand.
  vm.originalContribution = angular.copy(explorerContribution);
 };
 vm.doneEditing = function (explorerContribution) {
  vm.editedContribution = null;
  explorerContribution.title = explorerContribution.title.trim();
  if (!explorerContribution.title) {
   vm.removeContribution(explorerContribution);
  }
 };

 vm.prepareSelectUsers = function (contributionType) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'create-explorer-contribution-modal.html',
   controller: 'CreateExplorerContributionCtrl as createExplorerContributionCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    contributionType: function () {
     return contributionType;
    }
   }
  });
  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 vm.openExplorerContribution = function (explorerContribution) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'explorer-contribution-modal.html',
   controller: 'ExplorerContributionCtrl as explorerContributionCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    explorerContributionData: function () {
     return explorerContribution;
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
 vm.explorerSrv.getExplorer(vm.explorerId).then(function (data) {
  $css.bind({
   href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-' + data.app_type.title + '.css'
  }, $scope);
 });

 vm.constantsSrv.getLevel(level_categories.contribution_types).then(function (data) {
  vm.explorerContributionTypes = data;
 });

 vm.explorerContributionsSrv.getExplorerContributions(vm.explorerId).then(function (data) {
  vm.explorerContributions = data;
 });


 //vm.getSubExplorersStats(vm.explorerId);
};

explorerCtrl.$inject = ['_',
 'level_categories',
 'ConstantsSrv',
 'ExplorerSrv',
 'ExplorerSectionsSrv',
 'ExplorerComponentsSrv',
 'ExplorerContributionsSrv',
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