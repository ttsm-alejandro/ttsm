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
        
        
        <title>Systems Page</title>
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
        <script src="../../js/sharepoint/systemPageCtrl.js"></script>
    </head>
    
    <body ng-app="miApp" >
        <div class="container" ng-controller="systemPageCtrl" 
             ng-init="
                 
                 user='<?php echo $_SESSION["user"]; ?>';
                 token='<?php echo $_SESSION["token"]; ?>';
                 getData();
                 getCatalogData();
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
                    <div class="col-lg-8">
                        <h2 ng-click="">
                            Systems Page.
                        </h2>
                    </div>
                    <div class="col-lg-4" style="text-align: right; text">
                        <button type="button" class="btn btn-success" ng-click="showCalibrationPlanner()">Calibration Planner</button>
                    </div>
                </div>
            
            <div class="row">
                <!-- LIST AREA -->
                <div class="col-lg-2">
                    <div class="input-group">
                        <form ng-submit="searchComplete()">
                            <input class="form-control" ng-model="filterSystemSerialNumber" title="Last search: {{ lastSearch }}">
                        </form>
                        <span ng-click="cleanSearchResult()" class="input-group-addon"><i class="glyphicon glyphicon-repeat"></i></span>
                    </div>
                    <div style="overflow: scroll; max-height: {{ userScreenHeight }};">
                        <table class="table table-hover">
                            <tr>
                                <th>#</th>
                                <th>Serial Number</th>
                            </tr>
                            <tr ng-repeat="row in tableContent | filter : { serialNumber : filterSystemSerialNumber } " 
                                ng-click="getSystemDetail( row )"
                                style="{{ isRowSelected(row) }}"
                                ng-show="row.showRow"
                                >
                                <td>{{ $index + 1 }}</td>
                                <td>{{ row.serialNumber }}</td>
                            </tr>
                        </table>
                    </div>
                    <button class="btn btn-success" ng-click="newRow()">New</button> 
                </div>
                
                <!-- SYSTEM Main Data -->
                <div class="col-lg-5">
                    <!-- SYSTEM header data -->
                    <h5 class="well well-sm" style="background-color: {{ ttsmBlueColor }}; color: white" >System</h5>
                    <table>
                        <tr>
                            <td>System Serial Number:</td>
                            <td>
                                <input class="input-sm" ng-model="systemDetail.serialNumber">
                                <!--input class="input-sm" ng-model="systemDetail.keyNumber"  placeholder="System Code"-->
                            </td>
                        </tr>
                        <tr>
                            <td>Calibration:</td>
                            <td>
                                <input type="date" title="Last Calibration Date" class="input-sm" ng-model="systemDetail.lastCalibrationDate">
                                <input type="date" title="Next Calibration Date" class="input-sm" ng-model="systemDetail.nextCalibrationDate">
                            </td>
                        </tr>

                        <tr>
                            <td>Details/Comments</td>
                            <td>
                                <table>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <textarea title="Details of the system" rows="3" cols="50" ng-model="systemDetail.detail" class="form-control" placeholder="details"></textarea>
                                            <div style="text-align: right"><label class="label label-primary" ng-click="showTextAreaInModal( 1 )">Expand</label></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td text-align="right">
                                            <textarea title="Comments of the system" rows="3" ng-model="systemDetail.comment" class="form-control" placeholder="comments"></textarea>
                                            <div style="text-align: right"><label class="label label-primary" ng-click="showTextAreaInModal( 2 )">Expand</label></div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    
                    <!-- SYSTEM Location Data -->
                    <h5 class="well well-sm" style="background-color: {{ ttsmBlueColor }}; color: white" >Located at</h5>
                    <table>
                        <tr>
                            <th title="Clic to reload catalog" ng-click="getCatalogDataByTable('Company')">Company:</th>
                            <td>
                                <select 
                                    ng-model="systemDetail.idCompany" 
                                    ng-change="systemDetail.idPlant='';systemDetail.idDepartment=''" 
                                    class="input-sm" 
                                    ng-options="x.id as x.fullName for x in companyCatalog"></select>
                                <label class="label label-info" ng-click="openCatalogWindow( 'company' , systemDetail.idCompany )">Edit</label>
                                <label class="label label-success" ng-click="openCatalogWindow( 'company' , '--' )">Add</label>
                            </td>
                        </tr>
                        <tr>
                            <th title="Clic to reload catalog" ng-click="getCatalogDataByTable('Plant')">Plant:</th>
                            <td>
                                <select 
                                    ng-model="systemDetail.idPlant" 
                                    ng-disabled="systemDetail.idCompany==''"
                                    ng-change="systemDetail.idDepartment=''"
                                    class="input-sm" 
                                    ng-options="x.id as x.name for x in plantCatalog | filter : { idCompany : systemDetail.idCompany } : true"></select>
                                <label class="label label-info" ng-click="openCatalogWindow( 'plant' , systemDetail.idPlant )">Edit</label>
                                <label class="label label-success" ng-click="openCatalogWindow( 'plant' , '--' )">Add</label>
                            </td>
                        </tr>
                        <tr>
                            <th title="Clic to reload catalog" ng-click="getCatalogDataByTable('Department')">Department:</th>
                            <td>
                                <select 
                                    ng-model="systemDetail.idDepartment" 
                                    ng-disabled="systemDetail.idPlant==''"
                                    class="input-sm" 
                                    ng-options="x.id as x.name for x in departmentCatalog | filter : { idPlant : systemDetail.idPlant } : true"></select>
                                <label class="label label-info" ng-click="openCatalogWindow( 'department' , systemDetail.idDepartment )">Edit</label>
                                <label class="label label-success" ng-click="openCatalogWindow( 'department' , '--' )">Add</label>
                            </td>
                        </tr>
                    </table>
                    
                    <!-- SYSTEM Installation Data -->
                    <h5 class="well well-sm" style="background-color: {{ ttsmBlueColor }}; color: white" >Installation</h5>
                    <table>
                        <tr>
                            <td>Installed on:</td>
                            <td>
                                <input type="date" ng-model="systemDetail.installationDate"></select>
                            </td>
                        </tr>
                    </table>
                    <div style="text-align: right">
                        <button class="btn btn-sm btn-info" ng-click="updateOrSaveSystemDetail()">Save</button>
                    </div>
                </div>
                
                <div class="col-lg-5">
                    <!-- Machines in the Selected System -->
                    <h5 class="well well-sm" style="background-color: {{ ttsmBlueColor }}; color: white" >Machines</h5>
                    
                    <!-- NO MACHINE -->
                    <h5 ng-show="machineArrayInSystem.length == 0" class="well well-lg" style="background-color: #c7254e; color: white" >NO MACHINES</h5>
                    
                    <!-- Machine List -->
                    <div class="row">
                        <div class="col-lg-3">
                            <div ng-click="getMachineDetail( machine )" title="clic to see details" class="well well-sm" ng-repeat="machine in machineArrayInSystem">{{ machine.serialNumber }}</div>
                            <div style="text-align: right"><button class="btn btn-sm btn-default" ng-click="addNewMachine()">Add Machine</button></div>
                        </div>
                        <div class="col-lg-9">
                            <div ng-show="isShowMachineDetail">
                                <h5 class="well well-sm" style="background-color: {{ ttsmBlueColor }}; color: white;">Details of {{ machineDetail.serialNumber }}</h5>
                                <table class="table table-condensed">
                                    <tr>
                                        <th>Serial Number:</th>
                                        <td><input ng-model="machineDetail.serialNumber" class="input-group-sm"></td>
                                    </tr>
                                    <tr>
                                        <th title="Clic to reload catalog" ng-click="getCatalogDataByTable('MachineType')">Machine Type:</th>
                                        <td>
                                            <select 
                                                ng-model="machineDetail.idMachineType"
                                                ng-options="x.id as x.name for x in machineTypeCatalog"
                                                class="input-group-sm"></select>
                                            <label class="label label-info" ng-click="openCatalogWindow( 'machine_type' , machineDetail.idMachineType )">Edit</label>
                                            <label class="label label-success" ng-click="openCatalogWindow( 'machine_type' , '--' )">Add</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th title="Clic to reload catalog" ng-click="getCatalogDataByTable('Computer')">Computer:</th>
                                        <td>
                                            <select 
                                                ng-model="machineDetail.idComputer"
                                                ng-options="x.id as x.serviceTag for x in computerCatalog"
                                                class="input-group-sm"></select>
                                            <label class="label label-info" ng-click="openCatalogWindow( 'computer' , machineDetail.idComputer )">Edit</label>
                                            <label class="label label-success" ng-click="openCatalogWindow( 'computer' , '--' )">Add</label>
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <th>Comments:</th>
                                        <td>
                                            <textarea rows="5" ng-model="machineDetail.comment"></textarea>
                                            <div style="text-align: right"><label class="label label-primary" ng-click="showTextAreaInModal( 3 )">Expand</label></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colspan="2" style="text-align: right">
                                            <button class="btn btn-sm" ng-click="updateOrSaveMachineDetail()">Save</button>
                                            <button title="Clic to Delete registered Machine, clic to erase details if Machine is not registered" class="btn btn-sm btn-danger" ng-click="clicDeleteMachineButton()">Delete</button>
                                            
                                        </th>
                                    </tr>
                                </table>
                                <!--
                                <br>MachineArray:
                                <br>{{ machineArrayInSystem }}
                                <br>Machine:
                                <br>{{ machineCatalog }}
                                <br>MachineType:
                                <br>{{ machineTypeCatalog }}
                                <br>MachineDetail:
                                <br>{{ machineDetail }}-->
                                
                            </div>
                        </div>
                    </div>
                    
                    
                    
                </div>
            </div>

            
            <!-- DEVELOPMENT >    
            Catalogos:
            <br>City:<br>{{ cityCatalog }}
            <br>System:<br>{{ departmentCatalog }}
            
            <!-- END DEVELOPMENT -->
            
        </div>
    </body>
</html>