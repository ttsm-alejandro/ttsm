/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

var miApp = angular.module( "miApp" , [] );
miApp.controller( 'computerCtrl'  ,['$scope' , '$http' , '$window' , function( $scope , $http , $window ){
    /**** variables ****/
    //URL
    var computerServiceUrl = serviceUrl + "php/resources/catalogs/ComputerResource.php";
    $scope.relativeUrl = "../../";
    //URL for SMC Planner
    var companyServiceUrl = serviceUrl + "php/resources/catalogs/CompanyResource.php";
    var sMCPlannerServiceUrl = serviceUrl + "php/resources/excel/SMCPlannerResource.php";
    
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
    
    //forms
    $scope.details = {
        "id" : "--",
        "serviceTag" : "",
        "macAddress" : "",
        "detail" : "",
        "softwareArray" : "",
        "backupArray" : "",
        "backupParameter" : "",
        "backupParameterScan" : "",
        "backupKeyfileLQ" : "",
        "backupKeyfileRegalisV2" : "",
        "backupKeyfileRegalisV3" : "",
        "comment" : ""
    };
    
    $scope.softwareArray = [];
    
    //catalogs
    $scope.softwareCatalog = [];
    //for SMC Planner
    $scope.statusCatalog = [ { name : "ACTIVE" } , { name : "INACTIVE" } , { name : "NO APPLY" } ];
    $scope.idSoftwareSelectedFilter = "";
    $scope.statusSelectedFilter = "";
    //labels
    $scope.isShowCompany = false;
    $scope.labelCompany = "label-danger";
    $scope.isShowPlant = false;
    $scope.labelPlant = "label-danger";
    $scope.isShowPerson = false;
    $scope.labelPerson = "label-danger";
    $scope.isShowPersonEmail = false;
    $scope.labelPersonEmail = "label-danger";
    $scope.isShowSystem = false;
    $scope.labelSystem = "label-danger";


    //table
    $scope.filterComputerServiceTag = "";
    $scope.tableContent = [];
    //for SMC Planner
    $scope.tableSMCPlanner = [];
    
    /**** functions ****/
    //
    $scope.getUserScreenHeight = function(){
        //screen resolution
        $scope.userScreenHeight = $(document).height();
        $scope.userScreenHeight = $scope.userScreenHeight - 275;
        $scope.userScreenHeight = $scope.userScreenHeight + "px";
    };
        
    //
    $scope.getData = function(){
        $scope.getUserScreenHeight();
        $scope.tableContent = [];
        $('#myLoadingModal').modal('show'); 
        $http({
            url: computerServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                swal( { icon : error , text : "ACCESS DENIED" } );
            }
            for( var index in response.data ){
                $scope.tableContent[ index ] = response.data[ index ] ;
            }
            $('#myLoadingModal').modal('hide'); 
        }, 
        function(response) { // optional
            swal( { icon : error , text : "ERROR" } );
            $('#myLoadingModal').modal('hide'); 
        });
    };
    
    //
    $scope.getDataById = function( id ){
        $('#myLoadingModal').modal('show'); 
        $http({
            url: computerServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + id,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                swal( { icon : error , text : "ACCESS DENIED" } );
            }else{
                $scope.getDetails( response.data );
            }
            $('#myLoadingModal').modal('hide'); 
        }, 
        function(response) { // optional
            swal( { icon : error , text : "ERROR" } );
            $('#myLoadingModal').modal('hide'); 
        });
    };
    
    //clic on a ROW of the table
    $scope.getDetails = function( param ){
        $scope.details.id = param.id;
        $scope.details.serviceTag = param.serviceTag;
        $scope.details.macAddress = param.macAddress;
        $scope.details.detail = param.detail;
        $scope.details.comment = param.comment;
        //
        $scope.details.softwareArray = param.softwareArray;
        $scope.textToArray();
        //
        if( param.backupArray == "" ){
            $scope.details.backupArray = "NG;NG;NG;NG;NG;"
        }else{
            $scope.details.backupArray = param.backupArray;
        }
        $scope.textToArrayBackup();
    };
    
    /*
     * convierte el texto $scope.details.backupArray
     *      NG;NG;NG;NA;OK; 
     * en 
     *      $scope.details.parameters = "NG";
     *      .... 
     *      $scope.details.keyfileRegalisV3 = "OK"
     * 
     */
    $scope.textToArrayBackup = function(){
        var backupText = $scope.details.backupArray.split(";");
        $scope.details.backupParameter = backupText[ 0 ];
        $scope.details.backupParameterScan = backupText[ 1 ];
        $scope.details.backupKeyfileLQ = backupText[ 2 ];
        $scope.details.backupKeyfileRegalisV2 = backupText[ 3 ];
        $scope.details.backupKeyfileRegalisV3 = backupText[ 4 ];
    }
    
    /*
     * convierte el array 
     *      $scope.details.parameters = "NG";
     *      .... 
     *      $scope.details.keyfileRegalisV3 = "OK"
     * en texto
     *      NG;NG;NG;NA;OK; 
     * 
     */
    $scope.arrayToTextBackup = function(){
        return "" + $scope.details.backupParameter + ";"
                + $scope.details.backupParameterScan + ";"
                + $scope.details.backupKeyfileLQ + ";"
                + $scope.details.backupKeyfileRegalisV2 + ";"
                + $scope.details.backupKeyfileRegalisV3 + ";"
        ;
    }
    
    // Regresa el estilo de un BTN segun el status OK - verde, NA - Amarillo, NG - Rojo
    $scope.styleByBackupStatus = function( status ){
        var returnData = "";
        if( status == "NA" ){ returnData = "btn-warning"; }
        if( status == "OK" ){ returnData = "btn-success"; }
        if( status == "NG" ){ returnData = "btn-danger"; }
        return returnData;
    }
    
    // cambia el estatus en ese orden NG -> OK -> NA -> NG y se repite
    $scope.changeBackupStatusByClic = function( status ){
        var returnData = "NA";
        if( status == "NG" ){ returnData = "OK"; }
        if( status == "OK" ){ returnData = "NA"; }
        if( status == "NA" ){ returnData = "NG"; }
        return returnData;
    }
    
    //new row
    $scope.newRow = function(){
        $scope.cleanDetails();
    };
    
    //POST
    $scope.updateOrSaveRow = function(){
        if( $scope.isDetailsDataOk() ){
            $('#myLoadingModal').modal('show'); 
            $http({
                url: computerServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
                method: "POST",
                data: $scope.details
            })
            .then(function(response) {
                $scope.updateLocalData( response.data );
                if( response.data.includes( "INSERT" ) ){ 
                    swal( { text: "INSERT DONE", icon: "success" } );
                }else{
                    swal( { text: "UPDATE DONE", icon: "success" } );
                }
            }, 
            function(response) { // optional
                swal( { text: "FAIL", icon: "error" } );
                $('#myLoadingModal').modal('hide'); 
            });
        }
    };
    
    //UPDATE LOCAL DATA
    $scope.updateLocalData = function( responseData ){
        var id = responseData.split( " " )[1];
        if( responseData.includes( "INSERT" ) ){
            $scope.details.id = id;
            $scope.tableContent.push(
                {
                    id : id,
                    serviceTag : $scope.details.serviceTag,
                    macAddress : $scope.details.macAddress,
                    detail : $scope.details.detail,
                    softwareArray : $scope.details.softwareArray,
                    backupArray : $scope.details.backupArray,
                    comment : $scope.details.comment
                }
            );
        }
        if( responseData.includes( "UPDATE" ) ){
            for( var index in $scope.tableContent ){
                if( $scope.tableContent[ index ].id == id ){
                    $scope.tableContent[ index ].serviceTag = $scope.details.serviceTag;
                    $scope.tableContent[ index ].macAddress = $scope.details.macAddress;
                    $scope.tableContent[ index ].detail = $scope.details.detail;
                    $scope.tableContent[ index ].softwareArray = $scope.details.softwareArray;
                    $scope.tableContent[ index ].backupArray = $scope.details.backupArray;
                    $scope.tableContent[ index ].comment = $scope.details.comment;
                }
            }
        }
        if( responseData.includes( "DELETE" ) ){
            var temporalTable = $scope.tableContent;
            $scope.tableContent = [];
            for( var index in temporalTable ){
                if( temporalTable[ index ].id !== id ){
                    $scope.tableContent.push(
                        {
                            id : temporalTable[ index ].id,
                            serviceTag : temporalTable[ index ].serviceTag,
                            macAddress : temporalTable[ index ].macAddress,
                            detail : temporalTable[ index ].detail,
                            softwareArray : temporalTable[ index ].softwareArray,
                            backupArray : temporalTable[ index ].backupArray,
                            comment : temporalTable[ index ].comment
                        }
                    );
                }
            }
        }
        $('#myLoadingModal').modal('hide'); 
    };
    
    //DELETE
    $scope.deleteRow = function(){
        if( $scope.details.id == "--" ){
            swal( { text :  "Select Computer" , icon : "error" } );
        }else{
            swal({
                title: $scope.deleteWarningTitle ,
                text: $scope.deleteWarningText,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    //Proceed to make the http request to delete in the data base
                    $scope.deleteInDB();
              } else {
                    //swal("Your imaginary file is safe!"); 
              }
            });
        }
    };
     
    //Real DELETE on DB
    $scope.deleteInDB = function(){
        $http({
            url: computerServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + $scope.details.id + "&delete=ok",
            method: "DELETE"
        })
        .then(function(response) {
            $scope.cleanDetails();
            $scope.updateLocalData( response.data );
            swal( {icon : "info", text : "Delete Done"} );
        }, 
        function(response) { // optional
            swal( {icon : "error", text : "Delete Failed, Try again later"} );
        });
    };
    
    //
    $scope.cleanDetails = function(){
        $scope.details.id = "--";
        $scope.details.serviceTag = "";
        $scope.details.macAddress = "";
        $scope.details.detail = "";
        $scope.details.softwareArray = "";
        $scope.details.comment = "";
        //
        $scope.details.backupArray = "NG;NG;NG;NG;NG;";
        $scope.textToArrayBackup();
        //
        $scope.softwareArray = [];
    };

    //    
    $scope.getCatalogData = function(){
        $scope.getCatalogDataByTable( "Software" );
    };
    
    //
    $scope.getCatalogDataByTable = function( tableName ){
        var tableServiceUrl = serviceUrl + "php/resources/catalogs/" + tableName + "Resource.php";
        
        //clean previuos data
        if( tableName == "Software" ){ $scope.softwareCatalog = []; }
        
        $http({
            url: tableServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                swal( { icon : error , text : "NO ACCESS" } );
            }
            for( var index in response.data ){
                if( tableName == "Software" ){ $scope.softwareCatalog[ index ] = response.data[ index ]; }
            }
        }, 
        function(response) { // optional
            swal( { icon : error , text : "ERROR" } );
        });
    };
    
    //
    $scope.isDetailsDataOk = function(){
        var returnData = true;
        var errorText = "";
        //check Software Array Data
        if( $scope.isSoftwareArrayOk() ){ $scope.arrayToText(); }
        $scope.details.backupArray = $scope.arrayToTextBackup();
        
        if( $scope.details.serviceTag === "" ){ returnData = false; errorText += "Input Service Tag, "; }
        
        //check that Service Tag is not already used
        for( var index in $scope.tableContent ){
            if( $scope.tableContent[ index ].id != $scope.details.id ){
                if( $scope.tableContent[ index ].serviceTag == $scope.details.serviceTag ){
                    returnData = false;
                    errorText += "Service Tag already used, ";
                }
            }
        }
        if( !returnData ){
            swal({"text":errorText,"icon":"error"});
        }
        return returnData;
    };
    
    //
    $scope.isRowSelected = function( row ){
        var style = "";
        if( row.id === $scope.details.id ){
            style = "background-color:" + $scope.ttsmBlueColor + "; color: white;";
        }
        return style;
    };
    
    //Add new Software
    $scope.addNewSoftware = function(){
        $scope.softwareArray.push(
                {
                    idSoftware : "",
                    softwareVersion : "",
                    dongle : "",
                    dongleVersion : "",
                    installationDate : "",
                    softwareMaintenanceContractFinishDate : ""
                }
        );
    };
    
    //Text to Array
    $scope.textToArray = function(){
        $scope.softwareArray = [];
        var textInArray = $scope.details.softwareArray.split(";");
        for( var index in textInArray ){
            var text = textInArray[ index ].split(",");
            if( text[ 0 ] == "" ){
            }else{
                $scope.softwareArray.push(
                        {
                            idSoftware : text[ 0 ],
                            softwareVersion : text[ 1 ],
                            dongle : text[ 2 ],
                            dongleVersion : text[ 3 ],
                            installationDate : new Date( text[ 4 ] ),
                            softwareMaintenanceContractFinishDate : new Date( text[ 5 ] )
                        }
                );
            }
        }
    };
    
    //Array to Text
    $scope.arrayToText = function(){
        $scope.details.softwareArray = "";
        for( var index in $scope.softwareArray ){
            $scope.details.softwareArray += 
                    $scope.softwareArray[ index ].idSoftware + ","
                    + $scope.softwareArray[ index ].softwareVersion + ","
                    + $scope.softwareArray[ index ].dongle + ","
                    + $scope.softwareArray[ index ].dongleVersion + ","
                    + "" + $scope.softwareArray[ index ].installationDate + ","
                    + "" + $scope.softwareArray[ index ].softwareMaintenanceContractFinishDate + ",;"
        }
    };
    
    //DELETE software in Software Array
    $scope.deleteSoftware = function( index ){
        /*swal( 
                { 
                    icon : "warning",
                    title : "Are you sure?", 
                    text : "Once deleted, you will not be able to recover the data!",
                    buttons: true,
                    dangerMode: true,
                }
        ).then((willDelete) => {
            if (willDelete) {*/
                var softwareArrayTemp = $scope.softwareArray;
                $scope.softwareArray = [];
                for( var i in softwareArrayTemp ){
                    if( i != index ){
                        $scope.softwareArray.push(
                                {
                                    idSoftware : softwareArrayTemp[ i ].idSoftware,
                                    softwareVersion : softwareArrayTemp[ i ].softwareVersion,
                                    dongle : softwareArrayTemp[ i ].dongle,
                                    dongleVersion : softwareArrayTemp[ i ].dongleVersion,
                                    installationDate : softwareArrayTemp[ i ].installationDate,
                                    softwareMaintenanceContractFinishDate : softwareArrayTemp[ i ].softwareMaintenanceContractFinishDate,
                                }
                        );
                    }
                }
        //}}); 
    };
    
    //check software array DATA, TO DO, Dongle number(s) are not used already
    $scope.isSoftwareArrayOk = function(){
        var returnData = true;
        /*for( var index in $scope.tableContent ){
            
        }*/
        return returnData;
    };
    
    //
    $scope.closeThisWindow = function(){
        $window.close();
    };
    
    //
    $scope.showSMCPlanner = function(){
        var today = new Date();

        $scope.tableSMCPlanner = [];
        $http({
            url: sMCPlannerServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            for( var index in response.data ){
                $scope.tableSMCPlanner[ index ] = response.data[ index ];
            }
            for( var index in $scope.tableSMCPlanner ){

                if( ( $scope.tableSMCPlanner[ index ].expirationDate == "Invalid Date" ) 
                    || ( $scope.tableSMCPlanner[ index ].expirationDate == "" )
                ){
                    $scope.tableSMCPlanner[ index ].expirationDate = new Date( 0 );
                    $scope.tableSMCPlanner[ index ].dayUntilExpirationDate = "No Apply";
                }else{
                    $scope.tableSMCPlanner[ index ].expirationDate = new Date( $scope.tableSMCPlanner[ index ].expirationDate );
                    $scope.tableSMCPlanner[ index ].dayUntilExpirationDate =  $scope.tableSMCPlanner[ index ].expirationDate.getTime() - today.getTime();
                    $scope.tableSMCPlanner[ index ].dayUntilExpirationDate = Math.round( $scope.tableSMCPlanner[ index ].dayUntilExpirationDate / ( 1000 * 60 * 60 * 24 ) );
                }

                if( $scope.tableSMCPlanner[ index ].dayUntilExpirationDate >= 0 ){
                    $scope.tableSMCPlanner[ index ].status = "ACTIVE";
                }else{
                    $scope.tableSMCPlanner[ index ].status = "INACTIVE";
                }
                
                if( $scope.tableSMCPlanner[ index ].dayUntilExpirationDate == "No Apply" ){
                    $scope.tableSMCPlanner[ index ].status = "NO APPLY";
                }
            }
            $('#sMCPlannerModal').modal('show');
        }, 
        function(response) { // optional
            swal( { text: "PLEASE TRY AGAIN LATER", icon: "error" } );
            $('#myLoadingModal').modal('hide');
        });
    }

    //
    $scope.getStyleByStatus = function( statusParam ) {
        var returnData = "";
        if( statusParam == "ACTIVE" ){
            returnData = "background-color : green ; color : white";
        }
        if( statusParam == "INACTIVE" ){
            returnData = "background-color : red ; color : white";
        }
        if( statusParam == "NO APPLY" ){
            returnData = "background-color : gray ; color : white";
        }
        return returnData;
    }


