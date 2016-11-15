(function ()
{
    'use strict';

    angular
        .module('app.mail',
            [
                // 3rd Party Dependencies
                'textAngular'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.mail', {
                abstract: true,
                url     : '/mail',
                resolve : {
                    Folders: function (msApi)
                    {
                        return msApi.resolve('mail.folders@get');
                    },
                    Labels : function (msApi)
                    {
                        return msApi.resolve('mail.labels@get');
                    }
                }
            })
            .state('app.mail.threads', {
                url      : '/{type:(?:label)}/:filter',
                views    : {
                    'content@app': {
                        templateUrl: 'src/app/main/apps/mail/mail.html',
                        controller : 'MailController as vm'
                    }
                },
                params   : {
                    type: {
                        value : null,
                        squash: true
                    }
                },
                bodyClass: 'mail'
            })
            .state('app.mail.threads.thread', {
                url      : '/:threadId',
                bodyClass: 'mail'
            });

        // Translation
        $translatePartialLoaderProvider.addPart('src/app/main/apps/mail');

        // Api
        msApiProvider.register('mail.folders', ['src/app/data/mail/folders.json']);
        msApiProvider.register('mail.labels', ['src/app/data/mail/labels.json']);

        msApiProvider.register('mail.label.notes', ['src/app/data/mail/labels/notes.json']);
        msApiProvider.register('mail.label.paypal', ['src/app/data/mail/labels/paypal.json']);
        msApiProvider.register('mail.label.invoices', ['src/app/data/mail/labels/invoices.json']);
        msApiProvider.register('mail.label.amazon', ['src/app/data/mail/labels/amazon.json']);

        msApiProvider.register('mail.folder.inbox', ['src/app/data/mail/folders/inbox.json']);
        msApiProvider.register('mail.folder.sent', ['src/app/data/mail/folders/sent.json']);
        msApiProvider.register('mail.folder.drafts', ['src/app/data/mail/folders/drafts.json']);
        msApiProvider.register('mail.folder.spam', ['src/app/data/mail/folders/spam.json']);
        msApiProvider.register('mail.folder.trash', ['src/app/data/mail/folders/trash.json']);
        msApiProvider.register('mail.folder.starred', ['src/app/data/mail/folders/starred.json']);
        msApiProvider.register('mail.folder.important', ['src/app/data/mail/folders/important.json']);

        // Navigation
        msNavigationServiceProvider.saveItem('apps.mail', {
            title      : 'Mail',
            icon       : 'icon-email',
            state      : 'app.mail.threads',
            stateParams: {
                filter: 'inbox'
            },
            badge      : {
                content: 25,
                color  : '#F44336'
            },
            weight     : 4
        });
    }
})();