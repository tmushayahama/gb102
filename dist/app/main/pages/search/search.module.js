(function ()
{
    'use strict';

    angular
        .module('app.pages.search', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.pages_search', {
            url      : '/pages/search',
            views    : {
                'content@app': {
                    templateUrl: 'src/app/main/pages/search/search.html',
                    controller : 'SearchController as vm'
                }
            },
            resolve  : {
                Classic : function (msApi)
                {
                    return msApi.resolve('search.classic@get');
                },
                Mails   : function (msApi)
                {
                    return msApi.resolve('search.mails@get');
                },
                Users   : function (msApi)
                {
                    return msApi.resolve('search.users@get');
                },
                Contacts: function (msApi)
                {
                    return msApi.resolve('search.contacts@get');
                }
            },
            bodyClass: 'search'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('src/app/main/pages/search');

        // Api
        msApiProvider.register('search.classic', ['src/app/data/search/classic.json']);
        msApiProvider.register('search.mails', ['src/app/data/search/mails.json']);
        msApiProvider.register('search.users', ['src/app/data/search/users.json']);
        msApiProvider.register('search.contacts', ['src/app/data/search/contacts.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('pages.search', {
            title : 'Search',
            icon  : 'icon-magnify',
            state : 'app.pages_search',
            weight: 7
        });
    }

})();