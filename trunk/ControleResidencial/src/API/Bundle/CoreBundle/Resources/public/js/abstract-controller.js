'use strict';/** * * @param $scope * @param $log * @param $state * @param $timeout * @param $dialog */function AbstractController( $scope, $log, $filter, $modal ) {    /*-------------------------------------------------------------------     * 		 				 	ATTRIBUTES     *-------------------------------------------------------------------*/    $scope.maxSizePagination = 5;    /*-------------------------------------------------------------------     * 		 				 	EVENT HANDLERS     *-------------------------------------------------------------------*/    /**     * Handler que escuta as mudan�as de URLs pertecentes ao estado da tela.     * Ex.: litar, criar, detalhe, editar     *     * Toda vez que ocorre uma mudan�a de URL se via bot�o, troca de URL manual, ou ainda     * ao van�ar e voltar do browser, este evento � chamado e chama o initilize() que faz o papel de front-controller.     *     */    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {        $log.info("$stateChangeSuccess");        $scope.initialize(toState, toParams, fromState, fromParams);        if (toState.url != '/detalhe/:id' && toState.url != "/listar") {            $scope.msg = null;        }else if( $scope.msg != null && toState.url == "/listar" && $scope.msg.type == 'danger'){            $scope.msg = null;        };        if ((toState.url == '/detalheData/:id' || toState.url == "/detalhePop/:id") && fromState.name != "") {            $scope.oldState = fromState;            $scope.oldParams = fromParams;        }else{            $scope.oldState = '/atividade/detalhe/'+fromParams.id;            $scope.oldParams = fromParams;        }    });    /**     * Função para fechar o alert depois de 10 segundos.     */    $scope.$watch('msg', function(){        if($scope.msg != null)            setTimeout(function(){                $('.alert .close').trigger('click');            }, 10000);    });    /**     * Retorna a instancia do form no escopo do angular.     * @param formName     * @returns {*|Function|$scope.form|$scope.form|$scope.form|jQuery}     */    $scope.form = function( formName ) {        return $("form[name="+(formName ? formName: 'form')+"]").scope()[(formName ? formName: 'form')];    };    $scope.notify = function(status, title, msg) {        $.notify(msg, {"pos":"top-right", "status": status, "title": title});    }    /**     */    $scope.close = function() {        $scope.msg = null;    };    $scope.alerts = [];    var alert = {        msg: 'Please fill all the fields.'    };    alert.close = function(){        $scope.alerts.splice($scope.alerts.indexOf(this), 1);    }    $scope.alerts.push(alert);    setTimeout(function(){        $scope.alerts.splice($scope.alerts.indexOf(alert), 1);    }, 3000);}