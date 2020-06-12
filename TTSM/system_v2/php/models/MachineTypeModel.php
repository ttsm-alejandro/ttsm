<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Model of the table MachineType
 *
 * @author alejandro aguayo
 */
class MachineTypeModel {
    //variables
    var $id;
    var $name;
    var $comment;
    
    //constructor
    function MachineTypeModel(
            $id,
            $name,
            $comment
            ){
        $this->id = $id;
        $this->name = $name;
        $this->comment = $comment;
    }
}