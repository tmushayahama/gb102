angular.module("app.advices").controller('AdviceTodoCtrl',
        ['AdviceTodoManager',
         'AdviceTodoChecklistManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'adviceTodoData',
         function (
                 AdviceTodoManager,
                 AdviceTodoChecklistManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 adviceTodoData) {
          var vm = this;
          vm.adviceId = adviceTodoData.advice_id;
          vm.adviceTodoId = adviceTodoData.id;
          vm.adviceTodoManager = new AdviceTodoManager();
          vm.adviceTodoChecklistManager = new AdviceTodoChecklistManager();


          vm.todoId = adviceTodoData.todo_id;
          vm.checklistFormVisible = false;

          vm.todoFormDisplay = false;


          vm.defaultTodoChecklistData = {
           todoId: vm.todoId,
           privacy: 0
          }
          vm.newAdviceTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);


          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };

          // vm.newAdviceTodoData = vm.defaultAdviceTodoData;

          vm.getAdviceTodo = function (adviceId, todoId) {
           vm.adviceTodoManager.getAdviceTodo(adviceId, todoId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editAdviceTodo = function (data) {
           vm.adviceTodoManager.editAdviceTodo(data).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.editAdviceTodoSections = {
           details: function (details) {
            var adviceTodoData = {
             adviceTodoId: vm.adviceTodoId,
             title: details.title,
             description: details.description
            };
            vm.editAdviceTodo(adviceTodoData);
           }
          }

          vm.getAdviceTodoChecklist = function (todoId) {
           vm.adviceTodoChecklistManager.getAdviceTodoChecklist(todoId).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.showTodoForm = function () {
           vm.todoFormDisplay = true;
          };

          vm.createAdviceTodoChecklistItem = function (data) {
           vm.adviceTodoChecklistManager.createAdviceTodoChecklistItem(data).then(function (response) {
            vm.checklistFormVisible = false;
            vm.newAdviceTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editAdviceTodoChecklistItem = function (data) {
           vm.adviceTodoChecklistManager.editAdviceTodoChecklistItem(data).then(function (response) {
            vm.newAdviceTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editAdviceTodoChecklistItemSections = {
           title: function (checklistId, title) {
            var adviceTodoChecklistItemData = {
             checklistId: checklistId,
             title: title
            };
            vm.editAdviceTodoChecklistItem(adviceTodoChecklistItemData);
           }
          }



          vm.cancelChecklistForm = function (form) {
           vm.checklistFormVisible = false;
           vm.newAdviceTodoChecklistData = angular.copy(vm.defaultTodoChecklistData);
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
           //$scope.user = angular.copy($scope.master);
          };

          $scope.$watch(angular.bind(this, function () {
           return vm.adviceTodoChecklistManager.adviceTodoChecklist;
          }), function () {
           //vm.remainingCount = filterFilter(todoChecklist, {completed: false}).length;
           vm.doneCount = vm.adviceTodoChecklistManager.adviceTodoChecklist.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //TodoChecklistService.put(vm.todoChecklist);
          }, true);

          //--------init------
          vm.getAdviceTodo(vm.adviceId, vm.todoId);
          vm.getAdviceTodoChecklist(vm.todoId);
         }
        ])