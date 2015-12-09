
angular.module("app.skills").controller('SkillCtrl',
        ['ConstantsManager',
         'SkillManager',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$uibModal',
         '$log',
         '$filter',
         function (
                 ConstantsManager,
                 SkillManager,
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
          vm.skill = [];
          var skillData = {
          };


          vm.skillId = $stateParams.skillId;

          vm.skillManager = new SkillManager();
          vm.constantsManager = new ConstantsManager();

          vm.skillFormDisplay = false;

          vm.getSkill = function (id, data) {
           vm.skillManager.getSkill(id, data).success(function (response) {
            vm.skill = response;
           }).error(function (response) {
            console.log(response);
           });
          };




          vm.defaultSkillData = {
           skillId: $stateParams.skillId,
           privacy: 0
          }
          vm.newSkillData = angular.copy(vm.defaultSkillData);

          vm.showForm = function () {
           vm.FormDisplay = true;
          };

          vm.createSkill = function (data) {
           vm.skillManager.createSkill(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newSkillData = angular.copy(vm.defaultSkillData);
            vm.skillCopy = angular.copy(vm.skillManager.skill);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editSkill = function (data) {
           vm.skillManager.editSkill(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newSkillData = angular.copy(vm.defaultSkillData);
            vm.skillCopy = angular.copy(vm.skillManager.skill);
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
            (vm.skillManager.skill, {id: skillId}, true)[0]
            = angular.copy($filter('filter')
            (vm.skillCopy, {id: skillId}, true)[0]);
            if (skill.length && skillCopy.length) {
            // vm.skillManager.skill angular.copy(vm.skillCopy);
            }
            */
          };






          vm.edited = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.skill;
          }), function () {
           //vm.remainingCount = filterFilter(skill, {completed: false}).length;
           vm.doneCount = vm.skillManager.skill.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //SkillService.put(vm.skill);
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





          //--------init------
          vm.skillManager.getSkill(vm.skillId);
          vm.constantsManager.getLevel('SK1');
         }
        ])