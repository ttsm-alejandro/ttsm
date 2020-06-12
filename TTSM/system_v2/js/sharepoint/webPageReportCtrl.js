/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

var miApp = angular.module( "miApp" , [] );
miApp.controller( 'webPageReportCtrl'  ,['$scope' , '$http' , '$window' , function( $scope , $http , $window ){
    /**** variables ****/
    //URL
    $scope.relativeUrl = "../../";
    var webPageReportServiceUrl = serviceUrl + "php/resources/excel/WebPageReportResource.php";
    
    //oficial colors
    $scope.ttsmBlueColor = ttsmBlueColor ;
    $scope.ttsmGrayColor = ttsmGrayColor ; 
    
    //security
    $scope.user = "";
    $scope.token = "";
    
    //user screen
    $scope.userScreenHeight = "";
    
    
    //table selection
    $scope.tableReportSelected = "";
    $scope.tableReportFilterDateInit = "";
    $scope.tableReportFilterDateFinish = "";
    $scope.tableReportList = [
        {
            name : "inquiry"
        },
        {
            name : "webinar"
        },
        {
            name : "brochure"
        }
    ];
    
    $scope.tableReportShowColumn = [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true
    ];
    
    //table content Data
    $scope.reportData = [];
    
    /**** functions ****/
    //
    $scope.showHelp = function(){
        swal(
            "To see registers between 12-05-2020 to 13-05-2020 please select 12-05-2020 as FROM date and 14-05-2020 for TO date"
        );
    }
    
    
    //
    $scope.getShowByDate = function( rowParam ){
        var returnData = false;
        if( ( rowParam.date >= $scope.tableReportFilterDateInit )
                || ( $scope.tableReportFilterDateInit == '' )
                ){
            
            if( ( rowParam.date < $scope.tableReportFilterDateFinish ) 
                    || ( $scope.tableReportFilterDateFinish == '' )
                    ){
                returnData = true;
            }
        }
        return returnData;
    }
    
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
        $scope.reportData = [];
        $('#myLoadingModal').modal('show'); 
        $http({
            url: webPageReportServiceUrl + "?table=" + $scope.tableReportSelected + "&user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            if(response.data == "ACCESS DENIED" ){
                swal( { icon : error , text : "ACCESS DENIED" } );
            }
            for( var index in response.data ){
                $scope.reportData[ index ] = response.data[ index ] ;
                $scope.reportData[ index ].date = new Date( $scope.reportData[ index ].date );
            }
            $('#myLoadingModal').modal('hide'); 
        }, 
        function(response) { // optional
            swal( { icon : error , text : "ERROR" } );
            $('#myLoadingModal').modal('hide'); 
        });
    };
}]);
