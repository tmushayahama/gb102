
var explorerCtrl = function (
        _,
        level_categories,
        ConstantsSrv,
        ComponentsSrv,
        ContributionsSrv,
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

 //Component General
 vm.componentsSrv = new ComponentsSrv();
 vm.constantsSrv = new ConstantsSrv();
 vm.appsConstants = [];
 vm.componentId = $stateParams.componentId;

 //Component
 vm.component = [];
 vm.defaultComponentData = {
  parentComponentId: null,
  typeId: level_categories.component.note,
  title: "",
  description: "",
  privacy: 0
 };

 vm.componentFormDisplay = false;
 vm.newColumnData = {
  title: ""
 };


//Component Contribution
 vm.contributions;
 vm.componentContributionTypes;
 vm.contributionsSrv = new ContributionsSrv();
 vm.contributionFormDisplay = false;
 vm.defaultComponentContributionData = {
  componentId: $stateParams.componentId,
  privacy: 0
 };
 vm.newComponentContributionData = angular.copy(vm.defaultComponentContributionData);
 vm.showContributionForm = function () {
  vm.contributionFormDisplay = true;
 };

 vm.editDescriptionMode = {
  visible: false,
  show: function () {
   vm.editDescriptionMode.visible = true;
   vm.editDescriptionMode.data = {
    componentId: vm.component.id,
    title: vm.component.title,
    description: vm.component.description
   };
  },
  hide: function () {
   vm.editDescriptionMode.visible = false;
  },
  edit: function () {
   vm.componentsSrv.editComponentDescription(vm.editDescriptionMode.data).then(function (response) {
    vm.component.title = response.title;
    vm.component.description = response.description;
    vm.editDescriptionMode.hide();
   }, function (response) {
    console.log(response);
   });
  }
 };


 vm.getDefaultComponentData = function () {
  var result = angular.copy(vm.defaultComponentData);
  //result.parentComponentId = parentComponentId;
  return result;
 };

 vm.editComponentSections = {
  details: function (componentId, detail) {
   var componentData = {
    componentId: componentId,
    title: detail.title,
    description: detail.description
   };
   vm.editComponent(componentData);
  }
 };


 //Component

 vm.getComponent = function (componentId, listFormat) {
  vm.componentsSrv.getComponent(componentId, listFormat).then(function (response) {
   vm.component = response;
   vm.component.newComponentData = vm.getDefaultComponentData(componentId);
   $css.bind({
    href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-' + response.type.title + '.css'
   }, $scope);
  });
 };

 vm.createComponent = function (component) {
  component.newComponentData.parentComponentId = component.id;
  vm.componentsSrv.createComponent(component.newComponentData).then(function (response) {
   if (!component.components) {
    component.components = [];
   }
   component.components.push(response);
   component.newComponentData = vm.getDefaultComponentData();
  }, function (response) {
   console.log(response);
  });
 };


 vm.editComponent = function (data) {
  vm.componentsSrv.editComponent(data).then(function (response) {
   vm.componentFormDisplay = false;
   vm.newComponentData = angular.copy(vm.defaultComponentData);
   vm.componentsCopy = angular.copy(vm.components);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editComponentSections = {
  details: function (componentId, detail) {
   var componentData = {
    componentId: componentId,
    title: detail.title,
    description: detail.description
   };
   vm.editComponent(componentData);
  }
 };

 vm.openComponent = function (componentId) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'component-modal.html',
   controller: 'ComponentCtrl as componentCtrl',
   backdrop: 'static',
   size: 'component-view',
   resolve: {
    componentId: function () {
     return componentId;
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
 vm.createComponentContribution = function (data) {
  vm.contributionsSrv.createComponentContribution(data).then(function (response) {
   vm.contributionFormDisplay = false;
   vm.newComponentContributionData = angular.copy(vm.defaultComponentContributionData);
   vm.contributionsCopy = angular.copy(vm.contributionsSrv.contributions);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editComponentContribution = function (data) {
  vm.contributionsSrv.editComponentContribution(data).then(function (response) {
   vm.contributionFormDisplay = false;
   vm.newComponentContributionData = angular.copy(vm.defaultComponentContributionData);
   vm.contributionsCopy = angular.copy(vm.contributionsSrv.contributions);
  }, function (response) {
   console.log(response);
  });
 };
 vm.editComponentContributionSections = {
  details: function (componentContributionId, detail) {
   var componentContributionData = {
    componentContributionId: componentContributionId,
    title: detail.title,
    description: detail.description
   };
   vm.editComponentContribution(componentContributionData);
  }
 }


 vm.prepareSelectUsers = function (contributionType) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'create-component-contribution-modal.html',
   controller: 'CreateComponentContributionCtrl as createComponentContributionCtrl',
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

 vm.openComponentContribution = function (componentContribution) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'component-contribution-modal.html',
   controller: 'ComponentContributionCtrl as componentContributionCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    componentContributionData: function () {
     return componentContribution;
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

 vm.constantsSrv.getConstants().then(function (data) {
  vm.appsConstants = data;
 });

 vm.contributionsSrv.getComponentContributions(vm.componentId).then(function (data) {
  vm.contributions = data;
 });

 vm.getComponent(vm.componentId, 3);

};

explorerCtrl.$inject = ['_',
 'level_categories',
 'ConstantsSrv',
 'ComponentsSrv',
 'ContributionsSrv',
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