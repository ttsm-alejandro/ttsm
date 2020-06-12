/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

var miApp = angular.module( "miApp" , [] );
miApp.controller( 'machineCtrl'  ,['$scope' , '$http' , '$window' , function( $scope , $http , $window ){
    /**** variables ****/
    //URL
    var machineServiceUrl = serviceUrl + "php/resources/catalogs/MachineResource.php";
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
    
    //forms
    $scope.details = {
        "id" : "--",
        "idSystem" : "",
        "idMachineType" : "",
        "serialNumber" : "",
        "idComputer" : "",
        "comment" : ""
    };
    
    //catalogs
    $scope.systemCatalog = [];
    $scope.machineTypeCatalog = [];
    $scope.computerCatalog = [];

    //table
    $scope.filterSystem = "";
    $scope.filterMachineType = "";
    $scope.tableContent = [];
    
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
        $('#myLoadingModal').modal('show'); 
        
        $scope.getUserScreenHeight();
        $scope.tableContent = [];
        
        $http({
            url: machineServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
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
            url: machineServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + id,
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
        //
        $scope.details.id = param.id;
        $scope.details.idSystem = param.idSystem;
        $scope.details.idMachineType = param.idMachineType;
        $scope.details.serialNumber = param.serialNumber;
        $scope.details.idComputer = param.idComputer;
        $scope.details.comment = param.comment;
    };
    
    //new row
    $scope.newRow = function(){
        $scope.cleanDetails();
    };
    
    //POST
    $scope.updateOrSaveRow = function(){
        if( $scope.isDetailsDataOk() ){
            $('#myLoadingModal').modal('show'); 
            $http({
                url: machineServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
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
                    idSystem : $scope.details.idSystem,
                    idMachineType : $scope.details.idMachineType,
                    serialNumber : $scope.details.serialNumber,
                    idComputer : $scope.details.idComputer,
                    comment : $scope.details.comment
                }
            );
        }
        if( responseData.includes( "UPDATE" ) ){
            for( var index in $scope.tableContent ){
                if( $scope.tableContent[ index ].id == id ){
                    $scope.tableContent[ index ].idSystem = $scope.details.idSystem;
                    $scope.tableContent[ index ].idMachineType = $scope.details.idMachineType;
                    $scope.tableContent[ index ].serialNumber = $scope.details.serialNumber;
                    $scope.tableContent[ index ].idComputer = $scope.details.idComputer;
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
        $('#myLoadingModal').modal('hide'); 
    };
    
    //DELETE
    $scope.deleteRow = function(){
        if( $scope.details.id == "--" ){
            swal( { text :  "Select Machine" , icon : "error" } );
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
            url: machineServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + $scope.details.id + "&delete=ok",
            method: "DELETE"
        })
        .then(function(response) {
            $scope.cleanDetails();
            $scope.updateLocalData( response.data );
            swal( {icon : "info", text : "Delete Done"} );
        }, 
        function(response) { // optional
            swal( {icon : "error", text : "Delete Failed, Try again later"} );
            $('#myLoadingModal').modal('hide'); 
        });
    };
    
    //
    $scope.cleanDetails = function(){
        $scope.details.id = "--";
        $scope.details.idSystem = "";
        $scope.details.idMachineType = "";
        $scope.details.serialNumber = "";
        $scope.details.idComputer = "";
        $scope.details.comment = "";
    };

    //ACTUALIZAME    
    $scope.getCatalogData = function(){
        $scope.getCatalogDataByTable( "System" );
        $scope.getCatalogDataByTable( "MachineType" );
        $scope.getCatalogDataByTable( "Computer" );
    };
    
    //ACTUALIZAME
    $scope.getCatalogDataByTable = function( tableName ){
        var tableServiceUrl = serviceUrl + "php/resources/catalogs/" + tableName + "Resource.php";
        
        var temporalId = "";
        //clean previuos data
        if( tableName == "System" ){ $scope.systemCatalog = []; temporalId = $scope.details.idSystem; }
        if( tableName == "Computer" ){ $scope.computerCatalog = []; temporalId = $scope.details.idComputer; }
        if( tableName == "MachineType" ){ $scope.machineTypeCatalog = []; temporalId = $scope.details.idMachineType; }
        
        $http({
            url: tableServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                swal( { icon : error , text : "NO ACCESS" } );
            }
            for( var index in response.data ){
                if( tableName == "System" ){ $scope.systemCatalog[ index ] = response.data[ index ]; }
                if( tableName == "Computer" ){ $scope.computerCatalog[ index ] = response.data[ index ]; }
                if( tableName == "MachineType" ){ $scope.machineTypeCatalog[ index ] = response.data[ index ]; }
            }
            
            if( tableName == "System" ){ $scope.details.idSystem = temporalId; }
            if( tableName == "Computer" ){ $scope.details.idComputer = temporalId; }
            if( tableName == "MachineType" ){ $scope.details.idMachineType = temporalId; }
        }, 
        function(response) { // optional
            swal( { icon : error , text : "ERROR" } );
        });
    };
    
    //ACTUALIZAME
    $scope.isDetailsDataOk = function(){
        var returnData = true;
        var errorText = "";
        if( $scope.details.serialNumber === "" ){ returnData = false; errorText += "Input SERIAL NUMBER, "; }
        if( $scope.details.idSystem === "" ){ returnData = false; errorText += "Select SYSTEM, "; }
        if( $scope.details.idMachineType === "" ){ returnData = false; errorText += "Select MACHINE TYPE, "; }
        if( $scope.details.idComputer === "" ){ returnData = false; errorText += "Select COMPUTER, "; }
        
        if( !$scope.isDataCombinationOk() ){ returnData = false; errorText += "Already exist a Machine with the same Serial Number, "; }
        
        if( !returnData ){
            swal({"text":errorText,"icon":"error"});
        }
        return returnData;
    };
    
    //Cannot exist 2 machines with the same serial number
    $scope.isDataCombinationOk = function(){
        var returnData = true;
        for( var index in $scope.tableContent ){
            if( $scope.details.id != $scope.tableContent[ index ].id ){
                if( $scope.details.serialNumber == $scope.tableContent[ index ].serialNumber ){
                    returnData = false;
                }
            }
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
    
    //
    $scope.closeThisWindow = function(){
        $window.close();
    };
    
    //Open new TAB
    $scope.openCatalogWindow = function( param , id ){
        if( id == "" || id==null ){
            swal({ text : "Select a option to EDIT" , icon : "error" });
        }else{
            $window.open( $scope.relativeUrl + "html/catalogs/" + param + ".php?id=" + id  , "" , "top=0,left=0,width=800,height=600" );
        }
    };

}]);
