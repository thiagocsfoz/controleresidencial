/**
 * Created by Gustavo on 09/06/14.
 */
'use strict';

function ModalDetalheEquipamentoCtrl ($scope, $modalInstance, equipamento, ServiceFactory)
{
    $scope.ServiceFactory = ServiceFactory;
    $scope.currentEntity = equipamento;

    $scope.status = [];
    $scope.status['true'] = '_[[Ativo]]';
    $scope.status['false'] = '_[[Inativo]]';

    $scope.currentEntity.status = $scope.status[$scope.currentEntity.status];

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
