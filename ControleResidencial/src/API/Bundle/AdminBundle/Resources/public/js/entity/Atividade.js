function Atividade () {
	this.id = undefined;
    this._explicitType = "Atividade";
    this.descricaoPortugues = "";
    this.descricaoEspanhol  = "";
    this.tipo = "";
    this.nivelCritico = "";
    this.validoPortugues = false;
    this.validoEspanhol  = false;
    this.status = true;
    this.estaSendoUsado = false;
    this.lang = ".br";
    this.equipamentos = [];
    this.datacenters = [];
}

Atividade.removeLink = function( content, lang, ServiceFactory ) {
    angular.forEach( content, function(element, index) {
        var atv = '';


        atv = lang == '.br' ? element.descricaoPortugues : element.descricaoEspanhol;


        var aMatches = atv.match(/\<a[^\>]*\>[^\<]*\<\/a\>/g);

        angular.forEach(aMatches, function( value, index) {
            var anc = $(value);
            var id = anc.attr("rel").split("#")[1];

            if( anc.attr("rel").split("#")[0] == 'DC' )
            {
                var data = ServiceFactory.callSync("DataCenterService", "findDatacenter", id);
                atv =  atv.replace(value, (lang == '.br' ? data.nomePortugues : data.nomeEspanhol) );

            } else {

                var data =  ServiceFactory.callSync("EquipamentoService", "findBytipoEquipamento", id);
                atv =  atv.replace(value, (lang == '.br' ? data.tipoEquipamento.nomePortugues : data.tipoEquipamento.nomeEspanhol) +"-"+ data.modelo + "-" + data.numeroSerie );

            }

        });

        atv = atv.replaceAll("&nbsp;", " ");

        if(lang == '.br')
            if(atv != '')
                element.descricaoPortugues = atv;
            else
            if(atv != '')
                element.descricaoEspanhol = atv;

    });
    return content;
}