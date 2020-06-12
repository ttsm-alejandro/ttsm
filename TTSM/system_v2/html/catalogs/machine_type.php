<?php
    session_start();
    if( !isset( $_SESSION[ "user" ] ) ){
        header( "Location: ../../index.php" );
        end();
    }
?>
<!DOCTYPE html>
<!--
Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
Programmer: Alejandro Aguayo Acosta
-->
<html>
    <head>
        
        
        <title>Machine Type</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <!-- JQuery -->
        <script src="../../js/lib/jquery-3.2.1.min.js"></script>
        
        <!-- Bootstrap -->
        <link rel="stylesheet" href="../../css/bootstrap.min.css">
        <script src="../../js/lib/bootstrap.min.js"></script>

        <!-- AngularJS libraries -->
        <script src="../../js/lib/angular.min.js"></script>
        
        <!-- SWEET ALERT -->
        <script src="../../js/lib/sweetalert.min.js"></script>

        <!-- Initial configuration, always BEFORE the controller -->
        <script src="../../js/initConfig.js"></script>
        
        <!-- Controller -->
        <script src="../../js/catalogs/machineTypeCtrl.js"></script>
    </head>
    
    <body ng-app="miApp" >
        <div class="container" ng-controller="machineTypeCtrl" 
             ng-init="
                 
                 user='<?php echo $_SESSION["user"]; ?>';
                 token='<?php echo $_SESSION["token"]; ?>';
                 <?php 
                    if( isset( $_GET[ "id" ] ) ){
                        echo "getData();";
                        if( !($_GET["id"] == "--") ){
                            echo "getDataById(" . $_GET[ "id" ] .  ");";
                        }
                    }else{
                        echo "getData();";
                    }  
                 ?>
                 getCatalogData();
                                           ">
            <!-- *A Begin : PHP line for block elements when "?id=" is present in the URL -->
            <?php if( !isset( $_GET[ "id" ] ) ){ ?>            
                <!-- Header -->
                <div ng-include="'../util/header.html'"></div>
                
                <!-- MODALS -->
                <div ng-include="'../util/modal/modal_loading.html'"></div>
                
                <!-- Title -->
                <h2>
                    Machine Type Catalog.
                </h2>
            <!-- *A End : -->
            <?php } ?>
            
            <div class="row">

                <!-- *B Begin: PHP line for block elements when "?id=" is present in the URL -->
                <?php if( !isset( $_GET[ "id" ] ) ){ ?>
                
                    <div class="col-lg-3">
                        <div class="input-group">
                            <input class="form-control" ng-model="filterMachineTypeName">
                            <span ng-click="filterMachineTypeName = ''" class="input-group-addon"><i class="glyphicon glyphicon-repeat"></i></span>
                        </div>
                        <div style="overflow: scroll; max-height: {{ userScreenHeight }};">
                            <table class="table table-hover">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                </tr>
                                <tr ng-repeat="row in tableContent | filter : { name : filterMachineTypeName } " 
                                    ng-click="getDetails( row )"
                                    style="{{ isRowSelected(row) }}"
                                    >
                                    <td>{{ $index + 1 }}</td>
                                    <td>{{ row.name }}</td>
                                </tr>
                            </table>
                        </div>
                        <button class="btn btn-success" ng-click="newRow()">New</button> 
                    </div>
                
                <!-- *B End : -->
                <?php } ?>
                 
                <div class="col-lg-9">
                    <h4>Machine Type Details</h4>
                    <table class="table table-striped">
                        <tr><th>ID:</th><td>{{ details.id }}</td></tr>
                        <tr><th>Name:</th><td><input ng-model="details.name" class="form-control"></td></tr>
                        <tr><th>Comments:</th><td><textarea rows="5" ng-model="details.comment" class="form-control"></textarea></td></tr>
                    </table>
                    <button class="btn btn-info" ng-click="updateOrSaveRow()" >Save</button>
                    
                    <!-- *C Begin: PHP line for block elements when "?id=" is present in the URL -->
                    <?php if( !isset( $_GET[ "id" ] ) ){ ?>
                    <button class="btn btn-danger" ng-click="deleteRow()">Delete</button>
                    <!-- *C Begin: PHP line for block elements when "?id=" is present in the URL -->
                    <?php } ?>
                    
                    <!-- *D Begin: PHP line for block elements when "?id=" is present in the URL -->
                    <?php if( isset( $_GET[ "id" ] ) ){ ?>
                    <button class="btn btn-danger" ng-click="closeThisWindow()">Close</button>
                    <!-- *D Begin: PHP line for block elements when "?id=" is present in the URL -->
                    <?php } ?>
                    
                    
                </div>
            </div>
        </div>
    </body>
</html>