(function ()
{
 'use strict';

 angular
         .module('app.explorer')
         .controller('ComponentLinearActivitiesController', ComponentLinearActivitiesController);

 /** @ngInject */
 function ComponentLinearActivitiesController(BoardService, $rootScope, $stateParams, $document, $timeout, $scope, $mdSidenav, $mdDialog)
 {
  var vm = this;

  // Data
  vm.componentId = $stateParams.id;
  vm.components = [];//NotesService.data;
  vm.labels = [];//LabelsService.data;
  vm.search = '';
  vm.searchToolbar = false;
  vm.filters = {
   archive: false
  };
  vm.labelFilterIds = [];
  vm.noteListType = 'notes';

  // Methods
  vm.filterChange = filterChange;
  vm.openSearchToolbar = openSearchToolbar;
  vm.closeSearchToolbar = closeSearchToolbar;
  vm.editNote = editNote;
  vm.deleteLabel = deleteLabel;
  vm.toggleSidenav = toggleSidenav;
  //vm.addNewLabel = LabelsService.addLabel;

  //////////

  init();

  // ******************************
  // Internal methods
  // ******************************

  /**
   * Change Notes Filter
   * @param type
   */
  function filterChange(type) {

   vm.noteListType = type;

   if (type === 'notes')
   {
    vm.labelFilterIds = [];
    vm.filters = {
     archive: false
    };
   } else if (type === 'archive')
   {
    vm.labelFilterIds = [];
    vm.filters = {
     archive: true
    };
   } else if (type === 'reminders')
   {
    vm.labelFilterIds = [];
    vm.filters = {
     reminder: '',
     archive: false
    };
   } else if (angular.isObject(type))
   {
    vm.labelFilterIds = [];
    vm.labelFilterIds.push(type.id);
   }

   $mdSidenav('main-sidenav').close();

  }

  /**
   * Edit Note
   * @param ev
   * @param noteId
   */
  function editNote(ev, noteId)
  {
   $mdDialog.show({
    templateUrl: 'src/app/main/apps/notes/dialogs/note/note-dialog.html',
    //parent: $document.find('#notes'),
    controller: 'NoteDialogController',
    controllerAs: 'vm',
    targetEvent: ev,
    clickOutsideToClose: true,
    escapeToClose: true,
    locals: {
     noteId: noteId
    }
   });
  }

  /**
   * Delete Label
   * @param ev
   * @param label
   */
  function deleteLabel(ev, label)
  {
   var confirm = $mdDialog.confirm()
           .title('Are you sure want to delete the label?')
           .htmlContent('The "' + label.name + '" label will be deleted permanently.')
           .ariaLabel('delete label')
           .targetEvent(ev)
           .ok('OK')
           .cancel('CANCEL');

   $mdDialog.show(confirm).then(function ()
   {
    //LabelsService.deleteLabel(label);
   });
  }

  /**
   * Open Search Toolbar
   */
  function openSearchToolbar()
  {
   vm.searchToolbar = true;

   $timeout(function ()
   {
    angular.element($document.find('#search-notes-input')).trigger('focus');

   });

   $document.on('keyup', escKeyEvent);
  }

  /**
   * Close Search Toolbar
   */
  function closeSearchToolbar()
  {
   $scope.$evalAsync(function ()
   {
    vm.searchToolbar = false;
    vm.search = '';
   });

   $document.off('keyup', escKeyEvent);
  }

  /**
   * Escape key event
   */
  function escKeyEvent(e)
  {
   if (e.keyCode === 27)
   {
    closeSearchToolbar();
   }
  }

  /**
   * Toggle sidenav
   *
   * @param sidenavId
   */
  function toggleSidenav(sidenavId)
  {
   $mdSidenav(sidenavId).toggle();
  }

  /**
   * Array prototype
   *
   * Get by id
   *
   * @param value
   * @returns {T}
   */
  Array.prototype.getById = function (value)
  {
   return this.filter(function (x)
   {
    return x.id === value;
   })[0];
  };

  /**
   * Initialize
   */
  function init()
  {
   BoardService.getBoard(vm.componentId, 4).then(function (data) {
    vm.components = data.components;
    vm.components.newComponentData = angular.copy(vm.defaultComponentData);
   });
  }


 }

})();