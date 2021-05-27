/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */
var miApp = angular.module( "miApp" , [] );
miApp.controller( 'indexCtrl' , function( $scope ){
    
    /*************** VARIABLES *****************/
    //oficial colors
    $scope.ttsmBlueColor = "#061f5c";
    $scope.ttsmGrayColor = "#969494";
    
    $scope.showScannerCalibration = false;
    $scope.showVectoron = false;
    $scope.showLibellaQueen = false;
    $scope.showNotaVideo = [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
    
    
});