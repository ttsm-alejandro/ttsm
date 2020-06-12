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
class CompanyModel {
    //variables
    var $id;
    var $fullName;
    var $shortName;
    var $webPage;
    
    //constructor
    function CompanyModel(
            $id,
            $fullName,
            $shortName,
            $webPage
            ){
        $this->id = $id;
        $this->fullName = $fullName;
        $this->shortName = $shortName;
        $this->webPage = $webPage;
    }
}
