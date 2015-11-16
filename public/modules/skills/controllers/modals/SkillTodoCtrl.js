angular.module("app.skills").controller('SkillTodoCtrl',
        ['SkillTodoManager',
         'SkillTodoChecklistManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'skillTodoData',
         function (
                 SkillTodoManager,
                 SkillTodoChecklistManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 skillTodoData) {
          var vm = this;
          vm.skillId = skillTodoData.skill_id;
          vm.skillTodoId = skillTodoData.id;
          vm.skillTodoManager = new SkillTodoManager();
          vm.skillTodoChecklistManager = new SkillTodoChecklistManager();


          vm.todoId = skillTodoData.todo_id;
          vm.editDecriptionMode = false;
          vm.addChecklistMode = false;

          vm.todoFormDisplay = false;


          vm.defaultTodoChecklistData = {
           todoId: vm.todoId,
           privacy: 0
          }
          vm.newTodoChecklistData = vm.defaultTodoChecklistData;


          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };

          vm.cancelAddChecklistMode = function () {
           vm.addChecklistMode = false;
          }

          // vm.newSkillTodoData = vm.defaultSkillTodoData;

          vm.getSkillTodo = function (skillId, todoId) {
           vm.skillTodoManager.getSkillTodo(skillId, todoId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editSkillTodo = function (data) {
           vm.skillTodoManager.editSkillTodo(data).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.editSkillTodoSections = {
           details: function (details) {
            var skillTodoData = {
             skillTodoId: vm.skillTodoId,
             title: details.title,
             description: details.description
            };
            vm.editSkillTodo(skillTodoData);
           }
          }

          vm.getSkillTodoChecklist = function (todoId) {
           vm.skillTodoChecklistManager.getSkillTodoChecklist(todoId).then(function (response) {
            vm.todoChecklist = response;
           }, function (response) {
            console.log(response);
           });
          };

          vm.showTodoForm = function () {
           vm.todoFormDisplay = true;
          };

          vm.createSkillTodoChecklistItem = function (data) {
           vm.skillTodoChecklistManager.createSkillTodoChecklistItem(data).then(function (response) {
            vm.addChecklistMode = false;
            vm.newTodoChecklistData = vm.defaultTodoChecklistData;
           }, function (response) {
            console.log(response);
           });
          };

          vm.editTodoChecklist = function (data) {
           vm.skillTodoChecklistService.createTodoChecklist(data).success(function (response) {
            vm.todoChecklist.unshift(response);
           }).error(function (response) {
            console.log(response);
           });
          };

          vm.cancelTodoChecklist = function (form) {
           vm.todoFormDisplay = false;
           vm.newTodoChecklistData = vm.defaultTodoChecklistData;
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
           //$scope.user = angular.copy($scope.master);
          };

          $scope.$watch(angular.bind(this, function () {
           return vm.todoChecklist;
          }), function () {
           //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
           vm.doneCount = vm.todoChecklist.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //TodoChecklistService.put(vm.todoChecklist);
          }, true);

          //--------init------
          vm.getSkillTodo(vm.skillId, vm.todoId);
          vm.getSkillTodoChecklist(vm.todoId);
         }
        ])