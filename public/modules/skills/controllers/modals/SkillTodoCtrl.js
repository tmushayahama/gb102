angular.module("app.skills").controller('SkillTodoCtrl',
        ['SkillTodosService',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         'skillTodoData',
         function (
                 SkillTodosService,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 skillTodoData) {
          var vm = this;

          vm.skillId = skillTodoData.skill_id;
          vm.todoId = skillTodoData.todo_id;
          vm.skillTodo;

          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.cancel = function () {
           $uibModalInstance.dismiss('cancel');
          };

          // vm.newSkillTodoData = vm.defaultSkillTodoData;

          vm.getSkillTodo = function (skillId, todoId) {
           SkillTodosService.getSkillTodo(skillId, todoId).success(function (response) {
            vm.skillTodo = response;
           }).error(function (response) {
            console.log(response);
           });
          };

          vm.getSkillTodo(vm.skillId, vm.todoId);
         }
        ])