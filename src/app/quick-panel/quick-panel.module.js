(function ()
{
    'use strict';

    angular
        .module('app.quick-panel', [])
        .config(config);

    /** @ngInject */
    function config($translatePartialLoaderProvider, msApiProvider)
    {
        // Translation
        $translatePartialLoaderProvider.addPart('src/app/quick-panel');

        // Api
        msApiProvider.register('quickPanel.activities', ['src/app/data/quick-panel/activities.json']);
        msApiProvider.register('quickPanel.contacts', ['src/app/data/quick-panel/contacts.json']);
        msApiProvider.register('quickPanel.events', ['src/app/data/quick-panel/events.json']);
        msApiProvider.register('quickPanel.notes', ['src/app/data/quick-panel/notes.json']);
    }
})();
