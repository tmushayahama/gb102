angular.module("app.hobbys").controller('HobbyNoteCtrl',
        ['HobbyNoteManager',
         '$uibModalInstance',
         '$scope',
         '$state',
         '$stateParams',
         '$http',
         '$rootScope',
         '$location',
         '$log',
         'hobbyNoteData',
         function (
                 HobbyNoteManager,
                 $uibModalInstance,
                 $scope,
                 $state,
                 $stateParams,
                 $http,
                 $rootScope,
                 $location,
                 $log,
                 hobbyNoteData) {
          var vm = this;
          vm.hobbyId = hobbyNoteData.hobby_id;
          vm.hobbyNoteId = hobbyNoteData.id;
          vm.hobbyNoteManager = new HobbyNoteManager();


          vm.noteId = hobbyNoteData.note_id;

          vm.noteFormDisplay = false;




          vm.ok = function () {
           $uibModalInstance.close();
          };

          vm.close = function () {
           $uibModalInstance.dismiss('cancel');
          };

          // vm.newHobbyNoteData = vm.defaultHobbyNoteData;

          vm.getHobbyNote = function (hobbyId, noteId) {
           vm.hobbyNoteManager.getHobbyNote(hobbyId, noteId).then(function (response) {
           }, function (error) {
            console.log(error);
           });
          };

          vm.editHobbyNote = function (data) {
           vm.hobbyNoteManager.editHobbyNote(data).then(function (response) {
           }, function (response) {
            console.log(response);
           });
          };

          vm.editHobbyNoteSections = {
           details: function (details) {
            var hobbyNoteData = {
             hobbyNoteId: vm.hobbyNoteId,
             title: details.title,
             description: details.description
            };
            vm.editHobbyNote(hobbyNoteData);
           }
          }



          vm.showNoteForm = function () {
           vm.noteFormDisplay = true;
          };



          //--------init------
          vm.getHobbyNote(vm.hobbyId, vm.noteId);
         }
        ])