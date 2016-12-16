(function ()
{
    'use strict';

    angular
        .module('app.explorer')
        .controller('ColorMenuController', ColorMenuController);

    /** @ngInject */
    function ColorMenuController($mdColorPalette, BoardService)
    {
        var vm = this;

        // Data
        vm.board = BoardService.data;
        vm.palettes = $mdColorPalette;

        // Methods

        ////////

    }
})();