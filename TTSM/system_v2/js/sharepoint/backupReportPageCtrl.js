/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

var miApp = angular.module( "miApp" , [] );
miApp.controller( 'backupReportPageCtrl'  ,['$scope' , '$http' , '$window' , function( $scope , $http , $window ){
    /**** variables ****/
    //URL
    $scope.relativeUrl = "../../";
    var computerServiceUrl = serviceUrl + "php/resources/catalogs/ComputerResource.php";
    
    //oficial colors
    $scope.ttsmBlueColor = ttsmBlueColor ;
    $scope.ttsmGrayColor = ttsmGrayColor ; 
    
    //security
    $scope.user = "";
    $scope.token = "";
    
    //user screen
    $scope.userScreenHeight = "";
    
    //Message texts
    $scope.deleteWarningTitle = "Are you sure?";
    $scope.deleteWarningText = "Once deleted, you will not be able to recover the data!";
    $scope.deleteSuccess = "Data deleted!";
    $scope.deleteFailure = "Something went wrong!";
    
    //flags
    $scope.showServiceTag = true;
    
    //forms
    $scope.details = {
        "id" : "--",
        "serviceTag" : "",
        "macAddress" : "",
        "detail" : "",
        "softwareArray" : "",
        "backupArray" : "",
        "comment" : ""
    };

    //catalogs
    $scope.softwareCatalog = [];
    $scope.computerCatalog = [];

    //table
    $scope.backupReportData = [];
    $scope.filterComputerServiceTag = "";
    $scope.filterBySoftware = "";
    
    /**** functions ****/
    /*
    //obtiene la altura de la pantalla del cliente, lo guarda en 
     *   $scope.userScreenHeight
     */
    $scope.getUserScreenHeight = function(){
        //screen resolution
        $scope.userScreenHeight = $(document).height();
        $scope.userScreenHeight = $scope.userScreenHeight - 275;
        $scope.userScreenHeight = $scope.userScreenHeight + "px";
    };
        
    /*
     * Se llama a esta funcion en el ng-init
     * Captura la altura de la pantalla y los catalogos para esta pagina
     */
    $scope.getData = function(){
        $scope.getUserScreenHeight();
        $scope.getCatalogData();
    };
    /*
        //obtiene todos los catalogos necesarios
     * 
     * Como es requerido el catalogo de software y computer para poder hacer el reporte, en esta funcion despues del ".then" del llamado
     * al catalogo del software, se llama al getBackupReportData(), para evitar la asincronia...
     * el getBackupReportData basicamente es llenar el catalogo "computer" y usar el catalogo "software" para llenar el "title" de cada row
     */
    $scope.getCatalogData = function(){
        $scope.getCatalogDataByTable( "Software" );
        //$scope.getCatalogDataByTable( "Computer" );
        //$scope.softwareCatalog.push({id:"1",name:"Windows"},{id:"2",name:"Libella Queen"},{id:"3",name:"3D Magic"});
    };
    
    /*
     * //llena el array indicado con los datos de la tabla indicada
     * @param tableName = "Software", "Computer"
     * llena el array softwareCatalog[], computerCatalog[]
     * 
     * Como es requerido el catalogo de software y computer para poder hacer el reporte, en esta funcion despues del ".then" se llama al 
     * getBackupReportData(), para evitar la asincronia...
     */
    $scope.getCatalogDataByTable = function( tableName ){
        var tableServiceUrl = serviceUrl + "php/resources/catalogs/" + tableName + "Resource.php";
        
        //clean previuos data
        if( tableName == "Software" ){ $scope.softwareCatalog = []; }
        if( tableName == "Computer" ){ $scope.computerCatalog = []; }
        
        //http requesto
        $('#myLoadingModal').modal('show'); 
        $http({
            url: tableServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                swal( { icon : error , text : "NO ACCESS" } );
            }
            //llenacion de array segun se haya pedido
            for( var index in response.data ){
                if( tableName == "Software" ){ $scope.softwareCatalog[ index ] = response.data[ index ]; }
                if( tableName == "Computer" ){ $scope.computerCatalog[ index ] = response.data[ index ]; }
            }
            $('#myLoadingModal').modal('hide'); 
            $scope.getBackupReportData();
        }, 
        function(response) { // optional
            swal( { icon : error , text : "ERROR" } );
            $('#myLoadingModal').modal('hide'); 
        });
    };
    
    //POST
    $scope.updateOrSaveRow = function( row ){
        $('#myLoadingModal').modal('show');
        row.saved = "-cloud";
        row.backupArray = "" + row.backupParameter + ";"
                            + row.backupParameterScan + ";"
                            + row.backupKeyfileLQ + ";"
                            + row.backupKeyfileRegalisV2 + ";"
                            + row.backupKeyfileRegalisV3 + ";";
        $http({
            url: computerServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "POST",
            data: row
        })
        .then(function(response) {
            $('#myLoadingModal').modal('hide'); 
            row.saved = "-ok";
        }, 
        function(response) { // optional
            row.saved = "-remove";
            swal( { text: "FAIL", icon: "error" } );
            $('#myLoadingModal').modal('hide'); 
        });
    };
    
    //funcion auxiliar que cierra la pantalla solo si la pantalla ha sido invocada por "window.open()".
    $scope.closeThisWindow = function(){
        $window.close();
    };
    
    //convierte "NG;NG;NG;OK;NA;" en ["NG","NG","NG","OK","NA"]
    $scope.textToArray = function( text ){
        return text.split(";");
    }
    
    /*
     * 
     * backupArray
     *      - backupParameter
     *      - backupParameterScan
     *      - backupKeyfileLQ
     *      - backupKeyfileRegalisV2
     *      - backupKeyfileRegalisV3
     */
    $scope.getBackupReportData = function(){
        var today = new Date();
        var backupArray = [];
        $scope.backupReportData = [];
            
        $http({
            url: computerServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            for( var index in response.data ){
                $scope.computerCatalog[ index ] = response.data[ index ];
                //checa que backupArray no venga vacio, si viene vacio, lo llena con "NG;NG;NG;NG;NG;".
                if( $scope.computerCatalog[ index ].backupArray == "" ){ $scope.computerCatalog[ index ].backupArray = "NG;NG;NG;NG;NG;" }
            }
            //
            for( var index in $scope.computerCatalog ){
                $scope.backupReportData[ index ] = $scope.computerCatalog[ index ];

                // convertir texto "backupArray" -> "NG;NG;NG;OK;NA; en array ["NG","NG","NG","OK","NA"]
                backupArray = $scope.textToArray( $scope.computerCatalog[ index ].backupArray );
                
                //
                //      Datos extras al catalogo Computer
                //
                // meter en atributos el texto separado del backupArray
                $scope.backupReportData[ index ].backupParameter = backupArray[ 0 ];
                $scope.backupReportData[ index ].backupParameterScan = backupArray[ 1 ];
                $scope.backupReportData[ index ].backupKeyfileLQ = backupArray[ 2 ];
                $scope.backupReportData[ index ].backupKeyfileRegalisV2 = backupArray[ 3 ];
                $scope.backupReportData[ index ].backupKeyfileRegalisV3 = backupArray[ 4 ];
                
                //para el icono del boton de save
                $scope.backupReportData[ index ].saved = "-floppy-disk";
                $scope.backupReportData[ index ].title = "Software: ";
                
                //para poner en title el software y su version instalada, pinshi desmadre
                var softwareArray;
                softwareArray = $scope.computerCatalog[ index ].softwareArray.split(";");
                for( var ind in softwareArray ){
                    var softwareIndex = softwareArray[ ind ].split(",")[0];
                    var softwareVersion = softwareArray[ ind ].split(",")[1];
                    for( var i in $scope.softwareCatalog ){
                        if( $scope.softwareCatalog[ i ].id == softwareIndex ){
                            $scope.backupReportData[ index ].title += $scope.softwareCatalog[ i ].name + " version " + softwareVersion +  ", ";
                        }
                    }
                }
            }
        }, 
        function(response) { // optional
            swal( { text: "PLEASE TRY AGAIN LATER", icon: "error" } );
            $('#myLoadingModal').modal('hide');
        });
    }

    //regresa un estilo de boton segun el estatus, OK -> btn success, NG -> btn danger
    $scope.getStyleByStatus = function( statusParam ) {
        var returnData = "";
        if( statusParam == "OK" ){
            returnData = "btn-success";
        }
        if( statusParam == "NG" ){
            returnData = "btn-danger";
        }
        if( statusParam == "NA" ){
            returnData = "btn-default";
        }
        return returnData;
    }
    
    // cambia el estatus en ese orden NG -> OK -> NA -> NG y se repite
    $scope.changeStatusByClic = function( status ){
        var returnData = "NA";
        if( status == "NG" ){ returnData = "OK"; }
        if( status == "OK" ){ returnData = "NA"; }
        if( status == "NA" ){ returnData = "NG"; }
        return returnData;
    }

}]);
