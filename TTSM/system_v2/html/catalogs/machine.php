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
        
        
        <title>Machine</title>
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
        <script src="../../js/catalogs/machineCtrl.js"></script>
    </head>
    
    <body ng-app="miApp" >
        <div class="container" ng-controller="machineCtrl" 
             ng-init="
                 
                 user='<?php echo $_SESSION["user"]; ?>';
                 token='<?php echo $_SESSION["token"]; ?>';
                 <?php 
                    if( isset( $_GET[ "id" ] ) ){
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
                    Machines Catalog.
                </h2>
            <!-- *A End : -->
            <?php } ?>
            
            <div class="row">

                <!-- *B Begin: PHP line for block elements when "?id=" is present in the URL -->
                <?php if( !isset( $_GET[ "id" ] ) ){ ?>
                
                    <div class="col-lg-3">
                        <div class="input-group">
                            <!--select ng-change="filterPlant = ''" ng-model="filterCompany" ng-options=" x.id as x.shortName for x in companyCatalog" class="form-control"></select>
                            <select ng-model="filterPlant" ng-options=" x.id as x.name for x in plantCatalog | filter : { idCompany : filterCompany } : true" class="form-control"></select-->
                            <input class="form-control" ng-model="filterMachineSerialNumber">
                            <span ng-click="filterMachineSerialNumber = ''" class="input-group-addon"><i class="glyphicon glyphicon-repeat"></i></span>
                        </div>
                        <div style="overflow: scroll; max-height: {{ userScreenHeight }};">
                            <table class="table table-hover">
                                <tr>
                                    <th>#</th>
                                    <th>Serial Number</th>
                                </tr>
                                <tr ng-repeat="row in tableContent | filter : { serialNumber : filterMachineSerialNumber } " 
                                    ng-click="getDetails( row )"
                                    style="{{ isRowSelected(row) }}"
                                    >
                                    <td>{{ $index + 1 }}</td>
                                    <td>{{ row.serialNumber }}</td>
                                </tr>
                            </table>
                        </div>
                        <button class="btn btn-success" ng-click="newRow()">New</button> 
                    </div>
                
                <!-- *B End : -->
                <?php } ?>
                 
                <div class="col-lg-9">
                    <h4>Machine Details</h4>
                    <table class="table table-striped">
                        <tr><th>ID:</th><td>{{ details.id }}</td></tr>
                        <tr><th title="Clic to reload catalog" ng-click="getCatalogDataByTable('System');">System:</th>
                            <td><select ng-model="details.idSystem" ng-options=" x.id as x.serialNumber for x in systemCatalog" class="form-control"></select>
                                <button class="btn btn-info" ng-click="openCatalogWindow( 'system' , details.idSystem )">Edit</button>
                                <button class="btn btn-success" ng-click="openCatalogWindow( 'system' , '--' )">Add</button>                            
                            </td>
                        </tr>
                        <tr><th title="Clic to reload catalog" ng-click="getCatalogDataByTable('MachineType')">Machine Type:</th>
                            <td><select ng-model="details.idMachineType" ng-options=" x.id as x.name for x in machineTypeCatalog" class="form-control"></select>
                                <button class="btn btn-info" ng-click="openCatalogWindow( 'machine_type' , details.idMachineType )">Edit</button>
                                <button class="btn btn-success" ng-click="openCatalogWindow( 'machine_type' , '--' )">Add</button>                            
                            </td>
                        </tr>
                        <tr><th>Serial Number:</th><td><input ng-model="details.serialNumber" class="form-control"></td></tr>
                        <tr><th title="Clic to reload catalog" ng-click="getCatalogDataByTable('Computer')">Computer:</th>
                            <td><select ng-model="details.idComputer" ng-options=" x.id as x.serviceTag for x in computerCatalog" class="form-control"></select>
                                <button class="btn btn-info" ng-click="openCatalogWindow( 'computer' , details.idComputer )">Edit</button>
                                <button class="btn btn-success" ng-click="openCatalogWindow( 'computer' , '--' )">Add</button>                            
                            </td>
                        </tr>
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