'use strict';

/**
 * 
 * @param $scope
 * @param $log
 * @param $location
 */
function BlocoController( $scope, $injector, $log, $state, ServiceFactory, languages, $modal, $compile ) {

	/**
	 * Injeta os métodos, atributos e seus estados herdados de AbstractController.
	 * @see AbstractController
	 */
	$injector.invoke(AbstractController, this, {$scope: $scope});

    $scope.$on('ngGridEventSorted', function(event, sort) {


        // compara os objetos para garantir que o evento seja executado somente uma vez q não entre em loop
        if ( (!angular.equals(sort, $scope.gridPTOptions.sortInfo) || !angular.equals(sort, $scope.gridESOptions.sortInfo)) && ($scope.currentState == $scope.LIST_STATE)) {
            $scope.gridPTOptions.sortInfo = angular.copy(sort);
            $scope.gridESOptions.sortInfo = angular.copy(sort);
            if(sort.fields.length){
                if(sort.fields[0] == fieldES){
                    sort.fields[0] = 'tituloEspanhol';
                }else if(sort.fields[0] == fieldPT){
                    sort.fields[0] = 'tituloPortugues';
                }else{
                    $scope.currentPage.sort.property = sort.fields[0];
                }
                $scope.currentPage.sort.direction = sort.directions[0].toUpperCase();
                $scope.listBlocosByFilters($scope.currentLang);
            }
        }
        if ( !angular.equals((sort, $scope.gridFormPTOptions.sortInfo) || !angular.equals(sort, $scope.gridFormESOptions.sortInfo)) && ($scope.currentState == $scope.INSERT_STATE_BR || $scope.currentState == $scope.INSERT_STATE_ES || $scope.currentState == $scope.INSERT_STATE || $scope.currentState == $scope.UPDATE_STATE)) {
            $scope.atividadesSelecionadas = $scope.ordenar('descricaoPortugues','descricaoEspanhol',$scope.atividadesSelecionadas, $scope.currentLang, sort.directions[0]);
        }else if( !angular.equals((sort, $scope.gridDetalheESOptions.sortInfo) || !angular.equals(sort, $scope.gridDetalhePTOptions.sortInfo)) && ($scope.currentState == $scope.DETAIL_STATE )){
            $scope.atividadesSelecionadas = $scope.ordenar('descricaoPortugues','descricaoEspanhol',$scope.atividadesSelecionadas, $scope.currentLang, sort.directions[0]);
        }
    });
    
    $scope.ServiceFactory = ServiceFactory;
	/*-------------------------------------------------------------------
	 * 		 				 	ATTRIBUTES
	 *-------------------------------------------------------------------*/

    //Service.call();
    //$scope.message = {type:"error", text: "AEHO"};

    //STATES

    /**
     * Variável estática que representa 
     * o estado de listagem de registros.
     */
    $scope.LIST_STATE = "bloco.listar";

    /**
     * Variável estática que representa
     * o estado de detalhe de um registro.
     */
    $scope.DETAIL_STATE = "bloco.detalhe";

    /**
     * Variável estática que representa
     * o estado para a criação de registros.
     */
    $scope.INSERT_STATE = "bloco.criar";

	/**
	 * Variável estática que representa
     * o estado para a criação de registros.
     */
    $scope.INSERT_STATE_BR = "bloco.criar.br";

    /**
     * Variável estática que representa
     * o estado para a criação de registros.
     */
    $scope.INSERT_STATE_ES = "bloco.criar.es";

    /**
     * Variável estática que representa
     * o estado para a criação de registros.
     */
    $scope.CLONE_STATE = "bloco.clonar";

	/**
	 * Variável estática que representa
     * o estado para a edição de registros.
     */
    $scope.UPDATE_STATE = "bloco.editar";

    /**
     * Variável estática que representa
     * o estado para a edição de registros.
     */
    $scope.STATE_Bloco = "bloco";

    /**
     * Variável estática que representa
     * o estado para a edição de registros.
     */
    $scope.STATE_ATIVIDADE = "atividade";

    /**
     * Variável que armazena o estado corrente da tela.
     * Esta variável deve SEMPRE estar de acordo com a URL
     * que estão no browser.
     */
    $scope.currentState = "bloco.criar";

    /**
     * Armazena a entitidade Bloco corrente para edição ou detalhe.
     */
     $scope.currentBloco;

    /**
     * Armazena as atividades a serem removidas
     * @type {Array}
     */
    $scope.atividadesRemovidas = [];

   /**
     * Armazena as atividades
     * @type {Array}
     */
    $scope.atividades = [];

    /**
     * Armazena as atividades
     * @type {Array}
     */
    $scope.atividadeSelecionada = null;

    /**
     * Armazena as atividades
     * @type {Array}
     */
    $scope.atividadesSelecionadas = [];

    /**
     * Armazena as atividades
     * @type {Array}
     */
    $scope.atividadesInseridas = [];

    /**
     * Armazena as atividades
     * @type {Array}
     */
    $scope.atividadesRemovidas = [];

    /**
     * Armazena o Idioma do Navegador;
     */
    $scope.currentLang

    /**
     * Estado detalhe Bloco
     */
    $scope.detailState = 'bloco';

    /**
     *
     */
    $scope.actionAtividade = 'adicionar';

    /**
     *
     */
    $scope.datacenters = [];

    /**
     *
     */
    $scope.equipamentos = [];

    /**
    * Contantes
    */
    $scope.GERAL = 1;
    $scope.ATIVIDADE = 2;

    /**
     * Messagens de alertas
     */
    $scope.MENSAGEM_Bloco_ATIVADA = "_[[Bloco ativado com sucesso]]";
    $scope.MENSAGEM_Bloco_DESATIVADA = "_[[Bloco desativado com sucesso]]";
    $scope.MENSAGEM_Bloco_SALVA = "_[[Bloco salvo com sucesso]]";
    $scope.MENSAGEM_Bloco_EXCLUIDA = "_[[Bloco excluído com sucesso]]";
    $scope.MENSAGEM_Bloco_IDIOMA = "_[[Atenção, o cadastro deve ser efetuado por completo em pelo menos um idioma]]";
    $scope.MENSAGEM_Bloco_ATIVIDADE = "_[[Atenção, o cadastro deve ter pelo menos uma atividade associada]]";
    $scope.MESSAGE_Bloco_ATIVADA = "_[[Bloco ativado com sucesso]]";
    $scope.MESSAGE_Bloco_DESATIVADA = "_[[Bloco desativado com sucesso]]";

    //DATA GRID
    /**
     * Variável estática coms os botões de ação da grid
     * O botão de editar navega via URL (sref) por que a edição é feita em outTraduzirra página,
     * já o botão de excluir chama um método direto via ng-click por que não tem um estado da tela específico.
     */
    var GRID_ACTION_BUTTONS_ATIVIDADE = '<div class="cell-centered">' +
    								'<a ng-click="toogleAtividade(row.entity)" title="_[[Excluir]]" class="btn btn-mini"><i class="glyphicon glyphicon-trash"></i></a>'+
    						   '</div>';

    var GRID_ACTION_BUTTONS = '<div class="cell-centered">' +
        '<a ng-click="editClick(row.entity)" ng-if="!row.entity.estaSendoUsado" title="_[[Editar]]" class="btn btn-mini"><i class="glyphicon glyphicon-pencil"></i></a>'+
        '<a ng-click="changeToRemove(row.entity)" ng-if="!row.entity.estaSendoUsado" title="_[[Excluir]]" class="btn btn-mini"><i class="glyphicon glyphicon-trash"></i></a>'+
        '<a ng-if="!row.entity.status" ng-click="ativarBloco(row.entity)" title="_[[Ativar]]" class="btn btn-mini"><i class="glyphicon glyphicon-repeat"></i></a>'+
        '<a ng-if="row.entity.status" ng-click="desativarBloco(row.entity)" title="_[[Desativar]]" class="btn btn-mini"><i class="glyphicon glyphicon-remove"></i></a>'+
        '<a ng-click="clonar(row.entity)" title="_[[Clonar]]" class="btn btn-mini"><i class="fa fa-files-o"></i></a>'+
        '</div>';
    $scope.indiceAtividade = 1;


    var fieldPT = "currentLang == '.br' ? (row.entity.tituloEspanhol == '' ? row.entity.tituloPortugues : row.entity.tituloEspanhol)  : (row.entity.tituloPortugues != '' ? row.entity.tituloPortugues : row.entity.tituloEspanhol) ";
    var fieldES = "currentLang == '.es' ? (row.entity.tituloPortugues != '' ? row.entity.tituloPortugues : row.entity.tituloEspanhol) : (row.entity.tituloEspanhol == '' ? row.entity.tituloPortugues : row.entity.tituloEspanhol) ";

    var fieldRepeat = '<div class="cell-centered"> <div ng-if="row.entity.repetir">_[[Sim]]</div><div ng-if="!row.entity.repetir">_[[Não]]</div></div>';

    /**
     * Configurações gerais da ng-grid.
     * @see https://github.com/angular-ui/ng-grid/wiki/Configuration-Options
     */

    $scope.gridPTColumnsSet = {
        //All columns (for large screen)
        allColumns: [
            {displayName:'_[[Título]]', field:'tituloPortugues', width:'55%', cellTemplate: '<div class="form-group"><div class="row"><div class="col-xs-6" style="padding: 4px 0 0 20px;">{{ row.entity.tituloPortuguesClear }}</div>' + $scope.getTemplateFlags() +  '</div></div>'},
            {displayName:'_[[Repetir]]', sortable:false, cellTemplate: fieldRepeat, width:'20%'},
            {displayName:'_[[Ações]]', sortable:false, cellTemplate: GRID_ACTION_BUTTONS, width:'25%'}
        ],
        //Columns for small screen
        smallColumns: [
            {displayName:'_[[Título]]', field:'tituloPortugues', width:'75%', cellTemplate: '<div class="form-group"><div class="row"><div class="col-xs-6" style="padding: 4px 0 0 20px;">{{ row.entity.tituloPortuguesClear }}</div>' + $scope.getTemplateFlags() +  '</div></div>'},
            {displayName:'_[[Repetir]]', sortable:false, cellTemplate: fieldRepeat, width:'25%'}
        ]
    };

    $scope.gridPTColumns = $scope.gridPTColumnsSet.allColumns;

    $scope.gridESColumnsSet = {
        //All columns (for large screen)
        allColumns: [
            {displayName:'_[[Título]]', field:'tituloEspanhol', width:'45%', cellTemplate: '<div class="form-group"><div class="row"><div class="col-xs-8" style="padding: 4px 0 0 20px;">{{ row.entity.tituloEspanholClear }}</div>' + $scope.getTemplateFlags() +  '</div></div>' },
            {displayName:'_[[Repetir]]', sortable:false, cellTemplate: fieldRepeat, width:'20%'},
            {displayName:'_[[Ações]]', sortable:false, cellTemplate: GRID_ACTION_BUTTONS, width:'25%'}
        ],
        //Columns for small screen
        smallColumns: [
            {displayName:'_[[Título]]', field:'tituloEspanhol', width:'75%', cellTemplate: '<div class="form-group"><div class="row"><div class="col-xs-6" style="padding: 4px 0 0 20px;">{{ row.entity.tituloEspanholClear }}</div>' + $scope.getTemplateFlags() +  '</div></div>' },
            {displayName:'_[[Repetir]]', sortable:false, cellTemplate: fieldRepeat, width:'25%'}
        ]
    };

    $scope.gridESColumns = $scope.gridESColumnsSet.allColumns;

    $scope.gridPTOptions = {
		data: 'currentPage.page.content',
		multiSelect: false,
		useExternalSorting: true,
		beforeSelectionChange: function (row, event) {
			//evita chamar a selecao, quando clicado em um action button.
			if ( $(event.target).is("a") || $(event.target).is("i") ) return false;
			$state.go($scope.DETAIL_STATE, {id:row.entity.id});
		},
        sortInfo: {
            fields: ['tituloPortuges'],
            directions: ['ASC']
        },
		columnDefs: 'gridPTColumns'
    };

    $scope.gridESOptions = {
        data: 'currentPage.page.content',
        multiSelect: false,
        useExternalSorting: true,
        beforeSelectionChange: function (row, event) {
            //evita chamar a selecao, quando clicado em um action button.
            if ( $(event.target).is("a") || $(event.target).is("i") ) return false;
            $state.go($scope.DETAIL_STATE, {id:row.entity.id});
        },
        sortInfo: {
            fields: ['tituloEspanhol'],
            directions: ['ASC']
        },
        columnDefs: 'gridESColumns'
    };

    var fielAtividadedPT = "currentLang == '.br' ? (row.entity.descricaoEspanholClear == '' ? row.entity.descricaoPortuguesClear : row.entity.descricaoEspanholClear)  : (row.entity.descricaoPortuguesClear != '' ? row.entity.descricaoPortuguesClear : row.entity.descricaoEspanholClear) ";
    var fielAtividadeES = "currentLang == '.es' ? (row.entity.descricaoPortuguesClear != '' ? row.entity.descricaoPortuguesClear : row.entity.descricaoEspanholClear) : (row.entity.descricaoEspanholClear == '' ? row.entity.descricaoPortuguesClear : row.entity.descricaoEspanholClear) ";

    /**
     * Configurações gerais da ng-grid em portugues.
     * @see https://github.com/angular-ui/ng-grid/wiki/Configuration-Options
     */
    $scope.gridFormPTOptions = {
        data: 'atividadesSelecionadas',
        multiSelect: false,
        enableRowSelection: false,
        columnDefs: [
            {displayName:'_[[Descrição]]', field: fielAtividadedPT , width:'85%'},
            {displayName:'_[[Ações]]', sortable:false, cellTemplate: GRID_ACTION_BUTTONS_ATIVIDADE, width:'15%'}
        ]
    };

    /**
     * Configurações gerais da ng-grid em espanhol.
     * @see https://github.com/angular-ui/ng-grid/wiki/Configuration-Options
     */
    $scope.gridFormESOptions = {
        data: 'atividadesSelecionadas',
        multiSelect: false,
        useExternalSorting: false,
        enableRowSelection: false,
        columnDefs: [
            {displayName:'_[[Descrição]]', field: fielAtividadeES , width:'85%'},
            {displayName:'_[[Ações]]', sortable:false, cellTemplate: GRID_ACTION_BUTTONS_ATIVIDADE, width:'15%'}
        ]
    };

    /**
     *
     */
    $scope.gridDetalhePTOptions = {
        data: 'atividadesSelecionadas',
        multiSelect: false,
        useExternalSorting: false,
        enableRowSelection: false,
        columnDefs: [
            {displayName:'_[[Descrição]]', field: fielAtividadedPT , width:'100%'}
        ]
    };

    /**
     *
     */
    $scope.gridDetalheESOptions = {
        data: 'atividadesSelecionadas',
        multiSelect: false,
        useExternalSorting: false,
        enableRowSelection: false,
        columnDefs: [
            {displayName:'_[[Descrição]]', field: fielAtividadeES , width:'100%'}
        ]
    };
    /**
     * Variável que armazena o estado da paginação
     * para renderizar o pager e também para fazer as requisições das
     * novas páginas, contendo o estado do Sort incluído.
     *
     * @type PageRequest
     */
    $scope.currentPage = {
        page:{
            content: new Array(),
            page: 1
        }
    };


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

        $scope.verifyBrowser(function(){
            $scope.currentLang = $scope.langAtividade = ".br";
        },function(){
            $scope.currentLang = $scope.langAtividade = ".es";
        });

        $scope.getEquipamentosDataCenters();

        $('#module-cadastros').addClass('open');
        $('#module-bloco').trigger('click');

        /**
         * É necessario remover o atributo sortInfo pois o retorno de uma edição estava duplicando o valor do mesmo com o atributo Sort
         * impossibilitando as ordenações nas colunas da grid.
         */
        if( $scope.gridPTOptions.sortInfo ){
            delete $scope.gridPTOptions.sortInfo;
        }

        if( $scope.gridESOptions.sortInfo ){
            delete $scope.gridESOptions.sortInfo;
        }

    	switch (state) {
			case $scope.LIST_STATE: {
				$scope.changeToList();
			}
			break;
			case $scope.DETAIL_STATE: {
				$scope.changeToDetail( $state.params.id );
			}
			break;
            case $scope.INSERT_STATE: {
                $scope.changeToInsert( $scope.INSERT_STATE );
            }
            break;
            case $scope.INSERT_STATE_BR: {
                $scope.changeToInsert( $scope.INSERT_STATE_BR );
            }
            break;
            case $scope.INSERT_STATE_ES: {
                $scope.changeToInsert( $scope.INSERT_STATE_ES );
            }
            break;
            case $scope.CLONE_STATE: {
                $scope.clonarBloco();
            }
            break;
			case $scope.UPDATE_STATE: {
				$scope.changeToUpdate( $state.params.id, $scope.UPDATE_STATE );
			}
			break;
            case 'bloco.detalhePop':{
                $scope.modalDetalhesEquipamento( $state.params.id );
            }
            break;
            case 'bloco.detalheData':{
                $scope.modalDetalhesDataCenter( $state.params.id );
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
        $scope.atividades = [];
        $scope.indiceAtividade = 1;
    	$log.info("changeToList");

    	var pageRequest = {};
    	pageRequest.size = 10;
        $scope.langFilter = $scope.currentLang;

        $scope.currentState = $scope.LIST_STATE;
        $scope.pageRequest = pageRequest;

        $scope.listBlocos();
    };

    /**
     *
     */
    $scope.changeToLang = function( lang ){
        $scope.currentLang = lang;
    }

    /**
     * Realiza os procedimentos iniciais (prepara o estado)
     * para a tela de inserção e Após isso, muda o estado para insert.
     * @see INSERT_STATE
     * @see $stateChangeSuccess
     *
     * Para mudar para este estado, deve-se primeiro instanciar um novo currentEntity,
     * para limpar os campos e configurar valores defaults.
     */
    $scope.changeToInsert = function( state ) {
        $log.info("changeToInsert");

        $scope.blocoHasResponse = false;

        $scope.currentBloco = new Bloco();
        $scope.currentBloco.hasRepetition = false;
        $scope.atividadesSelecionadas = new Array();

        $scope.ServiceFactory.call("AtividadeService", "listAllActive", {'lang': $scope.currentLang}, function(data){
            //$scope.atividades = Atividade.removeLink(data, $scope.currentLang, $scope.ServiceFactory);

            $scope.atividades = data;
            $scope.atividades = $scope.ordenar('descricaoPortuguesClear','descricaoEspanholClear',$scope.atividades, $scope.currentLang, 'asc');

            $scope.blocoHasResponse = true;
        },
        function(data){
            console.log(data);
        });

        $scope.currentState = state;
        $scope.insertState = $scope.STATE_Bloco;
    };

    /**
     *
     */
    $scope.clonar = function( Bloco ){
        $scope.blocoHasResponse = false;
        $state.go($scope.CLONE_STATE, {id:Bloco.id});
    }

    /**
     *
     */
    $scope.insertAtividade = function(){
        $scope.toogleAtividade($scope.atividadeSelecionada);
    }


    /**
     *
     */
    $scope.clonarBloco = function(){

        $scope.currentBloco = new Bloco();
        $scope.currentBloco.id = $state.params.id;
        $scope.currentFilter = new Atividade();
        $scope.currentFilter.id = $state.params.id;

        if($scope.currentLang == '.br')
            $scope.currentState = $scope.INSERT_STATE_BR;
        else
            $scope.currentState = $scope.INSERT_STATE_ES;

        $scope.insertState = $scope.STATE_Bloco;

        $scope.ServiceFactory.call("BlocoService", "findById", $scope.currentBloco, function(data){
                $scope.currentBloco = data;
                $scope.currentBloco.hasRepetition = $scope.currentBloco.repetir;
                $scope.atividadesSelecionadas = Atividade.removeLink(data.atividades, $scope.currentLang, $scope.ServiceFactory);
                $scope.ServiceFactory.call("AtividadeService", "listAllActive", {'lang': $scope.currentLang}, function(data){
                    $scope.atividades = Atividade.removeLink(data, $scope.currentLang, $scope.ServiceFactory);
                    angular.forEach($scope.atividadesSelecionadas, function(selecionada,key){
                        angular.forEach($scope.atividades, function(atividade,key){
                            if(selecionada.id == atividade.id){
                                $scope.atividades.splice(key, 1);
                            }
                        });
                    });

                    $scope.findReferencesNames();
                    $scope.blocoHasResponse = true;
                },
                function(data){
                    console.log(data);
                });
        },
        function(data){
            console.log(data);
        });
    }

    /**
     *
     */
    $scope.changeToAtividades = function() {
        $log.info("changeToAtividades");
        $scope.insertState = $scope.STATE_ATIVIDADE;
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
    $scope.changeToInsertState = function( state ) {
       $scope.insertState = state
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
    $scope.editClick = function( Bloco )
    {
       $state.go($scope.UPDATE_STATE, {id:Bloco.id});
    };

    /**
     * Realiza os procedimentos iniciais (prepara o estado)
     * para a tela de edição e Após isso, muda o estado para update.
     * @see UPDATE_STATE
     * @see $stateChangeSuccess
     *
     * Para mudar para este estado, deve-se primeiro obter via id
     * o registro pelo serviço de consulta e só então mudar o estado da tela.
     */
    $scope.changeToUpdate = function( id, state ) {
        $log.info("changeToUpdate", id);

        $scope.blocoHasResponse = false;

        $scope.currentState = state;

        $scope.currentBloco = new Bloco();
        $scope.currentBloco.id = id;
        $scope.currentBloco.lang = $scope.currentLang;

        $scope.ServiceFactory.call("BlocoService", "findById", $scope.currentBloco, function(data){

            if(data.estaSendoUsado) {
                $scope.currentState = $scope.LIST_STATE;
                $state.go($scope.LIST_STATE);
            }

            $scope.currentBloco = data;
            $scope.currentBloco.hasRepetition = $scope.currentBloco.repetir;
            $scope.atividadesSelecionadas = data.atividades;//Atividade.removeLink(data.atividades, $scope.currentLang, $scope.ServiceFactory);
            $scope.findReferencesNames();

            $scope.ServiceFactory.call("AtividadeService", "listAllActive", {'lang': $scope.currentLang}, function(data){
                //$scope.atividades = Atividade.removeLink(data, $scope.currentLang, $scope.ServiceFactory);
                    $scope.atividades = data;
                    angular.forEach($scope.atividadesSelecionadas, function(selecionada,key){
                    angular.forEach($scope.atividades, function(atividade,key){
                        if(selecionada.id == atividade.id){
                            $scope.atividades.splice(key, 1);
                        }
                    });
                });
                    $scope.blocoHasResponse = true;
            },
            function(data){
                console.log(data);
            });
        },
        function(data){
            console.log(data);
        });



        $scope.insertState = $scope.STATE_Bloco;
    };

    /**
     *
     */


    /**
     * Realiza os procedimentos iniciais (prepara o estado)
     * para a tela de inserção e Após isso, muda o estado para insert.
     * @see UPDATE_STATE
     * @see $stateChangeSuccess
     *
     * Para mudar para este estado, deve-se primeiro instanciar um novo currentEntity,
     * para limpar os campos e configurar valores defaults.
     */
    $scope.changeToUpdateState = function( state ) {
       $scope.currentState = state
    };

    /*
    *
     */
    $scope.findReferencesNames = function(){
        var ptTitle = $("<div>"+$scope.currentBloco.tituloPortugues+"</div>").find("a");
        var esTitle = $("<div>"+$scope.currentBloco.tituloEspanhol+"</div>").find("a");

        var ptDescription = $("<div>"+$scope.currentBloco.descricaoPortugues+"</div>").find("a");
        var esDescription = $("<div>"+$scope.currentBloco.descricaoEspanhol+"</div>").find("a");

        angular.forEach(esTitle, function(value, key) {
            var test = $(value).attr("rel").split("#");
            if(test[0] == "DC"){
                var dataCenter = new DataCenter();
                dataCenter.id = test[1];
                $scope.ServiceFactory.call("DataCenterService", "findById", dataCenter, function(data){
                    $scope.currentBloco.tituloEspanhol = $(esTitle[key]).html("#"+data.nomeEspanhol).parent().html();
                    $scope.currentBloco.tituloEspanhol = $compile('<span>'+$scope.currentBloco.tituloEspanhol+'</span>')($scope);
                },
                function(data){
                    console.log(data);
                });
            }
        });

        angular.forEach(ptTitle, function(value, key) {
            var test = $(value).attr("rel").split("#");
            if(test[0] == "DC"){
                var dataCenter = new DataCenter();
                dataCenter.id = test[1];
                $scope.ServiceFactory.call("DataCenterService", "findById", dataCenter, function(data){
                    $scope.currentBloco.tituloPortugues = $(ptTitle[key]).html("#"+data.nomePortugues).parent().html();
                    $scope.currentBloco.tituloPortugues =  $compile('<span>'+$scope.currentBloco.tituloPortugues+'</span>')($scope);
                },
                function(data){
                    console.log(data);
                });
            }
        });

        angular.forEach(ptTitle, function(value, key) {
            var test = $(value).attr("rel").split("#");
            if(test[0] == "EQ"){
                var equipamento = new Equipamento();
                equipamento.id = test[1];
                $scope.ServiceFactory.call("EquipamentoService", "findById", equipamento, function(data){
                    $scope.currentBloco.tituloPortugues = $(ptTitle[key]).html("#"+data.tipoEquipamento.nomePortugues+"-"+data.modelo+"-"+data.numeroSerie).parent().html();
                    $scope.currentBloco.tituloPortugues = $compile('<span>'+$scope.currentBloco.tituloPortugues+'</span>')($scope);
                },
                function(data){
                    console.log(data);
                });
            }
        });

        angular.forEach(esTitle, function(value, key) {
            var test = $(value).attr("rel").split("#");
            if(test[0] == "EQ"){
                var equipamento = new Equipamento();
                equipamento.id = test[1];
                $scope.ServiceFactory.call("EquipamentoService", "findById", equipamento, function(data){
                    $scope.currentBloco.tituloEspanhol = $(esTitle[key]).html("#"+data.tipoEquipamento.nomeEspanhol+"-"+data.modelo+"-"+data.numeroSerie).parent().html();
                    $scope.currentBloco.tituloEspanhol =  $compile('<span>'+$scope.currentBloco.tituloEspanhol+'</span>')($scope);
                },
                function(data){
                    console.log(data);
                });
            }
        });

        //DESCRICAO
        angular.forEach(esDescription, function(value, key) {
            var test = $(value).attr("rel").split("#");
            if(test[0] == "DC"){
                var dataCenter = new DataCenter();
                dataCenter.id = test[1];
                $scope.ServiceFactory.call("DataCenterService", "findById", dataCenter, function(data){
                        $scope.currentBloco.descricaoEspanhol = $(esDescription[key]).html("#"+data.nomeEspanhol).parent().html();
                        $scope.currentBloco.descricaoEspanhol = $compile('<span>'+$scope.currentBloco.descricaoEspanhol+'</span>')($scope);
                    },
                    function(data){
                        console.log(data);
                    });
            }
        });

        angular.forEach(ptDescription, function(value, key) {
            var test = $(value).attr("rel").split("#");
            if(test[0] == "DC"){
                var dataCenter = new DataCenter();
                dataCenter.id = test[1];
                $scope.ServiceFactory.call("DataCenterService", "findById", dataCenter, function(data){
                        $scope.currentBloco.descricaoPortugues = $(ptDescription[key]).html("#"+data.nomePortugues).parent().html();
                        $scope.currentBloco.descricaoPortugues = $compile('<span>'+$scope.currentBloco.descricaoPortugues+'</span>')($scope);
                    },
                    function(data){
                        console.log(data);
                    });
            }
        });

        angular.forEach(ptDescription, function(value, key) {
            var test = $(value).attr("rel").split("#");
            if(test[0] == "EQ"){
                var equipamento = new Equipamento();
                equipamento.id = test[1];
                $scope.ServiceFactory.call("EquipamentoService", "findById", equipamento, function(data){
                        $scope.currentBloco.descricaoPortugues = $(ptDescription[key]).html("#"+data.tipoEquipamento.nomePortugues+"-"+data.modelo+"-"+data.numeroSerie).parent().html();
                        $scope.currentBloco.descricaoPortugues = $compile('<span>'+$scope.currentBloco.descricaoPortugues+'</span>')($scope);
                    },
                    function(data){
                        console.log(data);
                    });
            }
        });

        angular.forEach(esDescription, function(value, key) {
            var test = $(value).attr("rel").split("#");
            if(test[0] == "EQ"){
                var equipamento = new Equipamento();
                equipamento.id = test[1];
                $scope.ServiceFactory.call("EquipamentoService", "findById", equipamento, function(data){
                        $scope.currentBloco.descricaoEspanhol = $(esDescription[key]).html("#"+data.tipoEquipamento.nomeEspanhol+"-"+data.modelo+"-"+data.numeroSerie).parent().html();
                        $scope.currentBloco.descricaoEspanhol = $compile('<span>'+$scope.currentBloco.descricaoEspanhol+'</span>')($scope);
                    },
                    function(data){
                        console.log(data);
                    });
            }
        });
    }

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
    $scope.changeToDetail = function( id, state ) {
 	   $log.info("changeToDetail", id);

        $scope.currentBloco = new Bloco();
        $scope.currentBloco.id = id;
        $scope.currentBloco.lang = $scope.currentLang;
        $scope.currentFilter = new Atividade();
        $scope.currentFilter.id = id;

        $scope.currentState = $scope.DETAIL_STATE;
        $scope.ServiceFactory.call("BlocoService", "findById", $scope.currentBloco, function(data){
                $scope.currentBloco = data;
                //$scope.atividadesSelecionadas = Atividade.removeLink(data.atividades, $scope.currentLang, $scope.ServiceFactory);
                $scope.atividadesSelecionadas = data.atividades;
                $scope.findReferencesNames();
        },
        function(data){
            console.log(data);
        });

        /*($scope.ServiceFactory.call("AtividadeService", "listAllActive", null, function(data){
            $scope.atividadesSele = Atividade.removeLink(data, $scope.currentLang, $scope.ServiceFactory);
        },
        function(data){
            console.log(data);
        });*/
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
    $scope.changeToDetailState = function( state ) {
        $scope.currentState = state;
    };

    /**
     * Realiza os procedimentos iniciais (prepara o estado)
     * para a tela de exclusão.
     *
     * Antes de excluir, o usuário notificado para confirmação
     * e só então o registro é excluido.
     * Após exclusão, atualizamos a grid com estado de filtro, paginação e sorting.
     */
    $scope.changeToRemove = function( bloco ) {
    	$log.info("changeToRemove", bloco);

        var blocoRemovida = new Bloco();
        blocoRemovida.id = bloco.id;

        var descricaoBloco = '';
        if($scope.currentLang == '.br')
            descricaoBloco = (bloco.descricaoPortugues ? bloco.descricaoPortugues : bloco.descricaoEspanhol);
        else
            descricaoBloco = (bloco.descricaoEspanhol ? bloco.descricaoPortugues : bloco.descricaoEspanhol);



        var dialog = $modal.open( {
 	   		templateUrl: "bundles/operadorescore/lib/eits-directives/dialog/dialog-template.html",
 	   		controller: DialogController,
 	   		windowClass: 'dialog-delete',
 	   		resolve: {
 	   			title: function(){return "_[[Exclusão de Bloco]]";},
 	   			message: function(){return '<b>_[[Tem certeza que deseja excluir o bloco]] "'+ descricaoBloco +'"?</b> _[[Esta operação não poderá mais ser desfeita.]]';},
 	   			buttons: function(){return [ {label:'Excluir', css:'btn btn-danger'}, {label:'Cancelar', dismiss:true} ];}
 	   		}
 	   	});

 	   dialog.result.then( function(result) {
		   $scope.ServiceFactory.call("BlocoService", "remove", blocoRemovida, function(data){
               if(data === false){
                   $scope.msg = {type:'danger', text: '_[[Não foi possível excluir o registro]].', dismiss:true};
                   return false;
               }

                $scope.msg = {type:'success', text:$scope.MENSAGEM_Bloco_EXCLUIDA, dismiss:true};
                $scope.currentBloco = new Bloco();
                $scope.changeToList();
                $state.go($scope.LIST_STATE);
            },
            function(data){
                console.log(data);
            });
 	   });
    };

     /**
     * Configura o pageRequest conforme o componente visual pager
     * e chama o serviço de listagem, considerando o filtro corrente na tela.
     *
     * @see currentPage
     * @see data.filter
     */
    $scope.changeToPage = function() {
        $scope.listBlocosByFilters($scope.currentFilter.lang);
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
    $scope.listBlocosByFilters = function(langFilter) {
        $scope.msg = {type:'info', text:'_[[Por favor, aguarde um momento]]'};

        $scope.currentFilter.lang = langFilter;
        $scope.langFilter = langFilter;

        $scope.ServiceFactory.call("BlocoService", "listByFilters", {filters:$scope.currentFilter ,pageRequest:$scope.currentPage}, function(data){
                $scope.currentPage = data;
                //var content = Bloco.removeLink(data.page.content, $scope.langFilter, $scope.ServiceFactory);
                //$scope.currentPage.page.content = content;
                $scope.msg = '';
            },
            function(data){
                console.log(data);
            });

    };
    
    /**
     * Realiza a inserção de um novo registro
     * e no suscesso, modifica o estado da tela para o detail.
     */
    $scope.insertBloco = function() {

        if(browser == 'ie'){
            if($scope.currentBloco.tituloPortugues == undefined)
                $scope.currentBloco.tituloPortugues = "";
            if($scope.currentBloco.tituloEspanhol == undefined)
                $scope.currentBloco.tituloEspanhol = "";
            if($scope.currentBloco.descricaoPortugues == undefined)
                $scope.currentBloco.descricaoPortugues = "";
            if($scope.currentBloco.descricaoEspanhol == undefined)
                $scope.currentBloco.descricaoEspanhol = "";
        }

        $scope.currentBloco.tituloPortugues = $("#blocoTituloPortugues").html();
        $scope.currentBloco.tituloEspanhol = $("#blocoTituloEspanhol").html();
        $scope.currentBloco.descricaoPortugues = $("#blocoDescricaoPortugues").html();
        $scope.currentBloco.descricaoEspanhol = $("#blocoDescricaoEspanhol").html();

        var characters = ['<span class="ng-scope">', '</span>', '<br>', '&nbsp;'];

        if( $scope.currentBloco.tituloPortugues ){
            $scope.currentBloco.tituloPortugues = $scope.removeUnnecessaryCharacter($scope.currentBloco.tituloPortugues, characters);
        }

        if( $scope.currentBloco.tituloEspanhol ){
            $scope.currentBloco.tituloEspanhol = $scope.removeUnnecessaryCharacter($scope.currentBloco.tituloEspanhol, characters);
        }

        if( $scope.currentBloco.descricaoPortugues ){
            $scope.currentBloco.descricaoPortugues = $scope.removeUnnecessaryCharacter($scope.currentBloco.descricaoPortugues, characters);

        }

        if( $scope.currentBloco.descricaoEspanhol ){
            $scope.currentBloco.descricaoEspanhol = $scope.removeUnnecessaryCharacter($scope.currentBloco.descricaoEspanhol, characters);

        }

        if ( !$scope.form("formPT").$valid  && !$scope.form("formES").$valid ) {
            $scope.msg = {type:'danger', text:'_[[Atenção, o cadastro deve ser efetuado por completo em pelo menos um idioma]]', dismiss:true};
            return;
        }

        var descricaoPortugues = $.trim($scope.currentBloco.descricaoPortugues);
        var descricaoEspanhol = $.trim($scope.currentBloco.descricaoEspanhol);
        var tituloEspanhol = $.trim($scope.currentBloco.tituloEspanhol);
        var tituloPortugues = $.trim($scope.currentBloco.tituloPortugues);

        descricaoPortugues = descricaoPortugues.replaceAll("<br>","");
        descricaoEspanhol = descricaoEspanhol.replaceAll("<br>", "");
        tituloEspanhol = tituloEspanhol.replaceAll("<br>", "");
        tituloPortugues = tituloPortugues.replaceAll("<br>", "");

        if((descricaoPortugues == "" || tituloPortugues == "")  &&  (descricaoEspanhol == "" || tituloEspanhol == "") ){
            $scope.msg = {type:'danger', text:$scope.MENSAGEM_Bloco_IDIOMA, dismiss:true};
            $scope.formPTValid = descricaoPortugues != "" && tituloPortugues != "";
            $scope.formESValid = descricaoEspanhol != "" && tituloEspanhol != "";
            return;
        }

        $scope.currentBloco.validoPortugues = descricaoPortugues != "" && tituloPortugues != "";
        $scope.currentBloco.validoEspanhol  = descricaoEspanhol != "" && tituloEspanhol != "";


        $scope.changeToAtividades();

    };

    $scope.removeUnnecessaryCharacter = function(toRemove, characters){
        angular.forEach(characters, function(value, index){
            toRemove = toRemove.replaceAll(value, (value == '<span class="ng-scope">' || value == '</span>' || value == '<br>' ? '' : ' ') );
        })
        return $.trim(toRemove);
    }

    /**
     *
     */
    $scope.saveBloco = function(){

        var characters = ['<span class="ng-scope">', '</span>', '<br>', '&nbsp;'];
        $scope.currentBloco.tituloPortugues = $("#blocoTituloPortugues").html();
        $scope.currentBloco.tituloEspanhol = $("#blocoTituloEspanhol").html();
        $scope.currentBloco.descricaoPortugues = $("#blocoDescricaoPortugues").html();
        $scope.currentBloco.descricaoEspanhol = $("#blocoDescricaoEspanhol").html();

        if( $scope.currentBloco.tituloPortugues ){
            $scope.currentBloco.tituloPortugues = $scope.removeUnnecessaryCharacter($scope.currentBloco.tituloPortugues, characters);
        }

        if( $scope.currentBloco.tituloEspanhol ){
            $scope.currentBloco.tituloEspanhol = $scope.removeUnnecessaryCharacter($scope.currentBloco.tituloEspanhol, characters);
        }

        if( $scope.currentBloco.descricaoPortugues ){
            $scope.currentBloco.descricaoPortugues = $scope.removeUnnecessaryCharacter($scope.currentBloco.descricaoPortugues, characters);
        }

        if( $scope.currentBloco.descricaoEspanhol ){
            $scope.currentBloco.descricaoEspanhol = $scope.removeUnnecessaryCharacter($scope.currentBloco.descricaoEspanhol, characters);
        }

        if($scope.atividadesSelecionadas.length > 0){
            if($scope.form("formPT").$valid || $scope.form("formES").$valid){
                if($("<div>"+$scope.currentBloco.tituloPortugues+"</div>").find("a").length){
                    $scope.currentBloco.tituloPortugues = $("<div>"+$scope.currentBloco.tituloPortugues+"</div>").find("a").empty().parent().html();
                }if($("<div>"+$scope.currentBloco.tituloEspanhol+"</div>").find("a").length){
                    $scope.currentBloco.tituloEspanhol = $("<div>"+$scope.currentBloco.tituloEspanhol+"</div>").find("a").empty().parent().html();
                }

                if($("<div>"+$scope.currentBloco.descricaoPortugues+"</div>").find("a").length){
                    $scope.currentBloco.descricaoPortugues = $("<div>"+$scope.currentBloco.descricaoPortugues+"</div>").find("a").empty().parent().html();
                }if($("<div>"+$scope.currentBloco.descricaoEspanhol+"</div>").find("a").length){
                    $scope.currentBloco.descricaoEspanhol = $("<div>"+$scope.currentBloco.descricaoEspanhol+"</div>").find("a").empty().parent().html();
                }

                var equipamentos = [];
                var datacenters = [];

                angular.forEach($("<div>"+$scope.currentBloco.tituloPortugues+"</div>").find("a"), function(value, key) {
                    var test = $(value).attr("rel").split("#");
                    if(test[0] == "DC"){
                        var dataCenter = new DataCenter();
                        dataCenter.id = test[1];
                        datacenters.push(dataCenter);
                    }else if(test[0] == "DC"){
                        var dataCenter = new DataCenter();
                        dataCenter.id = test[1];
                        datacenters.push(dataCenter);
                    }
                });

                angular.forEach($("<div>"+$scope.currentBloco.tituloEspanhol+"</div>").find("a"), function(value, key) {
                    var test = $(value).attr("rel").split("#");
                    if(test[0] == "EQ"){
                        var equipamento = new Equipamento();
                        equipamento.id = test[1];
                        equipamentos.push(equipamento);
                    }else if(test[0] == "EQ"){
                        var equipamento = new Equipamento();
                        equipamento.id = test[1];
                        equipamentos.push(equipamento);
                    }
                });

                /**
                 * descricao
                 */
                angular.forEach($("<div>"+$scope.currentBloco.descricaoPortugues+"</div>").find("a"), function(value, key) {
                    var test = $(value).attr("rel").split("#");
                    if(test[0] == "DC"){
                        var dataCenter = new DataCenter();
                        dataCenter.id = test[1];
                        datacenters.push(dataCenter);
                    }else if(test[0] == "EQ"){
                        var equipamento = new Equipamento();
                        equipamento.id = test[1];
                        equipamentos.push(equipamento);
                    }
                });

                angular.forEach($("<div>"+$scope.currentBloco.descricaoEspanhol+"</div>").find("a"), function(value, key) {
                    var test = $(value).attr("rel").split("#");
                    if(test[0] == "DC"){
                        var dataCenter = new DataCenter();
                        dataCenter.id = test[1];
                        datacenters.push(dataCenter);
                    }else if(test[0] == "EQ"){
                        var equipamento = new Equipamento();
                        equipamento.id = test[1];
                        equipamentos.push(equipamento);
                    }
                });


                $scope.currentBloco.equipamentos = equipamentos;
                $scope.currentBloco.datacenters  = datacenters;

                if(browser == 'ie'){
                    if($scope.currentBloco.tituloPortugues == undefined)
                        $scope.currentBloco.tituloPortugues = "";
                    if($scope.currentBloco.tituloEspanhol == undefined)
                        $scope.currentBloco.tituloEspanhol = "";
                    if($scope.currentBloco.descricaoPortugues == undefined)
                        $scope.currentBloco.descricaoPortugues = "";
                    if($scope.currentBloco.descricaoEspanhol == undefined)
                        $scope.currentBloco.descricaoEspanhol = "";
                }

                if($scope.currentState != $scope.UPDATE_STATE){

                    $.each($scope.atividadesSelecionadas, function(i, atividade){
                        $scope.atividadesSelecionadas[i] = new Atividade();
                        $scope.atividadesSelecionadas[i].id = atividade.id;
                    });

                    $scope.currentBloco.atividades = $scope.atividadesSelecionadas;
                    $scope.ServiceFactory.call("BlocoService", "insert",  $scope.currentBloco, function(data){
                            $scope.msg = {type:'success', text:$scope.MENSAGEM_Bloco_SALVA, dismiss:true};
                            $state.go($scope.LIST_STATE);
                        },
                        function(data){
                            console.log(data);
                        });
                } else {
                    $scope.ServiceFactory.call("BlocoService", "update",  $scope.currentBloco, function(data){
                            $scope.msg = {type:'success', text:$scope.MENSAGEM_Bloco_SALVA, dismiss:true};
                            $state.go($scope.LIST_STATE);
                        },
                        function(data){
                            console.log(data);
                        });
                }
            } else {
                $scope.msg = {type:'danger', text:$scope.MENSAGEM_Bloco_IDIOMA, dismiss:true};
            }
        } else {
            $scope.msg = {type:'danger', text:$scope.MENSAGEM_Bloco_ATIVIDADE, dismiss:true};
        }
    }

    /**
     * Realiza a atualiza de um registro
     * e no suscesso, modifica o estado da tela para o detail.
     */
    $scope.updateBloco = function() {

        /*if ( !$scope.form().$valid ) {
            //$scope.message = {type:"error", text: $scope.INVALID_FORM_MESSAGE};
            return;
        }*/

        $scope.ServiceFactory.call("DataCenterService", "update", $scope.currentEntity, function(data){
            $state.go($scope.DETAIL_STATE, {id:data.id});
        },
        function(data){
            console.log(data);
        });

    };

    /**
     *
     */
    $scope.listBlocos = function() {
        $scope.gridHasResponse = false;
        $scope.currentPage   = new PageRequest();
        $scope.currentFilter = new Bloco();
        $scope.currentFilter.lang = $scope.currentLang;
        if($scope.currentLang == ".br"){
            $scope.currentPage.sort.property = "tituloPortugues";
        }else{
            $scope.currentPage.sort.property = "tituloEspanhol";
        }
        $scope.currentPage.sort.direction = "ASC";
        $scope.ServiceFactory.call("BlocoService", "listByFilters", {filters:$scope.currentFilter ,pageRequest:$scope.currentPage}, function(data){
                $scope.currentPage = data;
                //var content = Bloco.removeLink(data.page.content, $scope.currentLang, $scope.ServiceFactory);

                //$scope.currentPage.page.content = content;
                $scope.gridHasResponse = true;
            },
            function(data){
                console.log(data);
            });
    };

    /**
     *
     */
    $scope.ativarBloco = function(bloco) {
        $scope.currentBloco = new Bloco();
        $scope.currentBloco.id = bloco.id;
        $scope.currentBloco.status = true;

        $scope.ServiceFactory.call("BlocoService", "activateDeactivate", $scope.currentBloco, function(data){
                $scope.msg = {type:'success', text:$scope.MESSAGE_Bloco_ATIVADA, dismiss:true};
                $scope.currentBloco = new Bloco();
                $scope.changeToList();
            },
            function(data){
                console.log(data);
            });
    }

    /**
     *
     * @param Bloco
     */
    $scope.desativarBloco = function(bloco) {
        $scope.currentBloco = new Bloco();
        $scope.currentBloco.id = bloco.id;
        $scope.currentBloco.status = false;

        var dialog = $modal.open( {
            templateUrl: "bundles/operadorescore/lib/eits-directives/dialog/dialog-template.html",
            controller: DialogController,
            windowClass: 'dialog-delete',
            resolve: {
                title: function(){return "_[[Desativação de Bloco]]";},
                message: function(){return '<b>_[[Tem certeza que deseja desativar o bloco]] "'+ bloco.tituloPortugues +'"?</b>';},
                buttons: function(){return [ {label:'_[[Desativar]]', css:'btn btn-danger'}, {label:'Cancelar', dismiss:true} ];}
            }
        });

        dialog.result.then( function(result) {
            $scope.ServiceFactory.call("BlocoService", "activateDeactivate", $scope.currentBloco, function(data){
                $scope.msg = {type:'success', text:$scope.MESSAGE_Bloco_DESATIVADA, dismiss:true};
                $scope.currentBloco = new Bloco();
                $scope.changeToList();
            },
            function(data){
                console.log(data);
            });
        });
    }

    $scope.modalDetalhesEquipamento = function(id){
        var equipamento = new Equipamento();
        equipamento.id = id;
        if(!$scope.oldState){
            $state.go('equipamento.detalhe', {id:id});
            return;
        }
        $scope.ServiceFactory.call("EquipamentoService", "findById", equipamento, function(data){
                var modal = $modal.open({
                    templateUrl: 'resource/admin?file=templates/bloco/modal/equipamentos-detail.html',
                    controller: ModalDetalheEquipamentoCtrl,
                    size: 500,
                    resolve: {
                        equipamento: function(){
                            return data;
                        }
                    }
                })

                modal.result.then(function (  ) {
                }, function () {
                    if(($scope.currentState != $scope.INSERT_STATE) && ($scope.currentState != $scope.INSERT_STATE_BR) && ($scope.currentState != $scope.INSERT_STATE_ES)){
                        $state.go($scope.oldState.name, {id:$scope.oldParams.id});
                    }
                });
            },
            function(data){
                console.log(data);
            }
        );
    };

    /**
     * RemoveAtividade da Grid
     */
    $scope.toogleAtividade = function( atividade ) {
        if(atividade){
            var index = $scope.atividades.indexOf(atividade);
            if(index != -1){
                $scope.atividades.splice($scope.atividades.indexOf(atividade), 1);
                $scope.atividadesSelecionadas.push(atividade);
            }else{
                index = $scope.atividadesSelecionadas.indexOf(atividade);

                var descricao = ($scope.currentLang == ".br" ? (atividade.descricaoPortugues != "" ? atividade.descricaoPortugues : atividade.descricaoEspanhol) : (atividade.descricaoEspanhol != "" ? atividade.descricaoEspanhol : atividade.descricaoPortugues));

                var dialog = $modal.open({
                    templateUrl: "bundles/operadorescore/lib/eits-directives/dialog/dialog-template.html",
                    controller: DialogController,
                    windowClass: 'dialog-delete',
                    resolve: {
                        title: function(){return "_[[Exclusão de atividade]]";},
                        message: function(){return '<b>_[[Tem certeza que deseja excluir a atividade]] \''+ descricao +'\'?<br>_[[Esta operação não poderá mais ser desfeita.]]</b>';},
                        buttons: function(){return [ {label:'_[[Excluir]]', css:'btn btn-danger'}, {label:'Cancelar', dismiss:true} ];}
                    }
                });

                dialog.result.then(function(result){
                    $scope.atividadesSelecionadas.splice($scope.atividadesSelecionadas.indexOf(atividade), 1);
                    $scope.atividades.push(atividade);
                });
            }
        }else{
            $scope.msg = {type:'info', text:'_[[Escolha uma atividade]]', dismiss:true};
        }
    }

    $scope.modalDetalhesDataCenter = function(id){
        var datacenter = new DataCenter();
        datacenter.id = id;

        if(!$scope.oldState){
            $state.go('datacenter.detalhe', {id:id});
            return;
        }

        $scope.ServiceFactory.call("DataCenterService", "findById", datacenter, function(data){
                var modal = $modal.open({
                    templateUrl: 'resource/admin?file=templates/bloco/modal/datacenter-detail.html',
                    controller: ModalDetalheDataCenterCtrl,
                    size: 700,
                    resolve: {
                        datacenter: function(){
                            return data;
                        },
                        lang: function(){
                            return $scope.currentLang;
                        }
                    }
                });

                modal.result.then(function (  ) {
                }, function () {
                    if(($scope.currentState != $scope.INSERT_STATE) && ($scope.currentState != $scope.INSERT_STATE_BR) && ($scope.currentState != $scope.INSERT_STATE_ES)){
                        $state.go($scope.oldState.name, {id:$scope.oldParams.id});
                    }
                });
            },
            function(data){
                console.log(data);
            }
        );
    };

    $scope.getEquipamentosDataCenters = function(){

        $scope.currentPage = new PageRequest();
        $scope.currentFilter = new DataCenter();

        $scope.currentFilter.lang = $scope.currentLang;
        $scope.ServiceFactory.call("DataCenterService", "listByFilters", {filters:$scope.currentFilter ,pageRequest:$scope.currentPage}, function(data){
                $scope.datacenters = data;
            },
            function(data){
                console.log(data);
            });

        $scope.currentFilter = new Equipamento();
        $scope.currentFilter.lang = $scope.currentLang;
        $scope.ServiceFactory.call("EquipamentoService", "listByFilters", {filters:$scope.currentFilter ,pageRequest:$scope.currentPage}, function(data){
                $scope.equipamentos = data;
            },
            function(data){
                console.log(data);
            });

    }

    $scope.modalEquipamentos = function (titulo) {
        $scope.getEquipamentosDataCenters();

        $scope.items = {
            equipamentos: $scope.equipamentos,
            datacenters: $scope.datacenters,
            lang: $scope.currentLang
        };

        var modal = $modal.open({
            templateUrl: 'resource/admin?file=templates/bloco/modal/equipamentos.html',
            controller: ModalEquipamentosCtrl,
            size: 500,
            resolve: {
                items: function(){
                    return $scope.items;
                }
            }
        });

        modal.result.then(function ( select ) {
            //Se for um novo plano orçamentário
            var selectdDataCenters = select[0];
            var selectdEquipamentos = select[1];
            $scope.currentBloco.tituloPortugues = $scope.currentBloco.tituloPortugues ? $scope.currentBloco.tituloPortugues : "";
            $scope.currentBloco.tituloEspanhol = $scope.currentBloco.tituloEspanhol ? $scope.currentBloco.tituloEspanhol : "";
            $scope.currentBloco.descricaoPortugues = $scope.currentBloco.descricaoPortugues ? $scope.currentBloco.descricaoPortugues : "";
            $scope.currentBloco.descricaoEspanhol = $scope.currentBloco.descricaoEspanhol ? $scope.currentBloco.descricaoEspanhol : "";

            var isValid = true;

            var tituloText = $scope.currentLang == '.br' ? $("#blocoTituloPortugues").text() : $("#blocoTituloEspanhol").text();

            if( tituloText.length > 255 ) {
                $scope.msg = {type:'danger', text:'_[[O campo deve ter no máximo 255 caracteres]].', dismiss:true};
                return false;
            }

            angular.forEach(selectdDataCenters, function(value, key) {
                tituloText += $scope.currentLang == '.br' ? value.nomePortugues : value.nomeEspanhol;

                if(  tituloText.length > 255 ) {
                    $scope.msg = {type:'danger', text:'_[[O campo deve ter no máximo 255 caracteres]].', dismiss:true};
                    isValid = false;
                    return false;
                }
            });

            angular.forEach(selectdEquipamentos, function(value, key) {
                tituloText += $scope.currentLang == '.br' ? value.nomePortugues : value.nomeEspanhol;

                if(  tituloText.length > 255 ) {
                    $scope.msg = {type:'danger', text:'_[[O campo deve ter no máximo 255 caracteres]].', dismiss:true};
                    isValid = false;
                    return false;
                }
            });

            if ( !isValid ) return false;

            var tituloHtml =  $scope.currentLang == '.br' ? $("#blocoTituloPortugues").html() : $("#blocoTituloEspanhol").html();
            var descricaoHtml = $scope.currentLang == '.br' ? $("#blocoDescricaoPortugues").html() : $("#blocoDescricaoEspanhol").html();

            if(selectdDataCenters.length){

                angular.forEach(selectdDataCenters, function(value, key) {
                    if(titulo){
                        if($scope.currentLang == '.br'){

                            tituloHtml += "<a rel='DC#"+value.id+"' ng-click='modalDetalhesDataCenter("+ value.id +")' href='javascript();'>#"+(value.nomePortugues ? value.nomePortugues : value.nomeEspanhol)+"</a> ";
                            $scope.currentBloco.tituloPortugues = $compile('<span>'+tituloHtml+'</span>')($scope);
                        }else{
                            tituloHtml += "<a rel='DC#"+value.id+"' href='javascript();' ng-click='modalDetalhesDataCenter("+ value.id +")'>#"+(value.nomeEspanhol ? value.nomeEspanhol : value.nomePortugues)+"</a> ";
                            $scope.currentBloco.tituloEspanhol = $compile('<span>'+tituloHtml+'</span>')($scope);
                        }
                    }else{
                        if($scope.currentLang == '.br'){
                            descricaoHtml += "<a rel='DC#"+value.id+"' href='javascript();' ng-click='modalDetalhesDataCenter("+ value.id +")'>#"+(value.nomePortugues ? value.nomePortugues : value.nomeEspanhol)+"</a> ";
                            $scope.currentBloco.descricaoPortugues = $compile('<span>'+descricaoHtml+'</span>')($scope);
                        }else{
                            descricaoHtml += "<a rel='DC#"+value.id+"' href='javascript();' ng-click='modalDetalhesDataCenter("+ value.id +")'>#"+(value.nomeEspanhol ? value.nomeEspanhol : value.nomePortugues)+"</a> ";
                            $scope.currentBloco.descricaoEspanhol = $compile('<span>'+descricaoHtml+'</span>')($scope);
                        }
                    }
                });
            }
            if(selectdEquipamentos.length){
                angular.forEach(selectdEquipamentos, function(value, key) {
                    if(titulo){
                        if($scope.currentLang == '.br'){
                            tituloHtml += "<a rel='EQ#"+value.id+"' href='javascript();' ng-click='modalDetalhesEquipamento("+ value.id +")'>#"+value.tipoEquipamento.nomePortugues+"-"+value.modelo+"-"+value.numeroSerie+"</a> ";
                            $scope.currentBloco.tituloPortugues = $compile('<span>'+tituloHtml+'</span>')($scope);
                        }else{
                            tituloHtml += "<a rel='EQ#"+value.id+"' href='javascript();' ng-click='modalDetalhesEquipamento("+ value.id +")'>#"+value.tipoEquipamento.nomeEspanhol+"-"+value.modelo+"-"+value.numeroSerie+"</a>";
                            $scope.currentBloco.tituloEspanhol = $compile('<span>'+tituloHtml+'</span>')($scope);
                        }
                    }else{
                        if($scope.currentLang == '.br'){
                            descricaoHtml += "<a rel='EQ#"+value.id+"' href='javascript();' ng-click='modalDetalhesEquipamento("+ value.id +")'>#"+value.tipoEquipamento.nomePortugues+"-"+value.modelo+"-"+value.numeroSerie+"</a> ";
                            $scope.currentBloco.descricaoPortugues = $compile('<span>'+descricaoHtml+'</span>')($scope);
                        }else{
                            descricaoHtml += "<a rel='EQ#"+value.id+"' href='javascript();' ng-click='modalDetalhesEquipamento("+ value.id +")'>#"+value.tipoEquipamento.nomeEspanhol+"-"+value.modelo+"-"+value.numeroSerie+"</a>";
                            $scope.currentBloco.descricaoEspanhol = $compile('<span>'+descricaoHtml+'</span>')($scope);
                        }
                    }
                });
            }
        }, function () {
            $log.info("Saiu via cancelar");
        });
    };
};
