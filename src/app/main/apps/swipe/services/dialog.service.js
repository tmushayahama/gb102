(function ()
{
    'use strict';

    angular
        .module('app.swipe')
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
                templateUrl        : 'src/app/main/apps/swipe/dialogs/card/card-dialog.html',
                controller         : 'SwipeCardDialogController',
                controllerAs       : 'vm',
                parent             : $document.find('#swipe'),
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