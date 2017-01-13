(function ()
{
    'use strict';

    angular
        .module('app.explorer')
        .controller('SettingsSidenavController', SettingsSidenavController);

    /** @ngInject */
    function SettingsSidenavController($mdColorPalette, ComponentService)
    {
        var vm = this;

        // Data
        vm.board = ComponentService.data;
        vm.palettes = $mdColorPalette;
        vm.selectedMenu = 'Settings';

        // Methods

        ////////

    }
})();