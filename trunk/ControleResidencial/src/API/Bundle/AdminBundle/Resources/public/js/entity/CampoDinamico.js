function CampoDinamico () {
	this.id = undefined;
    this._explicitType = "CampoDinamico";
    this.nomePortugues = "";
    this.nomeEspanhol = "";
    this.tipo = "";
    this.validoPortugues = null;
    this.validoEspanhol = null;
    this.tipoEquipamento = new TipoEquipamento();
}