/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

var miApp = angular.module( "miApp" , [] );
miApp.controller( 'cityCtrl'  ,['$scope' , '$http' , '$window' , function( $scope , $http , $window ){
    /**** variables ****/
    //URL
    var cityServiceUrl = serviceUrl + "php/resources/catalogs/CityResource.php";
    var stateServiceUrl = serviceUrl + "php/resources/catalogs/StateResource.php";
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
        "idState" : "",
        "name" : ""
    };
    
    //catalogs
    $scope.stateCatalog = [];

    //table
    $scope.filterState = "";
    $scope.filterCityName = "";
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
            url: cityServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                alert("NO ACCESS");
            }
            for( var index in response.data ){
                $scope.tableContent[ index ] = response.data[ index ] ;
            }
            $('#myLoadingModal').modal('hide');
        }, 
        function(response) { // optional
            $scope.tableContent = [ { "id":"0", "name":"ERROR" } ];
            $('#myLoadingModal').modal('hide');
        });
    };
    
    //
    $scope.getDataById = function( id ){
        $('#myLoadingModal').modal('show');
        $http({
            url: cityServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + id,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                swal( { icon : error , text : "NO ACCESS" } );
            }else{
                $scope.getDetails( response.data );
            }
            $('#myLoadingModal').modal('hide');
        }, 
        function(response) { // optional
            swal( { icon : error , text : "ERROR" } );
        });
    };
    
    //clic on a ROW of the table
    $scope.getDetails = function( param ){
        //
        $scope.details.id = param.id;
        $scope.details.idState = param.idState;
        $scope.details.name = param.name;
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
                url: cityServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
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
                $('#myLoadingModal').modal('hide');
            }, 
            function(response) { // optional
                $scope.tableContent = [ { "id":"0", "name":"ERROR" } ];
                swal( { text: "FAIL", icon: "error" } );
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
                    idState : $scope.details.idState,
                    name : $scope.details.name
                }
            );
        }
        if( responseData.includes( "UPDATE" ) ){
            for( var index in $scope.tableContent ){
                if( $scope.tableContent[ index ].id == id ){
                    $scope.tableContent[ index ].idState = $scope.details.idState;
                    $scope.tableContent[ index ].name = $scope.details.name;
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
                            idState : temporalTable[ index ].idState,
                            name : temporalTable[ index ].name
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
            swal( { text :  "Select City" , icon : "error" } );
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
            url: cityServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + $scope.details.id + "&delete=ok",
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
    
    $scope.cleanDetails = function(){
        $scope.details.id = "--";
        $scope.details.idState = "";
        $scope.details.name = "";
    };

    //    
    $scope.getCatalogData = function(){
        $('#myLoadingModal').modal('show');
        $http({
            url: stateServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                swal( { icon : error , text : "NO ACCESS" } );
            }
            for( var index in response.data ){
                $scope.stateCatalog[ index ] = response.data[ index ] ;
            }
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
        if( $scope.details.idState === "" ){ returnData = false; errorText += "Select STATE, "; }
        
        if( !$scope.isDataCombinationOk() ){ returnData = false; errorText += "Already exist a City with the same name in this State, "; }
        
        if( !returnData ){
            swal({"text":errorText,"icon":"error"});
        }
        return returnData;
    };
    
    //Cannot exist 2 cities with the same name in the same state
    $scope.isDataCombinationOk = function(){
        var returnData = true;
        for( var index in $scope.tableContent ){
            if( ( $scope.tableContent[ index ].name == $scope.details.name ) 
                && ( $scope.tableContent[ index ].idState == $scope.details.idState )
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