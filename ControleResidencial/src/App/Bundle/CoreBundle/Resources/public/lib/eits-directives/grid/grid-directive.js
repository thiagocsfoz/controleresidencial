"use strict";

angular.module("eits-grid",['ngGrid']).directive('ngGrid',function(){

    return {
        link : function($scope, element, attrs) {

            var grid = $scope.$eval( attrs.ngGrid );

            $scope.$on("ngGridEventData",function(){

                if(($scope.$eval(grid.data) == null) || ($scope.$eval(grid.data).length == 0 )){

                    var row = "<div ng-row=\"\" class=\"ngRow rowEmpty\" style=\"top: 0px; height: 30px;\">" +
                                    "<div class=\"ngCell\" style=\"width:100%;cursor: pointer;\">" +
                                        "<div ng-cell=\"\">" +
                                            "<div class=\"ngCellText\">" +
                                                "<span ng-cell-text=\"\" class=\"ng-binding\">Nenhum registro foi encontrado.</span>" +
                                            "</div>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>";


                    grid.ngGrid.$viewport.find('.ngCanvas').append(row);
                } else {
                    grid.ngGrid.$viewport.find('.rowEmpty').remove();
                }
            });

        }
    }

})
