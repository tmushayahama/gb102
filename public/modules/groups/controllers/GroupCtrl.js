
var groupCtrl = function (
        _,
        ConstantsManager,
        GroupManager,
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

 vm.group = [];
 var groupData = {
 };

 vm.range = function (min, max) {
  return _.range(min, max);
 };

 vm.groupIcons = [];
 vm.groupIconsArray = [];

 var getRand = function (min, max) {
  return Math.floor((Math.random() * max) + min);
 }

 vm.getRandomGroupIcons = function () {
  for (var i = 0; i < 5; i++) {
   var rowArray = [];
   for (var j = 0; j < vm.groupIcons.length; j++) {
    var rand = getRand(0, vm.groupIcons.length);
    rowArray.push(vm.groupIcons[rand].name);
   }
   vm.groupIconsArray.push(rowArray);
  }
 };


 vm.groupId = $stateParams.groupId;

 vm.groupManager = new GroupManager();
 vm.constantsManager = new ConstantsManager();

 vm.groupFormDisplay = false;

 vm.getGroup = function (id, data) {
  vm.groupManager.getGroup(id, data).success(function (response) {
   vm.group = response;
  }).error(function (response) {
   console.log(response);
  });
 };




 vm.defaultGroupData = {
  groupId: $stateParams.groupId,
  privacy: 0
 }
 vm.newGroupData = angular.copy(vm.defaultGroupData);

 vm.showForm = function () {
  vm.FormDisplay = true;
 };

 vm.createGroup = function (data) {
  vm.groupManager.createGroup(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newGroupData = angular.copy(vm.defaultGroupData);
   vm.groupCopy = angular.copy(vm.groupManager.group);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editGroup = function (data) {
  vm.groupManager.editGroup(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newGroupData = angular.copy(vm.defaultGroupData);
   vm.groupCopy = angular.copy(vm.groupManager.group);
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
   (vm.groupManager.group, {id: groupId}, true)[0]
   = angular.copy($filter('filter')
   (vm.groupCopy, {id: groupId}, true)[0]);
   if (group.length && groupCopy.length) {
   // vm.groupManager.group angular.copy(vm.groupCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.group;
 }), function () {
  //vm.remainingCount = filterFilter(group, {completed: false}).length;
  vm.doneCount = vm.groupManager.group.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //GroupService.put(vm.group);
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

 //--------init------
 vm.groupManager.getGroup(vm.groupId);
 vm.constantsManager.getIcons(1).then(function (data) {
  vm.groupIcons = data;
  vm.getRandomGroupIcons();
 });
};

groupCtrl.$inject = ['_',
 'ConstantsManager',
 'GroupManager',
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

angular.module("app.groups").controller('GroupCtrl', groupCtrl);