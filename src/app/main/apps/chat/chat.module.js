(function ()
{
    'use strict';

    angular
        .module('app.chat', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {

        // State
        $stateProvider.state('app.chat', {
            url    : '/chat',
            views  : {
                'content@app': {
                    templateUrl: 'src/app/main/apps/chat/chat.html',
                    controller : 'ChatController as vm'
                }
            },
            resolve: {
                Contacts: function (msApi)
                {
                    return msApi.resolve('chat.contacts@get');
                },
                User    : function (msApi)
                {
                    return msApi.resolve('chat.user@get');
                }
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('src/app/main/apps/chat');

        // Api
        // Contacts data must be alphabatically ordered.
        msApiProvider.register('chat.contacts', ['src/app/data/chat/contacts.json']);
        msApiProvider.register('chat.chats', ['src/app/data/chat/chats/:id.json']);
        msApiProvider.register('chat.user', ['src/app/data/chat/user.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('apps.chat', {
            title : 'Chat',
            icon  : 'icon-hangouts',
            state : 'app.chat',
            badge : {
                content: 13,
                color  : '#09d261'
            },
            weight: 5
        });
    }

})();