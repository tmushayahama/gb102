(function ()
{
    'use strict';

    angular
        .module('app.explorer')
        .controller('msComponentFormController', msComponentFormController)
        .directive('msComponentForm', msComponentFormDirective);

    /** @ngInject */
    function msComponentFormController($scope, ExplorerService, msUtils, $mdDialog, $timeout, LabelsService)
    {
        var MsComponentForm = this;
        var explorer = ExplorerService.data;

        //Data
        MsComponentForm.type = '';
        MsComponentForm.defaultComponent = {
            'id'         : '',
            'title'      : '',
            'description': '',
            'archive'    : false,
            'image'      : '',
            'color'      : '',
            'time'       : new Date(),
            'reminder'   : null,
            'checklist'  : [],
            'labels'     : []
        };
        MsComponentForm.componentId = '';
        MsComponentForm.editNode = {};
        MsComponentForm.newCheckListItem = '';
        MsComponentForm.checkListForm = false;
        MsComponentForm.labels = LabelsService.data;

        MsComponentForm.ngFlowOptions = {
            singleFile: true
            // You can configure the ngFlow from here
            /*target                   : 'api/media/image',
             chunkSize                : 15 * 1024 * 1024,
             maxChunkRetries          : 1,
             simultaneousUploads      : 1,
             testChunks               : false,
             progressCallbacksInterval: 1000*/
        };
        MsComponentForm.ngFlow = {
            // ng-flow will be injected into here through its directive
            flow: {}
        };

        //Methods
        MsComponentForm.init = init;
        MsComponentForm.submit = submit;
        MsComponentForm.isNotValid = isNotValid;
        MsComponentForm.deleteComponent = deleteComponent;
        MsComponentForm.deleteImage = deleteImage;
        MsComponentForm.addChecklistItem = addChecklistItem;
        MsComponentForm.checklistFormToggle = checklistFormToggle;
        MsComponentForm.deleteCheckItem = deleteCheckItem;
        MsComponentForm.toggleArchive = toggleArchive;
        MsComponentForm.toggleInArray = msUtils.toggleInArray;
        MsComponentForm.exists = msUtils.exists;
        MsComponentForm.upload = upload;
        MsComponentForm.imageSuccess = imageSuccess;

        //////

        /**
         * Initialize
         */
        function init()
        {
            // If form type edit
            if ( MsComponentForm.type === 'edit' )
            {
                MsComponentForm.editNode = explorer.getById(MsComponentForm.componentId);
                MsComponentForm.component = angular.copy(MsComponentForm.editNode);
            }
            // If form type new
            else
            {
                resetForm();
            }
        }

        /**
         * Watch New Component Form, reset form if it is closed
         */
        $scope.$on('MsNewComponent:closed', function ()
        {
            resetForm();
        });

        /**
         * Reset Form
         */
        function resetForm()
        {
            $scope.$evalAsync(function ()
            {
                MsComponentForm.component = angular.copy(MsComponentForm.defaultComponent);
                MsComponentForm.checkListForm = false;
            });
        }

        /**
         * Submit Form
         */
        function submit()
        {
            if ( MsComponentForm.type === 'new' )
            {
                add();
            }
            else if ( MsComponentForm.type === 'edit' )
            {
                save();
            }
        }

        /**
         * Add new component
         */
        function add()
        {
            if ( isNotValid() )
            {
                return;
            }

            // Set default values
            MsComponentForm.component.id = msUtils.guidGenerator();
            MsComponentForm.component.time = new Date();

            // Add the component
            ExplorerService.addComponent(angular.copy(MsComponentForm.component));

            // Reset the current component to an empty one
            MsComponentForm.component = angular.copy(MsComponentForm.defaultComponent);

            $scope.$emit('MsNewComponent:close');
        }

        /**
         * Save Component
         */
        function save()
        {
            if ( isNotValid() )
            {
                return;
            }

            // Update the component
            ExplorerService.updateComponent(MsComponentForm.component);

            // Hide the dialog
            $mdDialog.hide();
        }

        /**
         * Delete Component Image
         */
        function deleteImage()
        {
            MsComponentForm.component.image = '';
        }

        /**
         * Toggle Archive State
         */
        function toggleArchive()
        {
            if ( MsComponentForm.type === 'new' )
            {
                MsComponentForm.component.archive = true;
                submit();
            }
            else if ( MsComponentForm.type === 'edit' )
            {
                MsComponentForm.component.archive = !MsComponentForm.component.archive;
                save();
            }
        }

        /**
         * One of the image, title, description, checklist inputs are should be exist.
         * @returns {boolean}
         */
        function isNotValid()
        {
            return MsComponentForm.component.image === '' && MsComponentForm.component.title === '' && MsComponentForm.component.description === '' && MsComponentForm.component.checklist.length === 0;
        }

        /**
         * Delete Component
         * @param ev
         */
        function deleteComponent(ev)
        {
            var confirm = $mdDialog.confirm()
                .title('Are you sure want to delete the component?')
                .htmlContent('the component will be deleted permanently.')
                .ariaLabel('delete component')
                .targetEvent(ev)
                .ok('OK')
                .cancel('CANCEL');

            $mdDialog.show(confirm).then(function ()
            {
                ExplorerService.deleteComponent(MsComponentForm.component);
            });
        }

        /**
         * Add Checklist Item
         */
        function addChecklistItem()
        {
            if ( MsComponentForm.newCheckListItem === '' )
            {
                return;
            }

            MsComponentForm.component.checklist.push({
                checked: false,
                text   : MsComponentForm.newCheckListItem
            });

            MsComponentForm.newCheckListItem = '';

            focusChecklistInput();
        }

        /**
         * Checklist form toggle
         */
        function checklistFormToggle()
        {
            $scope.$evalAsync(function ()
            {
                MsComponentForm.checkListForm = !MsComponentForm.checkListForm;

                $timeout(function ()
                {
                    focusChecklistInput();
                });
            });
        }

        /**
         * Delete check item
         * @param item
         */
        function deleteCheckItem(item)
        {
            MsComponentForm.component.checklist.splice(MsComponentForm.component.checklist.indexOf(item), 1);
            focusChecklistInput();
        }

        /**
         * Focus checklist input
         */
        function focusChecklistInput()
        {
            angular.element('#new-checklist-item-input').focus();
        }

        /**
         * Upload
         */
        function upload()
        {
            // Set headers
            MsComponentForm.ngFlow.flow.opts.headers = {
                'X-Requested-With': 'XMLHttpRequest',
                //'X-XSRF-TOKEN'    : $cookies.get('XSRF-TOKEN')
            };

            MsComponentForm.ngFlow.flow.upload();
        }

        /**
         * Image Success
         * @param file
         * @param message
         */
        function imageSuccess(file, message)
        {
            var fileReader = new FileReader();

            fileReader.readAsDataURL(file.file);

            fileReader.onload = function (event)
            {
                file.url = event.target.result;

                $scope.$evalAsync(function ()
                {
                    MsComponentForm.component.image = file.url;
                });
            };

            file.type = 'image';
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

    /** @ngInject */
    function msComponentFormDirective()
    {
        return {
            restrict    : 'EA',
            controller  : 'msComponentFormController',
            controllerAs: 'MsComponentForm',
            scope       : {
                componentType: '=',
                componentId  : '='
            },
            templateUrl : 'src/app/main/apps/explorer/directives/ms-component-form/ms-component-form.html',
            link        : function (scope, element, attributes, MsComponentForm)
            {
                // Type
                MsComponentForm.type = scope.componentType;

                // Component id
                if ( angular.isDefined(scope.componentId) )
                {
                    MsComponentForm.componentId = scope.componentId;
                }

                MsComponentForm.init();

            }
        };
    }
})();