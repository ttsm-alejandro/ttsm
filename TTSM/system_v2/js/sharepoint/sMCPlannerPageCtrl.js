/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

var miApp = angular.module( "miApp" , [] );
miApp.controller( 'sMCPlannerPageCtrl'  ,['$scope' , '$http' , '$window' , function( $scope , $http , $window ){
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
    
    //    
    $scope.getCatalogData = function(){
        $scope.getCatalogDataByTable( "Software" );
        //$scope.softwareCatalog.push({id:"1",name:"Windows"},{id:"2",name:"Libella Queen"},{id:"3",name:"3D Magic"});
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
    $scope.closeThisWindow = function(){
        $window.close();
    };
    
    //
    $scope.getSMCPlannerData = function(){
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
