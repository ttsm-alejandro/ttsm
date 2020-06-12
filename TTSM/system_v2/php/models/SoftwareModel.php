<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Model of the table Software
 *
 * @author alejandro aguayo
 */
class SoftwareModel {
    //variables
    var $id;
    var $name;
    var $comment;
    
    //constructor
    function SoftwareModel(
            $id,
            $name,
            $comment
            ){
        $this->id = $id;
        $this->name = $name;
        $this->comment = $comment;
    }
}