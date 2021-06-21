<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Model of the table Computer
 *
 * @author alejandro aguayo
 */
class ComputerModel {
    //variables
    var $id;
    var $serviceTag; //<- This do not exist in DataBase
    var $macAddress;
    var $detail;
    var $softwareArray;
    var $backupArray;
    var $comment;
    
    //constructor
    function ComputerModel(
            $id,
            $serviceTag,
            $macAddress,
            $detail,
            $softwareArray,
            $backupArray,
            $comment
            ){
        $this->id = $id;
        $this->serviceTag = $serviceTag;
        $this->macAddress = $macAddress;
        $this->detail = $detail;
        $this->softwareArray = $softwareArray;
        $this->backupArray = $backupArray;
        $this->comment = $comment;
    }
}