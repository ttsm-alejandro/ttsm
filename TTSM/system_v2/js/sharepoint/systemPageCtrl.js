/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

var miApp = angular.module( "miApp" , [] );
miApp.controller( 'systemPageCtrl'  ,['$scope' , '$http' , '$window', function( $scope , $http , $window ){
    /**** variables ****/
    //Development
    $scope.showConsole = false;
    $scope.lastSearch = "";
    
    //URL
    var systemServiceUrl = serviceUrl + "php/resources/catalogs/SystemResource.php";
    var machineServiceUrl = serviceUrl + "php/resources/catalogs/MachineResource.php";
    var calibrationPlannerServiceUrl = serviceUrl + "php/resources/excel/CalibrationPlannerResource.php";
    var calibrationPlannerToExcelServiceUrl = serviceUrl + "php/resources/excel/CalibrationPlannerToExcelResource.php";
    $scope.relativeUrl = "../../";
    
    
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
    
    //TextArea on Modal
    $scope.showTextAreaOnModal = [ true , false , false ];
    $scope.textAreaOnModalTitle = "System Comments";
    $scope.showPleaseWaitMessage = false;
    
    /***** FOR SYSTEM ******/
    //forms
    $scope.systemDetail = {
        "id" : "--",
        "serialNumber" : "",
        "idCompany" : "",
        "idPlant" : "",
        "idDepartment" : "",
        "installationDate" : "",
        "lastCalibrationDate" : "",
        "nextCalibrationDate" : "",
        "detail" : "",
        "comment" : "",
        "showRow" : true
    };
    
    //catalogs
    $scope.cityCatalog = [];
    $scope.companyCatalog = [];
    $scope.computerCatalog = [];
    $scope.departmentCatalog = [];
    $scope.machineCatalog = [];
    $scope.machineTypeCatalog = [];
    $scope.personCatalog = [];
    $scope.plantCatalog = [];
    $scope.softwareCatalog = [];
    $scope.stateCatalog = [];

    //table
    $scope.filterCompany = "";
    $scope.filterPlant = "";
    $scope.filterDepartmentName = "";
    $scope.tableContent = [];
    
    //Calibration Planner
    $scope.tableCalibrationPlanner = [];
    $scope.filterCompanyInCalibrationPlanner = "";
    $scope.filterMachineTypeInCalibrationPlanner = "";
    $scope.filterStatusInCalibrationPlanner = "";
    $scope.isShowPlantInCalibrationPlanner = false;
    $scope.isShowPersonInCalibrationPlanner = false;
    $scope.isShowEmailInCalibrationPlanner = false;
    //labels for filter
    $scope.labelPlantStyle = "label-danger";
    $scope.labelPersonStyle = "label-danger";
    $scope.labelEmailStyle = "label-danger";
    
    //
    $scope.clicShowColumn = function( param ){
        //plant
        if( param == 'plant' ){
            $scope.isShowPlantInCalibrationPlanner = !$scope.isShowPlantInCalibrationPlanner;
            if( $scope.isShowPlantInCalibrationPlanner ){ $scope.labelPlantStyle = "label-success"; }else{ $scope.labelPlantStyle = "label-danger"; }
        }
        //person
        if( param == 'person' ){
            $scope.isShowPersonInCalibrationPlanner = !$scope.isShowPersonInCalibrationPlanner;
            if( $scope.isShowPersonInCalibrationPlanner ){ $scope.labelPersonStyle = "label-success"; }else{ $scope.labelPersonStyle = "label-danger"; }
        }
        //email
        if( param == 'email' ){
            $scope.isShowEmailInCalibrationPlanner = !$scope.isShowEmailInCalibrationPlanner;
            if( $scope.isShowEmailInCalibrationPlanner ){ $scope.labelEmailStyle = "label-success"; }else{ $scope.labelEmailStyle = "label-danger"; }
        }
        
    }
    
    /***** FOR MACHINE ******/
    $scope.machineArrayInSystem = [];
    $scope.isShowMachineDetail = false;
    $scope.machineDetail = {
        id : "--",
        idSystem : "",
        idMachineType : "",
        serialNumber : "",
        idComputer : "",
        comment : ""
    };
    
    /***** FOR SEARCH COMPLETE *****/
    $scope.searchCompleteResult = [];
    
    /**** functions ****/
    //With this function, we input which data in TextArea will be show in Modal
    // 1 = System Detail
    // 2 = System Comment
    // 3 = Machine Comment
    $scope.showTextAreaInModal = function( detailCommentComment ){
        if( detailCommentComment == 1 ){
            $scope.showTextAreaOnModal = [ true , false , false ];
            $scope.textAreaOnModalTitle = "System Detail";
        }
        if( detailCommentComment == 2 ){
            $scope.showTextAreaOnModal = [ false , true , false ];
            $scope.textAreaOnModalTitle = "System Comment";
        }
        if( detailCommentComment == 3 ){
            $scope.showTextAreaOnModal = [ false , false , true ];
            $scope.textAreaOnModalTitle = "Machine Comment";
        }
        $('#sharepointTextAreaInModal').modal('show');
    };
    
    //
    $scope.showCalibrationPlanner = function(){
        $http({
            url: calibrationPlannerServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            for( var index in response.data ){
                $scope.tableCalibrationPlanner[ index ] = response.data[ index ];
                if( $scope.tableCalibrationPlanner[ index ].nextCalibrationDate == "No Apply" ){
                    $scope.tableCalibrationPlanner[ index ].dayUntilNextCalibrationDate = "No Apply";
                    $scope.tableCalibrationPlanner[ index ].status = "NO APPLY";
                }
            }
            $('#calibrationPlannerModal').modal('show');
        }, 
        function(response) { // optional
            swal( { text: "PLEASE TRY AGAIN LATER", icon: "error" } );
            $('#myLoadingModal').modal('hide');
        });
    };
    
    //
    $scope.getStyleByStatus = function( statusParam ){
        var style = "";
        if( statusParam == "OK" ){ style = "background-color : darkgreen ; color : white" }         
        if( statusParam == "CLOSE" ){ style = "background-color : yellow ; color : black" }         
        if( statusParam == "PAST" ){ style = "background-color : darkred ; color : white" }
        if( statusParam == "NO APPLY" ){ style = "background-color : darkgray ; color : white" }
        return style;
    };
    
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
            url: systemServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                swal( { icon : error , text : "ACCESS DENIED" } );
            }
            for( var index in response.data ){
                $scope.tableContent[ index ] = response.data[ index ] ;
                $scope.tableContent[ index ].showRow = true;
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
            url: systemServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + id,
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
    $scope.getSystemDetail = function( param ){
        $scope.systemDetail.id = param.id;
        $scope.systemDetail.serialNumber  = param.serialNumber ;
        $scope.systemDetail.idCompany = param.idCompany;
        $scope.systemDetail.idPlant = param.idPlant;
        $scope.systemDetail.idDepartment = param.idDepartment;
        $scope.systemDetail.installationDate = new Date( param.installationDate );
        $scope.systemDetail.lastCalibrationDate = new Date( param.lastCalibrationDate );
        $scope.systemDetail.nextCalibrationDate = new Date( param.nextCalibrationDate );
        $scope.systemDetail.detail = param.detail;
        $scope.systemDetail.comment = param.comment;
        
        //
        $scope.getMachineInSystem( true );
        $scope.machineDetail.idSystem = param.id;
    };
    
    //new row
    $scope.newRow = function(){
        $scope.cleanSystemDetail();
        $scope.cleanMachineDetail();
        $scope.machineArrayInSystem = [];
        $scope.isShowMachineDetail = false;
    };
    
    //POST System ONLY
    //ACTUALIZAME
    $scope.updateOrSaveSystemDetail = function(){
        if( $scope.isSystemDetailDataOk() ){
            $('#myLoadingModal').modal('show');
            $scope.showPleaseWaitMessage = true;
            $http({
                url: systemServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
                method: "POST",
                data: $scope.systemDetail
            })
            .then(function(response) {
                $scope.updateSystemLocalData( response.data );
                $scope.showPleaseWaitMessage = false;
                if( response.data.includes( "INSERT" ) ){ 
                    swal( { text: "INSERT DONE", icon: "success" } );
                }else{
                    swal( { text: "UPDATE DONE", icon: "success" } );
                }
            }, 
            function(response) { // optional
                swal( { text: "FAIL", icon: "error" } );
                $scope.showPleaseWaitMessage = false;
                $('#myLoadingModal').modal('hide'); 
            });
        }
    };
    
    //UPDATE LOCAL DATA, System ONLY
    //ACTUALIZAME
    $scope.updateSystemLocalData = function( responseData ){
        var id = responseData.split( " " )[1];
        if( responseData.includes( "INSERT" ) ){
            $scope.systemDetail.id = id;
            $scope.tableContent.push(
                {
                    id : id,
                    serialNumber : $scope.systemDetail.serialNumber,
                    idCompany : $scope.systemDetail.idCompany,
                    idPlant : $scope.systemDetail.idPlant,
                    idDepartment : $scope.systemDetail.idDepartment,
                    installationDate : $scope.systemDetail.installationDate,
                    lastCalibrationDate : $scope.systemDetail.lastCalibrationDate,
                    nextCalibrationDate : $scope.systemDetail.nextCalibrationDate,
                    detail : $scope.systemDetail.detail,
                    comment : $scope.systemDetail.comment,
                    showRow : true
                }
            );
        }
        if( responseData.includes( "UPDATE" ) ){
            for( var index in $scope.tableContent ){
                if( $scope.tableContent[ index ].id == id ){
                    $scope.tableContent[ index ].serialNumber = $scope.systemDetail.serialNumber;
                    $scope.tableContent[ index ].idCompany = $scope.systemDetail.idCompany;
                    $scope.tableContent[ index ].idPlant = $scope.systemDetail.idPlant;
                    $scope.tableContent[ index ].idDepartment = $scope.systemDetail.idDepartment;
                    $scope.tableContent[ index ].installationDate = $scope.systemDetail.installationDate;
                    $scope.tableContent[ index ].lastCalibrationDate = $scope.systemDetail.lastCalibrationDate;
                    $scope.tableContent[ index ].nextCalibrationDate = $scope.systemDetail.nextCalibrationDate;
                    $scope.tableContent[ index ].detail = $scope.systemDetail.detail;
                    $scope.tableContent[ index ].comment = $scope.systemDetail.comment;
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
                            serialNumber : temporalTable[ index ].serialNumber,
                            idCompany : temporalTable[ index ].idCompany,
                            idPlant : temporalTable[ index ].idPlant,
                            idDepartment : temporalTable[ index ].idDepartment,
                            installationDate : temporalTable[ index ].installationDate,
                            lastCalibrationDate : temporalTable[ index ].lastCalibrationDate,
                            nextCalibrationDate : temporalTable[ index ].nextCalibrationDate,
                            detail : temporalTable[ index ].detail,
                            comment : temporalTable[ index ].comment,
                            showRow : true
                        }
                    );
                }
            }
        }
        $('#myLoadingModal').modal('hide'); 
    };
    
    //DELETE
    //ACTUALIZAME
    $scope.deleteRow = function(){
        if( $scope.systemDetail.id == "--" ){
            swal( { text :  "Select Department" , icon : "error" } );
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
        $('#myLoadingModal').modal('show'); 
        $http({
            url: systemServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + $scope.systemDetail.id + "&delete=ok",
            method: "DELETE"
        })
        .then(function(response) {
            $scope.cleanSystemDetail();
            $scope.updateLocalData( response.data );
            swal( {icon : "info", text : "Delete Done"} );
        }, 
        function(response) { // optional
            swal( {icon : "error", text : "Delete Failed, Try again later"} );
            $('#myLoadingModal').modal('hide'); 
        });
    };
    
    //
    $scope.cleanSystemDetail = function(){
        $scope.systemDetail.id = "--";
        $scope.systemDetail.serialNumber  = "";
        $scope.systemDetail.idCompany = "";
        $scope.systemDetail.idPlant = "";
        $scope.systemDetail.idDepartment = "";
        $scope.systemDetail.installationDate = "";
        $scope.systemDetail.lastCalibrationDate = "";
        $scope.systemDetail.nextCalibrationDate = "";
        $scope.systemDetail.detail = "";
        $scope.systemDetail.comment = "";
    };

    //    
    $scope.getCatalogData = function(){
        $scope.getCatalogDataByTable( "City" );
        $scope.getCatalogDataByTable( "Company" );
        $scope.getCatalogDataByTable( "Computer" );
        $scope.getCatalogDataByTable( "Department" );
        $scope.getCatalogDataByTable( "Machine" );
        $scope.getCatalogDataByTable( "MachineType" );
        $scope.getCatalogDataByTable( "Person" );
        $scope.getCatalogDataByTable( "Plant" );
        $scope.getCatalogDataByTable( "Software" );
        $scope.getCatalogDataByTable( "State" );
    };
    
    //
    $scope.getCatalogDataByTable = function( tableName ){
        var tableServiceUrl = serviceUrl + "php/resources/catalogs/" + tableName + "Resource.php";
        //This is for when you upload Catalog but do not want to lose id selected
        var temporalId = "";
        
        //clean previuos data, also store in "temporalId" the id Selected
        if( tableName == "City" ){ $scope.cityCatalog = []; }
        if( tableName == "Company" ){ $scope.companyCatalog  = []; temporalId = $scope.systemDetail.idCompany; }
        if( tableName == "Computer" ){ $scope.computerCatalog  = []; temporalId = $scope.machineDetail.idComputer; }
        if( tableName == "Department" ){ $scope.departmentCatalog  = []; temporalId = $scope.systemDetail.idDepartment; }
        if( tableName == "Machine" ){ $scope.machineCatalog  = []; }
        if( tableName == "MachineType" ){ $scope.machineTypeCatalog  = []; temporalId = $scope.machineDetail.idMachineType; }
        if( tableName == "Person" ){ $scope.personCatalog  = []; }
        if( tableName == "Plant" ){ $scope.plantCatalog  = []; temporalId = $scope.systemDetail.idPlant; }
        if( tableName == "Software" ){ $scope.softwareCatalog  = []; }
        if( tableName == "State" ){ $scope.stateCatalog  = []; }
        
        $('#myLoadingModal').modal('show'); 
        $http({
            url: tableServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                swal( { icon : error , text : "NO ACCESS" } );
            }
            for( var index in response.data ){
                if( tableName == "City" ){ $scope.cityCatalog[ index ] = response.data[ index ]; }
                if( tableName == "Company" ){ $scope.companyCatalog[ index ] = response.data[ index ]; }
                if( tableName == "Computer" ){ $scope.computerCatalog[ index ] = response.data[ index ]; }
                if( tableName == "Department" ){ $scope.departmentCatalog[ index ]  = response.data[ index ]; }
                if( tableName == "Machine" ){ $scope.machineCatalog[ index ] = response.data[ index ]; }
                if( tableName == "MachineType" ){ $scope.machineTypeCatalog[ index ] = response.data[ index ]; }
                if( tableName == "Person" ){ $scope.personCatalog[ index ] = response.data[ index ]; }
                if( tableName == "Plant" ){ $scope.plantCatalog[ index ] = response.data[ index ]; }
                if( tableName == "Software" ){ $scope.softwareCatalog[ index ] = response.data[ index ]; }
                if( tableName == "State" ){ $scope.stateCatalog[ index ] = response.data[ index ]; }
            }
            
            //restore id
            if( tableName == "Computer" ){ $scope.machineDetail.idComputer = temporalId; }
            if( tableName == "MachineType" ){ $scope.machineDetail.idMachineType = temporalId; }
            if( tableName == "Company" ){ $scope.systemDetail.idCompany = temporalId; }
            if( tableName == "Plant" ){ $scope.systemDetail.idPlant = temporalId; }
            if( tableName == "Department" ){ $scope.systemDetail.idDepartment = temporalId; }
            $('#myLoadingModal').modal('hide'); 
            
        }, 
        function(response) { // optional
            swal( { icon : error , text : "ERROR" } );
            $('#myLoadingModal').modal('hide'); 
        });
    };
    
    //ACTUALIZAME
    //Check System Data ONLY
    $scope.isSystemDetailDataOk = function(){
        var returnData = true;
        var errorText = "";
        if( $scope.systemDetail.serialNumber === "" ){ returnData = false; errorText += "Input SERIAL NUMBER, "; }
        if( $scope.systemDetail.idCompany === "" ){ returnData = false; errorText += "Select COMPANY, "; }
        if( $scope.systemDetail.idPlant === "" ){ returnData = false; errorText += "Select PLANT, "; }
        if( $scope.systemDetail.idDepartment === "" ){ returnData = false; errorText += "Select DEPARTMENT, "; }
        
        if( !$scope.isSystemDataCombinationOk() ){ returnData = false; errorText += "Already exist a System with the same Serial Number, "; }
        
        if( !returnData ){
            swal({"text":errorText,"icon":"error"});
        }
        return returnData;
    };
    
    //ACTUALIZAME
    $scope.isSystemDataCombinationOk = function(){
        var returnData = true;
        for( var index in $scope.tableContent ){
            if( $scope.systemDetail.id != $scope.tableContent[ index ].id ){
                if( $scope.systemDetail.serialNumber == $scope.tableContent[ index ].serialNumber ){
                    returnData = false;
                }
            }
            
        }
        return returnData;
    };
    
    //AGREGAR COMENTARIOS
    $scope.isRowSelected = function( row ){
        var style = "";
        if( row.id === $scope.systemDetail.id ){
            style = "background-color:" + $scope.ttsmBlueColor + "; color: white;";
        }
        return style;
    };
    
    //Open new TAB
    $scope.openCatalogWindow = function( param , id ){
        if( id == "" ){
            swal({ text : "Select a option to EDIT" , icon : "error" });
        }else{
            $window.open( $scope.relativeUrl + "html/catalogs/" + param + ".php?id=" + id , "" , "top=0,left=0,width=800,height=600" );
        }
    };
    
    /*********** MACHINE ARRAY ***************/
    //AGREGAR COMENTARIOS
    $scope.getMachineInSystem = function( isCleanMachineDetail ){
        $scope.machineArrayInSystem = [];
        if( isCleanMachineDetail ){ $scope.cleanMachineDetail(); }
        $scope.isShowMachineDetail = true;
        for( var index in $scope.machineCatalog ){
            if( $scope.machineCatalog[ index ].idSystem == $scope.systemDetail.id ){
                $scope.machineArrayInSystem.push( $scope.machineCatalog[ index ] );
            }
        }
        if( $scope.machineArrayInSystem.length == 0 ){ $scope.isShowMachineDetail = false; }else{ $scope.getMachineDetail( $scope.machineArrayInSystem[ 0 ] ); }
    };
    
    //AGREGAR COMENTARIOS
    $scope.getMachineDetail = function( machineParam ){
        $scope.machineDetail.id = machineParam.id;
        $scope.machineDetail.idSystem = machineParam.idSystem;
        $scope.machineDetail.idMachineType = machineParam.idMachineType;
        $scope.machineDetail.serialNumber = machineParam.serialNumber;
        $scope.machineDetail.idComputer = machineParam.idComputer;
        $scope.machineDetail.comment = machineParam.comment;
    };
    
    //AGREGAR COMENTARIOS
    $scope.cleanMachineDetail = function(){
        $scope.machineDetail = {
            id : "--",
            idSystem : $scope.systemDetail.id,
            idMachineType : "",
            serialNumber : "",
            idComputer : "",
            comment : ""
        };
    };
    
    //AGREGAR COMENTARIOS
    $scope.addNewMachine = function(){
        $scope.isShowMachineDetail = true;
        $scope.cleanMachineDetail();
        $scope.machineDetail.idSystem = $scope.systemDetail.id;
    };
    
    //AGREGAR COMENTARIOS
    $scope.isMachineDetailOk = function(){
        var returnData = true;
        var errorText = "";
        if( ( $scope.machineDetail.idSystem === "" ) || ($scope.machineDetail.idSystem == "--") ){ returnData = false; errorText += "Select a registered SYSTEM, "; }
        if( $scope.machineDetail.serialNumber === "" ){ returnData = false; errorText += "Input SERIAL NUMBER, "; }
        if( $scope.machineDetail.idMachineType === "" ){ returnData = false; errorText += "Select MACHINE TYPE, "; }
        if( $scope.machineDetail.idComputer === "" ){ returnData = false; errorText += "Select COMPUTER, "; }
        
        if( !$scope.isMachineDataCombinationOk() ){ returnData = false; errorText += "Already exist a Machine with the same Serial Number, "; }
        
        if( !returnData ){
            swal({"text":errorText,"icon":"error"});
        }
        return returnData;
    };
    
    //AGREGAR COMENTARIOS
    $scope.isMachineDataCombinationOk = function(){
        var returnData = true;
        for( var index in $scope.machineCatalog ){
            if( $scope.machineCatalog[ index ].id != $scope.machineDetail.id ){
                if( $scope.machineCatalog[ index ].serialNumber == $scope.machineDetail.serialNumber ){
                    returnData = false;
                }
            }
        }
        return returnData;
    };
    
    //POST Machine ONLY
    //ACTUALIZAME
    $scope.updateOrSaveMachineDetail = function(){
        if( $scope.isMachineDetailOk() ){
            $('#myLoadingModal').modal('show'); 
            $scope.showPleaseWaitMessage = true;
            $http({
                url: machineServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
                method: "POST",
                data: $scope.machineDetail
            })
            .then(function(response) {
                $scope.updateMachineLocalData( response.data );
                $scope.showPleaseWaitMessage = false;
                if( response.data.includes( "INSERT" ) ){ 
                    swal( { text: "INSERT DONE", icon: "success" } );
                }else{
                    swal( { text: "UPDATE DONE", icon: "success" } );
                }
            }, 
            function(response) { // optional
                swal( { text: "FAIL", icon: "error" } );
                $scope.showPleaseWaitMessage = false;
                $('#myLoadingModal').modal('hide'); 
            });
        }
    };
    
    //
    $scope.updateMachineLocalData = function( responseData ){
        var id = responseData.split( " " )[1];
        if( responseData.includes( "INSERT" ) ){
            $scope.machineDetail.id = id;
            $scope.machineCatalog.push(
                {
                    id : id,
                    idSystem : $scope.machineDetail.idSystem,
                    idMachineType : $scope.machineDetail.idMachineType,
                    serialNumber : $scope.machineDetail.serialNumber,
                    idComputer : $scope.machineDetail.idComputer,
                    comment : $scope.machineDetail.comment
                }
            );
        }
        if( responseData.includes( "UPDATE" ) ){
            for( var index in $scope.machineCatalog ){
                if( $scope.machineCatalog[ index ].id == id ){
                    $scope.machineCatalog[ index ].idSystem = $scope.machineDetail.idSystem;
                    $scope.machineCatalog[ index ].idMachineType = $scope.machineDetail.idMachineType;
                    $scope.machineCatalog[ index ].serialNumber = $scope.machineDetail.serialNumber;
                    $scope.machineCatalog[ index ].idComputer = $scope.machineDetail.idComputer;
                    $scope.machineCatalog[ index ].comment = $scope.machineDetail.comment;
                }
            }
        }
        if( responseData.includes( "DELETE" ) ){
            var temporalTable = $scope.machineCatalog;
            $scope.machineCatalog = [];
            for( var index in temporalTable ){
                if( temporalTable[ index ].id !== id ){
                    $scope.machineCatalog.push(
                        {
                            id : temporalTable[ index ].id,
                            idSystem : temporalTable[ index ].idSystem,
                            idMachineType : temporalTable[ index ].idMachineType,
                            serialNumber : temporalTable[ index ].serialNumber,
                            idComputer : temporalTable[ index ].idComputer,
                            comment : temporalTable[ index ].comment
                        }
                    );
                }
            }
        }
        
        $scope.getMachineInSystem( false );
        $('#myLoadingModal').modal('hide'); 
    };
    
    //AGREGAR COMENTARIOS
    $scope.clicDeleteMachineButton = function(){
        if( $scope.machineDetail.id == "--" ){
            $scope.cleanMachineDetail();
        }else{
            $scope.deleteMachine();
        }
    }
    
    //DELETE
    $scope.deleteMachine = function(){
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
                $scope.deleteMachineInDB();
          } else {
                //swal("Your imaginary file is safe!"); 
          }
        });
    };
     
    //Real DELETE on DB
    $scope.deleteMachineInDB = function(){
        $('#myLoadingModal').modal('show'); 
        $http({
            url: machineServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + $scope.machineDetail.id + "&delete=ok",
            method: "DELETE"
        })
        .then(function(response) {
            $scope.updateMachineLocalData( response.data );
            swal( {icon : "info", text : "Delete Done"} );
        }, 
        function(response) { // optional
            swal( {icon : "error", text : "Delete Failed, Try again later"} );
            $('#myLoadingModal').modal('hide'); 
        });
    };
    
    // SEARCH USING "ENTER"
    $scope.searchComplete = function(){
        if( ( $scope.filterSystemSerialNumber === undefined ) || ( $scope.filterSystemSerialNumber === "" ) ){
            swal( { icon : "error" ,  text: "Input search word" } );
        }else{
            $scope.lastSearch = $scope.filterSystemSerialNumber;
            $('#myLoadingModal').modal('show'); 
            //$('#myDevelopmentModal').modal('show');

            $scope.searchCompleteResult = [];
            var includeSystem = false;

            for( var index in $scope.tableContent ){
                includeSystem = false;
                if( $scope.showConsole ){ console.log( "\nBuscando en SYSTEM -- " + $scope.tableContent[ index ].serialNumber + " --"); }

                //tableContent, search for "serialNumber", "detail" and "comment"
                if( $scope.showConsole ){ console.log( "- Buscar en SerialNumber" ); }
                if( $scope.tableContent[ index ].serialNumber.toUpperCase().includes( $scope.filterSystemSerialNumber.toUpperCase() ) ){
                    if( $scope.showConsole ){ console.log( "************** Encontrado serialNumber " + $scope.tableContent[ index ].serialNumber ); }
                    includeSystem = true;
                }
                
                if( $scope.showConsole ){ console.log( "- Buscar en detail" ); }
                if( $scope.tableContent[ index ].detail.toUpperCase().includes( $scope.filterSystemSerialNumber.toUpperCase() ) ){
                    if( $scope.showConsole ){ console.log( "************** Encontrado detail " + $scope.tableContent[ index ].serialNumber ); }
                    includeSystem = true;
                }
                
                if( $scope.showConsole ){ console.log( "- Buscar en comment" ); }
                if( $scope.tableContent[ index ].comment.toUpperCase().includes( $scope.filterSystemSerialNumber.toUpperCase() ) ){
                    if( $scope.showConsole ){ console.log( "************** Encontrado comment " + $scope.tableContent[ index ].serialNumber ); }
                    includeSystem = true;
                }

                //si todavia no lo encuentra, busca en los catalogos
                if( !includeSystem  ){
                    if( $scope.showConsole ){ console.log( "-- Buscar en Catalogos " + $scope.tableContent[ index ].serialNumber ); }

                    //companyCatalog
                    if( $scope.showConsole ){ console.log( "- Buscar en companyCatalog" ); }
                    if( !includeSystem ){
                        if( $scope.searchCompleteInCatalog( "companyCatalog" , $scope.tableContent[ index ].idCompany , $scope.filterSystemSerialNumber.toUpperCase() ) ){
                            if( $scope.showConsole ){ console.log( "************** Encontrado en companyCatalog " + $scope.tableContent[ index ].serialNumber ); }
                            includeSystem = true;
                        }
                    }

                    //plantCatalog
                    if( $scope.showConsole ){ console.log( "- Buscar en plantCatalog" ); }
                    if( !includeSystem ){
                        if( $scope.searchCompleteInCatalog( "plantCatalog" , $scope.tableContent[ index ].idPlant , $scope.filterSystemSerialNumber.toUpperCase() ) ){
                            if( $scope.showConsole ){ console.log( "************** Encontrado en plantCatalog " + $scope.tableContent[ index ].serialNumber ); }
                            includeSystem = true;
                        }                    
                    }

                    //departmentCatalog
                    if( $scope.showConsole ){ console.log( "- Buscar en departmentCatalog" ); }
                    if( !includeSystem ){
                        if( $scope.searchCompleteInCatalog( "departmentCatalog" , $scope.tableContent[ index ].idDepartment , $scope.filterSystemSerialNumber.toUpperCase() ) ){
                            if( $scope.showConsole ){ console.log( "************** Encontrado en departmentCatalog " + $scope.tableContent[ index ].serialNumber ); }
                            includeSystem = true;
                        }
                    }
                }
                
                //si todavia no lo encuentra, buscar en las maquinas que componen el sistema
                if( !includeSystem  ){
                    if( $scope.showConsole ){ console.log( "- Buscar en Machines" ); }
                    // AQUI ANDO
                    includeSystem = $scope.searchCompleteInMachine( $scope.tableContent[ index ].id , $scope.filterSystemSerialNumber );
                }

                //Finalmente, se agrega o no el System
                if( includeSystem ){
                    if( $scope.showConsole ){ console.log( "- Agregamos a " + $scope.tableContent[ index ].serialNumber ) };

                    //una linea agrega solo el SerialNumber, la otra todo el registro
                    $scope.searchCompleteResult.push( $scope.tableContent[ index ].serialNumber );
                    //$scope.searchCompleteResult.push( $scope.tableContent[ index ] );
                }
            }
            //Esta linea agrega un registro final con el total de resultados encontrados
            //$scope.searchCompleteResult.push( "TOTAL: " + $scope.searchCompleteResult.length );
            
            //Aqui actualizamos la lista mostrada
            for( var index in $scope.tableContent ){
                $scope.tableContent[ index ].showRow = false;
                for( var indexShow in $scope.searchCompleteResult ){
                    if( $scope.tableContent[ index ].serialNumber == $scope.searchCompleteResult[ indexShow ] ){
                        $scope.tableContent[ index ].showRow = true;
                        break;
                    }
                }
            }
            $scope.filterSystemSerialNumber = "";
            $('#myLoadingModal').modal('hide');
        }
    };
    
    //
    $scope.searchCompleteInCatalog = function( catalogName , id , searchWord ){
        var isSearchWord = false;
        
        //stateCatalog
        if( catalogName == "stateCatalog" ){
            for( var index in $scope.stateCatalog ){
                if( $scope.stateCatalog[ index ].id == id ){
                    if( $scope.stateCatalog[ index ].name.toUpperCase().includes( searchWord ) ){ 
                        isSearchWord = true;
                        if( $scope.showConsole ){ console.log( "************** Encontrado en state.name");  }
                    }
                    break;
                }
            }
        }
        
        //cityCatalog
        if( catalogName == "cityCatalog" ){
            for( var index in $scope.cityCatalog ){
                if( $scope.cityCatalog[ index ].id == id ){
                    if( $scope.cityCatalog[ index ].name.toUpperCase().includes( searchWord ) ){ 
                        isSearchWord = true;
                        if( $scope.showConsole ){ console.log( "************** Encontrado en city.name"); }
                    }
                    break;
                }
            }
        }
        
        //personCatalog
        if( catalogName == "personCatalog" ){
            for( var index in $scope.personCatalog ){
                if( $scope.personCatalog[ index ].id == id ){
                    if( $scope.personCatalog[ index ].name.toUpperCase().includes( searchWord ) ){ 
                        isSearchWord = true;
                        if( $scope.showConsole ){ console.log( "************** Encontrado en person.name"); }
                    }
                    if( $scope.personCatalog[ index ].japaneseName.toUpperCase().includes( searchWord ) ){ 
                        isSearchWord = true;
                        if( $scope.showConsole ){ console.log( "************** Encontrado en person.japaneseName"); }
                    }
                    if( $scope.personCatalog[ index ].cellphone.toUpperCase().includes( searchWord ) ){ 
                        isSearchWord = true;
                        if( $scope.showConsole ){ console.log( "**************Encontrado en person.cellphone"); }
                    }
                    if( $scope.personCatalog[ index ].email.toUpperCase().includes( searchWord ) ){ 
                        isSearchWord = true;
                        if( $scope.showConsole ){ console.log( "************** Encontrado en person.email"); }
                    }
                    if( $scope.personCatalog[ index ].comment.toUpperCase().includes( searchWord ) ){ 
                        isSearchWord = true;
                        if( $scope.showConsole ){ console.log( "************** Encontrado en person.comment"); }
                    }
                    break;
                }
            }
        }
        //companyCatalog
        if( catalogName == "companyCatalog" ){
            for( var index in $scope.companyCatalog ){
                if( $scope.companyCatalog[ index ].id == id ){
                    if( $scope.showConsole ){ console.log( "-- Buscar en company.fullName" ); }
                    if( $scope.companyCatalog[ index ].fullName.toUpperCase().includes( searchWord ) ){ 
                        isSearchWord = true;
                        if( $scope.showConsole ){ console.log( "************** Encontrado en company.fullName"); }
                    }
                    
                    if( $scope.showConsole ){ console.log( "-- Buscar en company.shortName" ); }
                    if( $scope.companyCatalog[ index ].shortName.toUpperCase().includes( searchWord ) ){ 
                        isSearchWord = true;
                        if( $scope.showConsole ){ console.log( "************** Encontrado en company.shortName"); }
                    }
                    
                    if( $scope.showConsole ){ console.log( "-- Buscar en company.webPage" ); }
                    if( $scope.companyCatalog[ index ].webPage.toUpperCase().includes( searchWord ) ){ 
                        isSearchWord = true;
                        if( $scope.showConsole ){ console.log( "************** Encontrado en company.webPage"); }
                    }
                    break;
                }
            }
        }
        
        //plantCatalog
        if( catalogName == "plantCatalog" ){
            for( var index in $scope.plantCatalog ){
                if( $scope.plantCatalog[ index ].id == id ){
                    if( $scope.showConsole ){ console.log( "-- Buscar en plant.name" ); }
                    if( $scope.plantCatalog[ index ].name.toUpperCase().includes( searchWord ) ){ 
                        isSearchWord = true;
                        if( $scope.showConsole ){ console.log( "************** Encontrado en plant.name"); }
                    }
                    
                    if( $scope.showConsole ){ console.log( "-- Buscar en plant.address" ); }
                    if( $scope.plantCatalog[ index ].address.toUpperCase().includes( searchWord ) ){ 
                        isSearchWord = true;
                        if( $scope.showConsole ){ console.log( "************** Encontrado en plant.address"); }
                    }
                    
                    if( $scope.showConsole ){ console.log( "-- Buscar en plant.comment" ); }
                    if( $scope.plantCatalog[ index ].comment.toUpperCase().includes( searchWord ) ){ 
                        isSearchWord = true;
                        if( $scope.showConsole ){ console.log( "**************Encontrado en plant.comment"); }
                    }
                    
                    //busca en catalogos
                    //plant.state
                    if( !isSearchWord ){
                        if( $scope.showConsole ){ console.log( "-- Buscar en plant.idState" ); }
                        if( $scope.searchCompleteInCatalog( "stateCatalog" , $scope.plantCatalog[ index ].idState , searchWord.toUpperCase() ) ){
                            isSearchWord = true;
                            if( $scope.showConsole ){ console.log( "************** Encontrado en plant.idState" ); }
                        }
                    }
                    
                    //plant.city
                    if( !isSearchWord ){
                        if( $scope.showConsole ){ console.log( "-- Buscar en plant.idCity" ); }
                        if( $scope.searchCompleteInCatalog( "cityCatalog" , $scope.plantCatalog[ index ].idCity , searchWord.toUpperCase() ) ){
                            isSearchWord = true;
                            if( $scope.showConsole ){ console.log( "**************Encontrado en plant.idCity" ); }
                        }
                    }
                    
                    //plant.person
                    if( !isSearchWord ){
                        if( $scope.showConsole ){ console.log( "-- Buscar en plant.idPerson" ); }
                        if( $scope.searchCompleteInCatalog( "personCatalog" , $scope.plantCatalog[ index ].idPerson , searchWord.toUpperCase() ) ){
                            isSearchWord = true;
                            if( $scope.showConsole ){ console.log( "************** Encontrado en plant.idPerson" ); }
                        }
                    }
                    break;
                }
            }
        }
            
        //departmentCatalog
        if( catalogName == "departmentCatalog" ){
            for( var index in $scope.departmentCatalog ){
                if( $scope.departmentCatalog[ index ].id == id ){
                    if( $scope.showConsole ){ console.log( "-- Buscar en department.name" ); }
                    if( $scope.departmentCatalog[ index ].name.toUpperCase().includes( searchWord ) ){ 
                        isSearchWord = true;
                        if( $scope.showConsole ){ console.log( "************** Encontrado en department.name"); }
                    }
                    
                    if( $scope.showConsole ){ console.log( "-- Buscar en department.comment" ); }
                    if( $scope.departmentCatalog[ index ].comment.toUpperCase().includes( searchWord ) ){ 
                        isSearchWord = true;
                        if( $scope.showConsole ){ console.log( "************** Encontrado en department.comment"); }
                    }
                    
                    //busca en catalogos
                    //department.person
                    if( !isSearchWord ){
                        if( $scope.showConsole ){ console.log( "-- Buscar en department.idPerson" ); }
                        if( $scope.searchCompleteInCatalog( "personCatalog" , $scope.departmentCatalog[ index ].idPerson , searchWord.toUpperCase() ) ){
                            isSearchWord = true;
                            if( $scope.showConsole ){ console.log( "************** Encontrado en department.idPerson" ); }
                        }
                    }
                    break;
                }
            }
        }
        
        return isSearchWord;
    };
    
    //Busca la "searchWord" en todo lo que tenga que ver con las maquinas del "id" System
    $scope.searchCompleteInMachine = function( idSystem , searchWord ){
        var returnData = false;
        
        for( var index in $scope.machineCatalog ){
            if( $scope.machineCatalog[ index ].idSystem == idSystem ){
                if( $scope.showConsole ){ console.log( "Maquina " + $scope.machineCatalog[ index ].serialNumber + " pertenece al system"); }
                
                if( $scope.showConsole ){ console.log( "-- Buscar en Machine.SerialNumber" ); }
                if( $scope.machineCatalog[ index ].serialNumber.toUpperCase().includes( searchWord.toUpperCase() ) ){
                    if( $scope.showConsole ){ console.log( "************** Encontrado en Machine.serialNumber" ); }
                    returnData = true;
                }
                
                if( $scope.showConsole ){ console.log( "-- Buscar en Machine.comment" ); }
                if( $scope.machineCatalog[ index ].comment.toUpperCase().includes( searchWord.toUpperCase() ) ){
                    if( $scope.showConsole ){ console.log( "************** Encontrado en Machine.comment" ); }
                    returnData = true;
                }
                
                //Todavia no lo encuentra, buscar en el tipo de maquina
                if( !returnData ){
                    if( $scope.showConsole ){ console.log( "- Buscar en MachineType de la Machine" ); }
                    for( var indexMachineType in $scope.machineTypeCatalog ){
                        if( $scope.machineTypeCatalog[ indexMachineType ].id == $scope.machineCatalog[ index ].idMachineType ){
                            
                            if( $scope.showConsole ){ console.log( "-- Buscar en MachineType.name" ); }
                            if( $scope.machineTypeCatalog[ indexMachineType ].name.toUpperCase().includes( searchWord.toUpperCase ) ){
                                if( $scope.showConsole ){ console.log( "************** Encontrado en MachineType.name" ); }
                                returnData = true;
                            }
                            
                            if( $scope.showConsole ){ console.log( "-- Buscar en MachineType.comment" ); }
                            if( $scope.machineTypeCatalog[ indexMachineType ].comment.toUpperCase().includes( searchWord.toUpperCase ) ){
                                if( $scope.showConsole ){ console.log( "************** Encontrado en MachineType.comment" ); }
                                returnData = true;
                            }
                            break;
                        }
                    }
                }
                
                //Todavia no lo encuentra, buscar en la computadora
                if( !returnData ){
                    if( $scope.showConsole ){ console.log( "-- Buscar en Computer de la Machine" ); }
                    for( var computerIndex in $scope.computerCatalog ){
                        if( $scope.computerCatalog[ computerIndex ].id == $scope.machineCatalog[ index ].idComputer ){
                            
                            if( $scope.showConsole ){ console.log( "--- Buscar en computer.serviceTag" ); }
                            if( $scope.computerCatalog[ computerIndex ].serviceTag.toUpperCase().includes( searchWord.toUpperCase() ) ){
                                returnData = true;
                                if( $scope.showConsole ){ console.log( "************** Encontrado en computer.serviceTag" ); }
                            }
                            
                            if( $scope.showConsole ){ console.log( "--- Buscar en computer.macAddress" ); }
                            if( $scope.computerCatalog[ computerIndex ].macAddress.toUpperCase().includes( searchWord.toUpperCase() ) ){
                                returnData = true;
                                if( $scope.showConsole ){ console.log( "************** Encontrado en computer.macAddress" ); }
                            }
                            
                            if( $scope.showConsole ){ console.log( "--- Buscar en computer.detail" ); }
                            if( $scope.computerCatalog[ computerIndex ].detail.toUpperCase().includes( searchWord.toUpperCase() ) ){
                                returnData = true;
                                if( $scope.showConsole ){ console.log( "************** Encontrado en computer.detail" ); }
                            }
                            
                            if( $scope.showConsole ){ console.log( "--- Buscar en computer.comment" ); }
                            if( $scope.computerCatalog[ computerIndex ].comment.toUpperCase().includes( searchWord.toUpperCase() ) ){
                                returnData = true;
                                if( $scope.showConsole ){ console.log( "************** Encontrado en computer.comment" ); }
                            }
                            
                            //Todavia no lo encuentra, buscar en el software de la computadora
                            /*
                             * 
                             * AQUI BUSCAMOS EN EL STRING DE "SOFTWAREARRAY"
                             * 
                             * Este string lo usamos completo, la unica falla es que el software viene en ID, es decir:
                             * 7,10 64 bits,1254,12,date,date,;8,2014.....
                             * 
                             * Este String quiere decir: "7" Windows, version 10 64 bits, dongle 1254, version 12, date inicio de SMC, date fin SMC, ; "8" LibellaQueen, version 2014,....
                             * 
                             * Mejorarlo despues
                             */
                            if( !returnData ){
                                if( $scope.showConsole ){ console.log( "--- Buscar en software" ); }
                                if( $scope.computerCatalog[ computerIndex ].softwareArray.toUpperCase().includes( searchWord.toUpperCase() ) ){
                                    returnData = true;
                                    if( $scope.showConsole ){ console.log( "************** Encontrado en computer.software" ); }
                                }
                            }
                            break;
                        }
                    }
                }
                if( returnData ){ break; }
            }
        }
        return returnData;
    }
    
    
    //
    $scope.cleanSearchResult = function(){
        $scope.filterSystemSerialNumber = "";
        //Aqui actualizamos la lista mostrada
        for( var index in $scope.tableContent ){
            $scope.tableContent[ index ].showRow = true;
        }
    }
    
    //
    $scope.showDevelopmentModal = function(){
        $('#myDevelopmentModal').modal('show');
    }
    

}]);