(function ()
{
    'use strict';

    angular
        .module('app.components')
        .controller('ComponentsController', ComponentsController);

    /** @ngInject */
    function ComponentsController($document, $timeout, $scope, $mdSidenav, ComponentService, LabelsService, $mdDialog)
    {
        var vm = this;

        // Data
        vm.components = ComponentService.data;
        vm.labels = LabelsService.data;
        vm.search = '';
        vm.searchToolbar = false;
        vm.filters = {
            archive: false
        };
        vm.labelFilterIds = [];
        vm.componentListType = 'components';

        // Methods
        vm.filterChange = filterChange;
        vm.openSearchToolbar = openSearchToolbar;
        vm.closeSearchToolbar = closeSearchToolbar;
        vm.editComponent = editComponent;
        vm.deleteLabel = deleteLabel;
        vm.toggleSidenav = toggleSidenav;
        vm.addNewLabel = LabelsService.addLabel;

        //////////

        /**
         * Change Components Filter
         * @param type
         */
        function filterChange(type)
        {

            vm.componentListType = type;

            if ( type === 'components' )
            {
                vm.labelFilterIds = [];
                vm.filters = {
                    archive: false
                };
            }
            else if ( type === 'archive' )
            {
                vm.labelFilterIds = [];
                vm.filters = {
                    archive: true
                };
            }
            else if ( type === 'reminders' )
            {
                vm.labelFilterIds = [];
                vm.filters = {
                    reminder: '',
                    archive : false
                };
            }
            else if ( angular.isObject(type) )
            {
                vm.labelFilterIds = [];
                vm.labelFilterIds.push(type.id);
            }

            $mdSidenav('main-sidenav').close();

        }

        /**
         * Edit Component
         * @param ev
         * @param componentId
         */
        function editComponent(ev, componentId)
        {
            $mdDialog.show({
                template           : '<md-dialog ms-scroll><ms-component-form component-type="\'edit\'" component-id="\'' + componentId + '\'"></ms-component-form></md-dialog>',
                parent             : $document.find('#components'),
                targetEvent        : ev,
                clickOutsideToClose: true,
                escapeToClose      : true
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
                LabelsService.deleteLabel(label);
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
                angular.element($document.find('#search-components-input')).trigger('focus');

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
            if ( e.keyCode === 27 )
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

    }

})();