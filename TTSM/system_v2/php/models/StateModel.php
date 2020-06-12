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
class StateModel {
    //variables
    var $id;
    var $name;
    
    //constructor
    function StateModel(
            $id,
            $name
            ){
        $this->id = $id;
        $this->name = $name;
    }
}
