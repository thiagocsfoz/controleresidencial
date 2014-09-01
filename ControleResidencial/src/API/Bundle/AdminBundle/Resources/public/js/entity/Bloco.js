function Bloco () {
	this.id = undefined;
    this._explicitType = "Bloco";
    this.tituloPortugues = "";
    this.tituloEspanhol = "";
    this.descricaoPortugues  = "";
    this.descricaoEspanhol = "";
    this.descricaoPortuguesClear  = "";
    this.descricaoEspanholClear = "";
    this.validoPortugues = null;
    this.validoEspanhol = null;
    this.repetir = 'false';
    this.status = true;
    this.lang = "br";
    this.equipamentos = [];
    this.datacenters = [];
    this.atividades = [];
}

Bloco.removeLink = function( content,  lang, ServiceFactory ) {
    angular.forEach( content, function(element, index) {
        var atv = '';

        atv = lang == '.br' ? element.tituloPortugues : element.tituloEspanhol;

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

        if(lang == '.br'){
            if(atv != ''){
                element.tituloPortugues = atv;
            }
        }
        else if(atv != ''){
            element.tituloEspanhol = atv;
        }

        element.atividades = Atividade.removeLink(element.atividades, lang, ServiceFactory);

    });
    return content;
}