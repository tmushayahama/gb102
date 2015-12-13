angular.module("app.goals").controller('GoalTodoCtrl',
        ['GoalTodoManager',
         'GoalTodoChecklistManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'goalTodoData',
         function (
                 GoalTodoManager,
                 GoalTodoChecklistManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 goalTodoData) {
          var vm = this;
          vm.goalId = goalTodoData.goal_id;
          vm.goalTodoId = goalTodoData.id;
          vm.goalTodoManager = new GoalTodoManager();
          vm.goalTodoChecklistManager = new GoalTodoChecklistManager();


          vm.todoId = goalTodoData.todo_id;
          vm.checklistFormVisible = false;

          vm.todoFormDisplay = false;


          vm.defaultTodoChecklistData = {
           todoId: vm.todoId,
           privacy: 0
          }
          vm.newGoalTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };

          // vm.newGoalTodoData = vm.defaultGoalTodoData;

          vm.getGoalTodo = function (goalId, todoId) {
           vm.goalTodoManager.getGoalTodo(goalId, todoId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editGoalTodo = function (data) {
           vm.goalTodoManager.editGoalTodo(data).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.editGoalTodoSections = {
           details: function (details) {
            var goalTodoData = {
             goalTodoId: vm.goalTodoId,
             title: details.title,
             description: details.description
            };
            vm.editGoalTodo(goalTodoData);
           }
          }

          vm.getGoalTodoChecklist = function (todoId) {
           vm.goalTodoChecklistManager.getGoalTodoChecklist(todoId).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.showTodoForm = function () {
           vm.todoFormDisplay = true;
          };

          vm.createGoalTodoChecklistItem = function (data) {
           vm.goalTodoChecklistManager.createGoalTodoChecklistItem(data).then(function (response) {
            vm.checklistFormVisible = false;
            vm.newGoalTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editGoalTodoChecklistItem = function (data) {
           vm.goalTodoChecklistManager.editGoalTodoChecklistItem(data).then(function (response) {
            vm.newGoalTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editGoalTodoChecklistItemSections = {
           title: function (checklistId, title) {
            var goalTodoChecklistItemData = {
             checklistId: checklistId,
             title: title
            };
            vm.editGoalTodoChecklistItem(goalTodoChecklistItemData);
           }
          }



          vm.cancelChecklistForm = function (form) {
           vm.checklistFormVisible = false;
           vm.newGoalTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
           //$scope.user = angular.copy($scope.master);
          };

          $scope.$watch(angular.bind(this, function () {
           return vm.goalTodoChecklistManager.goalTodoChecklist;
          }), function () {
           //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
           vm.doneCount = vm.goalTodoChecklistManager.goalTodoChecklist.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //TodoChecklistService.put(vm.todoChecklist);
          }, true);

          //--------init------
          vm.getGoalTodo(vm.goalId, vm.todoId);
          vm.getGoalTodoChecklist(vm.todoId);
         }
        ])