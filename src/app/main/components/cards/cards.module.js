(function ()
{
    'use strict';

    angular
        .module('app.components.cards', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider)
    {
        $stateProvider.state('app.components_cards', {
            url    : '/components/cards',
            views  : {
                'content@app': {
                    templateUrl: 'src/app/main/components/cards/cards.html',
                    controller : 'CardsController as vm'
                }
            },
            resolve: {
                Cards: function (msApi)
                {
                    return msApi.resolve('cards@get');
                }
            }
        });

        // Api
        msApiProvider.register('cards', ['src/app/data/cards/cards.json']);
    }

})();