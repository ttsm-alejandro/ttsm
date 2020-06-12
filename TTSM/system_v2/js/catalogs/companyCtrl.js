/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

var miApp = angular.module( "miApp" , [] );
miApp.controller( 'companyCtrl'  ,['$scope' , '$http' , '$window' , function( $scope , $http , $window ){
    /**** variables ****/
    //URL
    var companyServiceUrl = serviceUrl + "php/resources/catalogs/CompanyResource.php";
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
        "fullName" : "",
        "shortName" : "",
        "webPage" : ""
    };
    
    //table
    $scope.tableContent = [];
    
    //filter
    $scope.filterCompany = "";
    
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
            url: companyServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
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
            url: companyServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + id,
            method: "GET"
        })
        .then(function(response) {
            $scope.getDetails( response.data );
            $('#myLoadingModal').modal('hide'); 
        }, 
        function(response) { // optional
            $scope.tableContent = [ { "id":"0", "name":"ERROR" } ];
            $('#myLoadingModal').modal('hide'); 
        });
    };
    
    //clic on a ROW of the table
    $scope.getDetails = function( param ){
        //
        $scope.details.id = param.id;
        $scope.details.fullName = param.fullName;
        $scope.details.shortName = param.shortName;
        $scope.details.webPage = param.webPage;
    };
    
    //new row
    $scope.newRow = function(){
        $scope.cleanDetails();
        $scope.details.id = "--";
    };
    
    //POST
    $scope.updateOrSaveRow = function(){
        if( $scope.isDetailsDataOk() ){
            $('#myLoadingModal').modal('show'); 
            $http({
                url: companyServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
                method: "POST",
                data: $scope.details
            })
            .then(function(response) {
                $scope.updateLocalData( response.data );
                swal( { text: "DONE", icon: "success" } );
            }, 
            function(response) { // optional
                swal( { text: "SAVE or UPDATE FAIL", icon: "error" } );
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
                    fullName : $scope.details.fullName,
                    shortName : $scope.details.shortName,
                    webPage : $scope.details.webPage
                }
            );
        }
        if( responseData.includes( "UPDATE" ) ){
            for( var index in $scope.tableContent ){
                if( $scope.tableContent[ index ].id == id ){
                    $scope.tableContent[ index ].fullName = $scope.details.fullName;
                    $scope.tableContent[ index ].shortName = $scope.details.shortName;
                    $scope.tableContent[ index ].webPage = $scope.details.webPage;
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
                            fullName : temporalTable[ index ].fullName,
                            shortName : temporalTable[ index ].shortName,
                            webPage : temporalTable[ index ].webPage
                        }
                    );
                }
            }
        }
        $('#myLoadingModal').modal('hide'); 
    }
        
    //DELETE
    $scope.deleteRow = function(){
        if( $scope.details.id == "--" ){
            swal( { text :  "Select Company" , icon : "error" } );
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
            url: companyServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + $scope.details.id + "&delete=ok",
            method: "DELETE"
        })
        .then(function(response) {
            $scope.updateLocalData( response.data );
            $scope.cleanDetails();
            swal( { text: "DELETE DONE", icon: "info" } );
    
        }, 
        function(response) { // optional
            $scope.tableContent = [ { "id":"0", "name":"CHAFIO" } ];
        });
    };
    
    //
    $scope.cleanDetails = function(){
        $scope.details.id = "--";
        $scope.details.fullName = "";
        $scope.details.shortName = "";
        $scope.details.webPage = "";
    };
    
    //
    $scope.isDetailsDataOk = function(){
        var returnData = true;
        var errorText = "";
        if( $scope.details.fullName === "" ){ returnData = false; errorText += "Insert NAME, "; }
        if( $scope.details.shortName === "" ){ returnData = false; errorText += "Insert ALIAS, "; }
        if( !$scope.isDataCombinationOk() ){ returnData = false; errorText += "Already exist a Company with the same name, "; }
        if( !returnData ){
            swal( { "text" : errorText, "icon" : "error" } );
        }
        return returnData;
    };
    
    //Cannot exist 2 Companies with the same
    $scope.isDataCombinationOk = function(){
        var returnData = true;
        for( var index in $scope.tableContent ){
            if( ( $scope.tableContent[ index ].fullName == $scope.details.fullName ) 
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
}]);