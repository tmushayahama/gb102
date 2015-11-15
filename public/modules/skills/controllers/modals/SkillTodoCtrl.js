angular.module("app.skills").controller('SkillTodoCtrl',
        ['SkillTodosService',
         'TodoChecklistService',
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
                 TodoChecklistService,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 skillTodoData) {
          var vm = this;

          vm.skillTodoId = skillTodoData.id;
          vm.skillId = skillTodoData.skill_id;
          vm.todoId = skillTodoData.todo_id;
          vm.editDecriptionMode = false;
          vm.addChecklistMode = false;
          vm.skillTodoBackUp;
          vm.skillTodo;

          vm.todoChecklist = [];
          vm.todoFormDisplay = false;

          vm.sectionedData = {
           skillTodoDetails: {
            skillTodoId: vm.skillTodoId
           }
          }

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

          vm.enterEditDescriptionMode = function () {
           vm.editDecriptionMode = true;
           vm.skillTodoBackUp = vm.skillTodo;
          }

          vm.enterAddChecklistMode = function () {
           vm.addChecklistMode = true;
           vm.skillTodoBackUp = vm.skillTodo;
          }

          vm.cancelEditDescriptionMode = function () {
           vm.editDecriptionMode = false;
          }

          vm.cancelAddChecklistMode = function () {
           vm.addChecklistMode = false;
          }

          // vm.newSkillTodoData = vm.defaultSkillTodoData;

          vm.getSkillTodo = function (skillId, todoId) {
           SkillTodosService.getSkillTodo(skillId, todoId).success(function (response) {
            vm.skillTodo = response;
            vm.sectionedData.skillTodoDetails.title = vm.skillTodo.todo.title;
            vm.sectionedData.skillTodoDetails.description = vm.skillTodo.todo.description;
           }).error(function (response) {
            console.log(response);
           });
          };


          vm.getTodoChecklist = function (todoId) {
           TodoChecklistService.getTodoChecklist(todoId).success(function (response) {
            vm.todoChecklist = response;
           }).error(function (response) {
            console.log(response);
           });
          };

          vm.showTodoForm = function () {
           vm.todoFormDisplay = true;
          };

          vm.editSkillTodo = function (data) {
           SkillTodosService.editSkillTodo(data).success(function (response) {
            vm.skillTodo = response;
           }).error(function (response) {
            console.log(response);
           });
          };

          vm.createTodoChecklist = function (data) {
           TodoChecklistService.createTodoChecklist(data).success(function (response) {
            vm.todoChecklist.unshift(response);
            vm.addChecklistMode = false;
            vm.newTodoChecklistData = vm.defaultTodoChecklistData;
           }).error(function (response) {
            console.log(response);
           });
          };

          vm.editTodoChecklist = function (data) {
           TodoChecklistService.createTodoChecklist(data).success(function (response) {
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






          vm.editedTodo = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.todoChecklist;
          }), function () {
           //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
           vm.doneCount = vm.todoChecklist.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //TodoChecklistService.put(vm.todoChecklist);
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




          vm.editTodo = function (todoChecklist) {
           vm.editedTodo = todoChecklist;
           // Clone the original todoChecklist to restore it on demand.
           vm.originalTodo = angular.copy(todoChecklist);
          };


          vm.doneEditing = function (todoChecklist) {
           vm.editedTodo = null;
           todoChecklist.title = todoChecklist.title.trim();

           if (!todoChecklist.title) {
            vm.removeTodo(todoChecklist);
           }
          };

          vm.revertEditing = function (todoChecklist) {
           vm.todoChecklist[vm.todoChecklist.indexOf(todoChecklist)] = vm.originalTodo;
           vm.doneEditing(vm.originalTodo);
          };

          vm.removeTodo = function (todoChecklist) {
           vm.todoChecklist.splice(vm.todoChecklist.indexOf(todoChecklist), 1);
          };


          vm.clearDoneTodos = function () {
           vm.todoChecklist = vm.todoChecklist = vm.todoChecklist.filter(function (val) {
            return !val.completed;
           });
          };


          vm.markAll = function (done) {
           vm.todoChecklist.forEach(function (todoChecklist) {
            todoChecklist.completed = done;
           });
          };

          vm.items = ['item1', 'item2', 'item3'];


          vm.openTodoChecklist = function (todoChecklist) {

           var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'todo-todo-modal.html',
            controller: 'TodoChecklistCtrl as todoChecklistCtrl',
            backdrop: 'static',
            size: 'xl',
            resolve: {
             todoChecklistData: function () {
              return todoChecklist;
             }
            }
           });

           modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
           }, function () {
            $log.info('Modal dismissed at: ' + new Date());
           });
          };

          $scope.toggleAnimation = function () {
           $scope.animationsEnabled = !$scope.animationsEnabled;
          };


          //--------init------
          vm.getSkillTodo(vm.skillId, vm.todoId);
          vm.getTodoChecklist(vm.todoId);
         }
        ])