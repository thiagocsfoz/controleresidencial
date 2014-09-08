'use strict';

/**
 * 
 * @param $scope
 * @param $log
 * @param $location
 */
function AdminController( $scope, $injector, $log, $state, ServiceFactory, $modal, $timeout) {
    /**
	 * Injeta os métodos, atributos e seus estados herdados de AbstractController.
	 * @see AbstractController
	 */
	$injector.invoke(AbstractController, this, {$scope: $scope});

	/*-------------------------------------------------------------------
	 * 		 				 	ATTRIBUTES
	 *-------------------------------------------------------------------*/


    //Service.call();
    $scope.ServiceFactory = ServiceFactory;

    //STATES
    /**
     * Variável estática que representa 
     * o estado de listagem de registros.
     */
    $scope.LIST_STATE = "admin.listar";
    /**
     * Variável estática que representa
     * o estado de detalhe de um registro.
     */
    $scope.DETAIL_STATE = "tiro.detalhe";
	/**
	 * Variável estática que representa
     * o estado para a criação de registros.
     */
    $scope.INSERT_STATE = "tiro.cooking";
	/**
	 * Variável estática que representa
     * o estado para a edição de registros.
     */
    $scope.UPDATE_STATE = "tiro.editar";
    /**
     * Variável que armazena o estado corrente da tela.
     * Esta variável deve SEMPRE estar de acordo com a URL 
     * que estão no browser.
     */
    $scope.currentState = "tiro.cooking";
	
		/**
	 * Armazena a entitidade corrente para edição ou detalhe.
	 */
    $scope.currentEntity;


    //DATA GRID
    /**
     * Variável estática coms os botões de ação da grid
     * O botão de editar navega via URL (sref) por que a edição é feita em outra página,
     * já o botão de excluir chama um método direto via ng-click por que não tem um estado da tela específico.
     */
    var GRID_ACTION_BUTTONS = '<div class="text-center">' +
                                '<div class="btn-group">' +
                                    '<a ng-click="editar(row.entity)" href="javascript:void(0);" style="margin-right: 20px"><i class="fa fa-pencil"></i></a>' +
                                    '<a ng-click="excluir(row.entity)" href="javascript:void(0);" style="margin-right: 20px"><i class="fa fa-trash-o"></i></a>' +
                                '</div' +
                              '</div>';

    /**
     * Configurações gerais da ng-grid. 
     * @see https://github.com/angular-ui/ng-grid/wiki/Configuration-Options
     */
    $scope.gridOptions = { 
		data: 'aplicacoes',
		multiSelect: false,
        enableSorting: false,
        enableRowSelection: false,
		columnDefs: [
            {displayName:'#', field:'id', width:'5%'},
            {displayName:'Nome Residencia', field:'nome', width:'25%'},
            {displayName:'Endereço Arduino', field:'ip', width:'24%'},
            {displayName:'Token', field:'token', width:'28%', cellTemplate: '<div class="ngCellText ng-scope" style="-moz-user-select: initial; -khtml-user-select: initial; -webkit-user-select: initial; -ms-user-select: initial; user-select: initial;"> {{row.entity.token}}</div>'},
            {displayName:'Ações', sortable:false, cellTemplate: GRID_ACTION_BUTTONS, width:'15%'}
        ]
    };
    
    /**
     * Variável que armazena o estado da paginação 
     * para renderizar o pager e também para fazer as requisições das
     * novas páginas, contendo o estado do Sort incluído.
     * 
     * @type PageRequest
     */
    $scope.aplicacoes;
    /*-------------------------------------------------------------------
	 * 		 				 	  NAVIGATIONS
	 *-------------------------------------------------------------------*/
    /**
     * Método principal que faz o papel de front-controller da tela.
     * Ele é invocado toda vez que ocorre uma mudança de URL (@see $stateChangeSuccess),
     * quando isso ocorre, obtém o estado através do $state e chama o método inicial daquele estado.
     * Ex.: /list -> changeToList()
     *      /criar -> changeToInsert()
     *      
     * Caso o estado não for encontrado, ele direciona para a listagem,
     * apesar que o front-controller do angular não deixa digitar uma URL inválida.
     */
    $scope.initialize = function( toState, toParams, fromState, fromParams ) {
    	var state = $state.current.name;

        /**
         * É necessario remover o atributo sortInfo pois o retorno de uma edição estava duplicando o valor do mesmo com o atributo Sort
         * impossibilitando as ordenações nas colunas da grid.
         */
        if( $scope.gridOptions.sortInfo ){
            delete $scope.gridOptions.sortInfo;
        }

    	switch (state) {
			case $scope.LIST_STATE: {
				$scope.changeToList();
			}
			break;
			default : {
				$state.go( $scope.LIST_STATE );
			}
		}
    };
    
    /**
     * Realiza os procedimentos iniciais (prepara o estado) 
     * para a tela de consulta e Após isso, muda o estado para list. 
     * @see LIST_STATE
     * @see $stateChangeSuccess
     * 
     * Para mudar para este estado, deve-se primeiro carregar os dados da consulta.
     */
    $scope.changeToList = function() {
    	$log.info("changeToList");

    	var pageRequest = {};
    	pageRequest.size = 10;

        $scope.currentEntity = new Aplicacoes();
        $scope.currentState = $scope.LIST_STATE;
        $scope.pageRequest = pageRequest;

        $scope.ServiceFactory.call("AplicacoesService", "listAll", null, function(data){
                $scope.aplicacoes = data;
            },
            function(data){
                console.log(data);
            })

    };
    
    /**
     * Realiza os procedimentos iniciais (prepara o estado) 
     * para a tela de inserção e Após isso, muda o estado para insert. 
     * @see INSERT_STATE
     * @see $stateChangeSuccess
     * 
     * Para mudar para este estado, deve-se primeiro instanciar um novo currentEntity,
     * para limpar os campos e configurar valores defaults.
     */
    $scope.changeToInsert = function( ) {
 	   $log.info("changeToInsert");
 	   
 	   $scope.currentEntity = new Object();
       $scope.currentEntity.projeto = new Object();

 	   $scope.currentState = $scope.INSERT_STATE;
    };

    $scope.generateToken = function(){
        var now = 0+$.now();
        now *= Math.random();
        $scope.currentEntity.token = now.toString(30).substr(2);
    }

    $scope.insertResidencia = function() {
        if(!$scope.form("form").$valid ){
            return false;
        }

        $scope.ServiceFactory.call("AplicacoesService", "insert", $scope.currentEntity, function(data){
                $scope.aplicacoes.push(data);
                $scope.currentEntity = new Aplicacoes();
                $scope.form("form").$submitted = false;

                //$scope.notify('success', 'Sucesso', 'Residencia adicionada com sucesso!');
        },
        function(data){
            console.log(data);
        })
    }

    $scope.saveResidencia = function() {
        if(!$scope.form("form").$valid ){
            return false;
        }

        $scope.currentEntity._explicitType = "Aplicacoes";
        $scope.ServiceFactory.call("AplicacoesService", "update", $scope.currentEntity, function(data){
                $scope.currentEntity = new Aplicacoes();
                $scope.form("form").$submitted = false;

                $scope.notify('success', 'Sucesso', 'Residencia Salva com sucesso!');

            },
            function(data){
                $scope.notify('error', 'Não foi possível salvar a residência', data.error);
            })
    }

    $scope.editar = function(aplicacao) {
        $scope.currentEntity = aplicacao;
    }


    $scope.excluir = function(aplicacao) {

        var dialog = $modal.open( {
            templateUrl: "../../bundles/apicore/lib/eits-directives/dialog/dialog-template.html",
            controller: DialogController,
            windowClass: 'dialog-delete',
            resolve: {
                title: function(){return "Exclusão de Residencia";},
                message: function(){return '<b>Tem certeza que deseja excluir a residencia "'+ aplicacao.nome +'"?</b> Esta operação não poderá mais ser desfeita.';},
                buttons: function(){return [ {label:'Excluir', css:'btn btn-danger'}, {label:'Cancelar', dismiss:true} ];}
            }
        });

        dialog.result.then( function(result) {
            aplicacao._explicitType = "Aplicacoes";
            $scope.ServiceFactory.call("AplicacoesService", "remove", aplicacao, function(data){

                    if(data === false){
                        $scope.notify('error', 'Erro', 'Não foi possível excluir o registro.');
                        return false;
                    }

                    $scope.aplicacoes.pop(data);
                    $scope.notify('success', 'Sucesso', 'Residencia excluída com sucesso!');
                },
                function(data){
                    console.log(data);
                });
        });
    }
    
    /**
     * Realiza os procedimentos iniciais (prepara o estado) 
     * para a tela de edição e Após isso, muda o estado para update. 
     * @see UPDATE_STATE
     * @see $stateChangeSuccess
     * 
     * Para mudar para este estado, deve-se primeiro obter via id
     * o registro pelo serviço de consulta e só então mudar o estado da tela.
     */
    $scope.changeToUpdate = function( id ) {
 	   $log.info("changeToUpdate", id);
    };
    
    /**
     * Realiza os procedimentos iniciais (prepara o estado) 
     * para a tela de detalhe e Após isso, muda o estado para detail. 
     * @see DETAIL_STATE
     * @see $stateChangeSuccess
     * 
     * Para mudar para este estado, deve-se primeiro obter via id
     * o registro atualizado pelo serviço de consulta e só então mudar o estado da tela.
     * Caso o indentificador esteja inválido, retorna para o estado de listagem.
     */
    $scope.changeToDetail = function( id ) {
 	   $log.info("changeToDetail", id);
    };
    
    /**
     * Realiza os procedimentos iniciais (prepara o estado) 
     * para a tela de exclusão. 
     * 
     * Antes de excluir, o usuário notificado para confirmação 
     * e só então o registro é excluido.
     * Após exclusão, atualizamos a grid com estado de filtro, paginação e sorting. 
     */
    $scope.changeToRemove = function( sample ) {
    	$log.info("changeToRemove", sample);

 	   	var dialog = $modal.open( {
 	   		templateUrl: "assets/libs/eits-directives/dialog/dialog-template.html",
 	   		controller: DialogController,
 	   		windowClass: 'dialog-delete',
 	   		resolve: {
 	   			title: function(){return "Exclusão de sample";},
 	   			message: function(){return 'Tem certeza que deseja excluir o sample "'+sample.name+'"? <br/>Esta operação não poderá mais ser desfeita.';},
 	   			buttons: function(){return [ {label:'Excluir', css:'btn btn-danger'}, {label:'Cancelar', dismiss:true} ];}
 	   		}
 	   	});
 	   	
 	   dialog.result.then( function(result) {
		   //Remove o sample
 	   });
    };

     /**
     * Configura o pageRequest conforme o componente visual pager
     * e chama o serviço de listagem, considerando o filtro corrente na tela.
     * 
     * @see currentPage
     * @see data.filter 
     */
    $scope.changeToPage = function( filter, pageNumber ) {
    	$scope.currentPage.pageable.page = pageNumber-1;
    };
    

     /*-------------------------------------------------------------------
	 * 		 				 	  BEHAVIORS
	 *-------------------------------------------------------------------*/

    /**
     * Realiza a consulta de registros, consirando filtro, paginação e sorting.
     * Quando ok, muda o estado da tela para list.
     * 
     * @see data.filter
     * @see currentPage
     */
    $scope.listByFilters = function() {
        $scope.ServiceFactory.call("ApiService", "listAll", null, function(data){
            $scope.currentPage = data;
        },
        function(data){
            console.log(data);
        })
    };

    /**
     * Realiza a inserção de um novo registro
     * e no suscesso, modifica o estado da tela para o detail.
     */
    $scope.insertSample = function( sample ) {

      if ( !$scope.form().$valid ) {
          $scope.message = {type:"error", text: $scope.INVALID_FORM_MESSAGE};
          return;
      }
    };

    /**
     * Realiza a atualiza de um registro
     * e no suscesso, modifica o estado da tela para o detail.
     */
    $scope.updateSample = function( sample ) {

  	  if ( !$scope.form().$valid ) {
      	$scope.message = {type:"error", text: $scope.INVALID_FORM_MESSAGE};
		return;
      }
    };

    /**
     *
     */
    $scope.listSamples = function() {
        var pageRequest = new PageRequest();
    };
};