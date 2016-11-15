(function ()
{
    'use strict';

    angular
        .module('app.explorer')
        .factory('LabelsService', LabelsService);

    /** @ngInject */
    function LabelsService(msUtils, ExplorerService, msApi, $q)
    {
        var service = {
            data       : [],
            addLabel   : addLabel,
            updateLabel: updateLabel,
            deleteLabel: deleteLabel,
            getData    : getData
        };

        /**
         * Add label
         * @param newLabel
         */
        function addLabel(newLabel)
        {
            if ( newLabel.name === '' )
            {
                return;
            }

            service.data.push({
                id   : msUtils.guidGenerator(),
                name : newLabel.name,
                color: newLabel.color || ''
            });
        }

        /**
         * Update Label
         * @param component
         */
        function updateLabel(component)
        {
            for ( var i = 0; i < service.data.length; i++ )
            {
                if ( service.data[i].id === component.id )
                {
                    service.data[i] = component;
                }
            }
        }

        /**
         * Delete Label
         * @param label
         */
        function deleteLabel(label)
        {
            var explorer = ExplorerService.data;

            // Look for all explorer if they have the labels
            for ( var j = 0; j < explorer.length; j++ )
            {
                if ( explorer[j].labels.indexOf(label.id) > -1 )
                {
                    explorer[j].labels.splice(explorer[j].labels.indexOf(label.id), 1);
                }
            }

            // Delete label from service data
            for ( var i = 0; i < service.data.length; i++ )
            {
                if ( service.data[i].id === label.id )
                {
                    service.data.splice(i, 1);
                }
            }

        }

        /**
         * Get service data
         * @returns {Array}
         */
        function getData()
        {
            // Create a new deferred object
            var deferred = $q.defer();

            msApi.request('explorer.labels@get', {},
                // SUCCESS
                function (response)
                {
                    // Attach the data
                    service.data = response.data;

                    // Resolve the promise
                    deferred.resolve(response);
                },

                // ERROR
                function (response)
                {
                    // Reject the promise
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        return service;

    }
})();