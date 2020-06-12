/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */
var miApp = angular.module( "miApp" , [] );
miApp.controller( 'mainPageCtrl' , function( $scope ){
    //DEVELOPMENT
    $scope.showConsole = false;
    
    //URL
    $scope.relativeUrl = "";
    
    //oficial colors
    $scope.ttsmBlueColor = ttsmBlueColor ;
    $scope.ttsmGrayColor = ttsmGrayColor ;
    
    //variables
    $scope.user = "";
    $scope.token = "";
    
    /**** FUNCTIONS ****/
    //init function
    $scope.initFunction = function( paramUser , paramToken ){
        globalUser = paramUser;
        globalToken = paramToken;
    };
});