<div class="background-form">
    <h2 class="title">Informa��es Gerais</h2>
    <table style="width:99%;" class="filter-data">
        <tr style="width:99%;">
            <td style="width:20%;">
                <span class="label"> Nome: </span>
            </td>
            <td class="total-width">
                <input type="text" class="total-width filter-title" name="title" value=""/>
            </td>
        </tr>
        <tr style="width:99%;">
            <td style="width:20%;">
                <span class="label"> Atributo do Usu�rio: </span>
            </td>
            <td class="total-width">
                <select style="width:485px;" name="userAttribute">
                </select>
            </td>
        </tr>       
    </table>
</div>
<div class="background-form">
    <h2 class="title">Filtros</h2>
    <table style="width:99%;" class="filter-value-data">
        <tr style="width:99%;">
            <td style="width:10%;">
                <span class="label"> T�tulo: </span>
            </td>
            <td class="total-width" colspan="3">
                <input type="text" class="total-width" name="title" />
            </td>
        </tr>
        <tr style="width:99%;">
            <td style="width:10%;">
                <span class="label"> Filtro: </span>
            </td>
            <td style="width:50%;">
                <input type="text" class="total-width" name="value" />
            </td>
            <td style="width:10%;">
                <center>
                    <span class="label"> Tipo : </span>
                </center>
            </td>
            <td>
                <select class="total-width" name="type" style="width:250px;">
                    <option value="equal">Igualdade</option>
                    <option value="regex">Expres�o Regular</option>
                </select>
            </td>
        </tr>
    </table>
    <div style="float:right;width: 100%;">
        <button type=button class="add-button button blue" style="float:right;">Adicionar</button>
    </div>
    <h2 class="title">Filtros Adicionados</h2>
    <div class="classificationFilter" style="margin-top:10px;">
    <table id="table-filterValues"></table>
    <div id="table-filterValues-pager"></div>
    </div>
</div>

                                                                                                                                                                                                                                        