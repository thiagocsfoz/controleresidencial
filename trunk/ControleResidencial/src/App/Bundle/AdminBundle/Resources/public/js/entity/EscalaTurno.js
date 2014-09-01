function EscalaTurno () {
    this.id = undefined;
    this._explicitType = "EscalaTurno";
    this.dataInicioTurno = {"_explicitType":"DateTime", "date": null, "toDate": null};
    this.dataFimTurno = {"_explicitType":"DateTime", "date": null, "toDate": null};
    this.tipo = '';
    this.nomePortugues = '';
    this.nomeEspanhol = '';
    this.lang = '';
    this.templates = [];
    this.validoPortugues = null;
    this.validoEspanhol = null;
}