<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Model of the table webinar
 *
 * @author alejandro aguayo
 */
class InventoryPageModel {
    //variables
    var $id;
    var $link;
    var $partNumber;
    var $description;
    var $type;
    var $localization;
    var $unit;
    var $stock;
    var $checked;
    
    //constructor
    function InventoryPageModel(
            $id,
            $link,
            $partNumber,
            $description,
            $type,
            $localization,
            $unit,
            $stock,
            $checked
            ){
        $this->id = $id;
        $this->link = $link;
        $this->partNumber = $partNumber;
        $this->description = $description;
        $this->type = $type;
        $this->localization = $localization;
        $this->unit = $unit;
        $this->stock = $stock;
        $this->checked = $checked;
    }
}