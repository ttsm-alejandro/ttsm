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
    var $comment;
    
    //constructor
    function ServiceReminderModel(
            $idSystem,
            $idComputer,
            $dateLastReminder,
            $comment
            ){
        $this->idSystem = $idSystem;
        $this->idComputer = $idComputer;
        $this->dateLastReminder = $dateLastReminder;
        $this->comment = $comment;
    }
}