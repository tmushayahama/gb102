var skillWeblinksCtrl = function (
        SkillWeblinksManager,
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
 vm.skillId = $stateParams.skillId;
 vm.skillWeblinksCopy;
 vm.skillWeblinksManager = new SkillWeblinksManager();
 vm.weblinkFormDisplay = false;

 vm.defaultSkillWeblinkData = {
  skillId: $stateParams.skillId,
  privacy: 0
 }
 vm.newSkillWeblinkData = angular.copy(vm.defaultSkillWeblinkData);

 vm.showWeblinkForm = function () {
  vm.weblinkFormDisplay = true;
 };

 vm.createSkillWeblink = function (data) {
  vm.skillWeblinksManager.createSkillWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newSkillWeblinkData = angular.copy(vm.defaultSkillWeblinkData);
   vm.skillWeblinksCopy = angular.copy(vm.skillWeblinksManager.skillWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSkillWeblink = function (data) {
  vm.skillWeblinksManager.editSkillWeblink(data).then(function (response) {
   vm.weblinkFormDisplay = false;
   vm.newSkillWeblinkData = angular.copy(vm.defaultSkillWeblinkData);
   vm.skillWeblinksCopy = angular.copy(vm.skillWeblinksManager.skillWeblinks);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSkillWeblinkSections = {
  details: function (skillWeblinkId, detail) {
   var skillWeblinkData = {
    skillWeblinkId: skillWeblinkId,
    title: detail.title,
    description: detail.description
   };
   vm.editSkillWeblink(skillWeblinkData);
  }
 }

 vm.cancelSkillWeblink = function (form) {
  vm.weblinkFormDisplay = false;
  vm.newSkillWeblinkData = angular.copy(vm.defaultSkillWeblinkData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertSkillWeblink = function (skillWeblink, skillWeblinkCopy) {
  skillWeblink = skillWeblinkCopy;
  /*
   $filter('filter')
   (vm.skillWeblinksManager.skillWeblinks, {id: skillWeblinkId}, true)[0]
   = angular.copy($filter('filter')
   (vm.skillWeblinksCopy, {id: skillWeblinkId}, true)[0]);
   if (skillWeblink.length && skillWeblinkCopy.length) {
   // vm.skillWeblinksManager.skillWeblinks angular.copy(vm.skillWeblinksCopy);
   }
   */
 };






 vm.editedWeblink = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.skillWeblinks;
 }), function () {
  //vm.remainingCount = filterFilter(skillWeblinks, {completed: false}).length;
  vm.doneCount = vm.skillWeblinksManager.skillWeblinks.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //SkillWeblinkService.put(vm.skillWeblinks);
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




 vm.editWeblink = function (skillWeblink) {
  vm.editedWeblink = skillWeblink;
  // Clone the original skillWeblink to restore it on demand.
  vm.originalWeblink = angular.copy(skillWeblink);
 };


 vm.doneEditing = function (skillWeblink) {
  vm.editedWeblink = null;
  skillWeblink.title = skillWeblink.title.trim();

  if (!skillWeblink.title) {
   vm.removeWeblink(skillWeblink);
  }
 };

 vm.openSkillWeblink = function (skillWeblink) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'skill-weblink-modal.html',
   controller: 'SkillWeblinkCtrl as skillWeblinkCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    skillWeblinkData: function () {
     return skillWeblink;
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
 vm.skillWeblinksManager.getSkillWeblinks(vm.skillId);
};

skillWeblinksCtrl.$inject = [
 'SkillWeblinksManager',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.skills").controller('SkillWeblinksCtrl', skillWeblinksCtrl);
