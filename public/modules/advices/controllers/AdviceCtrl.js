
angular.module("app.advices").controller('AdviceCtrl',
        ['_',
         'ConstantsManager',
         'AdviceManager',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$uibModal',
         '$log',
         '$filter',
         '$css',
         function (
                 _,
                 ConstantsManager,
                 AdviceManager,
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
           href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-6.css'
          }, $scope);

          vm.advice = [];
          var adviceData = {
          };

          vm.range = function (min, max) {
           return _.range(min, max);
          };

          vm.adviceIcons = [];
          vm.adviceIconsArray = [];

          var getRand = function (min, max) {
           return Math.floor((Math.random() * max) + min);
          }

          vm.getRandomAdviceIcons = function () {
           for (var i = 0; i < 5; i++) {
            var rowArray = [];
            for (var j = 0; j < vm.adviceIcons.length; j++) {
             var rand = getRand(0, vm.adviceIcons.length);
             rowArray.push(vm.adviceIcons[rand].name);
            }
            vm.adviceIconsArray.push(rowArray);
           }
          };


          vm.adviceId = $stateParams.adviceId;

          vm.adviceManager = new AdviceManager();
          vm.constantsManager = new ConstantsManager();

          vm.adviceFormDisplay = false;

          vm.getAdvice = function (id, data) {
           vm.adviceManager.getAdvice(id, data).success(function (response) {
            vm.advice = response;
           }).error(function (response) {
            console.log(response);
           });
          };




          vm.defaultAdviceData = {
           adviceId: $stateParams.adviceId,
           privacy: 0
          }
          vm.newAdviceData = angular.copy(vm.defaultAdviceData);

          vm.showForm = function () {
           vm.FormDisplay = true;
          };

          vm.createAdvice = function (data) {
           vm.adviceManager.createAdvice(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newAdviceData = angular.copy(vm.defaultAdviceData);
            vm.adviceCopy = angular.copy(vm.adviceManager.advice);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editAdvice = function (data) {
           vm.adviceManager.editAdvice(data).then(function (response) {
            vm.FormDisplay = false;
            vm.newAdviceData = angular.copy(vm.defaultAdviceData);
            vm.adviceCopy = angular.copy(vm.adviceManager.advice);
           }, function (response) {
            console.log(response);
           });
          };

          vm.editAdviceSections = {
           details: function (adviceId, detail) {
            var adviceData = {
             adviceId: adviceId,
             title: detail.title,
             description: detail.description
            };
            vm.editAdvice(adviceData);
           }
          }

          vm.cancelAdvice = function (form) {
           vm.FormDisplay = false;
           vm.newAdviceData = angular.copy(vm.defaultAdviceData)
           if (form) {
            form.$setPristine();
            form.$setUntouched();
           }
          };

          vm.revertAdvice = function (advice, adviceCopy) {
           advice = adviceCopy;
           /*
            $filter('filter')
            (vm.adviceManager.advice, {id: adviceId}, true)[0]
            = angular.copy($filter('filter')
            (vm.adviceCopy, {id: adviceId}, true)[0]);
            if (advice.length && adviceCopy.length) {
            // vm.adviceManager.advice angular.copy(vm.adviceCopy);
            }
            */
          };






          vm.edited = null;

          $scope.$watch(angular.bind(this, function () {
           return vm.advice;
          }), function () {
           //vm.remainingCount = filterFilter(advice, {completed: false}).length;
           vm.doneCount = vm.adviceManager.advice.length - vm.remainingCount;
           vm.allChecked = !vm.remainingCount;
           //AdviceService.put(vm.advice);
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




          vm.edit = function (advice) {
           vm.edited = advice;
           // Clone the original advice to restore it on demand.
           vm.original = angular.copy(advice);
          };


          vm.doneEditing = function (advice) {
           vm.edited = null;
           advice.title = advice.title.trim();

           if (!advice.title) {
            vm.remove(advice);
           }
          };





          //--------init------
          vm.adviceManager.getAdvice(vm.adviceId);
          vm.constantsManager.getIcons(1).then(function (data) {
           vm.adviceIcons = data;
           vm.getRandomAdviceIcons();
          });
         }
        ])