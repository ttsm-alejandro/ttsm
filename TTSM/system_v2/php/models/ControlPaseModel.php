<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Model of the table control_pase
 *
 * @author alejandro aguayo
 */
class ControlPaseModel {
    //variables
    var $id;
    var $date;
    var $destiny;
    var $user;
    var $amount;
    
    //constructor
    function ControlPaseModel(
            $id,
            $date,
            $destiny,
            $user,
            $amount
            ){
        $this->id = $id;
        $this->date = $date;
        $this->destiny = $destiny;
        $this->user = $user;
        $this->amount = $amount;
    }
}