/* 
 * Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
 * Programmer: Alejandro Aguayo Acosta
 */

var miApp = angular.module( "miApp" , [] );
miApp.controller( 'notePageCtrl'  ,['$scope' , '$http' , function( $scope , $http ){
    /**** variables ****/
    //URL
    var notesServiceUrl = serviceUrl + "php/resources/catalogs/NoteResource.php";
    $scope.relativeUrl = "../../";
    
    //oficial colors
    $scope.ttsmBlueColor = ttsmBlueColor ;
    $scope.ttsmGrayColor = ttsmGrayColor ; 
    
    //security
    $scope.user = "";
    $scope.token = "";
    
    //details local
    $scope.details = {
        "id" : "--",
        "tittle" : "",
        "content" : ""
    };
    
    //flags
//    $scope.isNewRow = true;
    
    //buttons TEXT
    $scope.updateOrSaveText = "Save";
    $scope.deleteOrCleanText = "Clean";
    
    //Message texts
    $scope.deleteWarningTitle = "Are you sure?";
    $scope.deleteWarningText = "Once deleted, you will not be able to recover the data!";
    $scope.deleteSuccess = "Data deleted!";
    $scope.deleteFailure = "Something went wrong!";
    
    //table
    $scope.tableListContent = [];
    
    /**** functions ****/
    //With HTTP Request
    //POST request, for save or update
    $scope.updateOrSaveRow = function(){
        $http({
            url: notesServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "POST",
            data: $scope.details
        })
        .then(function(response) {
            var swalText = "";
            //if is a new Row, then reload list
            if( $scope.details.id === "--" ){
                swalText = "NEW NOTE CREATED";
                $scope.getMainData();
                $scope.cleanDetails();
            }else{
                swalText = "UPDATE SUCCESS";
                $scope.updateListContent();
            }
            swal({ text : swalText , icon : "success" });
        }, 
        function(response) { // optional
            $scope.tableListContent = [ { "id":"0", "name":"ERROR" } ];
        });
    };
    
    //GET request, to fill the list table...
    $scope.getMainData = function(){
        $scope.tableListContent = [];
        $http({
            url: notesServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token,
            method: "GET"
        })
        .then(function(response) {
            for( var index in response.data ){
                $scope.tableListContent[ index ] = response.data[ index ] ;
            }
        }, 
        function(response) { // optional
            $scope.tableListContent = [ { "id":"0", "name":"ERROR" } ];
        });
    };
    
    //BUTTONS actions
    //DELETE
    $scope.deleteRow = function(){
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
    };
     
    //Real DELETE on DB
    $scope.deleteInDB = function(){
        $http({
            url: notesServiceUrl + "?user=" + $scope.user + "&token=" + $scope.token + "&id=" + $scope.details.id + "&delete=ok",
            method: "DELETE"
        })
        .then(function(response) {
            $scope.getMainData();
            $scope.cleanDetails();
            swal( { text: "NOTE DELETED" , icon : "success" } );
    
        }, 
        function(response) { // optional
            swal( { text: "ERROR DELETING THE NOTE" , icon : "error" } );
            $scope.tableContent = [ { "id":"0", "name":"CHAFIO" } ];
        });
    };
    
    //clic on the button "new", requesting for a new row
    $scope.newRow = function(){
        //Set the Buttons Text
        $scope.deleteOrCleanText = "Clean";
        $scope.updateOrSaveText = "Save";
        
        //Clean local variables
        $scope.cleanDetails();
    };
    
    //Actions List table
    //clic on a ROW of the table
    $scope.getDetails = function( param ){
        //Set the Buttons Text
        $scope.deleteOrCleanText = "Delete";
        $scope.updateOrSaveText = "Update";
        
        //set the "object" in the ListContent to the "$scope.details"
        $scope.details.id = param.id;
        $scope.details.tittle = param.tittle;
        $scope.details.content = param.content;
    };
    
    //Set all the "$scope.details" to his default values
    $scope.cleanDetails = function(){
        $scope.details.id = "--" ;
        $scope.details.tittle = "" ;
        $scope.details.content = "" ;
    };
    
    //update local "tableListContent", to update the updated data without asking for the database content again
    $scope.updateListContent = function(){
        for( var index in $scope.tableListContent ){
            if( $scope.tableListContent[ index ].id === $scope.details.id ){
                $scope.tableListContent[ index ].tittle = $scope.details.tittle;
                $scope.tableListContent[ index ].content = $scope.details.content;
            }
        }
    };
}]);
