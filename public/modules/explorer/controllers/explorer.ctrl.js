
var explorerCtrl = function (
        _,
        level_categories,
        ConstantsSrv,
        ExplorerSrv,
        ExplorerSectionsSrv,
        ComponentsSrv,
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
 vm.appsConstants = [];
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
 vm.componentsSrv = new ComponentsSrv();
 vm.componentFormDisplay = false;
 vm.defaultExplorerComponentData = {
  explorerId: vm.explorerId,
  typeId: level_categories.component.none,
  title: "",
  description: "",
  privacy: 0
 };

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


 vm.getDefaultExplorerComponentData = function (parentComponentId) {
  var result = angular.copy(vm.defaultExplorerComponentData);
  if (parentComponentId) {
   result.parentComponentId = parentComponentId;
  }
  return result;
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
 };

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
 vm.getExplorerComponents = function (explorerId, componentId) {
  vm.componentsSrv.getExplorerComponents(explorerId, componentId, 1).then(function (response) {
   vm.explorerComponentBuckets = response;
   vm.explorerComponentBuckets.newExplorerComponentData = vm.getDefaultExplorerComponentData();
  });
 };

 vm.createExplorerComponent = function (explorerComponentBucket) {
  vm.componentsSrv.createExplorerComponent(explorerComponentBucket.newExplorerComponentData).then(function (response) {

   if (explorerComponentBucket.newExplorerComponentData.parentComponentId) {
    explorerComponentBucket.explorerComponents.push(response);
    explorerComponentBucket.newExplorerComponentData = vm.getDefaultExplorerComponentData(explorerComponentBucket.newExplorerComponentData.parentComponentId);
   } else {
    explorerComponentBucket.explorerComponents.push(response);
    explorerComponentBucket.newExplorerComponentData = vm.getDefaultExplorerComponentData();
   }

  }, function (response) {
   console.log(response);
  });
 };


 vm.editExplorerComponent = function (data) {
  vm.componentsSrv.editExplorerComponent(data).then(function (response) {
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
   size: 'explorer-view',
   resolve: {
    explorerComponentData: function () {
     return angular.copy(explorerComponent);
    },
    appsConstants: function () {
     return vm.appsConstants;
    }
   }
  });

  modalInstance.result.then(function (selectedItem) {
   $scope.selected = selectedItem;
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };


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


 vm.revertExplorerContribution = function (explorerContribution, explorerContributionCopy) {
  explorerContribution = explorerContributionCopy;
 };

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
 vm.getExplorerComponents(vm.explorerId, 0);

 vm.constantsSrv.getConstants().then(function (data) {
  vm.appsConstants = data;
 });

 vm.explorerContributionsSrv.getExplorerContributions(vm.explorerId).then(function (data) {
  vm.explorerContributions = data;
 });

 vm.explorerSrv.getExplorer(vm.explorerId).then(function (data) {
  $css.bind({
   href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-' + data.app_type.title + '.css'
  }, $scope);
 });



 //vm.getSubExplorersStats(vm.explorerId);
};

explorerCtrl.$inject = ['_',
 'level_categories',
 'ConstantsSrv',
 'ExplorerSrv',
 'ExplorerSectionsSrv',
 'ComponentsSrv',
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