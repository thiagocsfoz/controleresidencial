function Equipamento () {
    this.id = undefined;
    this._explicitType = "Equipamento";
    this.tipoEquipamento = "";
    this.fabricante = "";
    this.modelo = "";
    this.numeroSerie = "";
    this.bp = "";
    this.smap = "";
    this.dataInstalacao = {"_explicitType":"DateTime", "date": ""};
    this.margem = "";
    this.dataCenter = "";
    this.sala = "";
    this.rack = "";
    this.numeroContrato = "";
    this.tipoContrato = "";
    this.empresa = "";
    this.dataInicioContrato = {"_explicitType":"DateTime", "date": ""};
    this.dataFimContrato  = {"_explicitType":"DateTime", "date": ""};
    this.status = "";
    this.campoDinamico = [];
    this.images = [];
    //this.equipamentos = new Array();
}


