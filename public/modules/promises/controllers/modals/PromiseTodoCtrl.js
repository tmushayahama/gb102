angular.module("app.promises").controller('PromiseTodoCtrl',
        ['PromiseTodoManager',
         'PromiseTodoChecklistManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'promiseTodoData',
         function (
                 PromiseTodoManager,
                 PromiseTodoChecklistManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 promiseTodoData) {
          var vm = this;
          vm.promiseId = promiseTodoData.promise_id;
          vm.promiseTodoId = promiseTodoData.id;
          vm.promiseTodoManager = new PromiseTodoManager();
          vm.promiseTodoChecklistManager = new PromiseTodoChecklistManager();


          vm.todoId = promiseTodoData.todo_id;
          vm.checklistFormVisible = false;

          vm.todoFormDisplay = false;


          vm.defaultTodoChecklistData = {
           todoId: vm.todoId,
           privacy: 0
          }
          vm.newPromiseTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };

          // vm.newPromiseTodoData = vm.defaultPromiseTodoData;

          vm.getPromiseTodo = function (promiseId, todoId) {
           vm.promiseTodoManager.getPromiseTodo(promiseId, todoId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editPromiseTodo = function (data) {
           vm.promiseTodoManager.editPromiseTodo(data).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.editPromiseTodoSections = {
           details: function (details) {
            var promiseTodoData = {
             promiseTodoId: vm.promiseTodoId,
             title: details.title,
             description: details.description
            };
            vm.editPromiseTodo(promiseTodoData);
           }
          }

          vm.getPromiseTodoChecklist = function (todoId) {
           vm.promiseTodoChecklistManager.getPromiseTodoChecklist(todoId).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.showTodoForm = function () {
           vm.todoFormDisplay = true;
          };

          vm.createPromiseTodoChecklistItem = function (data) {
           vm.promiseTodoChecklistManager.createPromiseTodoChecklistItem(data).then(function (response) {
            vm.checklistFormVisible = false;
            vm.newPromiseTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editPromiseTodoChecklistItem = function (data) {
           vm.promiseTodoChecklistManager.editPromiseTodoChecklistItem(data).then(function (response) {
            vm.newPromiseTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editPromiseTodoChecklistItemSections = {
           title: function (checklistId, title) {
            var promiseTodoChecklistItemData = {
             checklistId: checklistId,
             title: title
            };
            vm.editPromiseTodoChecklistItem(promiseTodoChecklistItemData);
           }
          }



          vm.cancelChecklistForm = function (form) {
           vm.checklistFormVisible = false;
           vm.newPromiseTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
           //$scope.user = angular.copy($scope.master);
          };

          $scope.$watch(angular.bind(this, function () {
           return vm.promiseTodoChecklistManager.promiseTodoChecklist;
          }), function () {
           //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
           vm.doneCount = vm.promiseTodoChecklistManager.promiseTodoChecklist.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //TodoChecklistService.put(vm.todoChecklist);
          }, true);

          //--------init------
          vm.getPromiseTodo(vm.promiseId, vm.todoId);
          vm.getPromiseTodoChecklist(vm.todoId);
         }
        ])