<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Model of the SMC Planner
 *
 * @author alejandro aguayo
 */
class SMCPlannerModel {
    //variables
    var $companyName;
    var $plantName;
    var $departmentName;
    var $personName;
    var $personEmail;
    var $systemSerialNumber;
    var $computerServiceTag;
    var $idSoftware;
    var $dongle;
    var $expirationDate;
    
    //constructor
    function SMCPlannerModel(
            $companyName,
            $plantName,
            $departmentName,
            $personName,
            $personEmail,
            $systemSerialNumber,
            $computerServiceTag,
            $idSoftware,
            $dongle,
            $expirationDate
            ){
        $this->companyName = $companyName;
        $this->plantName = $plantName;
        $this->departmentName = $departmentName;
        $this->personName = $personName;
        $this->personEmail = $personEmail;
        $this->systemSerialNumber = $systemSerialNumber;
        $this->computerServiceTag = $computerServiceTag;
        $this->idSoftware = $idSoftware;
        $this->dongle = $dongle;
        $this->expirationDate = $expirationDate;
    }
}