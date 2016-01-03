
var groupsCtrl = function (
        level_categories,
        ConstantsManager,
        GroupsManager,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-group.css'
 }, $scope);

 vm.groupsManager = new GroupsManager();
 vm.constantsManager = new ConstantsManager();
 vm.groupLevels;


 vm.createGroup = function (data) {
  vm.groupsManager.createGroup(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newGroupData = angular.copy(vm.defaultGroupData);
   vm.groupsCopy = angular.copy(vm.groupsManager.groups);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroup = function (data) {
  vm.groupsManager.editGroup(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newGroupData = angular.copy(vm.defaultGroupData);
   vm.groupsCopy = angular.copy(vm.groupsManager.groups);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroupSections = {
  details: function (groupId, detail) {
   var groupData = {
    groupId: groupId,
    title: detail.title,
    description: detail.description
   };
   vm.editGroup(groupData);
  }
 }

 vm.cancelGroup = function (form) {
  vm.FormDisplay = false;
  vm.newGroupData = angular.copy(vm.defaultGroupData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertGroup = function (group, groupCopy) {
  group = groupCopy;
  /*
   $filter('filter')
   (vm.groupsManager.groups, {id: groupId}, true)[0]
   = angular.copy($filter('filter')
   (vm.groupsCopy, {id: groupId}, true)[0]);
   if (group.length && groupCopy.length) {
   // vm.groupsManager.groups angular.copy(vm.groupsCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.groups;
 }), function () {
  //vm.remainingCount = filterFilter(groups, {completed: false}).length;
  vm.doneCount = vm.groupsManager.groups.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //GroupService.put(vm.groups);
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




 vm.edit = function (group) {
  vm.edited = group;
  // Clone the original group to restore it on demand.
  vm.original = angular.copy(group);
 };


 vm.doneEditing = function (group) {
  vm.edited = null;
  group.title = group.title.trim();

  if (!group.title) {
   vm.remove(group);
  }
 };

 vm.openAddGroupModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-group-modal.html',
   controller: 'AddGroupCtrl as addGroupCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    groupLevels: function () {
     return vm.groupLevels;
    }
   }
  });

  modalInstance.result.then(function (group) {
   vm.groupsManager.createGroup(group);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 //vm.groupsManager.getGroups(vm.groupId);
 vm.constantsManager.getLevel(level_categories.group).then(function (data) {
  vm.groupLevels = data;
 });
};

groupsCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'GroupsManager',
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

angular.module("app.groups").controller('GroupsCtrl', groupsCtrl);