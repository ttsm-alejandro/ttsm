/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

var miApp = angular.module( "miApp" , [] );
miApp.controller( 'plantCtrl'  ,['$scope' , '$http' , '$window' , function( $scope , $http , $window ){
    /**** variables ****/
    //URL
    var plantServiceUrl = serviceUrl + "php/resources/catalogs/PlantResource.php";
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
        "idCompany" : "",
        "idState" : "",
        "idCity" : "",
        "idPerson" : "",
        "name" : "",
        "address" : "",
        "comment" : ""
    };
    
    //catalogs
    $scope.companyCatalog = [];
    $scope.stateCatalog = [];
    $scope.cityCatalog = [];
    $scope.personCatalog = [];

    //table
    $scope.filterCompany = "";
    $scope.filterState = "";
    $scope.filterCity = "";
    $scope.filterPlantName = "";
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
        $scope.getUserScreenHeight();
        $scope.tableContent = [];
        
        $('#myLoadingModal').modal('show'); 
        $http({
            url: plantServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
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
            url: plantServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + id,
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
        $scope.details.idCompany = param.idCompany;
        $scope.details.idState = param.idState;
        $scope.details.idCity = param.idCity;
        $scope.details.idPerson = param.idPerson;
        $scope.details.name = param.name;
        $scope.details.address = param.address;
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
                url: plantServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
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
                    idCompany : $scope.details.idCompany,
                    idState : $scope.details.idState,
                    idCity : $scope.details.idCity,
                    idPerson : $scope.details.idPerson,
                    name : $scope.details.name,
                    address : $scope.details.address,
                    comment : $scope.details.comment
                }
            );
        }
        if( responseData.includes( "UPDATE" ) ){
            for( var index in $scope.tableContent ){
                if( $scope.tableContent[ index ].id == id ){
                    $scope.tableContent[ index ].idCompany = $scope.details.idCompany;
                    $scope.tableContent[ index ].idState = $scope.details.idState;
                    $scope.tableContent[ index ].idCity = $scope.details.idCity;
                    $scope.tableContent[ index ].idPerson = $scope.details.idPerson;
                    $scope.tableContent[ index ].name = $scope.details.name;
                    $scope.tableContent[ index ].address = $scope.details.address;
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
                            idCompany : temporalTable[ index ].idCompany,
                            idState : temporalTable[ index ].idState,
                            idCity : temporalTable[ index ].idCity,
                            idPerson : temporalTable[ index ].idPerson,
                            name : temporalTable[ index ].name,
                            address : temporalTable[ index ].address,
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
            swal( { text :  "Select Plant" , icon : "error" } );
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
            url: plantServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + $scope.details.id + "&delete=ok",
            method: "DELETE"
        })
        .then(function(response) {
            $scope.cleanDetails();
            $scope.updateLocalData( response.data );
            swal( {icon : "info", text : "Delete Done"} );
            $('#myLoadingModal').modal('hide'); 
        }, 
        function(response) { // optional
            swal( {icon : "error", text : "Delete Failed, Try again later"} );
            $('#myLoadingModal').modal('hide'); 
        });
    };
    
    //
    $scope.cleanDetails = function(){
        $scope.details.id = "--";
        $scope.details.idCompany = "";
        $scope.details.idState = "";
        $scope.details.idCity = "";
        $scope.details.idPerson = "";
        $scope.details.name = "";
        $scope.details.address = "";
        $scope.details.comment = "";
    };

    //    
    $scope.getCatalogData = function(){
        $scope.getCatalogDataByTable( "Company" );
        $scope.getCatalogDataByTable( "State" );
        $scope.getCatalogDataByTable( "City" );
        $scope.getCatalogDataByTable( "Person" );
    };
    
    //
    $scope.getCatalogDataByTable = function( tableName ){
        var tableServiceUrl = serviceUrl + "php/resources/catalogs/" + tableName + "Resource.php";
        var temporalId = "";
        
        //clean previuos data
        if( tableName == "Company" ){ $scope.companyCatalog = []; temporalId = $scope.details.idCompany; }
        if( tableName == "State" ){ $scope.stateCatalog = []; }
        if( tableName == "City" ){ $scope.cityCatalog = [];  temporalId = $scope.details.idCity; }
        if( tableName == "Person" ){ $scope.personCatalog = [];  temporalId = $scope.details.idPerson; }
        
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
                if( tableName == "Company" ){ $scope.companyCatalog[ index ] = response.data[ index ]; }
                if( tableName == "State" ){ $scope.stateCatalog[ index ] = response.data[ index ]; }
                if( tableName == "City" ){ $scope.cityCatalog[ index ] = response.data[ index ]; }
                if( tableName == "Person" ){ $scope.personCatalog[ index ] = response.data[ index ]; }
            }
            /*
            if( tableName == "Company" ){ $scope.details.idCompany = temporalId; }
            if( tableName == "City" ){ $scope.details.idCity = temporalId; }
            if( tableName == "Person" ){ $scope.details.idPerson = temporalId; }
             * 
             */
            $('#myLoadingModal').modal('hide'); 
        }, 
        function(response) { // optional
            swal( { icon : error , text : "ERROR" } );
            $('#myLoadingModal').modal('hide'); 
        });
    };
    
    //
    $scope.isDetailsDataOk = function(){
        var returnData = true;
        var errorText = "";
        if( $scope.details.name === "" ){ returnData = false; errorText += "Input NAME, "; }
        if( $scope.details.idCompany === "" ){ returnData = false; errorText += "Select COMPANY, "; }
        if( $scope.details.idState === "" ){ returnData = false; errorText += "Select STATE, "; }
        if( $scope.details.idCity === "" ){ returnData = false; errorText += "Select CITY, "; }
        if( $scope.details.idPerson === "" ){ returnData = false; errorText += "Select PERSON, "; }
        
        if( !$scope.isDataCombinationOk() ){ returnData = false; errorText += "Already exist a Plant with the same name in the same Company, "; }
        
        if( !returnData ){
            swal({"text":errorText,"icon":"error"});
        }
        return returnData;
    };
    
    //Cannot exist 2 plants with the same name in the same Company
    $scope.isDataCombinationOk = function(){
        var returnData = true;
        for( var index in $scope.tableContent ){
            if( ( $scope.tableContent[ index ].name == $scope.details.name ) 
                && ( $scope.tableContent[ index ].idCompany == $scope.details.idCompany )
                && (
                    ( $scope.tableContent[ index ].id !== $scope.details.id )
                    || ( $scope.details.id == "--" )
                )
            ){
                returnData = false;
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
