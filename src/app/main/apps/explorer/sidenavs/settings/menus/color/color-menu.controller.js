(function ()
{
    'use strict';

    angular
        .module('app.explorer')
        .controller('ColorMenuController', ColorMenuController);

    /** @ngInject */
    function ColorMenuController($mdColorPalette, ExplorerComponentService)
    {
        var vm = this;

        // Data
        vm.board = ExplorerComponentService.data;
        vm.palettes = $mdColorPalette;

        // Methods

        ////////

    }
})();