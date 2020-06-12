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
        
        
        <title>SMC Planner</title>
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
        <script src="../../js/sharepoint/sMCPlannerPageCtrl.js"></script>
    </head>
    
    <body ng-app="miApp" >
        <div class="container" ng-controller="sMCPlannerPageCtrl" 
             ng-init="
                 
                 user='<?php echo $_SESSION["user"]; ?>';
                 token='<?php echo $_SESSION["token"]; ?>';
                 getData();
                 getCatalogData();
                 getSMCPlannerData();
                                           ">
                <!-- Header -->
                <div ng-include="'../util/header.html'"></div>
                
                <!-- MODALS -->
                <div ng-include="'../util/modal/modal_loading.html'"></div>
                <div ng-include="'../util/modal/modal_development.html'"></div>
                <div ng-include="'../util/modal/modal_sharepoint_textarea.html'"></div>
                <div ng-include="'../util/modal/modal_calibration_planner.html'"></div>
                
                
                <!-- Line -->
                <div style="background-color: {{ ttsmBlueColor }}; height: 5px;"></div>
                
                <!-- Title -->
                <div class="row">
                    <div class="col-lg-12">
                        <h2>
                            SMC Planner.
                        </h2>
                    </div>
                </div>
            
            <div class="row">
                <h5>Filter List</h5>
                Select Software:
                <select 
                    title="Select Software to filter list"
                    ng-model="idSoftwareSelectedFilter"
                    class="input-sm"
                    ng-options="x.id as x.name for x in softwareCatalog"></select>
                Select STATUS:
                <select 
                    title="Select Status to filter list"
                    ng-model="statusSelectedFilter"
                    class="input-sm"
                    ng-options="x.name as x.name for x in statusCatalog"></select>
                
                <label class="label label-warning" ng-click="idSoftwareSelectedFilter = '' ; statusSelectedFilter = '';">RESET SELECTIONS</label>
                Show Columns: 
                <label class="label {{ labelCompany }}" ng-click="clicLabelShowColumn( 'company' )">COMPANY</label>
                <label class="label {{ labelPlant }}" ng-click="clicLabelShowColumn( 'plant' )">PLANT</label>
                <label class="label {{ labelPerson }}" ng-click="clicLabelShowColumn( 'person' )">PERSON</label>
                <label class="label {{ labelPersonEmail }}" ng-click="clicLabelShowColumn( 'personEmail' )">EMAIL</label>
                <label class="label {{ labelSystem }}" ng-click="clicLabelShowColumn( 'system' )">SYSTEM</label>
                <div class="table-responsive"> 
                    <table class="table table-hover table-condensed">
                        <tr style="background-color: {{ ttsmBlueColor }}; color: white">
                            <td ng-show="isShowCompany">Company</td>
                            <td ng-show="isShowPlant">Plant</td>
                            <td ng-show="isShowPerson">Person</td>
                            <td ng-show="isShowPersonEmail">E-mail</td>
                            <td ng-show="isShowSystem">System</td>
                            <td>Computer</td>
                            <td>Software</td>
                            <td>Dongle</td>
                            <td>Expiration Date</td>
                            <td>Days left</td>
                            <td>Status</td>
                        </tr>
                        <tr ng-repeat="row in tableSMCPlanner" 
                            ng-show=" (
                                        ( (statusSelectedFilter == row.status) || (statusSelectedFilter == '') )
                                        && ( (idSoftwareSelectedFilter == row.idSoftware ) || (idSoftwareSelectedFilter == '') )
                                    )
                            
                            "
                            >
                            
                            <td ng-show="isShowCompany">{{ row.companyName }}</td>
                            <td ng-show="isShowPlant">{{ row.plantName }}</td>
                            <td ng-show="isShowPerson">{{ row.personName }}</td>
                            <td ng-show="isShowPersonEmail"><label class="label label-default">{{ row.personEmail }}</label></td>
                            <td ng-show="isShowSystem">{{ row.systemSerialNumber }}</td>
                            <td>{{ row.computerServiceTag }}</td>
                            <td><select ng-model="row.idSoftware" ng-disabled="true"  ng-options="x.id as x.name for x in softwareCatalog"></select></td>
                            <td>{{ row.dongle }}</td>
                            <td><input type="date" ng-disabled="true" ng-model="row.expirationDate"></td>
                            <td>{{ row.dayUntilExpirationDate }}</td>
                            <td style="{{ getStyleByStatus( row.status ) }}">{{ row.status }}</td>
                            
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </body>
</html>