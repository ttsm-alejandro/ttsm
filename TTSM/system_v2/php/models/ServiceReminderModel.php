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
class ServiceReminderModel {
    //variables
    var $idSystem;
    var $idComputer;
    var $dateLastReminder;
    
    //constructor
    function ServiceReminderModel(
            $idSystem,
            $idComputer,
            $dateLastReminder
            ){
        $this->idSystem = $idSystem;
        $this->idComputer = $idComputer;
        $this->dateLastReminder = $dateLastReminder;
    }
}