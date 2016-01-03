
var skillsCtrl = function (
        level_categories,
        ConstantsManager,
        SkillsManager,
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-1.css'
 }, $scope);

 vm.skillsManager = new SkillsManager();
 vm.constantsManager = new ConstantsManager();
 vm.skillLevels;


 vm.createSkill = function (data) {
  vm.skillsManager.createSkill(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newSkillData = angular.copy(vm.defaultSkillData);
   vm.skillsCopy = angular.copy(vm.skillsManager.skills);
  }, function (response) {
   console.log(response);
  });
 };

 vm.editSkill = function (data) {
  vm.skillsManager.editSkill(data).then(function (response) {
   vm.FormDisplay = false;
   vm.newSkillData = angular.copy(vm.defaultSkillData);
   vm.skillsCopy = angular.copy(vm.skillsManager.skills);
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
   (vm.skillsManager.skills, {id: skillId}, true)[0]
   = angular.copy($filter('filter')
   (vm.skillsCopy, {id: skillId}, true)[0]);
   if (skill.length && skillCopy.length) {
   // vm.skillsManager.skills angular.copy(vm.skillsCopy);
   }
   */
 };






 vm.edited = null;

 $scope.$watch(angular.bind(this, function () {
  return vm.skills;
 }), function () {
  //vm.remainingCount = filterFilter(skills, {completed: false}).length;
  vm.doneCount = vm.skillsManager.skills.length - vm.remainingCount;
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
   vm.skillsManager.createSkill(skill);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 //--------init------
 //vm.skillsManager.getSkills(vm.skillId);
 vm.constantsManager.getLevel(level_categories.skill).then(function (data) {
  vm.skillLevels = data;
 });
};

skillsCtrl.$inject = [
 'level_categories',
 'ConstantsManager',
 'SkillsManager',
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