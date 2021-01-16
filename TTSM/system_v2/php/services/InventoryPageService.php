<?php

/*
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

/**
 * Description of personService:
 *          Service for the table "webinar" from
 *
 * @author alejandro aguayo
 */
class InventoryPageService {
    //get all
    static function getAll( $link ){
        $query = "SELECT "
                    . "id, "
                    . "link, "
                    . "part_number, "
                    . "description, "
                    . "type, "
                    . "localization, "
                    . "unit, "
                    . "stock, "
                    . "checked "
                . "FROM "
                    . "inventory "
                . " ORDER BY localization";
        $result = mysqli_query( $link , $query );
        return InventoryPageService::getArrayByResult( $result );
    }
    
    //delete
    static function delete( $link , $id ){
        $query = "DELETE FROM inventory WHERE id=$id";
        mysqli_query( $link , $query);
        return "DELETE $id";
    }
    
    //set checked 
    static function setChecked( $link , $id , $status ){
        $query = "UPDATE inventory SET checked='$status' WHERE id=$id";
        mysqli_query( $link , $query);
        return "Checked ". $status . " " . $id;
    }
    
    //save
    static function save( $link , $newElement ){
        $verQuery = false;
        $returnData = "";
        $query = "";
        
        //si es un nuevo elemento, en id es --
        if( $newElement->id == "--" ){
            
            //Insert new row
            $query = "INSERT INTO inventory ("
                        . "link, "
                        . "part_number,"
                        . "description,"
                        . "type,"
                        . "localization,"
                        . "unit,"
                        . "stock,"
                        . "checked"
                    . ") VALUES ("
                        . "'$newElement->link',"
                        . "'$newElement->partNumber',"
                        . "'$newElement->description',"
                        . "$newElement->type,"
                        . "$newElement->localization,"
                        . "$newElement->unit,"
                        . "$newElement->stock,"
                        . "'$newElement->checked'"
                    . ")";
            if( $verQuery ){ echo $query; }
            mysqli_query( $link , $query );
            
            $query = "SELECT "
                    . "id "
                . "FROM "
                    . "inventory "
                . "WHERE "
                    . "part_number='$newElement->partNumber' "
                    . "AND description='$newElement->description' "
                    . "AND type=$newElement->type "
                    . "AND localization=$newElement->localization "
                    . "AND unit=$newElement->unit "
                    . "AND stock=$newElement->stock "
                    . "AND checked='$newElement->checked' ";
            $newElement->id = mysqli_fetch_row( mysqli_query( $link , $query ) )[0];
            $returnData = "INSERT $newElement->id";
            if( $verQuery ){ echo $query; }
        }else{
            $returnData = "UPDATE " . $newElement->id;
            $query = "UPDATE inventory SET "
                        . "link='$newElement->link', "
                        . "part_number='$newElement->partNumber',"
                        . "description='$newElement->description',"
                        . "type=$newElement->type,"
                        . "localization=$newElement->localization,"
                        . "unit=$newElement->unit,"
                        . "stock=$newElement->stock,"
                        . "checked='$newElement->checked' "
                    . "WHERE id=$newElement->id";
            if( $verQuery ){ echo $query; }
            mysqli_query( $link , $query );
        }
        return $returnData;
    }
    
    //transform a $row into a $object
    static function getElementByRow( $row ){
        $newRow = new InventoryPageModel( 
                $row[0],
                $row[1],
                $row[2],
                $row[3],
                $row[4],
                $row[5],
                $row[6],
                $row[7],
                $row[8]
                );
        return $newRow;
        
    }
    
    //transform a $result into a $arrayObject
    static function getArrayByResult( $result ){
        $arrayResult = new ArrayObject();
        while( $row = mysqli_fetch_row( $result ) ){
            $newRow = InventoryPageService::getElementByRow( $row );
            $arrayResult->append( $newRow );
        }
        return $arrayResult;
    }
}