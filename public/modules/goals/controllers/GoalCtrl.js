
angular.module("app.goals").controller('GoalCtrl',
        ['ConstantsManager',
         'GoalManager',
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
                 GoalManager,
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
          vm.goal = [];
          var goalData = {
          };


          vm.goalId = $stateParams.goalId;

          vm.goalManager = new GoalManager();
          vm.constantsManager = new ConstantsManager();

          vm.goalFormDisplay = false;

          vm.getGoal = function (id, data) {
           vm.goalManager.getGoal(id, data).success(function (response) {
            vm.goal = response;
           }).error(function (response) {
            console.log(response);
           });
          };




          vm.defaultGoalData = {
           goalId: $stateParams.goalId,
           privacy: 0
          }
          vm.newGoalData = angular.copy(vm.defaultGoalData);

          vm.showForm = function () {
           vm.FormDisplay = true;
          };

          vm.createGoal = function (data) {
           vm.goalManager.createGoal(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newGoalData = angular.copy(vm.defaultGoalData);
            vm.goalCopy = angular.copy(vm.goalManager.goal);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editGoal = function (data) {
           vm.goalManager.editGoal(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newGoalData = angular.copy(vm.defaultGoalData);
            vm.goalCopy = angular.copy(vm.goalManager.goal);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editGoalSections = {
           details: function (goalId, detail) {
            var goalData = {
             goalId: goalId,
             title: detail.title,
             description: detail.description
            };
            vm.editGoal(goalData);
           }
          }

          vm.cancelGoal = function (form) {
           vm.FormDisplay = false;
           vm.newGoalData = angular.copy(vm.defaultGoalData)
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
          };

          vm.revertGoal = function (goal, goalCopy) {
           goal = goalCopy;
           /*
            $filter('filter')
            (vm.goalManager.goal, {id: goalId}, true)[0]
            = angular.copy($filter('filter')
            (vm.goalCopy, {id: goalId}, true)[0]);
            if (goal.length && goalCopy.length) {
            // vm.goalManager.goal angular.copy(vm.goalCopy);
            }
            */
          };






          vm.edited = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.goal;
          }), function () {
           //vm.remainingCount = filterFilter(goal, {completed: false}).length;
           vm.doneCount = vm.goalManager.goal.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //GoalService.put(vm.goal);
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




          vm.edit = function (goal) {
           vm.edited = goal;
           // Clone the original goal to restore it on demand.
           vm.original = angular.copy(goal);
          };


          vm.doneEditing = function (goal) {
           vm.edited = null;
           goal.title = goal.title.trim();

           if (!goal.title) {
            vm.remove(goal);
           }
          };





          //--------init------
          vm.goalManager.getGoal(vm.goalId);
          vm.constantsManager.getLevel('SK1');
         }
        ])