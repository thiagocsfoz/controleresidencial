<?php

namespace Operadores\Bundle\CoreBundle\Pdf;

require_once(__DIR__ . '/../Libs/fpdf17/fpdf.php');

class Pdf extends \FPDF
{
    public $title = "";

    function Header()
    {
        $this->SetFont('arial','B',18);
        $this->Cell(0,5,$this->title,0,1,'C');

    }

    function Footer()
    {
        $this->SetY(-15);
        $this->SetFont('Arial','I',12);
        $this->Cell(100,10,date('d/m/Y'),0,0,'L');

        $this->Cell(360,10,$this->title,0,0,'C');
        $this->Cell(100,10,'Página '.$this->PageNo().' de {nb}',0,0,'R');
    }
}