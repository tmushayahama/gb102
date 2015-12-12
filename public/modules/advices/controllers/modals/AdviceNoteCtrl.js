angular.module("app.advices").controller('AdviceNoteCtrl',
        ['AdviceNoteManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'adviceNoteData',
         function (
                 AdviceNoteManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 adviceNoteData) {
          var vm = this;
          vm.adviceId = adviceNoteData.advice_id;
          vm.adviceNoteId = adviceNoteData.id;
          vm.adviceNoteManager = new AdviceNoteManager();


          vm.noteId = adviceNoteData.note_id;

          vm.noteFormDisplay = false;




          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };

          // vm.newAdviceNoteData = vm.defaultAdviceNoteData;

          vm.getAdviceNote = function (adviceId, noteId) {
           vm.adviceNoteManager.getAdviceNote(adviceId, noteId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editAdviceNote = function (data) {
           vm.adviceNoteManager.editAdviceNote(data).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.editAdviceNoteSections = {
           details: function (details) {
            var adviceNoteData = {
             adviceNoteId: vm.adviceNoteId,
             title: details.title,
             description: details.description
            };
            vm.editAdviceNote(adviceNoteData);
           }
          }



          vm.showNoteForm = function () {
           vm.noteFormDisplay = true;
          };



          //--------init------
          vm.getAdviceNote(vm.adviceId, vm.noteId);
         }
        ])