(function ()
{
    'use strict';

    angular
        .module('app.explorer')
        .controller('ColorMenuController', ColorMenuController);

    /** @ngInject */
    function ColorMenuController($mdColorPalette, ComponentService)
    {
        var vm = this;

        // Data
        vm.board = ComponentService.data;
        vm.palettes = $mdColorPalette;

        // Methods

        ////////

    }
})();