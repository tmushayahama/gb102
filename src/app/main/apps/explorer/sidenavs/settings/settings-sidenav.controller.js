(function ()
{
    'use strict';

    angular
        .module('app.explorer')
        .controller('SettingsSidenavController', SettingsSidenavController);

    /** @ngInject */
    function SettingsSidenavController($mdColorPalette, ExplorerComponentService)
    {
        var vm = this;

        // Data
        vm.board = ExplorerComponentService.data;
        vm.palettes = $mdColorPalette;
        vm.selectedMenu = 'Settings';

        // Methods

        ////////

    }
})();