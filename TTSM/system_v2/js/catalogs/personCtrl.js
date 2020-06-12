/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

var miApp = angular.module( "miApp" , [] );
miApp.controller( 'personCtrl'  ,['$scope' , '$http' , '$window' , function( $scope , $http , $window ){
    /**** variables ****/
    //URL
    var personServiceUrl = serviceUrl + "php/resources/catalogs/PersonResource.php";
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
        "idCompany" : "",
        "name" : "",
        "japaneseName" : "",
        "cellphone" : "",
        "email" : "",
        "comment" : "",
    };
    
    //catalogs
    $scope.companyCatalog = [];

    //table
    $scope.filterCompany = "";
    $scope.filterPerson = "";
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
            url: personServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
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
            url: personServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + id,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                alert("NO ACCESS");
            }
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
        $scope.details.idCompany = param.idCompany;
        $scope.details.name = param.name;
        $scope.details.japaneseName = param.japaneseName;
        $scope.details.cellphone = param.cellphone;
        $scope.details.email = param.email;
        $scope.details.comment = param.comment;
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
                url: personServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
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
                $scope.tableContent = [ { "id":"0", "name":"ERROR" } ];
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
                    name : $scope.details.name,
                    japaneseName : $scope.details.japaneseName,
                    cellphone : $scope.details.cellphone,
                    email : $scope.details.email,
                    comment : $scope.details.comment
                }
            );
        }
        if( responseData.includes( "UPDATE" ) ){
            for( var index in $scope.tableContent ){
                if( $scope.tableContent[ index ].id == id ){
                    $scope.tableContent[ index ].idCompany = $scope.details.idCompany;
                    $scope.tableContent[ index ].name = $scope.details.name;
                    $scope.tableContent[ index ].japaneseName = $scope.details.japaneseName;
                    $scope.tableContent[ index ].cellphone = $scope.details.cellphone;
                    $scope.tableContent[ index ].email = $scope.details.email;
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
                            name : temporalTable[ index ].name,
                            japaneseName : temporalTable[ index ].japaneseName,
                            cellphone : temporalTable[ index ].cellphone,
                            email : temporalTable[ index ].email,
                            comment : temporalTable[ index ].comment 

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
            swal( { text :  "Select Person" , icon : "error" } );
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
            url: personServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + $scope.details.id + "&delete=ok",
            method: "DELETE"
        })
        .then(function(response) {
            $scope.cleanDetails();
            $scope.updateLocalData( response.data );
            swal( {icon : "info", text : "Delete Done"} );
            
            
        }, 
        function(response) { // optional
            $scope.tableContent = [ { "id":"0", "name":"CHAFIO" } ];
            $('#myLoadingModal').modal('hide'); 
        });
    };
    
    $scope.cleanDetails = function(){
        $scope.details.id = "--";
        $scope.details.idCompany = "";
        $scope.details.name = "";
        $scope.details.japaneseName = "";
        $scope.details.cellphone = "";
        $scope.details.email = "";
        $scope.details.comment = "";
    };

    //    
    $scope.getCatalogData = function(){
        $('#myLoadingModal').modal('show'); 
        $http({
            url: companyServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                alert("NO ACCESS");
            }
            for( var index in response.data ){
                $scope.companyCatalog[ index ] = response.data[ index ] ;
            }
            $('#myLoadingModal').modal('hide'); 
        }, 
        function(response) { // optional
            $scope.companyCatalog = [ { "id":"0", "name":"ERROR" } ];
            $('#myLoadingModal').modal('hide'); 
        });
    };
    
    //
    $scope.isDetailsDataOk = function(){
        var returnData = true;
        var errorText = "";
        if( $scope.details.name === "" ){ returnData = false; errorText += "Input NAME, "; }
        if( $scope.details.idCompany === "" ){ returnData = false; errorText += "Select COMPANY, "; }
        
        if( !$scope.isDataCombinationOk() ){ returnData = false; errorText += "Already exist a Person with the same name in the same Company, "; }
        
        if( !returnData ){
            swal({"text":errorText,"icon":"error"});
        }
        return returnData;
    };
    
    //Cannot exist 2 persons with the same name in the same Company
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
            $window.open( $scope.relativeUrl + "html/catalogs/" + param + ".php?id=" + id , "" , "top=0,left=0,width=800,height=600" );
        }
    };

}]);
