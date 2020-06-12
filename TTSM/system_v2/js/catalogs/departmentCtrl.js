/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

var miApp = angular.module( "miApp" , [] );
miApp.controller( 'departmentCtrl'  ,['$scope' , '$http' , '$window' , function( $scope , $http , $window ){
    /**** variables ****/
    //URL
    var departmentServiceUrl = serviceUrl + "php/resources/catalogs/DepartmentResource.php";
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
        "idPlant" : "",
        "idPerson" : "",
        "name" : "",
        "comment" : ""
    };
    
    //catalogs
    $scope.companyCatalog = [];
    $scope.plantCatalog = [];
    $scope.personCatalog = [];

    //table
    $scope.filterCompany = "";
    $scope.filterPlant = "";
    $scope.filterDepartmentName = "";
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
            url: departmentServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
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
            url: departmentServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + id,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                swal( { icon : error , text : "ACCESS DENIED" } );
            }else{
                $scope.getDetails( response.data );
            }
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
        $scope.details.idPlant = param.idPlant;
        $scope.details.idPerson = param.idPerson;
        $scope.details.name = param.name;
        $scope.details.comment = param.comment;
        $('#myLoadingModal').modal('hide'); 
    };
    
    //new row
    $scope.newRow = function(){
        $scope.cleanDetails();
    };
    
    //POST
    $scope.updateOrSaveRow = function(){
        $('#myLoadingModal').modal('show'); 
        if( $scope.isDetailsDataOk() ){
            $http({
                url: departmentServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
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
                    idPlant : $scope.details.idPlant,
                    idPerson : $scope.details.idPerson,
                    name : $scope.details.name,
                    comment : $scope.details.comment
                }
            );
        }
        if( responseData.includes( "UPDATE" ) ){
            for( var index in $scope.tableContent ){
                if( $scope.tableContent[ index ].id == id ){
                    $scope.tableContent[ index ].idCompany = $scope.details.idCompany;
                    $scope.tableContent[ index ].idPlant = $scope.details.idPlant;
                    $scope.tableContent[ index ].idPerson = $scope.details.idPerson;
                    $scope.tableContent[ index ].name = $scope.details.name;
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
                            idPlant : temporalTable[ index ].idPlant,
                            idPerson : temporalTable[ index ].idPerson,
                            name : temporalTable[ index ].name,
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
            url: departmentServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + $scope.details.id + "&delete=ok",
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
        $scope.details.idCompany = "";
        $scope.details.idPlant = "";
        $scope.details.idPerson = "";
        $scope.details.name = "";
        $scope.details.comment = "";
    };

    //    
    $scope.getCatalogData = function(){
        $scope.getCatalogDataByTable( "Company" );
        $scope.getCatalogDataByTable( "Plant" );
        $scope.getCatalogDataByTable( "Person" );
    };
    
    //
    $scope.getCatalogDataByTable = function( tableName ){
        var tableServiceUrl = serviceUrl + "php/resources/catalogs/" + tableName + "Resource.php";
        
        var temporalId = "";
        //clean previuos data
        if( tableName == "Company" ){ $scope.companyCatalog = []; temporalId = $scope.details.idCompany; }
        if( tableName == "Plant" ){ $scope.plantCatalog = [];  temporalId = $scope.details.idPlant; }
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
                if( tableName == "Plant" ){ $scope.plantCatalog[ index ] = response.data[ index ]; }
                if( tableName == "Person" ){ $scope.personCatalog[ index ] = response.data[ index ]; }
            }
            /*
            if( tableName == "Company" ){ $scope.details.idCompany = temporalId; }
            if( tableName == "Plant" ){ $scope.details.idPlant = temporalId; }
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
        if( $scope.details.idPlant === "" ){ returnData = false; errorText += "Select PLANT, "; }
        if( $scope.details.idPerson === "" ){ returnData = false; errorText += "Select PERSON, "; }
        
        if( !$scope.isDataCombinationOk() ){ returnData = false; errorText += "Already exist a Department with the same name in the same Plant, "; }
        
        if( !returnData ){
            swal({"text":errorText,"icon":"error"});
        }
        return returnData;
    };
    
    //Cannot exist 2 departments with the same name in the same plant
    $scope.isDataCombinationOk = function(){
        var returnData = true;
        for( var index in $scope.tableContent ){
            if( ( $scope.tableContent[ index ].name == $scope.details.name ) 
                && ( $scope.tableContent[ index ].idPlant == $scope.details.idPlant )
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
