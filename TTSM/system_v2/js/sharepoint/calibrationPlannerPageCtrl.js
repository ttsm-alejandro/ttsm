/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

var miApp = angular.module( "miApp" , [] );
miApp.controller( 'calibrationPlannerPageCtrl'  ,['$scope' , '$http' , '$window', function( $scope , $http , $window ){
    /**** variables ****/
    //URL
    var calibrationPlannerServiceUrl = serviceUrl + "php/resources/excel/CalibrationPlannerResource.php";
    var serviceReminderServiceUrl = serviceUrl + "php/resources/excel/ServiceReminderResource.php";
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
    
    /***** FOR SYSTEM ******/
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
    $scope.serviceReminderCatalog = [];
    
    //calibration Planner only
    $scope.statusCatalog = [
        { value : "" , name : "-- ALL --" },
        { value : "OK" , name : "OK" },
        { value : "CLOSE" , name : "CLOSE" },
        { value : "PAST" , name : "PAST" },
        { value : "NO APPLY" , name : "NO APPLY" }
    ];
    $scope.monthCatalog = [
        { value : "" , name : "-- ALL --" },
        { value : "01" , name : "January" },
        { value : "02" , name : "February" },
        { value : "03" , name : "March" },
        { value : "04" , name : "April" },
        { value : "05" , name : "May" },
        { value : "06" , name : "June" },
        { value : "07" , name : "July" },
        { value : "08" , name : "August" },
        { value : "09" , name : "September" },
        { value : "10" , name : "October" },
        { value : "11" , name : "November" },
        { value : "12" , name : "December" }
    ];
    $scope.emailToSendResume = "";

    //table
    $scope.tableContent = [];
    
    //Calibration Planner
    $scope.tableCalibrationPlanner = [];
    $scope.filterCompanyInCalibrationPlanner = "";
    $scope.filterMachineTypeInCalibrationPlanner = "";
    $scope.filterStatusInCalibrationPlanner = "";
    $scope.filterMonthInCalibrationPlanner = "";
    $scope.isShowPlantInCalibrationPlanner = false;
    $scope.isShowPersonInCalibrationPlanner = false;
    $scope.isShowEmailInCalibrationPlanner = false;
    $scope.isShowEmailToSendInCalibrationPlanner = false;
    $scope.isShowDateLastReminderSentInCalibrationPlanner = false;
    //labels for filter
    $scope.labelPlantStyle = "label-danger";
    $scope.labelPersonStyle = "label-danger";
    $scope.labelEmailStyle = "label-danger";
    $scope.labelEmailToSendStyle = "label-danger";
    $scope.labelDateLastReminderSentStyle = "label-danger";
    
    //
    $scope.isMonthSelected = function( paramDate ){
        var returnData = false;
        if( $scope.filterMonthInCalibrationPlanner == "" ){
            returnData = true;
        }else{
            if( paramDate.includes( "-" ) ){
                if( paramDate.split( "-" )[1] == $scope.filterMonthInCalibrationPlanner ){
                    returnData = true;
                }
            }
        }
        return returnData;
    }
    
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
        //email to send
        if( param == 'emailToSend' ){
            $scope.isShowEmailToSendInCalibrationPlanner = !$scope.isShowEmailToSendInCalibrationPlanner;
            if( $scope.isShowEmailToSendInCalibrationPlanner ){ $scope.labelEmailToSendStyle = "label-success"; }else{ $scope.labelEmailToSendStyle = "label-danger"; }
        }
        //Date Last Reminder Sent
        if( param == 'dateLastReminderSent' ){
            $scope.isShowDateLastReminderSentInCalibrationPlanner = !$scope.isShowDateLastReminderSentInCalibrationPlanner;
            if( $scope.isShowDateLastReminderSentInCalibrationPlanner ){ $scope.labelDateLastReminderSentStyle = "label-success"; }else{ $scope.labelDateLastReminderSentStyle = "label-danger"; }
        }
        
    }
    
    //
    $scope.getCalibrationPlannerData = function(){
        $('#myLoadingModal').modal('show');
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
                //input email message if STATUS = CLOSE or PAST
                $scope.tableCalibrationPlanner[ index ].emailToSend = "" + $scope.getEmailMessageByStatus( $scope.tableCalibrationPlanner[ index ] );
                
                //convert 'System Type <> Serial Number' into "SystemType"
                $scope.tableCalibrationPlanner[ index ].systemType = $scope.tableCalibrationPlanner[ index ].systemType.split( "<>" )[0];
                
                //
                $scope.tableCalibrationPlanner[ index ].lastReminderSent = "NEVER";
            }
            
            /*
             * systemSerialNumber
             * systemType
             */
            var tableAux = [];
            var contador = -1;
            var isSameSystemSerialNumber = false;
            //
            for( var index in $scope.tableCalibrationPlanner ){
                if( contador == -1 ){
                    tableAux.push( $scope.tableCalibrationPlanner[ index ] );
                    contador++;
                }else{
                    if( tableAux[ contador ].systemSerialNumber == $scope.tableCalibrationPlanner[ index ].systemSerialNumber ){
                        isSameSystemSerialNumber = true;
                    }else{
                        isSameSystemSerialNumber = false;
                    }
                    
                    
                    if( isSameSystemSerialNumber ){
                        tableAux[ contador ].systemType += " / " + $scope.tableCalibrationPlanner[ index ].systemType;
                    }else{
                        tableAux.push( $scope.tableCalibrationPlanner[ index ] );
                        contador++;
                    }
                }
            }
            $scope.tableCalibrationPlanner = tableAux;
            
            $('#myLoadingModal').modal('hide');
        }, 
        function(response) { // optional
            swal( { text: "PLEASE TRY AGAIN LATER", icon: "error" } );
            $('#myLoadingModal').modal('hide');
        });
    };
    
    //
    $scope.getAllDateLastReminderSent = function(){
        for( var indexRow in $scope.tableCalibrationPlanner ){
            for( var index in $scope.serviceReminderCatalog ){
                if( $scope.tableCalibrationPlanner[ indexRow ].systemSerialNumber == $scope.serviceReminderCatalog[ index ].idSystem ){
                    $scope.tableCalibrationPlanner[ indexRow ].lastReminderSent = $scope.serviceReminderCatalog[ index ].dateLastReminder;
                    break;
                }
            }
        }
    }
    
    
    //
    $scope.getServiceReminderCatalog = function(){
        $http({
            url: serviceReminderServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            $scope.serviceReminderCatalog = [];
            for( var index in response.data ){
                $scope.serviceReminderCatalog[ index ] = response.data[ index ];
                $scope.getAllDateLastReminderSent();
            }
        }, 
        function(response) { // optional
        });
    };
    
    //
    $scope.updateLastReminderSent = function( systemSerialNumber ){
        $http({
            url: serviceReminderServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "POST",
            data: { idSystem : systemSerialNumber , idComputer : "-1" , dateLastReminder : "" }
        })
        .then(function(response) {
            swal({ text : "OK" , icon : "success" });
            $scope.getServiceReminderCatalog();
        }, 
        function(response) { // optional
        });
    };
    
    //
    $scope.getEmailMessageByStatus = function( rowParam ){
        var returnData = "";
        var machineTypeAndSerialNumber =  rowParam.systemType.split( "<>" );
        if( rowParam.status == "CLOSE" ){
            returnData = "Asunto: Calibración " + machineTypeAndSerialNumber[0] + " próxima.\n\n"
                    + rowParam.personName + ", buenos días,"
                    + "\n\nEl motivo de este correo es para informarles que según nuestros registros su equipo " + machineTypeAndSerialNumber[0] 
                    + " con serie " + machineTypeAndSerialNumber[1] + ", "
                    + "tiene fecha de calibración próxima, el día " + rowParam.nextCalibrationDate + "."
                    + "\n\nNos ponemos en contacto para ver si les vamos preparando la cotización para poder realizar el servicio "
                    + "a tiempo."
                    + "\n\nQuedamos atentos a sus comentarios, saludos...";
        }
        
        if( rowParam.status == "PAST" ){
            returnData = "Asunto: Calibración " + machineTypeAndSerialNumber[0] + " Expirada.\n\n"
                    + rowParam.personName + ", buenos días,"
                    + "\n\nEl motivo de este correo es para informarles que según nuestros registros su equipo " + machineTypeAndSerialNumber[0]
                    + " con serie " + machineTypeAndSerialNumber[1] + ", "
                    + "tiene fecha de calibración pasada, le tocaba hace " + rowParam.dayUntilNextCalibrationDate.replace("-" , "") + " días."
                    + "\n\nNos ponemos en contacto para ver si les vamos preparando la cotización para poder realizar el servicio "
                    + "y poner al corriente el equipo."
                    + "\n\nQuedamos atentos a sus comentarios, saludos...";
        }
        
        if( returnData != "" ){
            $scope.emailToSendResume += "**** " + rowParam.companyName + " ****\n"
                    + rowParam.personEmail +"\n\n"
                    + returnData + "\n\n";
        }
        
        return returnData;
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
        
        $scope.getCalibrationPlannerData();
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
        $scope.getServiceReminderCatalog();
    };
    
    //
    $scope.getCatalogDataByTable = function( tableName ){
        var tableServiceUrl = serviceUrl + "php/resources/catalogs/" + tableName + "Resource.php";
        
        //clean previuos data, also store in "temporalId" the id Selected
        if( tableName == "City" ){ $scope.cityCatalog = []; }
        if( tableName == "Company" ){ $scope.companyCatalog  = []; }
        if( tableName == "Computer" ){ $scope.computerCatalog  = []; }
        if( tableName == "Department" ){ $scope.departmentCatalog  = []; }
        if( tableName == "Machine" ){ $scope.machineCatalog  = []; }
        if( tableName == "MachineType" ){ $scope.machineTypeCatalog  = []; }
        if( tableName == "Person" ){ $scope.personCatalog  = []; }
        if( tableName == "Plant" ){ $scope.plantCatalog  = []; }
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
            $('#myLoadingModal').modal('hide'); 
        }, 
        function(response) { // optional
            swal( { icon : error , text : "ERROR" } );
            $('#myLoadingModal').modal('hide'); 
        });
    };
    
    //Open new TAB
    $scope.openCatalogWindow = function( param , id ){
        if( id == "" ){
            swal({ text : "Select a option to EDIT" , icon : "error" });
        }else{
            $window.open( $scope.relativeUrl + "html/catalogs/" + param + ".php?id=" + id , "" , "top=0,left=0,width=800,height=600" );
        }
    };
    
    
    //
    $scope.showEmailToSendResume = function(){
        $('#calibrationPlannerEmailToSendModal').modal('show');
        
    };
}]);