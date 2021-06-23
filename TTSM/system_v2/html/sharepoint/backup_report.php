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
        
        
        <title>Backup Report</title>
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
        <script src="../../js/sharepoint/backupReportPageCtrl.js"></script>
    </head>
    
    <body ng-app="miApp" >
        <div class="container" ng-controller="backupReportPageCtrl" 
             ng-init="
                 
                 user='<?php echo $_SESSION["user"]; ?>';
                 token='<?php echo $_SESSION["token"]; ?>';
                 getData();
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
                            Backup Report.
                        </h2>
                    </div>
                </div>
            
            <div class="row">
                <h4>Filter List</h4>
                By Service Tag <input ng-model="filterComputerServiceTag" class="input-sm"> 
                By Software:
                <select 
                    title="Select Software to filter list"
                    ng-model="filterBySoftware"
                    class="input-sm"
                    ng-options="x.name as x.name for x in softwareCatalog"></select>
                <label class="label label-primary" ng-click="filterBySoftware = '' ; filterComputerServiceTag = '';">RESET</label>
                <div class="table-responsive"> 
                    <table class="table table-hover table-condensed">
                        <tr style="background-color: {{ ttsmBlueColor }}; color : white">
                            <th title="clic to hide Service Tag column" ng-show="showServiceTag" ng-click="showServiceTag = false">Service Tag</th>
                            <th title="clic to show Service Tag column" ng-click="showServiceTag = true">Parameter</th>
                            <th>Scan Parameter</th>
                            <th>Keyfile LQ / 3D-Magic</th>
                            <th>Keyfile REGALIS v2</th>
                            <th>Keyfile REGALIS v3</th>
                            <th>Save</th>
                        </tr>
                        <tr ng-repeat="row in backupReportData | filter : { serviceTag : filterComputerServiceTag , title : filterBySoftware }" title="{{ row.title }}">
                            <td ng-show="showServiceTag">{{ row.serviceTag }}</td>
                            <td><div
                                    class="btn {{ getStyleByStatus( row.backupParameter ) }}" 
                                    ng-click="row.backupParameter = changeStatusByClic( row.backupParameter ); row.saved='-floppy-disk'">
                                    <span ng-show="!showServiceTag">[<small>{{ row.serviceTag }}</small>]<br></span>Parameters<br>{{ row.backupParameter }}
                                </div>
                            </td>
                            <td><div 
                                    class="btn {{ getStyleByStatus( row.backupParameterScan ) }}" 
                                    ng-click="row.backupParameterScan = changeStatusByClic( row.backupParameterScan ); row.saved='-floppy-disk'">
                                        <span ng-show="!showServiceTag">[<small>{{ row.serviceTag }}</small>]<br></span>Scan Parameters<br>{{ row.backupParameterScan }}
                                </div>
                            </td>
                            <td>
                                <div 
                                    class="btn {{ getStyleByStatus( row.backupKeyfileLQ ) }}" 
                                    ng-click="row.backupKeyfileLQ = changeStatusByClic( row.backupKeyfileLQ ); row.saved='-floppy-disk'">
                                        <span ng-show="!showServiceTag">[<small>{{ row.serviceTag }}</small>]<br></span>KeyFile LQ / 3D-Magic<br>{{ row.backupKeyfileLQ }}
                                </div>
                            </td>
                            <td><div 
                                    class="btn {{ getStyleByStatus( row.backupKeyfileRegalisV2 ) }}" 
                                    ng-click="row.backupKeyfileRegalisV2 = changeStatusByClic( row.backupKeyfileRegalisV2 ); row.saved='-floppy-disk'">
                                        <span ng-show="!showServiceTag">[<small>{{ row.serviceTag }}</small>]<br></span>KeyFile Regalis v2<br>{{ row.backupKeyfileRegalisV2 }}
                                </div>
                            </td>
                            <td><div
                                    class="btn {{ getStyleByStatus( row.backupKeyfileRegalisV3 ) }}" 
                                    ng-click="row.backupKeyfileRegalisV3 = changeStatusByClic( row.backupKeyfileRegalisV3 ); row.saved='-floppy-disk'">
                                        <span ng-show="!showServiceTag">[<small>{{ row.serviceTag }}</small>]<br></span>KeyFile Regalis v3<br>{{ row.backupKeyfileRegalisV3 }}
                                </div>
                            </td>
                            <td><div ng-click="updateOrSaveRow( row )" class="btn btn-info"><span class="glyphicon glyphicon{{ row.saved }}"></span></div></td>
                        </tr>
                    </table>
                    
                </div>
            </div>
        </div>
    </body>
</html>