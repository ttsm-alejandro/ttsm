<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Model of the table Notes
 *
 * @author alejandro aguayo
 */
class NotesModel {
    //variables
    var $id;
    var $tittle;
    var $content;

    //constructor
    function NotesModel(
            $id,
            $tittle,
            $content
            ){
        $this->id = $id;
        $this->tittle = $tittle;
        $this->content = $content;
    }
    
    //functions
}
