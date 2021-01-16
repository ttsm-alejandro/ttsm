/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

var miApp = angular.module( "miApp" , [] );
miApp.controller( 'inventoryPageCtrl'  ,['$scope' , '$http' , '$window' , function( $scope , $http , $window ){
    /**** variables ****/
    //URL
    $scope.relativeUrl = "../../";
    var inventoryPageServiceUrl = serviceUrl + "php/resources/excel/InventoryPageResource.php";
    
    //oficial colors
    $scope.ttsmBlueColor = ttsmBlueColor ;
    $scope.ttsmGrayColor = ttsmGrayColor ; 
    
    //security
    $scope.user = "";
    $scope.token = "";
    
    //user screen
    $scope.userScreenHeight = "";
    
    //flags
    $scope.isWaitingHttpRequest = true;
    $scope.showViewRow = false;
    $scope.showDeleteRow = false;
    $scope.isDeleteWarning = true;
    $scope.isMaintainCombosInSaveAndNew = false;
    
    //filtros de vista
    $scope.filterViewByLocalization = "";
    $scope.filterViewByType = "";
    $scope.filterViewByChecked = "";
    
    //selection
    $scope.imageToShowSelected = "";
    $scope.imageToShowSelectedTitle = "";
    $scope.rowDetailsSelected = {
        id : "",
        link : "",
        partNumber : "",
        description : "",
        type : "",
        localization : "",
        unit : "",
        stock : "",
        checked : ""
    };
    
    
    //table content Data
    $scope.inventoryTableData = [];
    
    //catalogos
    $scope.typeCatalog = [];
    $scope.localizationCatalog = [];
    $scope.unitCatalog = [];
    $scope.checkedCatalog = [];
    
    /**** functions ****/
    //inicializa los catalogos type/localization/unit
    $scope.initCatalogs = function(){
    
        $scope.checkedCatalog = [ 
            { id : "OK", name : "OK" },
            { id : "NG", name : "NG" }
        ];
        
        $scope.typeCatalog = [ 
            { id : "0", name : "Tool" },
            { id : "1", name : "Spare Part" },
            { id : "2", name : "Material" },
            { id : "3", name : "Equipment"}
        ];
        
        $scope.localizationCatalog = [ 
            { id : "0", name : "Estanteria A1" },
            { id : "1", name : "Estanteria A2" },
            { id : "2", name : "Estanteria A3" },
            { id : "3", name : "Estanteria A4" },
            { id : "4", name : "Estanteria A5" },
            { id : "5", name : "Estanteria A6" },
            { id : "6", name : "Estanteria A7" },
            { id : "7", name : "Estanteria A8" },
            { id : "8", name : "Estanteria A9" },
            { id : "9", name : "Estanteria A10" },
            { id : "10", name : "Estanteria A11" },
            { id : "11", name : "Estanteria A12" },
            { id : "12", name : "Estanteria A13" },
            { id : "13", name : "Estanteria A14" },
            { id : "14", name : "Estanteria A15" },
            { id : "15", name : "Laboratory" },
            { id : "16", name : "Warehouse" },
            { id : "17", name : "Sala de expocision"}
        ];
        $scope.unitCatalog = [ 
            { id : "0", name : "Piece" },
            { id : "1", name : "Set" },
            { id : "2", name : "Roll" },
            { id : "3", name : "Box"},
            { id : "4", name : "Bottle (100ml)"},
            { id : "5", name : "Bag (100 units)"},
            { id : "6", name : "Bag (50 units)"},
            { id : "7", name : "Bag (20 units)"},
            { id : "8", name : "Bag (10 units)"},
            { id : "9", name : "Bag (<10 Units)"}
        ];
    }
    
    //quitar los filtros por catalogo
    $scope.removeFilter = function(){
        $scope.filterViewByLocalization = "";
        $scope.filterViewByType = "";
        $scope.filterViewByChecked = "";
    };
    
    //
    $scope.imageSelected = function( link , partNumber ){
        $scope.imageToShowSelected = "../../images/inventory/" + link;
        $scope.imageToShowSelectedTitle = partNumber;
    }
    
    //
    $scope.showDetailsInModal = function( rowData ){
        //show modal
        $('#inventoryDetailModal').modal('show'); 
        //carga informacion de la row seleccionada
        $scope.rowDetailsSelected.id = rowData.id;
        $scope.rowDetailsSelected.link = rowData.link;
        $scope.rowDetailsSelected.partNumber = rowData.partNumber;
        $scope.rowDetailsSelected.description = rowData.description;
        $scope.rowDetailsSelected.type = rowData.type;
        $scope.rowDetailsSelected.localization = rowData.localization;
        $scope.rowDetailsSelected.unit = rowData.unit;
        $scope.rowDetailsSelected.stock = rowData.stock;
        $scope.rowDetailsSelected.checked = rowData.checked;
    }
    
    //
    $scope.clicSaveAndNewButtonModal = function( options ){
        $scope.saveDataInDataBase( options );
    }
    
    //borra el contenido en "$scope.rowDetailsSelected" y muestra el modal de los detalles
    $scope.addNewRow = function(){
        console.log( "antes de la limpia: " + $scope.rowDetailsSelected.type );
        //limpia detalles
        $scope.rowDetailsSelected.id = "--";
        $scope.rowDetailsSelected.link = "";
        $scope.rowDetailsSelected.partNumber = "";
        $scope.rowDetailsSelected.description = "";
        $scope.rowDetailsSelected.stock = "";
        $scope.rowDetailsSelected.checked = "NG";
        
        
        console.log( "---checar isMaintainCombos: " + $scope.isMaintainCombosInSaveAndNew );
        //si se marco la casilla de mantener combos en el modal, no se limpian estos parametros
        if( $scope.isMaintainCombosInSaveAndNew ){
            console.log( "----Entra a IF(isMaintainCombos) : if(" + $scope.isMaintainCombosInSaveAndNew + ")" );
            $scope.rowDetailsSelected.type = "";
            $scope.rowDetailsSelected.localization = "";
            $scope.rowDetailsSelected.unit = "";
        }
        
        console.log( "---despues de la limpia: " + $scope.rowDetailsSelected.type );
        //muestra modal
        $('#inventoryDetailModal').modal('show');
    };
    
    //
    $scope.getColorByCheckedStatus = function( status ){
        var returnData = "";
        if( status == "NG" ){
            returnData = "RED";
        }else{
            returnData = "GREEN";
        }
        return returnData;
    };
    
    //cambia el status de "checked"
    $scope.changeRowCheckedStatus = function( id ){
        var status = "";
        for( var index in $scope.inventoryTableData ){
            if( $scope.inventoryTableData[ index ].id == id ){
                if( $scope.inventoryTableData[ index ].checked == "NG" ){
                    $scope.inventoryTableData[ index ].checked = "OK";
                    status = "OK";
                }else{
                    $scope.inventoryTableData[ index ].checked = "NG";
                    status = "NG";
                }
            }
        }
        
        //TO DO - dar indicacion de que la respuesta ya llego o esperar
        $http({
            url: inventoryPageServiceUrl + "?id=" + id + "&status=" + status +"&user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                swal( { icon : error , text : "ACCESS DENIED" } );
            }
            
        }, 
        function(response) { // optional
            swal( { icon : error , text : "ERROR" } );
        });
        
    };
    
    //
    $scope.showHelp = function(){
        $('#inventoryDetailModal').modal('show'); 
    }
    
    //saca la altura de la ventana del usuario
    $scope.getUserScreenHeight = function(){
        //screen resolution
        $scope.userScreenHeight = $(document).height();
        $scope.userScreenHeight = $scope.userScreenHeight - 275;
        $scope.userScreenHeight = $scope.userScreenHeight + "px";
    };
        
    //traer toda la tabla
    $scope.getData = function(){
        $scope.isWaitingHttpRequest = true;
        $scope.getUserScreenHeight();
        $scope.inventoryTableData = [];
        $http({
            url: inventoryPageServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            $scope.isWaitingHttpRequest = false;
            if(response.data == "ACCESS DENIED" ){
                swal( { icon : error , text : "ACCESS DENIED" } );
            }else{
                for( var index in response.data ){
                    $scope.inventoryTableData[ index ] = response.data[ index ] ;
                    $scope.inventoryTableData[ index ].showRow = true;
                    //$scope.inventoryTableData[ index ].date = new Date( $scope.reportData[ index ].date );
                }
                $scope.isWaitingHttpRequest = false;
            }
        }, 
        function(response) { // optional
            $scope.isWaitingHttpRequest = false;
            swal( { icon : error , text : "ERROR" } );
        });
    };
    
    //verificar que la informacion en el modal, es decir "$scope.rowDetailsSelected" esta correcta
    //que tenga los datos llenos y que no se repita
    $scope.checkIfDataIsOK = function(){
        var returnData = true;
        var errorMessage = "Falta informacion: ";
        
        if( $scope.rowDetailsSelected.link == "" ){ returnData = false; errorMessage += "LINK, "; }
        if( $scope.rowDetailsSelected.partNumber == "" ){ returnData = false; errorMessage += "Numero de Parte, "; }
        if( $scope.rowDetailsSelected.description == "" ){ returnData = false; errorMessage += "Descripcion, "; }
        if( $scope.rowDetailsSelected.type == "" ){ returnData = false; errorMessage += "tipo, "; }
        if( $scope.rowDetailsSelected.localization == "" ){ returnData = false; errorMessage += "localizacion, "; }
        if( $scope.rowDetailsSelected.unit == "" ){ returnData = false; errorMessage += "unidad, "; }
        if( $scope.rowDetailsSelected.stock == "" ){ returnData = false; errorMessage += "stock, "; }
        if( isNaN(+$scope.rowDetailsSelected.stock) ){ returnData = false; errorMessage += "STOCK NO ES UN NUMERO, "; }
        if( $scope.rowDetailsSelected.checked == "" ){ returnData = false; errorMessage += "check, "; }
        
        if( $scope.rowDetailsSelected.id == "--" ){
            for( var index in $scope.inventoryTableData ){
                if( ( $scope.inventoryTableData[ index ].link == $scope.rowDetailsSelected.link )
                        &&( $scope.inventoryTableData[ index ].partNumber == $scope.rowDetailsSelected.partNumber )
                        &&( $scope.inventoryTableData[ index ].description == $scope.rowDetailsSelected.description )
                        //&&( $scope.inventoryTableData[ index ].type == $scope.rowDetailsSelected.type )
                        //&&( $scope.inventoryTableData[ index ].localization == $scope.rowDetailsSelected.localization )
                        //&&( $scope.inventoryTableData[ index ].unit == $scope.rowDetailsSelected.unit )
                        //&&( $scope.inventoryTableData[ index ].stock == $scope.rowDetailsSelected.stock )
                        //&&( $scope.inventoryTableData[ index ].checked == $scope.rowDetailsSelected.checked )
                        ){
                            var returnData = false;
                            errorMessage += "YA EXISTE UN REGISTRO CON ESOS DATOS, "; 
                        }
            }
        }
        if( !returnData ){
            swal( { icon : "error" , text : errorMessage } );
        }
        return returnData;
    };
    
    //
    $scope.setViewAllRows = function(){
      for( var index in $scope.inventoryTableData ){
          $scope.inventoryTableData[ index ].showRow = true;
      }
    };
    
    //si la bandera "isDeleteWarning" es true, manda una advertencia y pide confirmacion para borrar
    //si es false, borra directamente
    $scope.deleteRowWithWarning = function( id ){
        if( $scope.isDeleteWarning ){
            swal({
                title: "Borrar registro" ,
                text: "¿Quieres continuar con el borrado de este registro?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    //Borrar en base de datos, dio OK en borrar
                    $scope.deleteInDataBase( id );
              } else {
                    //swal("Your imaginary file is safe!"); 
              }
            });
        //Eligio no mostrar advertencia, se va directo a borrar
        }else{
            $scope.deleteInDataBase( id );
        }
    }
    
    //Manda mediante GET el id/delete=ok para borrar el registro
    //despues actualiza la tabla local borrando el registro con id = al id enviado
    $scope.deleteInDataBase = function( id ){
        $scope.isWaitingHttpRequest = true;
        $http({
                url: inventoryPageServiceUrl + "?id=" + id + "&delete=ok&user=" + $scope.user + "&token=" + $scope.token,
                method: "GET"
            })
            .then(function(response){
                if(response.data == "ACCESS DENIED" ){
                    swal( { icon : error , text : "ACCESS DENIED" } );
                }else{
                    var temporalTable = $scope.inventoryTableData;
                    $scope.inventoryTableData = [];
                    for( var index in temporalTable ){
                        if( temporalTable[ index ].id !== id ){
                            $scope.inventoryTableData.push(
                                {
                                    id : temporalTable[ index ].id,
                                    link : temporalTable[ index ].link,
                                    partNumber : temporalTable[ index ].partNumber,
                                    description : temporalTable[ index ].description,
                                    localization : temporalTable[ index ].localization,
                                    type : temporalTable[ index ].type,
                                    unit : temporalTable[ index ].unit,
                                    stock : temporalTable[ index ].stock,
                                    checked : temporalTable[ index ].checked,
                                    showRow : temporalTable[ index ].showRow
                                });
                        }
                    }
                    $scope.isWaitingHttpRequest = false;
                }
            }, 
            function(response) { // optional
                swal( { icon : error , text : "ERROR con el servidor, intenta otra vez" } );
                $scope.isWaitingHttpRequest = false;
            });
    };
    
    //manda POST con lo contenido en "$scope.rowDetailsSelected"
    //si el id es "--" es un nuevo registro
    //actualiza despues la tabla local
    $scope.saveDataInDataBase = function( options ){
        if( $scope.checkIfDataIsOK() ){
            $scope.isWaitingHttpRequest = true;
            $http({
                url: inventoryPageServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
                method: "POST",
                data: $scope.rowDetailsSelected 
            })
            .then(function(response) {
                if(response.data == "ACCESS DENIED" ){
                    $('#myLoadingModal').modal('hide'); 
                    swal( { icon : error , text : "ACCESS DENIED" } );
                }else{
                    var id = response.data.split( " " )[1];
                    //si es un nuevo registro, agregarlo
                    if( response.data.includes( "INSERT" ) ){
                        $scope.rowDetailsSelected.id = id;
                        $scope.inventoryTableData.push(
                                {
                                    id : id,
                                    link : $scope.rowDetailsSelected.link,
                                    partNumber : $scope.rowDetailsSelected.partNumber,
                                    description : $scope.rowDetailsSelected.description,
                                    localization : $scope.rowDetailsSelected.localization,
                                    type : $scope.rowDetailsSelected.type,
                                    unit : $scope.rowDetailsSelected.unit,
                                    stock : $scope.rowDetailsSelected.stock,
                                    checked : $scope.rowDetailsSelected.checked,
                                    showRow : true
                                });
                    }else{
                        for( var index in $scope.inventoryTableData ){
                            if( $scope.inventoryTableData[ index ].id == id ){
                                $scope.inventoryTableData[ index ].link = $scope.rowDetailsSelected.link;
                                $scope.inventoryTableData[ index ].partNumber = $scope.rowDetailsSelected.partNumber;
                                $scope.inventoryTableData[ index ].description = $scope.rowDetailsSelected.description;
                                $scope.inventoryTableData[ index ].localization = $scope.rowDetailsSelected.localization;
                                $scope.inventoryTableData[ index ].type = $scope.rowDetailsSelected.type;
                                $scope.inventoryTableData[ index ].unit = $scope.rowDetailsSelected.unit;
                                $scope.inventoryTableData[ index ].stock = $scope.rowDetailsSelected.stock;
                                $scope.inventoryTableData[ index ].checked = $scope.rowDetailsSelected.checked;
                            }
                        }
                    }
                    $scope.isWaitingHttpRequest = false;
                    if( options == 1 ){ $('#inventoryDetailModal').modal('hide');  }
                    if( options == 2 ){ $scope.addNewRow(); }
                }
                
            }, 
            function(response) { // optional
                swal( { icon : error , text : "ERROR con el servidor, intenta otra vez" } );
                $scope.isWaitingHttpRequest = false;
            });
        }
    };
    
    //
    $scope.setRowColorBySelected = function( description ){
        var returnData = "";
        if( $scope.imageToShowSelectedTitle == description ){
            returnData = "color: black; background-color: lightblue;";
        }
        return returnData;
        
    }
    
   
}]);
