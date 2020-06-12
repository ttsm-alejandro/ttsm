<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Model of the table webinar
 *
 * @author alejandro aguayo
 */
class WebPageReportModel {
    //variables
    var $id;
    var $name;
    var $company;
    var $email;
    var $phone;
    var $comment;
    var $date;
    
    //constructor
    function WebPageReportModel(
            $id,
            $name,
            $company,
            $email,
            $phone,
            $comment,
            $date
            ){
        $this->id = $id;
        $this->name = $name;
        $this->company = $company;
        $this->email = $email;
        $this->phone = $phone;
        $this->comment = $comment;
        $this->date = $date;
    }
}