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
        <title>Computer</title>
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
        <script src="../../js/catalogs/computerCtrl.js"></script>
    </head>
    
    <body ng-app="miApp" >
        <div class="container" ng-controller="computerCtrl" 
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
                <div ng-include="'../util/modal/modal_computer_smc_planner.html'"></div>
                
                <!-- Title -->
                <div class="row">
                    <div class="col-lg-8">
                        <h2>
                            Computers Catalog.
                        </h2>
                    </div>
                    <div class="col-lg-4" style="text-align: right; text">
                        <button type="button" class="btn btn-success" ng-click="showSMCPlanner()">SMC Planner</button>
                    </div>
                </div>
            <!-- *A End : -->
            <?php } ?>
            
            <div class="row">

                <!-- *B Begin: PHP line for block elements when "?id=" is present in the URL -->
                <?php if( !isset( $_GET[ "id" ] ) ){ ?>
                
                    <div class="col-lg-3">
                        <div class="input-group">
                            <input class="form-control" ng-model="filterComputerServiceTag">
                            <span ng-click="filterComputerServiceTag = ''" class="input-group-addon"><i class="glyphicon glyphicon-repeat"></i></span>
                        </div>
                        <div style="overflow: scroll; max-height: {{ userScreenHeight }};">
                            <table class="table table-hover">
                                <tr>
                                    <th>#</th>
                                    <th>Service Tag</th>
                                </tr>
                                <tr ng-repeat="row in tableContent | filter : { serviceTag : filterComputerServiceTag } " 
                                    ng-click="getDetails( row )"
                                    style="{{ isRowSelected(row) }}"
                                    >
                                    <td>{{ $index + 1 }}</td>
                                    <td>{{ row.serviceTag }}</td>
                                </tr>
                            </table>
                        </div>
                        <button class="btn btn-success" ng-click="newRow()">New</button>
                    </div>
                
                <!-- *B End : -->
                <?php } ?>
                 
                <div class="col-lg-9">
                    <h4>Computer Details</h4>
                    <table class="table table-striped">
                        <tr><th>ID:</th><td>{{ details.id }}</td></tr>
                        <tr><th>Service Tag:</th><td><input ng-model="details.serviceTag" class="form-control"></td></tr>
                        <tr><th>Mac Address:</th><td><input ng-model="details.macAddress" class="form-control"></td></tr>
                        <tr><th>Details:</th><td><textarea rows="5" ng-model="details.detail" class="form-control"></textarea></td></tr>
                        <tr><th>Software Installed:</th>
                            <td>
                                <!--input ng-model="details.softwareArray" class="form-control"-->
                                <table class="table table-striped">
                                    <tr ng-repeat="softwareLine in softwareArray">
                                        <td>
                                            <select title="Select Software" ng-model="softwareLine.idSoftware" ng-options="soft.id as soft.name for soft in softwareCatalog" class="form-group-sm"></select>
                                            <input title="Input Software Version" size="6" placeholder="Version" ng-model="softwareLine.softwareVersion" class="form-group-sm">
                                            <input size="6" placeholder="Dongle #" ng-model="softwareLine.dongle" class="form-group-sm">
                                            <input title="Input Dongle Version" size="2" ng-model="softwareLine.dongleVersion" class="form-group-sm">
                                            <input title="Input Installation Date if apply" type="date" placeholder="Installation Date" ng-model="softwareLine.installationDate" class="form-group-sm">
                                            <input title="Input SMC Finish Date if apply" type="date" placeholder="SMC Finish Date" ng-model="softwareLine.softwareMaintenanceContractFinishDate" class="form-group-sm">
                                            <button title="WARNING, once is deleted is gone forever" class="btn btn-sm btn-danger" ng-click="deleteSoftware( $index )">Delete</button>
                                        </td>
                                    </tr>
                                </table>
                                <button class="btn btn-group-sm" ng-click="addNewSoftware()">Add</button>
                            </td>
                        </tr>
<tr>
<th>Backup</th>
<td>
    <!-- Parameters -->
    <div class="btn {{ styleByBackupStatus( details.backupParameter ) }}" 
                 ng-click="details.backupParameter = changeBackupStatusByClic( details.backupParameter )">
        Parameters {{ details.backupParameter }}
    </div>

    <!-- Scan Parameters -->
    <div class="btn {{ styleByBackupStatus( details.backupParameterScan ) }}" 
                 ng-click="details.backupParameterScan = changeBackupStatusByClic( details.backupParameterScan )">
        Scan Parameters {{ details.backupParameterScan }}
    </div>

    <!-- KeyFile LQ / 3D-Magic -->
    <div class="btn {{ styleByBackupStatus( details.backupKeyfileLQ ) }}" 
                 ng-click="details.backupKeyfileLQ = changeBackupStatusByClic( details.backupKeyfileLQ )">
        KeyFile LQ / 3D-Magic {{ details.backupKeyfileLQ }}
    </div>

    <!-- Keyfile Regalis v2 -->
    <div class="btn {{ styleByBackupStatus( details.backupKeyfileRegalisV2 ) }}" 
                 ng-click="details.backupKeyfileRegalisV2 = changeBackupStatusByClic( details.backupKeyfileRegalisV2 )">
        Keyfile Regalis v2 {{ details.backupKeyfileRegalisV2 }}
    </div>

    <!-- Keyfile Regalis v3 -->
    <div class="btn {{ styleByBackupStatus( details.backupKeyfileRegalisV3 ) }}" 
                 ng-click="details.backupKeyfileRegalisV3 = changeBackupStatusByClic( details.backupKeyfileRegalisV3 )">
        Keyfile Regalis v3 {{ details.backupKeyfileRegalisV3 }}
    </div>

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