<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Model of the Calibration Planner
 *
 * @author alejandro aguayo
 */
class CalibrationPlannerModel {
    //variables
    var $companyName;
    var $plantName;
    var $personName;
    var $personEmail;
    var $systemSerialNumber;
    var $systemType;
    var $nextCalibrationDate;
    var $dayUntilNextCalibrationDate;
    var $status;
    
    //constructor
    function CalibrationPlannerModel(
            $companyName,
            $plantName,
            $personName,
            $personEmail,
            $systemSerialNumber,
            $systemType,
            $nextCalibrationDate,
            $dayUntilNextCalibrationDate,
            $status
            ){
        $this->companyName = $companyName;
        $this->plantName = $plantName;
        $this->personName = $personName;
        $this->personEmail = $personEmail;
        $this->systemSerialNumber = $systemSerialNumber;
        $this->systemType = $systemType;
        $this->nextCalibrationDate = $nextCalibrationDate;
        $this->dayUntilNextCalibrationDate = $dayUntilNextCalibrationDate;
        $this->status = $status;
    }
}