/*
    $scope.isShowCompany = true;
    $scope.labelCompany = "label-success";
    $scope.isShowPlant = true;
    $scope.labelPlant = "label-success";
    $scope.isShowPerson = true;
    $scope.labelPerson = "label-success";
    $scope.isShowPersonEmail = true;
    $scope.labelPersonEmail = "label-success";
    $scope.isShowSystem = true;
    $scope.labelSystem = "label-success";
*/
    //
    $scope.clicLabelShowColumn = function( param ){
        //company
        if( param == 'company' ){
            $scope.isShowCompany = !$scope.isShowCompany;
            if( $scope.isShowCompany ){ $scope.labelCompany = "label-success"; }else{ $scope.labelCompany = "label-danger"; }
            
        }
        //plant
        if( param == 'plant' ){
            $scope.isShowPlant = !$scope.isShowPlant;
            if( $scope.isShowPlant ){ $scope.labelPlant = "label-success"; }else{ $scope.labelPlant = "label-danger"; }
            
        }
        //person
        if( param == 'person' ){
            $scope.isShowPerson = !$scope.isShowPerson;
            if( $scope.isShowPerson ){ $scope.labelPerson = "label-success"; }else{ $scope.labelPerson = "label-danger"; }
            
        }
        //personEmail
        if( param == 'personEmail' ){
            $scope.isShowPersonEmail = !$scope.isShowPersonEmail;
            if( $scope.isShowPersonEmail ){ $scope.labelPersonEmail = "label-success"; }else{ $scope.labelPersonEmail = "label-danger"; }
            
        }
        //system
        if( param == 'system' ){
            $scope.isShowSystem = !$scope.isShowSystem;
            if( $scope.isShowSystem ){ $scope.labelSystem = "label-success"; }else{ $scope.labelSystem = "label-danger"; }
            
        }
    }
}]);
