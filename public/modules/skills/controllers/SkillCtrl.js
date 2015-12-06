
angular.module("app.skill").controller('SkillCtrl',
        ['SkillManager',
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
                 SskillManager,
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
          vm.sskill = [];
          var skillData = {
          };

          vm.skillManager = new SkillManager();
          vm.skillFormDisplay = false;

          vm.getSkill = function (id, data) {
           SkillManager.get(id, data).success(function (response) {
            vm.skill = response;
           }).error(function (response) {
            console.log(response);
           });
          };

          vm.editSkill = function (data) {
           vm.sskillManager.editSkill(data).then(function (response) {
            vm.skillFormDisplay = false;
            //vm.newSkillData = angular.copy(vm.defaultSkillData);
            //vm.sskillCopy = angular.copy(vm.sskillManager.sskill);
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

          vm.getSkill($stateParams.skillId, skillData);

















          vm.skillId = $stateParams.skillId;
          vm.sskillCopy;
          vm.sskillManager = new SskillManager();
          vm.FormDisplay = false;

          vm.defaultSkillData = {
           skillId: $stateParams.skillId,
           privacy: 0
          }
          vm.newSkillData = angular.copy(vm.defaultSkillData);

          vm.showForm = function () {
           vm.FormDisplay = true;
          };

          vm.createSkill = function (data) {
           vm.sskillManager.createSkill(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newSkillData = angular.copy(vm.defaultSkillData);
            vm.sskillCopy = angular.copy(vm.sskillManager.sskill);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editSkill = function (data) {
           vm.sskillManager.editSkill(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newSkillData = angular.copy(vm.defaultSkillData);
            vm.sskillCopy = angular.copy(vm.sskillManager.sskill);
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
            (vm.sskillManager.sskill, {id: skillId}, true)[0]
            = angular.copy($filter('filter')
            (vm.sskillCopy, {id: skillId}, true)[0]);
            if (skill.length && skillCopy.length) {
            // vm.sskillManager.sskill angular.copy(vm.sskillCopy);
            }
            */
          };






          vm.edited = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.sskill;
          }), function () {
           //vm.remainingCount = filterFilter(sskill, {completed: false}).length;
           vm.doneCount = vm.sskillManager.sskill.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //SkillService.put(vm.sskill);
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

          vm.openSkill = function (skill) {
           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'skill--modal.html',
            controller: 'SkillCtrl as skillCtrl',
            backdrop: 'static',
            size: 'xl',
            resolve: {
             skillData: function () {
              return skill;
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
          vm.sskillManager.getSskill(vm.skillId);
         }
        ])