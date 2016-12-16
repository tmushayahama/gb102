(function ()
{
    'use strict';

    angular
        .module('app.explorer')
        .factory('DialogService', DialogService);

    /** @ngInject */
    function DialogService($mdDialog, $document)
    {
        var service = {
            openCardDialog: openCardDialog
        };

        //////////

        /**
         * Open card dialog
         *
         * @param ev
         * @param cardId
         */
        function openCardDialog(ev, cardId)
        {
            $mdDialog.show({
                templateUrl        : 'src/app/main/apps/explorer/dialogs/card/card-dialog.html',
                controller         : 'ExplorerCardDialogController',
                controllerAs       : 'vm',
                parent             : $document.find('#explorer'),
                targetEvent        : ev,
                clickOutsideToClose: true,
                escapeToClose      : true,
                locals             : {
                    cardId: cardId
                }
            });
        }

        return service;
    }
})();