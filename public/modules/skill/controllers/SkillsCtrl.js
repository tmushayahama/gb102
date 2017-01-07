
var skillsCtrl = function (
        level_categories,
        ConstantsSrv,
        SkillsSrv,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-skill.css'
 }, $scope);

 vm.skillsSrv = new SkillsSrv();
 vm.constantsSrv = new ConstantsSrv();
 vm.skillLevels;


 vm.createSkill = function (data) {
  vm.skillsSrv.createSkill(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newSkillData = angular.copy(vm.defaultSkillData);
   vm.skillsCopy = angular.copy(vm.skillsSrv.skills);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSkill = function (data) {
  vm.skillsSrv.editSkill(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newSkillData = angular.copy(vm.defaultSkillData);
   vm.skillsCopy = angular.copy(vm.skillsSrv.skills);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSkillSections = {
  details: function (skillId, detail) {
   var skillData = {
    skillId: skillId,
    title: detail.title,
    description: detail.description
   };
   vm.editSkill(skillData);
  }
 }

 vm.cancelSkill = function (form) {
  vm.FormDisplay = false;
  vm.newSkillData = angular.copy(vm.defaultSkillData)
  if (form) {
   form.$setPristine();
   form.$setUntouched();
  }
 };

 vm.revertSkill = function (skill, skillCopy) {
  skill = skillCopy;
  /*
   $filter('filter')
   (vm.skillsSrv.skills, {id: skillId}, true)[0]
   = angular.copy($filter('filter')
   (vm.skillsCopy, {id: skillId}, true)[0]);
   if (skill.length && skillCopy.length) {
   // vm.skillsSrv.skills angular.copy(vm.skillsCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.skills;
 }), function () {
  //vm.remainingCount = filterFilter(skills, {completed: false}).length;
  vm.doneCount = vm.skillsSrv.skills.length - vm.remainingCount;
  vm.allChecked = !vm.remainingCount;
  //SkillService.put(vm.skills);
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




 vm.edit = function (skill) {
  vm.edited = skill;
  // Clone the original skill to restore it on demand.
  vm.original = angular.copy(skill);
 };


 vm.doneEditing = function (skill) {
  vm.edited = null;
  skill.title = skill.title.trim();

  if (!skill.title) {
   vm.remove(skill);
  }
 };

 vm.openAddSkillModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-skill-modal.html',
   controller: 'AddSkillCtrl as addSkillCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    skillLevels: function () {
     return vm.skillLevels;
    }
   }
  });

  modalInstance.result.then(function (skill) {
   vm.skillsSrv.createSkill(skill);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 //vm.skillsSrv.getSkills(vm.skillId);
 vm.constantsSrv.getSubLevels(level_categories.skill).then(function (data) {
  vm.skillLevels = data;
 });
};

skillsCtrl.$inject = [
 'level_categories',
 'ConstantsSrv',
 'SkillsSrv',
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

angular.module("app.skills").controller('SkillsCtrl', skillsCtrl);