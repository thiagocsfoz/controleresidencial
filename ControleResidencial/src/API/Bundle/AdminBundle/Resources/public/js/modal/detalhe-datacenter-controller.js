/**
 * Created by Gustavo on 09/06/14.
 */
'use strict';

function ModalDetalheDataCenterCtrl ($scope, $modalInstance, datacenter, lang, ServiceFactory, $injector)
{
    $scope.ServiceFactory = ServiceFactory;
    $scope.currentEntity = datacenter;
    $scope.currentLang = lang;

    $scope.status = [];
    $scope.status['true'] = '_[[Ativo]]';
    $scope.status['false'] = '_[[Inativo]]';

    $scope.gridEquipamentosPTOptions = {
        data: 'currentEntity.equipamentos',
        multiSelect: false,
        useExternalSorting: true,
        columnDefs: [
            {displayName:'_[[Tipo Equipamento]]', field:"tipoEquipamento.nomePortugues", width:'48%'},
            {displayName:'_[[Modelo]]', field:"modelo", width:'20%'},
            {displayName:'_[[Nº Série]]', field:"numeroSerie", width:'20%'},
            {displayName:'_[[Status]]', field:"status", width:'10%', cellTemplate: '<div align="center" style="padding-top: 3%;">{{status[row.entity.status]}}</div>'}
        ]
    };

    $scope.gridEquipamentosESOptions = {
        data: 'currentEntity.equipamentos',
        multiSelect: false,
        useExternalSorting: true,
        columnDefs: [
            {displayName:'_[[Tipo Equipamento]]', field:"tipoEquipamento.nomeEspanhol", width:'48%'},
            {displayName:'_[[Modelo]]', field:"modelo", width:'20%'},
            {displayName:'_[[Nº Série]]', field:"numeroSerie", width:'20%'},
            {displayName:'_[[Status]]', field:"status", width:'10%', cellTemplate: '<div align="center" style="padding-top: 3%;">{{status[row.entity.status]}}</div>'}
        ]
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}