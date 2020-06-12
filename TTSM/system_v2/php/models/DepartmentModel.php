<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Model of the table Department
 *
 * @author alejandro aguayo
 */
class DepartmentModel {
    //variables
    var $id;
    var $idCompany; //<- This do not exist in DataBase
    var $idPlant;
    var $idPerson;
    var $name;
    var $comment;
    
    //constructor
    function DepartmentModel(
            $id,
            $idCompany,
            $idPlant,
            $idPerson,
            $name,
            $comment
            ){
        $this->id = $id;
        $this->idCompany = $idCompany;
        $this->idPlant = $idPlant;
        $this->idPerson = $idPerson;
        $this->name = $name;
        $this->comment = $comment;
    }
}