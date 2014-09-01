function Resposta() {
	this.id = undefined;
    this._explicitType = "Resposta";
    this.nomePortugues = "";
    this.nomeEspanhol  = "";
    this.nomePortuguesClear  = "";
    this.nomeEspanholClear  = "";
    this.atividade = new Atividade();
    this.atividadesCondicionais = [];
}

Resposta.removeLink = function( content,  lang, ServiceFactory ) {
    angular.forEach( content, function(element, index) {
        var atv = '';

        atv = lang == '.br' ? element.nomePortugues : element.nomeEspanhol;

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
    });

    return content;
}