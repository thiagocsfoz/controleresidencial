'use strict';

/**
 * 
 * @param $scope
 * @param $log
 * @param $location
 */
function AtividadeController( $scope, $injector, $log, $state, ServiceFactory, languages, $modal, $compile ) {

    var fieldPT = '<div class="texto-ellipsis" style="margin-right: 15px;" ng-if="(currentLang == \'.br\' && row.entity.nomePortuguesClear != \'\') || (currentLang == \'.es\' && row.entity.nomeEspanholClear == \'\') " title="{{row.entity.nomePortuguesClear}}">{{row.entity.nomePortuguesClear }}</div>';
    var fieldES = '<div class="texto-ellipsis" style="margin-right: 15px;" ng-if="(currentLang == \'.es\' && row.entity.nomeEspanholClear != \'\') || (currentLang == \'.br\' && row.entity.nomePortuguesClear == \'\') " title="{{row.entity.nomeEspanholClear}}">{{row.entity.nomeEspanholClear }}</div>';

    var fieldDetalhesPT = '<div ng-if="(currentLang == \'.br\' && row.entity.nomePortugues != \'\') || (currentLang == \'.es\' && row.entity.nomeEspanhol == \'\') " title="{{row.entity.nomePortugues}}">{{row.entity.nomePortugues }}</div>';
    var fieldDetalhesES = '<div ng-if="(currentLang == \'.es\' && row.entity.nomeEspanhol != \'\') || (currentLang == \'.br\' && row.entity.nomePortugues == \'\') " title="{{row.entity.nomeEspanhol}}">{{row.entity.nomeEspanhol }}</div>';


    /**
	 * Injeta os métodos, atributos e seus estados herdados de AbstractController.
	 * @see AbstractController
	 */
	$injector.invoke(AbstractController, this, {$scope: $scope});

    $scope.$on('ngGridEventSorted', function(event, sort) {
        // compara os objetos para garantir que o evento seja executado somente uma vez q não entre em loop
        if ( (!angular.equals(sort, $scope.gridPTOptions.sortInfo) || !angular.equals(sort, $scope.gridESOptions.sortInfo)) && ($scope.currentState != $scope.INSERT_STATE_BR && $scope.currentState != $scope.UPDATE_STATE && $scope.currentState != $scope.DETAIL_STATE)) {
            $scope.gridPTOptions.sortInfo = angular.copy(sort);
            $scope.gridESOptions.sortInfo = angular.copy(sort);

            if(sort.fields[0] == undefined) {
                if($scope.currentFilter.lang == '.br'){
                    sort.fields[0] = 'descricaoPortugues';
                }else {
                    sort.fields[0] = 'descricaoEspanhol';
                }
            }

            $scope.currentPage.sort.property  = sort.fields[0];
            $scope.currentPage.sort.direction = sort.directions[0];
            $scope.listAtividadesByFilters($scope.currentFilter.lang);
        }

        if ( !angular.equals((sort, $scope.gridFormPTOptions.sortInfo) || !angular.equals(sort, $scope.gridFormESOptions.sortInfo)) && ($scope.currentState == $scope.INSERT_STATE_BR || $scope.currentState == $scope.UPDATE_STATE || $scope.currentState == $scope.DETAIL_STATE)) {
            if($scope.currentState != $scope.DETAIL_STATE)
                $scope.respostas = $scope.ordenar('nomePortuguesClear','nomeEspanholClear',$scope.respostas, $scope.currentLang, sort.directions[0]);
            else
                $scope.respostas = $scope.ordenar('nomePortugues','nomeEspanhol',$scope.respostas, $scope.currentLang, sort.directions[0]);
        }
    });

    $scope.langFilter = false;

    $scope.ServiceFactory = ServiceFactory;
	/*-------------------------------------------------------------------
	 * 		 				 	ATTRIBUTES
	 *-------------------------------------------------------------------*/

    //Service.call();
    //$scope.message = {type:"error", text: "AEHO"};

    //STATES
    /**
     *
     */
    $scope.estaOrdenado = [];

    /**
     * Variável estática que representa 
     * o estado de listagem de registros.
     */
    $scope.LIST_STATE = "atividade.listar";

    /**
     * Variável estática que representa
     * o estado de detalhe de um registro.
     */
    $scope.DETAIL_STATE = "atividade.detalhe";

    /**
     * Variável estática que representa
     * o estado para a criação de registros.
     */
    $scope.INSERT_STATE = "atividade.criar";

	/**
	 * Variável estática que representa
     * o estado para a criação de registros.
     */
    $scope.INSERT_STATE_BR = "atividade.criar.br";

    /**
     * Variável estática que representa
     * o estado para a criação de registros.
     */
    $scope.INSERT_STATE_ES = "atividade.criar.es";

    /**
     * Variável estática que representa
     * o estado para a criação de registros.
     */
    $scope.CLONE_STATE = "atividade.clonar";

	/**
	 * Variável estática que representa
     * o estado para a edição de registros.
     */
    $scope.UPDATE_STATE = "atividade.editar";

    /**
     * Variável estática que representa
     * o estado para a edição de registros.
     */
    $scope.STATE_ATIVIDADE = "atividade";

    /**
     * Variável estática que representa
     * o estado para a edição de registros.
     */
    $scope.STATE_RESPOSTA = "resposta";

    /**
     * Variável que armazena o estado corrente da tela.
     * Esta variável deve SEMPRE estar de acordo com a URL 
     * que estão no browser.
     */
    $scope.currentState = "atividade.criar";

	/**
	 * Armazena a entitidade reposta corrente para edição ou detalhe.
	 */
     $scope.currentResposta;

    /**
     * Armazena a entitidade atividade corrente para edição ou detalhe.
     */
     $scope.currentAtividade;

    /**
     * Armazena as respostas a serem removidas
     * @type {Array}
     */
    $scope.respostasRemovidas = [];

   /**
     * Armazena as respostas
     * @type {Array}
     */
    $scope.respostas = [];

    /**
     * Armazena as respostas
     * @type {Array}
     */
    $scope.respostasInseridas = [];

    /**
     * Armazena as respostas
     * @type {Array}
     */
    $scope.respostasRemovidas = [];

    /**
     * Armazena as respostas
     * @type {Array}
     */
    $scope.respostasEditadas = [];

    /**
     * Armazena o Idioma do Navegador;
     */
    $scope.currentLang;

    /**
     * Armazena evente de adicionar uma nova resposta
     */
    $scope.addResposta = false;

    /**
     * Armazena o idioma que está cadastrando a resposta
     */
    $scope.langResposta;

    /**
     * Nível Crítico
     */
    $scope.nivelCritico = [];
    $scope.nivelCritico['BAIXO'] = '_[[Baixo]]';
    $scope.nivelCritico['MEDIO'] = '_[[Médio]]';
    $scope.nivelCritico['ALTO']  = '_[[Alto]]';

    /**
     * Estado detalhe atividade
     */
    $scope.detailState = 'atividade';

    /**
     *
     */
    $scope.actionResposta = 'adicionar';

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
    $scope.ATIVIDADE = 1;
    $scope.RESPOSTA = 2;


    /**
     * Atributo para validação dos campos após tentar inserir a primeira vez.
     */
    $scope.formPTValid = true;
    $scope.formESValid = true;

    /**
     * Messagens de alertas
     */
    $scope.MENSAGEM_ATIVIDADE_CONDICIONAL_ERROR = "_[[Atividade já está relacionado com essa resposta.]]";
    $scope.MENSAGEM_ATIVIDADE_ATIVADA = "_[[Atividade ativada com sucesso.]]";
    $scope.MENSAGEM_ATIVIDADE_DESATIVADA = "_[[Atividade desativada com sucesso.]]";
    $scope.MENSAGEM_ATIVIDADE_SALVA = "_[[Atividade salva com sucesso.]]";
    $scope.MENSAGEM_ATIVIDADE_EXCLUIDA = "_[[Atividade excluída com sucesso.]]";
    $scope.MENSAGEM_ATIVIDADE_IDIOMA = "_[[Atenção, o cadastro deve ser efetuado por completo em pelo menos um idioma.]]";
    $scope.MENSAGEM_ATIVIDADE_RESPOSTA = "_[[Atenção, o cadastro deve ter pelo menos uma resposta cadastrada.]]";

    //DATA GRID
    /**
     * Variável estática coms os botões de ação da grid
     * O botão de editar navega via URL (sref) por que a edição é feita em outTraduzirra página,
     * já o botão de excluir chama um método direto via ng-click por que não tem um estado da tela específico.
     */
    var GRID_ACTION_BUTTONS_RESPOSTA = '<div class="cell-centered">' +
                                    '<a ng-if="getAtividadeCondicional()" ng-click="atividadeCondicional(row.entity)" title="Adicionar Atividade Condicional" class="btn btn-mini"><i class="glyphicon glyphicon-list"></i></a>'+
    								'<a ng-click="traduzirReposta(row.entity)" title="_[[Traduzir]]" class="btn btn-mini"><i class="glyphicon glyphicon-refresh"></i></a>'+
    								'<a ng-click="editResposta(row.entity)" title="_[[Editar]]" class="btn btn-mini"><i class="glyphicon glyphicon-pencil"></i></a>'+
    								'<a ng-click="removeResposta(row.entity)" title="_[[Excluir]]" class="btn btn-mini"><i class="glyphicon glyphicon-trash"></i></a>'+
    						   '</div>';

    var GRID_ACTION_BUTTONS = '<div class="cell-centered">' +
        '<a ng-click="editClick(row.entity)" ng-if="!row.entity.estaSendoUsado" title="_[[Editar]]" class="btn btn-mini"><i class="glyphicon glyphicon-pencil"></i></a>'+
        '<a ng-click="changeToRemove(row.entity)" ng-if="!row.entity.estaSendoUsado" title="_[[Excluir]]" class="btn btn-mini"><i class="glyphicon glyphicon-trash"></i></a>'+
        '<a ng-if="!row.entity.status" ng-click="ativarAtividade(row.entity)" title="_[[Ativar]]" class="btn btn-mini"><i class="fa fa-check"></i></a>'+
        '<a ng-if="row.entity.status" ng-click="desativarAtividade(row.entity)" title="_[[Desativar]]" class="btn btn-mini"><i class="fa fa-ban"></i></a>'+
        '<a ng-click="clonar(row.entity)" title="_[[Clonar]]" class="btn btn-mini"><i class="fa fa-files-o"></i></a>'+
        '</div>';
    $scope.indiceResposta = 1;

    /**
     * Configurações gerais da ng-grid. 
     * @see https://github.com/angular-ui/ng-grid/wiki/Configuration-Options
     */

    $scope.gridPTColumnsSet = {
        //All columns (for large screen)
        allColumns: [
            {displayName:'_[[Descrição]]', field:'descricaoPortugues' ,width:'55%', cellTemplate: '<div class="form-group"><div class="row"><div class="col-xs-8" style="padding: 4px 0 0 20px;">{{ row.entity.descricaoPortuguesClear }}</div>' + $scope.getTemplateFlags() +  '</div></div>'},
            {displayName:'_[[Nível Crítico]]', field: 'nivelCritico', width:'20%', cellTemplate: '<div align="center" style="padding-top: 3%;">{{nivelCritico[row.entity.nivelCritico]}}</div>'},
            {displayName:'_[[Ações]]', sortable:false, cellTemplate: GRID_ACTION_BUTTONS, width:'25%'}
        ],
        //Columns for small screen
        smallColumns: [
            {displayName:'_[[Descrição]]', field:'descricaoPortugues' ,width:'65%', cellTemplate: '<div class="form-group"><div class="row"><div class="col-xs-8" style="padding: 4px 0 0 20px;">{{ row.entity.descricaoPortuguesClear }}</div>' + $scope.getTemplateFlags() +  '</div></div>'},
            {displayName:'_[[Nível Crítico]]', field: 'nivelCritico', width:'35%', cellTemplate: '<div align="center" style="padding-top: 3%;">{{nivelCritico[row.entity.nivelCritico]}}</div>'},
        ]
    };

    $scope.gridPTColumns = $scope.gridPTColumnsSet.allColumns;

    $scope.gridESColumnsSet = {
        //All columns (for large screen)
        allColumns: [
            {displayName:'_[[Descrição]]', field:'descricaoPortugues' ,width:'55%', cellTemplate: '<div class="form-group"><div class="row"><div class="col-xs-8" style="padding: 4px 0 0 20px;">{{ row.entity.descricaoPortuguesClear }}</div>' + $scope.getTemplateFlags() +  '</div></div>'},
            {displayName:'_[[Nível Crítico]]', field: 'nivelCritico', width:'20%', cellTemplate: '<div align="center" style="padding-top: 3%;">{{nivelCritico[row.entity.nivelCritico]}}</div>'},
            {displayName:'_[[Ações]]', sortable:false, cellTemplate: GRID_ACTION_BUTTONS, width:'25%'}
        ],
        //Columns for small screen
        smallColumns: [
            {displayName:'_[[Descrição]]', field:'descricaoPortugues' ,width:'65%', cellTemplate: '<div class="form-group"><div class="row"><div class="col-xs-8" style="padding: 4px 0 0 20px;">{{ row.entity.descricaoPortuguesClear }}</div>' + $scope.getTemplateFlags() +  '</div></div>'},
            {displayName:'_[[Nível Crítico]]', field: 'nivelCritico', width:'35%', cellTemplate: '<div align="center" style="padding-top: 3%;">{{nivelCritico[row.entity.nivelCritico]}}</div>'},
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
        //rowTemplate: '<div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}"><div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: col.index != 0 }">&nbsp;</div><div ng-cell></div></div>',
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
        columnDefs: 'gridESColumns'
    };

    /**
     * Configurações gerais da ng-grid em portugues.
     * @see https://github.com/angular-ui/ng-grid/wiki/Configuration-Options
     */
    $scope.gridFormPTOptions = {
        data: 'respostas',
        multiSelect: false,
        useExternalSorting: true,
        ortInfo: { fields: ['nomePortugues',' nomeEspanhol'], directions: ['asc', 'desc']},
        columnDefs: [
            {displayName:'#', field: 'indice' , width:'5%'},
            {displayName:'_[[Resposta]]', field: fieldPT, width:'80%', cellTemplate: '<div class="form-group"><div class="row"><div class="col-xs-5" style="padding: 4px 0 0 20px;">' + fieldPT + fieldES + '</div>' + '<div class="col-xs-1" style="padding: 4px;"><div style="float: right; margin-right: 6px; margin-left: 0" ng-if="row.entity.atividadesCondicionais.length" class="icon-condicional-on"></div><div style="float: right; margin-right: 6px; margin-left: 0" ng-if="!row.entity.atividadesCondicionais.length" class="icon-condicional-off"></div></div>' + $scope.getTemplateFlags('nome')  + '</div></div>'},
            {displayName:'_[[Ações]]', sortable:false, cellTemplate: GRID_ACTION_BUTTONS_RESPOSTA, width:'15%'}
        ]
    };

    /**
     * Configurações gerais da ng-grid em espanhol.
     * @see https://github.com/angular-ui/ng-grid/wiki/Configuration-Options
     */
    $scope.gridFormESOptions = {
        data: 'respostas',
        multiSelect: false,
        useExternalSorting: true,
        columnDefs: [
            {displayName:'#',    field: 'indice' , width:'5%'},
            {displayName:'_[[Resposta]]', field: fieldES, width:'80%', cellTemplate: '<div class="form-group"><div class="row"><div class="col-xs-7" style="padding: 4px 0 0 20px;">' + fieldPT + fieldES + '</div>' + '<div class="col-xs-1" style="padding: 4px 0 0 20px;"><div style="float: right; margin-right: 6px; margin-left: 0" ng-if="row.entity.atividadesCondicionais.length" class="icon-condicional-on"></div><div style="float: right; margin-right: 6px; margin-left: 0" ng-if="!row.entity.atividadesCondicionais.length" class="icon-condicional-off"></div></div>' + $scope.getTemplateFlags('nome') +  '</div></div>'},
            {displayName:'_[[Ações]]', sortable:false, cellTemplate: GRID_ACTION_BUTTONS_RESPOSTA, width:'15%'}
        ]
    };

    /**
     *
     */
    $scope.gridDetalheRespostaPTOptions = {
        data: 'respostas',
        multiSelect: false,
        useExternalSorting: false,
        enableRowSelection: false,
        columnDefs: [
            {displayName:'_[[Resposta]]', field: fieldPT, width:'100%', cellTemplate: '<div class="form-group"><div class="row"><div class="col-xs-8" style="padding: 4px 0 0 20px;">' + fieldDetalhesPT + fieldDetalhesES + '</div>' + $scope.getTemplateFlags('nome') +  '</div></div>'}
        ]
    };

    /**
     *
     */
    $scope.gridDetalheRespostaESOptions = {
        data: 'respostas',
        multiSelect: false,
        useExternalSorting: false,
        enableRowSelection: false,
        columnDefs: [
            {displayName:'_[[Resposta]]', field: fieldES, width:'100%', cellTemplate: '<div class="form-group"><div class="row"><div class="col-xs-8" style="padding: 4px 0 0 20px;">' + fieldDetalhesPT + fieldDetalhesES + '</div>' + $scope.getTemplateFlags('nome') +  '</div></div>'}
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


    $scope.getAtividadeCondicional = function(){
        return $scope.currentAtividade.tipo == "MULTI" || $scope.currentAtividade.tipo == "UNICA";
    }

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
            $scope.currentLang = $scope.langResposta = ".br";
        },function(){
            $scope.currentLang = $scope.langResposta = ".es";
        });

        $scope.getEquipamentosDataCenters();

        $('#module-cadastros').addClass('open');
        $('#module-atividade').trigger('click');

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
                $scope.clonarAtividade();
            }
            break;
			case $scope.UPDATE_STATE: {
				$scope.changeToUpdate( $state.params.id, $scope.UPDATE_STATE );
			}
			break;
            case 'atividade.detalhePop':{
                $scope.modalDetalhesEquipamento( $state.params.id );
            }
            break;
            case 'atividade.detalheData':{
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
        $scope.respostas = [];
        $scope.indiceResposta = 1;
    	$log.info("changeToList");

    	var pageRequest = {};
    	pageRequest.size = 10;
        $scope.langFilter = $scope.currentLang;
        $scope.currentState = $scope.LIST_STATE;
        $scope.pageRequest = pageRequest;

        $scope.listAtividades();
    };

    /**
     *
     */
    $scope.changeToLang = function( lang ){
        $scope.currentLang = lang;
    }

    $scope.changeToLangResposta = function( lang ){
        $scope.langResposta = lang;
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
        $scope.actionResposta = 'adicionar';

        $scope.currentAtividade = new Atividade();
        $scope.currentResposta  = new Resposta();

        $scope.currentAtividade.tipo = "ABERTA";
        $scope.currentAtividade.nivelCritico = "BAIXO";
        $scope.langResposta = $scope.currentLang;

        $scope.currentState = state;
        $scope.insertState = $scope.STATE_ATIVIDADE;

    };

    /**
     *
     */
    $scope.clonar = function( atividade ){
        $state.go($scope.CLONE_STATE, {id:atividade.id});
    }

    /**
     *
     */
    $scope.clonarAtividade = function(){

        $scope.currentAtividade = new Atividade();
        $scope.currentAtividade.id = $state.params.id;
        $scope.currentFilter = new Resposta();
        $scope.currentFilter.id = $state.params.id;
        $scope.currentFilter.lang = $scope.currentLang;

        if($scope.currentLang == '.br')
            $scope.currentState = $scope.INSERT_STATE_BR;
        else
            $scope.currentState = $scope.INSERT_STATE_ES;

        $scope.insertState = $scope.STATE_ATIVIDADE;

        $scope.ServiceFactory.call("AtividadeService", "findById", $scope.currentAtividade, function(data){
                $scope.currentAtividade = data;
                $scope.findReferencesNames();
            },
            function(data){
                console.log(data);
            });

        $scope.ServiceFactory.call("RespostaService", "listByFilters", {filters:$scope.currentFilter ,pageRequest:$scope.currentPage}, function(data){
                angular.forEach(data, function(value, index){
                    //value.nomePortuguesClear = $scope.removeLinkResposta(value.nomePortugues);
                    //value.nomeEspanholClear = $scope.removeLinkResposta(value.nomeEspanhol);
                });
                $scope.respostas = data;
            },
            function(data){
                console.log(data);
            });
    }

    /**
     *
     */
    $scope.changeToAnswers = function() {
        $log.info("changeToAnswers");
        $scope.insertState = $scope.STATE_RESPOSTA;

    };

    /**
     *
     */
    $scope.changeToGeral = function() {
        $log.info("changeToGeral");
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
       $scope.currentState = state;
       $scope.$apply();
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
    $scope.editClick = function( atividade )
    {
       $state.go($scope.UPDATE_STATE, {id:atividade.id});
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
        $scope.currentState = state;
        $scope.actionResposta = 'adicionar';

        $scope.currentResposta  = new Resposta();
        $scope.currentAtividade = new Atividade();
        $scope.currentAtividade.id = id;

        $scope.currentFilter = new Resposta();
        $scope.currentFilter.id = id;
        $scope.currentFilter.lang = $scope.currentLang;

        $scope.ServiceFactory.call("AtividadeService", "findById", $scope.currentAtividade, function(data){
            if(data.estaSendoUsado) {
                $scope.currentState = $scope.LIST_STATE;
                $state.go($scope.LIST_STATE);
            }
            $scope.currentAtividade = data;
            $scope.findReferencesNames();
        },
        function(data){
            console.log(data);
        });

        $scope.ServiceFactory.call("RespostaService", "listByFilters", {filters:$scope.currentFilter ,pageRequest:$scope.currentPage}, function(data){
            angular.forEach(data, function(value, index){
                //value.nomePortuguesClear = $scope.removeLinkResposta(value.nomePortugues);
                //value.nomeEspanholClear = $scope.removeLinkResposta(value.nomeEspanhol);
                $scope.findReferencesNamesRespostas(value);
            });
            $scope.respostas = data;
        },
        function(data){
            console.log(data);
        });

        $scope.insertState = $scope.STATE_ATIVIDADE;
    };
    
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


    $scope.findReferencesNamesRespostas = function(resposta){
        var pt = $("<div>"+resposta.nomePortugues+"</div>").find("a");
        var es = $("<div>"+resposta.nomeEspanhol+"</div>").find("a");

        angular.forEach(es, function(value, key) {
            var test = $(value).attr("rel").split("#");
            if(test[0] == "DC"){
                var dataCenter = new DataCenter();
                dataCenter.id = test[1];

                var data = $scope.ServiceFactory.callSync("DataCenterService", "findById", dataCenter);
                resposta.nomeEspanhol = $(es[key]).html("#"+data.nomeEspanhol).parent().html();
                //resposta.nomeEspanhol =  $compile('<span>'+resposta.nomeEspanhol+'</span>')($scope);

            } else if(test[0] == "EQ"){
                var equipamento = new Equipamento();
                equipamento.id = test[1];

                var data = $scope.ServiceFactory.callSync("EquipamentoService", "findById", equipamento);
                resposta.nomeEspanhol = $(pt[key]).html("#"+data.tipoEquipamento.nomeEspanhol+"-"+data.modelo+"-"+data.numeroSerie).parent().html();
                //resposta.nomeEspanhol =  $compile('<span>'+resposta.nomeEspanhol+'</span>')($scope);

            }
        });

        angular.forEach(pt, function(value, key) {
            var test = $(value).attr("rel").split("#");
            if(test[0] == "DC"){
                var dataCenter = new DataCenter();
                dataCenter.id = test[1];

                var data = $scope.ServiceFactory.callSync("DataCenterService", "findById", dataCenter);
                resposta.nomePortugues = $(pt[key]).html("#"+data.nomePortugues).parent().html();
                //resposta.nomePortugues =  $compile('<span>'+resposta.nomePortugues+'</span>')($scope);


            } else if(test[0] == "EQ"){
                var equipamento = new Equipamento();
                equipamento.id = test[1];

                var data = $scope.ServiceFactory.callSync("EquipamentoService", "findById", equipamento);
                resposta.nomePortugues = $(pt[key]).html("#"+data.tipoEquipamento.nomePortugues+"-"+data.modelo+"-"+data.numeroSerie).parent().html();
               // resposta.nomePortugues =  $compile('<span>'+resposta.nomePortugues+'</span>')($scope);

            }
        });
    }

    /*
    *
     */
    $scope.findReferencesNames = function(){
        var pt = $("<div>"+$scope.currentAtividade.descricaoPortugues+"</div>").find("a");
        var es = $("<div>"+$scope.currentAtividade.descricaoEspanhol+"</div>").find("a");

        angular.forEach(es, function(value, key) {
            var test = $(value).attr("rel").split("#");
            if(test[0] == "DC"){
                var dataCenter = new DataCenter();
                dataCenter.id = test[1];
                var data = $scope.ServiceFactory.callSync("DataCenterService", "findById", dataCenter);
                $scope.currentAtividade.descricaoEspanhol = $(es[key]).html("#"+data.nomeEspanhol).parent().html();
                $scope.currentAtividade.descricaoEspanhol =  $compile('<span>'+$scope.currentAtividade.descricaoEspanhol+'</span>')($scope);

            }
        });

        angular.forEach(pt, function(value, key) {
            var test = $(value).attr("rel").split("#");
            if(test[0] == "DC"){
                var dataCenter = new DataCenter();
                dataCenter.id = test[1];
                var data = $scope.ServiceFactory.callSync("DataCenterService", "findById", dataCenter);
                $scope.currentAtividade.descricaoPortugues = $(pt[key]).html("#"+data.nomePortugues).parent().html();
                $scope.currentAtividade.descricaoPortugues  =  $compile('<span>'+$scope.currentAtividade.descricaoPortugues+'</span>')($scope);
            }
        });

        angular.forEach(pt, function(value, key) {
            var test = $(value).attr("rel").split("#");
            if(test[0] == "EQ"){
                var equipamento = new Equipamento();
                equipamento.id = test[1];
                var data = $scope.ServiceFactory.callSync("EquipamentoService", "findById", equipamento);
                $scope.currentAtividade.descricaoPortugues = $(pt[key]).html("#"+data.tipoEquipamento.nomePortugues+"-"+data.modelo+"-"+data.numeroSerie).parent().html();
                $scope.currentAtividade.descricaoPortugues  =  $compile('<span>'+$scope.currentAtividade.descricaoPortugues+'</span>')($scope);
            }
        });

        angular.forEach(es, function(value, key) {
            var test = $(value).attr("rel").split("#");
            if(test[0] == "EQ"){
                var equipamento = new Equipamento();
                equipamento.id = test[1];
                var data = $scope.ServiceFactory.callSync("EquipamentoService", "findById", equipamento);
                $scope.currentAtividade.descricaoEspanhol = $(pt[key]).html("#"+data.tipoEquipamento.nomeEspanhol+"-"+data.modelo+"-"+data.numeroSerie).parent().html();
                $scope.currentAtividade.descricaoEspanhol =  $compile('<span>'+$scope.currentAtividade.descricaoEspanhol+'</span>')($scope);
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

        $scope.currentAtividade = new Atividade();
        $scope.currentAtividade.id = id;
        $scope.currentFilter = new Resposta();
        $scope.currentFilter.id = id;
        $scope.currentFilter.lang = $scope.currentLang;

        $scope.currentState = $scope.DETAIL_STATE;
        $scope.ServiceFactory.call("AtividadeService", "findById", $scope.currentAtividade, function(data){
                $scope.currentAtividade = data;
                $scope.findReferencesNames();
        },
        function(data){
            console.log(data);
        });

        $scope.ServiceFactory.call("RespostaService", "listByFilters", {filters:$scope.currentFilter ,pageRequest:$scope.currentPage}, function(data){
                $scope.currentPage = data;
                $scope.respostas = $scope.removeLink(data, $scope.RESPOSTA);
        },
        function(data){
            console.log(data);
        });
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
    $scope.changeToRemove = function( atividade ) {
    	$log.info("changeToRemove", atividade);

        var atividadeRemovida = new Atividade();
        atividadeRemovida.id = atividade.id;

        var descricaoAtividade = '';
        if($scope.currentLang == '.br')
            descricaoAtividade = (atividade.descricaoPortuguesClear != '' ? atividade.descricaoPortuguesClear : atividade.descricaoEspanholClear);
        else
            descricaoAtividade = (atividade.descricaoEspanholClear != '' ? atividade.descricaoEspanholClear : atividade.descricaoPortuguesClear);



        var dialog = $modal.open( {
 	   		templateUrl: "bundles/operadorescore/lib/eits-directives/dialog/dialog-template.html",
 	   		controller: DialogController,
 	   		windowClass: 'dialog-delete',
 	   		resolve: {
 	   			title: function(){return "_[[Exclusão de Atividade]]";},
 	   			message: function(){return '<b>_[[Tem certeza que deseja excluir a atividade]] "'+ descricaoAtividade +'"?</b> _[[Esta operação não poderá mais ser desfeita.]]';},
 	   			buttons: function(){return [ {label:'_[[Excluir]]', css:'btn btn-danger'}, {label:'_[[Cancelar]]', dismiss:true} ];}
 	   		}
 	   	});

 	   dialog.result.then( function(result) {
		   $scope.ServiceFactory.call("AtividadeService", "remove", atividadeRemovida, function(data){

               if(data === false){
                   $scope.msg = {type:'danger', text: '_[[Não foi possível excluir o registro]].', dismiss:true};
                   return false;
               }
                $scope.msg = {type:'success', text:$scope.MENSAGEM_ATIVIDADE_EXCLUIDA, dismiss:true};
                $scope.currentAtividade = new Atividade();
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
        $scope.listAtividadesByFilters($scope.currentFilter.lang);
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
    $scope.listAtividadesByFilters = function(langFilter) {
        $scope.msg = {type:'info', text:'_[[Por favor, aguarde um momento]]...', dismiss:true};
        $scope.currentFilter.lang = langFilter;
        $scope.langFilter = langFilter;

        $scope.ServiceFactory.call("AtividadeService", "listByFilters", {filters:$scope.currentFilter ,pageRequest:$scope.currentPage}, function(data){
                $scope.currentPage = data;
                /*var content = $scope.removeLink(data.page.content, $scope.ATIVIDADE);

                $scope.currentPage.page.content = content;*/
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
    $scope.insertAtividade = function() {
        if(browser == 'ie'){
            if($scope.currentAtividade.descricaoPortugues == undefined)
                $scope.currentAtividade.descricaoPortugues = "";
            if($scope.currentAtividade.descricaoEspanhol == undefined)
                $scope.currentAtividade.descricaoEspanhol = "";
        }

        $scope.currentAtividade.descricaoPortugues = $("#atividadeDescricaoPortugues").html();
        $scope.currentAtividade.descricaoEspanhol = $("#atividadeDescricaoEspanhol").html();

        var characters = ['<span class="ng-scope">', '</span>', '<br>', '&nbsp;'];

        if( $scope.currentAtividade.descricaoPortugues ){
            $scope.currentAtividade.descricaoPortugues = $scope.removeUnnecessaryCharacter($scope.currentAtividade.descricaoPortugues, characters);
        }

        if( $scope.currentAtividade.descricaoEspanhol ){
            $scope.currentAtividade.descricaoEspanhol = $scope.removeUnnecessaryCharacter($scope.currentAtividade.descricaoEspanhol, characters);
        }

        if ( !$scope.form("formPT").$valid  && !$scope.form("formES").$valid ) {
            $scope.msg = {type:'danger', text:$scope.MENSAGEM_ATIVIDADE_IDIOMA, dismiss:true};
            $scope.formPTValid = $scope.form("formPT").$valid;
            $scope.formESValid = $scope.form("formES").$valid;
            return;
        }

        var descricaoPortugues = "";
        var descricaoEspanhol = "";

        descricaoPortugues = $.trim($scope.currentAtividade.descricaoPortugues);
        descricaoEspanhol = $.trim($scope.currentAtividade.descricaoEspanhol);

        descricaoPortugues = descricaoPortugues.replaceAll("<br>","");
        descricaoEspanhol = descricaoEspanhol.replaceAll("<br>", "");

        if(descricaoPortugues == "" && descricaoEspanhol == ""){
            $scope.msg = {type:'danger', text:$scope.MENSAGEM_ATIVIDADE_IDIOMA, dismiss:true};
            $scope.formPTValid = descricaoPortugues != "";
            $scope.formESValid = descricaoEspanhol != "";
            return;
        }

        $scope.currentAtividade.validoPortugues = descricaoPortugues != "";
        $scope.currentAtividade.validoEspanhol  = descricaoEspanhol != "";


        $scope.changeToAnswers();
    };

    $scope.removeLinkResposta = function(atv) {
        var aMatches = atv.match(/\<a[^\>]*\>[^\<]*\<\/a\>/g);

        angular.forEach(aMatches, function( value, index) {
            var anc = $(value);
            var id = anc.attr("rel").split("#")[1];

            if( anc.attr("rel").split("#")[0] == 'DC' )
            {
                var data = $scope.ServiceFactory.callSync("DataCenterService", "findDatacenter", id);
                atv =  atv.replace(value, ($scope.currentLang == '.br' ? ( data.nomePortugues != '' ? data.nomePortugues : data.nomeEspanhol) : (data.nomeEspanhol != '' ? data.nomeEspanhol : data.nomePortugues) ) );

            } else {

                var data =  $scope.ServiceFactory.callSync("EquipamentoService", "findBytipoEquipamento", id);
                atv =  atv.replace(value, ($scope.currentLang == '.br' ? (data.tipoEquipamento.nomePortugues != '' ? data.tipoEquipamento.nomePortugues : data.tipoEquipamento.nomeEspanhol ) : (data.tipoEquipamento.nomeEspanhol != '' ? data.tipoEquipamento.nomeEspanhol : data.tipoEquipamento.nomePortugues)) +"-"+ data.modelo + "-" + data.numeroSerie );
            }

        });

        return atv.replaceAll("&nbsp;", " ");
    }
    /**
     *
     */
    $scope.insertResposta = function() {

        if ( !$scope.form('formRespostaPT').$valid && !$scope.form('formRespostaES').$valid ) {
            $scope.msg = {type:'danger', text:$scope.MENSAGEM_ATIVIDADE_IDIOMA, dismiss:true};
            return;
        }

        var nomePortugues = "";
        var nomeEspanhol = "";

        if($scope.form("formRespostaPT").nomePortugues.$modelValue != undefined){
           // nomePortugues = $scope.form("formRespostaPT").nomePortugues.$modelValue.replaceAll("&nbsp;", " ");
           nomePortugues = $("#respostaNomePortugues").html().replaceAll("&nbsp;", "");
        }

        if($scope.form("formRespostaES").nomeEspanhol.$modelValue != undefined) {
            nomeEspanhol = $("#respostaNomeEspanhol").html().replaceAll("&nbsp;", "");
        }

        nomePortugues = $.trim(nomePortugues);
        nomeEspanhol = $.trim(nomeEspanhol);

        nomePortugues = nomePortugues.replaceAll("<br>","");
        nomeEspanhol = nomeEspanhol.replaceAll("<br>", "");

        if(nomePortugues == "" && nomeEspanhol == ""){
            $scope.msg = {type:'danger', text:$scope.MENSAGEM_ATIVIDADE_IDIOMA, dismiss:true};
            return;
        }

        $scope.currentResposta.atividade = $scope.currentAtividade;
        $scope.currentResposta.indice = $scope.indiceResposta;
        $scope.indiceResposta++;

        //var atv = $scope.currentLang == '.br' ? $scope.currentResposta.nomePortugues : $scope.currentResposta.nomeEspanhol;
        var atv = $scope.currentLang == '.br' ? nomePortugues : nomeEspanhol;
        //var atvDirty = $scope.currentLang == '.br' ? $scope.currentResposta.nomePortugues : $scope.currentResposta.nomeEspanhol;
        var atvDirty = $scope.currentLang == '.br' ? nomePortugues : nomeEspanhol;

        atv = $scope.removeLinkResposta(atv);

        atv = atv.replaceAll('<span class="ng-scope">', '').replaceAll('</span>','');

        if(  $scope.currentLang == '.br' ){
            $scope.currentResposta.nomePortugues = atvDirty;
            $scope.currentResposta.nomePortuguesClear = atv;
        } else {
            $scope.currentResposta.nomeEspanhol = atvDirty;
            $scope.currentResposta.nomeEspanholClear = atv;
        }

        $scope.respostas.push($scope.currentResposta);

        $scope.currentResposta = new Resposta();

    };

    /**
     *
     */
    $scope.removeResposta = function( resposta ) {

        var indice = $scope.respostas.indexOf(resposta);

        $scope.respostas.splice(indice, 1);

        if($scope.respostas.length == 0)
            $scope.indiceResposta = 1;
    }

    /**
     *
     */
    $scope.editResposta = function(resposta){
        $scope.actionResposta = 'editar';

        if(typeof resposta.nomePortugues != 'object')
            resposta.nomePortugues = $compile('<span>'+resposta.nomePortugues+'</span>')($scope);
        if(typeof resposta.nomeEspanhol != 'object')
            resposta.nomeEspanhol = $compile('<span>'+resposta.nomeEspanhol+'</span>')($scope);

        $scope.currentResposta = resposta;
    }

    /**
     *
     */
    $scope.salvarResposta = function(){
        var indice = $scope.respostas.indexOf($scope.currentResposta);

        var atv = $scope.langResposta == '.br' ? $scope.currentResposta.nomePortugues : $scope.currentResposta.nomeEspanhol;

        if( typeof atv == 'object' ) {
            atv = $(atv).html();
        }


        atv = $scope.removeLinkResposta(atv);
        atv = atv.replaceAll('<span class="ng-scope">', '').replaceAll('</span>','');

        if(  $scope.langResposta == '.br' ){
            $scope.currentResposta.nomePortuguesClear = atv;
        } else {
            $scope.currentResposta.nomeEspanholClear = atv;
        }

        $scope.respostas[indice] = $scope.currentResposta;

        $scope.actionResposta = 'adicionar';

        $scope.currentResposta = new Resposta();
    }

    $scope.removeUnnecessaryCharacter = function(toRemove, characters){
        angular.forEach(characters, function(value, index){
            toRemove = toRemove.replaceAll(value, (value == '<span class="ng-scope">' || value == '</span>' || value == '<br>' ? '' : ' ') );
        })
        return toRemove;
    }

    /**
     *
     */
    $scope.saveAtividade = function(){
        var characters = ['<span class="ng-scope">', '</span>', '<br>', '&nbsp;'];
        $scope.currentAtividade.descricaoPortugues = $("#atividadeDescricaoPortugues").html();
        $scope.currentAtividade.descricaoEspanhol = $("#atividadeDescricaoEspanhol").html();

        if( $scope.currentAtividade.descricaoPortugues ){
            $scope.currentAtividade.descricaoPortugues = $scope.removeUnnecessaryCharacter($scope.currentAtividade.descricaoPortugues, characters);
        }

        if( $scope.currentAtividade.descricaoEspanhol ){
            $scope.currentAtividade.descricaoEspanhol = $scope.removeUnnecessaryCharacter($scope.currentAtividade.descricaoEspanhol, characters);
        }

        if($scope.respostas.length > 0){

            var validacaoIdiomaPT = true;
            var validacaoIdiomaES = true;

            if($scope.form("formPT").$valid){
                $.each($scope.respostas, function(i, resposta){
                    if(resposta.nomePortugues == ""){
                        validacaoIdiomaPT = false;
                    }
                });
            } else {
                validacaoIdiomaPT = false;
            }

            if($scope.form("formES").$valid){
                $.each($scope.respostas, function(i, resposta){
                    if(resposta.nomeEspanhol == ""){
                        validacaoIdiomaES = false;
                    }
                });
            } else {
                validacaoIdiomaES = false;
            }

            if($("<div>"+$scope.currentAtividade.descricaoPortugues+"</div>").find("a").length){
                $scope.currentAtividade.descricaoPortugues = $("<div>"+$scope.currentAtividade.descricaoPortugues+"</div>").find("a").empty().parent().html();
            }if($("<div>"+$scope.currentAtividade.descricaoEspanhol+"</div>").find("a").length){
                $scope.currentAtividade.descricaoEspanhol = $("<div>"+$scope.currentAtividade.descricaoEspanhol+"</div>").find("a").empty().parent().html();
            }

            var equipamentos = [];
            var datacenters = [];

            angular.forEach($("<div>"+$scope.currentAtividade.descricaoPortugues+"</div>").find("a"), function(value, key) {
                var test = $(value).attr("rel").split("#");
                if(test[0] == "DC"){
                    var dataCenter = new DataCenter();
                    dataCenter.id = test[1];
                    datacenters.push(dataCenter);
                }
            });

            angular.forEach($("<div>"+$scope.currentAtividade.descricaoEspanhol+"</div>").find("a"), function(value, key) {
                var test = $(value).attr("rel").split("#");
                if(test[0] == "DC"){
                    var dataCenter = new DataCenter();
                    dataCenter.id = test[1];
                    datacenters.push(dataCenter);
                }
            });

            angular.forEach($("<div>"+$scope.currentAtividade.descricaoPortugues+"</div>").find("a"), function(value, key) {
                var test = $(value).attr("rel").split("#");
                if(test[0] == "EQ"){
                    var equipamento = new Equipamento();
                    equipamento.id = test[1];
                    equipamentos.push(equipamento);
                }
            });

            angular.forEach($("<div>"+$scope.currentAtividade.descricaoEspanhol+"</div>").find("a"), function(value, key) {
                var test = $(value).attr("rel").split("#");
                if(test[0] == "EQ"){
                    var equipamento = new Equipamento();
                    equipamento.id = test[1];
                    equipamentos.push(equipamento);
                }
            });

            /*RESPOSTAS*/
            angular.forEach($scope.respostas, function(resposta, chave){

                var characters = ['<span class="ng-scope">', '</span>', '<br>', '&nbsp;'];

                if( typeof resposta.nomePortugues == 'object' ) {
                    resposta.nomePortugues = $(resposta.nomePortugues).html();
                }

                if( typeof resposta.nomeEspanhol  == 'object' ) {
                    resposta.nomeEspanhol  = $(resposta.nomeEspanhol).html();
                }

                if( resposta.nomePortugues ){
                    resposta.nomePortugues = $scope.removeUnnecessaryCharacter(resposta.nomePortugues, characters);
                }

                if( resposta.nomeEspanhol ){
                    resposta.nomeEspanhol = $scope.removeUnnecessaryCharacter(resposta.nomeEspanhol, characters);
                }

                if($("<div>"+resposta.nomePortugues+"</div>").find("a").length){
                    resposta.nomePortugues = $("<div>"+resposta.nomePortugues+"</div>").find("a").empty().parent().html();
                }if($("<div>"+resposta.nomeEspanhol+"</div>").find("a").length){
                    resposta.nomeEspanhol = $("<div>"+resposta.nomeEspanhol+"</div>").find("a").empty().parent().html();
                }

                angular.forEach($("<div>"+resposta.nomePortugues+"</div>").find("a"), function(value, key) {
                    var test = $(value).attr("rel").split("#");
                    if(test[0] == "DC"){
                        var dataCenter = new DataCenter();
                        dataCenter.id = test[1];
                        datacenters.push(dataCenter);
                    }
                });

                angular.forEach($("<div>"+resposta.nomeEspanhol+"</div>").find("a"), function(value, key) {
                    var test = $(value).attr("rel").split("#");
                    if(test[0] == "DC"){
                        var dataCenter = new DataCenter();
                        dataCenter.id = test[1];
                        datacenters.push(dataCenter);
                    }
                });

                angular.forEach($("<div>"+resposta.nomePortugues+"</div>").find("a"), function(value, key) {
                    var test = $(value).attr("rel").split("#");
                    if(test[0] == "EQ"){
                        var equipamento = new Equipamento();
                        equipamento.id = test[1];
                        equipamentos.push(equipamento);
                    }
                });

                angular.forEach($("<div>"+resposta.nomeEspanhol+"</div>").find("a"), function(value, key) {
                    var test = $(value).attr("rel").split("#");
                    if(test[0] == "EQ"){
                        var equipamento = new Equipamento();
                        equipamento.id = test[1];
                        equipamentos.push(equipamento);
                    }
                });
            });

            if(validacaoIdiomaPT || validacaoIdiomaES){
                $scope.currentAtividade.equipamentos = equipamentos;
                $scope.currentAtividade.datacenters  = datacenters;

                if($scope.currentState != $scope.UPDATE_STATE){

                    $.each($scope.respostas, function(i, resposta){
                        $scope.respostas[i] = new Resposta();
                        $scope.respostas[i].nomePortugues = resposta.nomePortugues;
                        $scope.respostas[i].nomeEspanhol  = resposta.nomeEspanhol;
                        $scope.respostas[i].atividadesCondicionais = resposta.atividadesCondicionais;
                    });

                    $scope.respostas[0].atividade = $scope.currentAtividade;
                    $scope.ServiceFactory.call("RespostaService", "insert",  $scope.respostas, function(data){
                            $scope.msg = {type:'success', text:$scope.MENSAGEM_ATIVIDADE_SALVA, dismiss:true};
                            $state.go($scope.LIST_STATE);
                        },
                        function(data){
                            console.log(data);
                        });
                } else {
                    $scope.ServiceFactory.call("RespostaService", "update",  {respostas: $scope.respostas, atividade: $scope.currentAtividade }, function(data){
                            $scope.msg = {type:'success', text:$scope.MENSAGEM_ATIVIDADE_SALVA, dismiss:true};
                            $state.go($scope.LIST_STATE);
                        },
                        function(data){
                            console.log(data);
                        });
                }
            } else {
                $scope.msg = {type:'danger', text:$scope.MENSAGEM_ATIVIDADE_IDIOMA, dismiss:true};
            }
        } else {
            $scope.msg = {type:'danger', text:$scope.MENSAGEM_ATIVIDADE_RESPOSTA, dismiss:true};
        }
    }

    /**
     *
     */
    $scope.traduzirReposta = function(resposta) {
        $scope.actionResposta = 'traduzir';

        if( typeof resposta.nomeEspanhol == 'object' )
            resposta.nomeEspanhol = $(resposta.nomeEspanhol).html();
        if( typeof resposta.nomePortugues == 'object' )
            resposta.nomePortugues = $(resposta.nomePortugues).html();

        if( typeof resposta.nomeEspanhol != 'object' )
            resposta.nomeEspanhol = $compile('<span>'+resposta.nomeEspanhol+'</span>')($scope);
        if( typeof resposta.nomePortugues != 'object' )
            resposta.nomePortugues = $compile('<span>'+resposta.nomePortugues+'</span>')($scope);

        $scope.currentResposta = resposta;

        if($scope.currentLang == '.br' ){
            $scope.langResposta = '.es';
        } else {
            $scope.langResposta = '.br';
        }
    }

    /**
     *
     */
    $scope.traduzResposta = function(){
        var indice = $scope.respostas.indexOf($scope.currentResposta);

        if( typeof $scope.currentResposta.nomeEspanhol == 'object' ) {
            $scope.currentResposta.nomeEspanhol = $($scope.currentResposta.nomeEspanhol).html();
        }

        if( typeof $scope.currentResposta.nomePortugues == 'object' ) {
            $scope.currentResposta.nomePortugues = $($scope.currentResposta.nomePortugues).html();
        }

        $scope.currentResposta.nomeEspanhol = $scope.currentResposta.nomeEspanhol.replaceAll('<span class="ng-scope">', '').replaceAll('</span>','');

        $scope.currentResposta.nomeEspanholClear = $scope.removeLinkResposta($scope.currentResposta.nomeEspanhol);
        $scope.respostas[indice] = $scope.currentResposta;

        $scope.actionResposta = 'adicionar';
        $scope.currentResposta = new Resposta();
    }

    /**
     * Realiza a atualiza de um registro
     * e no suscesso, modifica o estado da tela para o detail.
     */
    $scope.updateAtividade = function() {

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

    $scope.removeLink = function( content, type ) {

        $scope.atividadeValida = [];

        var lang = $scope.langFilter ? $scope.langFilter : $scope.currentLang;

        angular.forEach( content, function(element, index) {
            var atv = '';

            if( type ==  $scope.ATIVIDADE )
                atv = lang == '.br' ? element.descricaoPortugues : element.descricaoEspanhol;
            else if( type ==  $scope.RESPOSTA )
                atv = lang  == '.br' ? element.nomePortugues : element.nomeEspanhol;

            var aMatches = atv.match(/\<a[^\>]*\>[^\<]*\<\/a\>/g);

            angular.forEach(aMatches, function( value, index) {
                var anc = $(value);
                var id = anc.attr("rel").split("#")[1];

                if( anc.attr("rel").split("#")[0] == 'DC' )
                {
                    var data = $scope.ServiceFactory.callSync("DataCenterService", "findDatacenter", id);
                    atv =  atv.replace(value, (lang == '.br' ? data.nomePortugues : data.nomeEspanhol) );

                } else {

                    var data =  $scope.ServiceFactory.callSync("EquipamentoService", "findBytipoEquipamento", id);
                    atv =  atv.replace(value, (lang == '.br' ? data.tipoEquipamento.nomePortugues : data.tipoEquipamento.nomeEspanhol) +"-"+ data.modelo + "-" + data.numeroSerie );

                }

            });

            atv = atv.replaceAll("&nbsp;", " ");

            if( type ==  $scope.ATIVIDADE ) {
                if(lang == '.br') {
                    if(atv != '')
                        element.descricaoPortugues = atv;
                }
                else {
                    if(atv != '')
                        element.descricaoEspanhol = atv;
                }
            } else if( type ==  $scope.RESPOSTA ){
                if(lang == '.br') {
                    if(atv != '')
                        element.nomePortugues = atv;
                } else {
                    if(atv != '')
                        element.nomeEspanhol = atv;
                }
            }

        });

        return content;
    }

    /**
     *
     */
    $scope.listAtividades = function() {
        $scope.gridHasResponse = false;

        $scope.currentPage   = new PageRequest();
        $scope.currentFilter = new Atividade();
        $scope.currentFilter.lang = $scope.currentLang;
        $scope.ServiceFactory.call("AtividadeService", "listByFilters", {filters:$scope.currentFilter ,pageRequest:$scope.currentPage}, function(data){
                $scope.currentPage = data;
                /*var content = $scope.removeLink(data.page.content, $scope.ATIVIDADE);

                $scope.currentPage.page.content = content;*/
                $scope.gridHasResponse = true;
            },
            function(data){
                console.log(data);
            });
    };

    /**
     *
     */
    $scope.ativarAtividade = function(atividade) {
        $scope.currentAtividade = new Atividade();
        $scope.currentAtividade.id = atividade.id;
        $scope.currentAtividade.descricaoPortugues = atividade.descricaoPortugues;
        $scope.currentAtividade.descricaoEspanhol = atividade.descricaoEspanhol;
        $scope.currentAtividade.tipo = atividade.tipo;
        $scope.currentAtividade.nivelCritico = atividade.nivelCritico;
        $scope.currentAtividade.validoPortugues = atividade.validoPortugues;
        $scope.currentAtividade.validoEspanhol = atividade.validoEspanhol;
        $scope.currentAtividade.status = true;

        $scope.ServiceFactory.call("AtividadeService", "update", $scope.currentAtividade, function(data){
                $scope.msg = {type:'success', text:$scope.MENSAGEM_ATIVIDADE_ATIVADA, dismiss:true};
                $scope.currentAtividade = new Atividade();
                $scope.changeToList();
            },
            function(data){
                console.log(data);
            });
    }

    /**
     *
     * @param atividade
     */
    $scope.desativarAtividade = function(atividade) {
        $scope.currentAtividade = new Atividade();
        $scope.currentAtividade.id = atividade.id;
        $scope.currentAtividade.descricaoPortugues = atividade.descricaoPortugues;
        $scope.currentAtividade.descricaoEspanhol = atividade.descricaoEspanhol;
        $scope.currentAtividade.tipo = atividade.tipo;
        $scope.currentAtividade.nivelCritico = atividade.nivelCritico;
        $scope.currentAtividade.validoPortugues = atividade.validoPortugues;
        $scope.currentAtividade.validoEspanhol = atividade.validoEspanhol;
        $scope.currentAtividade.status = false;

        $scope.ServiceFactory.call("AtividadeService", "update", $scope.currentAtividade, function(data){
                $scope.msg = {type:'success', text:$scope.MENSAGEM_ATIVIDADE_DESATIVADA, dismiss:true};
                $scope.currentAtividade = new Atividade();
                $scope.changeToList();
            },
            function(data){
                console.log(data);
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
                    templateUrl: 'resource/admin?file=templates/atividade/modal/equipamentos-detail.html',
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

    $scope.modalDetalhesDataCenter = function(id){
        var datacenter = new DataCenter();
        datacenter.id = id;

        if(!$scope.oldState){
            $state.go('datacenter.detalhe', {id:id});
            return;
        }

        $scope.ServiceFactory.call("DataCenterService", "findById", datacenter, function(data){
                var modal = $modal.open({
                    templateUrl: 'resource/admin?file=templates/atividade/modal/datacenter-detail.html',
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

    $scope.modalEquipamentosResposta = function () {

        $scope.getEquipamentosDataCenters();
        $scope.items = {
            equipamentos: $scope.equipamentos,
            datacenters: $scope.datacenters,
            lang: $scope.currentLang
        };

        var modal = $modal.open({
            templateUrl: 'resource/admin?file=templates/atividade/modal/equipamentos.html',
            controller: ModalEquipamentosCtrl,
            size: 500,
            resolve: {
                items: function(){
                    return $scope.items;
                }
            }
        });

        modal.result.then(function ( select ) {

            var nomeText = $scope.currentLang == '.br' ? $("#respostaNomePortugues").text() : $("#respostaNomeEspanhol").text();

            if( nomeText.length > 255 ) {
                $scope.msg = {type:'danger', text:'_[[O campo deve ter no máximo 255 caracteres]].', dismiss:true};
                return false;
            }


            //Se for um novo plano orçamentário
            var selectdDataCenters = select[0];
            var selectdEquipamentos = select[1];

            var nomeRespostaHtml = $scope.langResposta == '.br' ? $("#respostaNomePortugues").html() : $("#respostaNomeEspanhol").html();

            if(selectdDataCenters.length){
                angular.forEach(selectdDataCenters, function(value, key) {
                    if($scope.langResposta == '.br'){
                        nomeRespostaHtml += "<a rel='DC#"+value.id+"' href='javascript();' ng-click='modalDetalhesDataCenter("+ value.id +")'>#"+(value.nomePortugues ? value.nomePortugues : value.nomeEspanhol)+"</a> ";
                        $scope.currentResposta.nomePortugues = $compile('<span>'+nomeRespostaHtml+'</span>')($scope);
                        //$scope.currentResposta.nomePortugues += "<a rel='DC#"+value.id+"' href='admin#/atividade/detalheData/"+ value.id +"'>#"+(value.nomePortugues ? value.nomePortugues : value.nomeEspanhol)+"</a> ";
                    }else{
                        nomeRespostaHtml += "<a rel='DC#"+value.id+"' href='javascript();' ng-click='modalDetalhesDataCenter("+ value.id +")'>#"+(value.nomeEspanhol ? value.nomeEspanhol : value.nomePortugues)+"</a> ";
                        $scope.currentResposta.nomeEspanhol = $compile('<span>'+nomeRespostaHtml+'</span>')($scope);
                        //$scope.currentResposta.nomeEspanhol += "<a rel='DC#"+value.id+"' href='admin#/atividade/detalheData/"+ value.id +"'>#"+(value.nomeEspanhol ? value.nomeEspanhol : value.nomePortugues)+"</a> ";
                    }
                });
            }
            if(selectdEquipamentos.length){
                angular.forEach(selectdEquipamentos, function(value, key) {
                    if($scope.langResposta == '.br'){
                        nomeRespostaHtml += "<a rel='EQ#"+value.id+"' href='javascript();' ng-click='modalDetalhesEquipamento("+ value.id +")'>#"+(value.tipoEquipamento.nomePortugues ? value.tipoEquipamento.nomePortugues : value.tipoEquipamento.nomeEspanhol)+"</a> ";
                        $scope.currentResposta.nomePortugues = $compile('<span>'+nomeRespostaHtml+'</span>')($scope);
                        //$scope.currentResposta.nomePortugues += "<a rel='EQ#"+value.id+"' href='admin#/atividade/detalhePop/"+ value.id +"'>#"+value.tipoEquipamento.nomePortugues+"-"+value.modelo+"-"+value.numeroSerie+"</a> ";
                    }else{
                        nomeRespostaHtml += "<a rel='EQ#"+value.id+"' href='javascript();' ng-click='modalDetalhesEquipamento("+ value.id +")'>#"+(value.tipoEquipamento.nomeEspanhol ? value.tipoEquipamento.nomeEspanhol : value.tipoEquipamento.nomePortugues)+"</a> ";
                        $scope.currentResposta.nomeEspanhol = $compile('<span>'+nomeRespostaHtml+'</span>')($scope);
                        //$scope.currentResposta.nomeEspanhol += "<a rel='EQ#"+value.id+"' href='admin#/atividade/detalhePop/"+ value.id +"'>#"+value.tipoEquipamento.nomeEspanhol+"-"+value.modelo+"-"+value.numeroSerie+"</a>";
                    }
                });
            }
        }, function () {
            $log.info("Saiu via cancelar");
        });
    };

    $scope.modalEquipamentos = function () {

        $scope.getEquipamentosDataCenters();

        $scope.items = {
            equipamentos: $scope.equipamentos,
            datacenters: $scope.datacenters,
            lang: $scope.currentLang
        };

        var modal = $modal.open({
            templateUrl: 'resource/admin?file=templates/atividade/modal/equipamentos.html',
            controller: ModalEquipamentosCtrl,
            width: 700,
            resolve: {
                items: function(){
                    return $scope.items;
                }
            }
        });
        modal.result.then(function ( select ) {
            if( $scope.currentAtividade.descricaoPortugues == undefined )
                $scope.currentAtividade.descricaoPortugues = '';
            if( $scope.currentAtividade.descricaoEspanhol == undefined )
                $scope.currentAtividade.descricaoEspanhol = '';

            var descricaoHtml = $scope.currentLang == '.br' ? $("#atividadeDescricaoPortugues").html() : $("#atividadeDescricaoEspanhol").html();

            //Se for um novo plano orçamentário
            var selectdDataCenters = select[0];
            var selectdEquipamentos = select[1];
            if(selectdDataCenters.length){
                angular.forEach(selectdDataCenters, function(value, key) {
                    if($scope.currentLang == '.br'){
                        //$scope.currentAtividade.descricaoPortugues += "<a rel='DC#"+value.id+"' href='admin#/atividade/detalheData/"+ value.id +"'>#"+(value.nomePortugues ? value.nomePortugues : value.nomeEspanhol)+"</a> ";
                        descricaoHtml += "<a rel='DC#"+value.id+"' href='javascript();' ng-click='modalDetalhesDataCenter("+ value.id +")'>#"+(value.nomePortugues ? value.nomePortugues : value.nomeEspanhol)+"</a> ";
                        $scope.currentAtividade.descricaoPortugues = $compile('<span>'+descricaoHtml+'</span>')($scope);
                    }else{
                        //$scope.currentAtividade.descricaoEspanhol += "<a rel='DC#"+value.id+"' href='admin#/atividade/detalheData/"+ value.id +"'>#"+(value.nomeEspanhol ? value.nomeEspanhol : value.nomePortugues)+"</a> ";
                        descricaoHtml += "<a rel='DC#"+value.id+"' href='javascript();' ng-click='modalDetalhesDataCenter("+ value.id +")'>#"+(value.descricaoEspanhol ? value.descricaoEspanhol : value.nomePortugues)+"</a> ";
                        $scope.currentAtividade.descricaoEspanhol = $compile('<span>'+descricaoHtml+'</span>')($scope);
                    }
                });
            }
            if(selectdEquipamentos.length){
                angular.forEach(selectdEquipamentos, function(value, key) {
                    if($scope.currentLang == '.br'){
                        //$scope.currentAtividade.descricaoPortugues += "<a rel='EQ#"+value.id+"' href='admin#/atividade/detalhePop/"+ value.id +"'>#"+value.tipoEquipamento.nomePortugues+"-"+value.modelo+"-"+value.numeroSerie+"</a> ";
                        descricaoHtml += "<a rel='EQ#"+value.id+"' href='javascript();' ng-click='modalDetalhesEquipamento("+ value.id +")'>#"+(value.tipoEquipamento.nomePortugues ? value.tipoEquipamento.nomePortugues : value.tipoEquipamento.nomeEspanhol)+"</a> ";
                        $scope.currentAtividade.descricaoPortugues = $compile('<span>'+descricaoHtml+'</span>')($scope);
                    }else{
                        //$scope.currentAtividade.descricaoEspanhol += "<a rel='EQ#"+value.id+"' href='admin#/atividade/detalhePop/"+ value.id +"'>#"+value.tipoEquipamento.nomeEspanhol+"-"+value.modelo+"-"+value.numeroSerie+"</a>";
                        descricaoHtml += "<a rel='EQ#"+value.id+"' href='javascript();' ng-click='modalDetalhesEquipamento("+ value.id +")'>#"+(value.tipoEquipamento.nomeEspanhol ? value.tipoEquipamento.nomeEspanhol : value.tipoEquipamento.nomePortugues)+"</a> ";
                        $scope.currentAtividade.descricaoEspanhol = $compile('<span>'+descricaoHtml+'</span>')($scope);
                    }
                });
            }
        }, function () {
            $log.info("Saiu via cancelar");
        });
    };

    $scope.atividadeCondicional = function(resposta){
        var indice = $scope.respostas.indexOf(resposta);

        $scope.ServiceFactory.call("AtividadeService", "listAllActive", {'lang': $scope.currentLang}, function(data){

                $modal.open({
                    templateUrl: 'resource/admin?file=templates/atividade/modal/atividade-condicional.html',
                    controller: ModalAtividadeCondicionalCtrl,
                    size: 500,
                    resolve: {
                        atividades: function(){
                            //return $scope.removeLink(data, $scope.ATIVIDADE);
                            return $scope.ordenar('descricaoPortuguesClear','descricaoEspanholClear',data, $scope.currentLang, 'asc');
                        },
                        resposta: function(){
                            return $scope.respostas[indice];
                        },
                        lang: function(){
                            return $scope.currentLang;
                        }
                    }
                });
            },
            function(data){
                console.log(data);
            });


    };

    $scope.getEquipamentosDataCenters = function(){

        $scope.currentPage = new PageRequest();
        $scope.currentFilter = new DataCenter();
        $scope.currentFilter.lang = $scope.currentLang;

        var data = $scope.ServiceFactory.callSync("DataCenterService", "listByFilters", {filters:$scope.currentFilter ,pageRequest:$scope.currentPage} );
        $scope.datacenters = data;

        $scope.currentFilter = new Equipamento();
        $scope.currentFilter.lang = $scope.currentLang;
        var data = $scope.ServiceFactory.callSync("EquipamentoService", "listByFilters", {filters:$scope.currentFilter ,pageRequest:$scope.currentPage} );
        $scope.equipamentos = data;

    }

};

var ModalAtividadeCondicionalCtrl = function ($scope, $modalInstance, atividades, resposta, lang, ServiceFactory, $injector){

    $injector.invoke(AbstractController, this, {$scope: $scope});

    $scope.atividades = atividades;

    $scope.resposta = resposta;
    $scope.currentLang = lang;
    $scope.atividadeCondicional = new Atividade();

    var GRID_ACTION_BUTTONS = '<div class="cell-centered">' +
        '<a ng-click="removeAtividade(row.entity)" title="_[[Excluir]]" class="btn btn-mini"><i class="glyphicon glyphicon-trash"></i></a>'+
        '</div>';

    var fieldPT = "currentLang == '.br' ? (row.entity.descricaoEspanholClear == '' ? row.entity.descricaoPortuguesClear : row.entity.descricaoEspanholClear)  : (row.entity.descricaoPortuguesClear != '' ? row.entity.descricaoPortuguesClear : row.entity.descricaoEspanholClear) ";
    var fieldES = "currentLang == '.es' ? (row.entity.descricaoPortuguesClear != '' ? row.entity.descricaoPortuguesClear : row.entity.descricaoEspanholClear) : (row.entity.descricaoEspanholClear == '' ? row.entity.descricaoPortuguesClear : row.entity.descricaoEspanholClear) ";


    $scope.gridPTOptions = {
        data: 'resposta.atividadesCondicionais',
        multiSelect: false,
        useExternalSorting: true,
        columnDefs: [
            {displayName:'_[[Descrição]]', field: fieldPT, width:'90%' },
            {displayName:'_[[Ações]]', sortable:false, cellTemplate: GRID_ACTION_BUTTONS, width:'10%'}
        ]
    };

    $scope.gridESOptions = {
        data: 'resposta.atividadesCondicionais',
        multiSelect: false,
        useExternalSorting: true,
        columnDefs: [
            {displayName:'_[[Descrição]]', field: fieldES, width:'90%' },
            {displayName:'_[[Ações]]', sortable:false, cellTemplate: GRID_ACTION_BUTTONS, width:'10%'}
        ]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.addAtividade = function(atividadeCondicional){
        if(atividadeCondicional.id != undefined){
            var jaPossuiuAtividade = false;
            $.each(resposta.atividadesCondicionais, function(i, atividade){
                if(atividade.id == atividadeCondicional.id){
                    jaPossuiuAtividade = true;
                    return;
                }
            });

            if(!jaPossuiuAtividade){
                resposta.atividadesCondicionais.push(atividadeCondicional);
            }
            else {
                $scope.msg = {type:'danger', text:"_[[Atividade já está relacionado com essa resposta.]]", dismiss:true};
                return;
            }
            $scope.atividadeCondicional = new Atividade();
        } else {
            $scope.msg = {type:'danger', text:"_[[Por favor selecione uma atividade para ser adicionada.]]", dismiss:true};
        }

    };

    $scope.removeAtividade = function(atividadeCondicional) {
        var indice = resposta.atividadesCondicionais.indexOf(atividadeCondicional);
        resposta.atividadesCondicionais.splice(indice, 1);

    }
};

var ModalDetalheDataCenterCtrl = function ($scope, $modalInstance, datacenter, lang, ServiceFactory, $injector){
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
            {displayName:'_[[Tipo do Equipamento]]', field:"tipoEquipamento.nomePortugues", width:'48%'},
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
            {displayName:'_[[Tipo do Equipamento]]', field:"tipoEquipamento.nomeEspanhol", width:'48%'},
            {displayName:'_[[Modelo]]', field:"modelo", width:'20%'},
            {displayName:'_[[Nº Série]]', field:"numeroSerie", width:'20%'},
            {displayName:'_[[Status]]', field:"status", width:'10%', cellTemplate: '<div align="center" style="padding-top: 3%;">{{status[row.entity.status]}}</div>'}
        ]
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}