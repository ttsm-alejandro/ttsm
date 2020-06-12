<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Model of the table Company
 *
 * @author alejandro aguayo
 */
class CityModel {
    //variables
    var $id;
    var $idState;
    var $name;
    
    //constructor
    function CityModel(
            $id,
            $idState,
            $name
            ){
        $this->id = $id;
        $this->idState = $idState;
        $this->name = $name;
    }
}