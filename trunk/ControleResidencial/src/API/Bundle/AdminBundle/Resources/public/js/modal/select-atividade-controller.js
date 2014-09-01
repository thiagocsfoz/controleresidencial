/**
 * Created by Gustavo on 11/06/14.
 */
'use strict';

function ModalSelectAtividades ($scope, $injector, $modalInstance, atividades, ServiceFactory)
{
    $scope.ServiceFactory = ServiceFactory;
    $scope.currentLang;
    $scope.selected = [];

    $scope.atividades = atividades;

    /**
     * Handler que captura os eventos de marcação da grid
     * @param rows
     */
    function toogleSelection (rows) {

        //Aguarda o loading da tela
        if ( $scope.loading ) return;

        //Recebe os itens que já estavam marcados
        var items = $scope.$eval(dataProvider);
        var selectedItems = new Array();

        /**
         * Trata a seleção, verificando se foram selecionadas
         * todas as linhas (array)
         */
        if ( rows instanceof Array ) {
            selectedItems = rows;
        } else {
            selectedItems[0] = rows;
        }

        /**
         * Trecho responsável por adicionar ou remover os itens
         * da lista na entidade que está utilizando a popup
         */
        angular.forEach(selectedItems, function(selectedItem, index) {
            if ( selectedItem.selected ) {
                var found = false;
                angular.forEach(items, function(item, index) {
                    if ( item.id == selectedItem.entity.id ) {
                        found = true;
                    }
                });
                if ( !found ) {
                    items.push( selectedItem.entity );
                }

            } else {
                angular.forEach(items, function(item, index) {
                    if ( item.id == selectedItem.entity.id ) {
                        items.splice(index,1);
                    }
                });
            }
        });
    };

    $scope.gridOptions = {
        data: 'atividades.page.content',
        multiSelect           : true,
        showSelectionCheckbox : true,
        selectedItems         : $scope.selected,
        pageSize: 250,
        useExternalSorting: false,
        afterSelectionChange: toogleSelection,
        columnDefs: [
            {displayName:'Descrição', field: 'descricaoPortugues', width:'95%' }
        ]
    };

    $scope.verifyBrowser(function(){
        $scope.currentLang = ".br";
    },function(){
        $scope.currentLang = ".es";
    });

    $scope.ok = function () {
        $modalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

};
