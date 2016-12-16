(function ()
{
    'use strict';

    angular
        .module('app.matcher')
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
                templateUrl        : 'src/app/main/apps/matcher/dialogs/card/card-dialog.html',
                controller         : 'MatcherCardDialogController',
                controllerAs       : 'vm',
                parent             : $document.find('#matcher'),
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