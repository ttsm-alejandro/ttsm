<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Model of the table Machine
 *
 * @author alejandro aguayo
 */
class MachineModel {
    //variables
    var $id;
    var $idSystem;
    var $idMachineType;
    var $serialNumber;
    var $idComputer;
    var $comment;
    
    //constructor
    function MachineModel(
            $id,
            $idSystem,
            $idMachineType,
            $serialNumber,
            $idComputer,
            $comment
            ){
        $this->id = $id;
        $this->idSystem = $idSystem;
        $this->idMachineType = $idMachineType;
        $this->serialNumber = $serialNumber;
        $this->idComputer = $idComputer;
        $this->comment = $comment;
    }
}