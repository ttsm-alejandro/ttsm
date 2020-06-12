<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Description of PlantService:
 *          Service for the table "notes"
 *
 * @author alejandro aguayo
 */
class NotesService {
    //get all
    static function getAll( $link ){
        $query = " SELECT "
                    . " id, "
                    . " tittle, "
                    . " content "
                . " FROM "
                    . " notes " 
                . " ORDER BY "
                    . " tittle ASC" ;
        $result = mysqli_query( $link , $query );
        return NotesService::getArrayByResult( $result );
    }
    
    //get by ID
    static function getById( $link , $id ){
        $query = " SELECT "
                    . " id, "
                    . " tittle, "
                    . " content "
                . " FROM "
                    . " notes "
                . " WHERE "
                    . " id=$id";
        $result = mysqli_query( $link , $query );
        $row = mysqli_fetch_row( $result );
        return NotesService::getElementByRow( $row );
    }
    
    //post new Element
    static function save( $link , $newElement ){
        if( $newElement->id == "--" ){
            $query = "INSERT INTO "
                        . " notes ("
                            . "tittle,"
                            . "content"
                        . ") "
                    . " VALUES("
                        . "'$newElement->tittle',"
                        . "'$newElement->content'"
                    . ")";
        }else{
            $query = "UPDATE "
                        . " notes "
                    . " SET "
                        . " tittle='$newElement->tittle', "
                        . " content='$newElement->content' "
                    . " WHERE "
                        . "id=$newElement->id";
        }
        mysqli_query( $link , $query );
        return explode( " " , $query )[0];
        //return $query;
    }
    
    //Delete Element
    static function delete( $link , $id ){
        $query = "DELETE FROM "
                    . " notes "
                . " WHERE "
                    . "id=$id";
        return mysqli_query( $link , $query );
    }
    
    //transform a $row into a $object
    static function getElementByRow( $row ){
        $newRow = new NotesModel( 
                $row[0],
                $row[1],
                $row[2]
                );
        return $newRow;
    }
    
    //transform a $result into a $arrayObject
    static function getArrayByResult( $result ){
        $arrayResult = new ArrayObject();
        while( $row = mysqli_fetch_row( $result ) ){
            $newRow = NotesService::getElementByRow( $row );
            $arrayResult->append( $newRow );
        }
        return $arrayResult;
    }
}
