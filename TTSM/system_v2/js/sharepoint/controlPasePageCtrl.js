/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

var miApp = angular.module( "miApp" , [] );
miApp.controller( 'controlPasePageCtrl'  ,['$scope' , '$http' , '$window', function( $scope , $http , $window ){
    /**** variables ****/
    //Development
    $scope.showConsole = false;
    $scope.lastSearch = "";
    
    //URL
    var controlPaseServiceUrl = serviceUrl + "php/resources/catalogs/ControlPaseResource.php";
    $scope.relativeUrl = "../../";
    
    
    //oficial colors
    $scope.ttsmBlueColor = ttsmBlueColor ;
    $scope.ttsmGrayColor = ttsmGrayColor ; 
    
    //security
    $scope.user = "";
    $scope.token = "";
    
    //user screen
    $scope.userScreenHeight = "";
    
    //forms
    $scope.paseDetail = {
        "id" : "--",
        "date" : "",
        "destiny" : "",
        "user" : "",
        "amount" : ""
    };
    
    $scope.userCatalog = [ "Alejandro" , "Hitoshi" ];
    
    $scope.totalAmount = "";
    
    //main table
    $scope.tableContent = [];
    
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
            url: controlPaseServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                swal( { icon : error , text : "ACCESS DENIED" } );
            }
            $scope.totalAmount = 0;
            for( var index in response.data ){
                $scope.tableContent[ index ] = response.data[ index ] ;
                $scope.totalAmount = $scope.totalAmount + parseInt( response.data[ index ].amount );
            }
            $('#myLoadingModal').modal('hide'); 
        }, 
        function(response) { // optional
            swal( { icon : error , text : "ERROR" } );
            $('#myLoadingModal').modal('hide'); 
        });
    };
    
    //clic on a ROW of the table
    $scope.getPaseDetail = function( param ){
        $scope.paseDetail.id = param.id;
        $scope.paseDetail.date  = param.date ;
        $scope.paseDetail.destiny = param.destiny;
        $scope.paseDetail.user = param.user;
        $scope.paseDetail.amount = param.amount;
    };
    
    //POST System ONLY
    //ACTUALIZAME
    $scope.updateOrSavePaseDetail = function(){
        if( $scope.isPaseDetailDataOk() ){
            $('#myLoadingModal').modal('show');
            $scope.showPleaseWaitMessage = true;
            $http({
                url: controlPaseServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
                method: "POST",
                data: $scope.paseDetail
            })
            .then(function(response) {
                $scope.updatePaseLocalData( response.data );
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
    $scope.updatePaseLocalData = function( responseData ){
        var id = responseData.split( " " )[1];
        if( responseData.includes( "INSERT" ) ){
            $scope.paseDetail.id = id;
            $scope.tableContent.push(
                {
                    id : id,
                    date : $scope.paseDetail.date,
                    destiny : $scope.paseDetail.destiny,
                    user : $scope.paseDetail.user,
                    amount : $scope.paseDetail.amount
                }
            );
        }
        if( responseData.includes( "UPDATE" ) ){
            for( var index in $scope.tableContent ){
                if( $scope.tableContent[ index ].id == id ){
                    $scope.tableContent[ index ].date = $scope.paseDetail.date;
                    $scope.tableContent[ index ].destiny = $scope.paseDetail.destiny;
                    $scope.tableContent[ index ].user = $scope.paseDetail.user;
                    $scope.tableContent[ index ].amount = $scope.paseDetail.amount;
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
                            date : temporalTable[ index ].date,
                            destiny : temporalTable[ index ].destiny,
                            user : temporalTable[ index ].user,
                            amount : temporalTable[ index ].amount
                        }
                    );
                }
            }
        }
        $('#controlPaseAddRegisterModal').modal('hide'); 
        $scope.totalAmount = 0;
        for( var index in $scope.tableContent ){
            $scope.totalAmount = $scope.totalAmount + parseInt( $scope.tableContent[ index ].amount );
        }
        
        $('#myLoadingModal').modal('hide'); 
    };
    
    //
    $scope.showModalAddRegister = function( isNew ){
        if( isNew ){ $scope.cleanPaseDetail(); }
        $('#controlPaseAddRegisterModal').modal('show'); 
    }
    
    //
    $scope.cleanPaseDetail = function(){
        $scope.paseDetail.id = "--";
        $scope.paseDetail.date  = "";
        $scope.paseDetail.destiny = "";
        $scope.paseDetail.user = "";
        $scope.paseDetail.amount = "";
    };

    //ACTUALIZAME
    //Check System Data ONLY
    $scope.isPaseDetailDataOk = function(){
        var returnData = true;
        var errorText = "";
        if( $scope.paseDetail.date === "" ){ returnData = false; errorText += "Input DATE, "; }
        if( $scope.paseDetail.destiny === "" ){ returnData = false; errorText += "Input DESTINY, "; }
        if( $scope.paseDetail.user === "" ){ returnData = false; errorText += "Input USER, "; }
        if( $scope.paseDetail.amount === "" ){ returnData = false; errorText += "Input AMOUNT, "; }
        
        if( !returnData ){
            swal({"text":errorText,"icon":"error"});
        }
        return returnData;
    };
    
    //cambia el color de fondo del sistema seleccionado en la lista
    $scope.isRowSelected = function( row ){
        var style = "";
        if( row.id === $scope.paseDetail.id ){
            style = "background-color:" + $scope.ttsmBlueColor + "; color: white;";
        }
        return style;
    };
    
}]);