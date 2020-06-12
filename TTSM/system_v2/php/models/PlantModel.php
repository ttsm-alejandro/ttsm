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
class PlantModel {
    //variables
    var $id;
    var $idCompany;
    var $idState;
    var $idCity;
    var $idPerson;
    var $name;
    var $address;
    var $comment;
    
    //constructor
    function PlantModel(
            $id,
            $idCompany,
            $idState,
            $idCity,
            $idPerson,
            $name,
            $address,
            $comment
            ){
        $this->id = $id;
        $this->idCompany = $idCompany;
        $this->idState = $idState;
        $this->idCity = $idCity;
        $this->idPerson = $idPerson;
        $this->name = $name;
        $this->address = $address;
        $this->comment = $comment;
    }
}