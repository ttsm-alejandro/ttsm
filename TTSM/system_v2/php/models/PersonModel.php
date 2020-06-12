<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Model of the table Person
 *
 * @author alejandro aguayo
 */
class PersonModel {
    //variables
    var $id;
    var $idCompany;
    var $name;
    var $japaneseName;
    var $cellphone;
    var $email;
    var $comment;

    //constructor
    function PersonModel(
            $id,
            $idCompany,
            $name,
            $japaneseName,
            $cellphone,
            $email,
            $comment
            ){
        $this->id = $id;
        $this->idCompany = $idCompany;
        $this->name = $name;
        $this->japaneseName = $japaneseName;
        $this->cellphone = $cellphone;
        $this->email = $email;
        $this->comment = $comment;
    }
    
    //functions
}
