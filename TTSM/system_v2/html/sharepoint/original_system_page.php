
<!DOCTYPE html>
<!--
Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
Programmer: Alejandro Aguayo Acosta
-->
<html>
    <head>
        <title>Systems Page Original</title>
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
                 getMainData();
                 getAllCatalogs();
                                           ">
            <!-- Header -->
            <div ng-include="'../util/header.html'"></div>
            
            <!-- MODALS -->
            <div ng-include="'../util/modal/modalDevelopment.html'"></div>
            <div ng-include="'../util/modal/modalLoading.html'"></div>
            <div ng-include="'../util/modal/modalCompany.html'"></div>
            <div ng-include="'../util/modal/modalPlant.html'"></div>
            <div ng-include="'../util/modal/modalDepartment.html'"></div>

            <!--  -->
            <div class="row">
                <!-- LIST AREA -->
                <div class="col-lg-2">
                    <div class="input-group">
                        <form ng-submit="searchComplete()">
                            <input class="form-control" ng-model="filterSystem">
                        </form>
                        <span class="input-group-addon" ng-click="searchComplete()"><i class="glyphicon glyphicon-search"></i></span>
                    </div>
                    <div style="overflow: scroll; max-height: {{ userScreenHeight }};">
                        <table class="table table-hover">
                            <tr 
                                ng-repeat="row in arrayObjectSystem | filter : { serialNumber : filterSystem }" 
                                ng-click="getSystemDetails( row )"
                                style="{{ isRowSelected( row ) }}"
                                >
                                <td>{{ row.serialNumber }}</td>
                            </tr>
                        </table>
                    </div>
                    <!--div ng-click="getMainData()" class="btn bg-primary">Refresh</div-->
                    <div style="text-align: right;">
                        <button class="btn btn-success" ng-click="clicNewSystemButton()">New</button>
                    </div>
                </div>
                
                <!-- MAIN DATA AREA -->
                <div class="col-lg-10">
                    <div class="row">
                        
                        <div class="row">
                            <div class="col-md-6">
                                
                                <!-- SYSTEM header data -->
                                <h5 ng-click="showMoreDetailsOnModal('development')" class="well well-sm" style="background-color: {{ ttsmBlueColor }}; color: white" >System</h5>
                                <table>
                                    <tr>
                                        <td>System Serial Number:</td>
                                        <td>
                                            <input class="input-sm" ng-model="systemDetails.serialNumber">
                                            <input class="input-sm" ng-model="systemDetails.keyNumber"  placeholder="System Code">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Calibration:</td>
                                        <td>
                                            <input title="Last Calibration Date" class="input-sm" ng-model="systemDetails.lastCalibrationDate" placeholder="dd-mm-yyyy">
                                            <input title="Next Calibration Date" class="input-sm" ng-model="systemDetails.nextCalibrationDate" placeholder="mm-yyyy">
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>Details/Comments</td>
                                        <td>
                                            <table>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                        <textarea title="Details of the system" rows="3" cols="50" ng-model="systemDetails.details" class="form-control" placeholder="details"></textarea>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                        <textarea title="Comments of the system" rows="3" ng-model="systemDetails.comments" class="form-control" placeholder="comments"></textarea>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <!--tr>
                                        <td></td>
                                        <td style="text-align: right;">
                                            <button class="btn btn-default">Update</button>
                                        </td>
                                    </tr-->
                                </table>

                                <!-- SYSTEM Location data -->
                                <h5 class="well well-sm" style="background-color: {{ ttsmBlueColor }}; color: white" >Located at</h5>

                                <table>
                                    <tr>
                                        <td title="Cilc for more details" ng-click="showMoreDetailsOnModal('company')">Company: </td>
                                        <td>
                                            <select 
                                                ng-model="systemDetails.idCompany" 
                                                ng-options=" x.id as x.name for x in companyArray" 
                                                class="input-sm" 
                                                ng-change="changeSelectCompany( systemDetails.idCompany )" 
                                            ></select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td title="Cilc for more details" ng-click="showMoreDetailsOnModal('plant')">Plant: </td>
                                        <td>
                                            <select 
                                                ng-model="systemDetails.idPlant" 
                                                ng-options=" x.id as x.name for x in plantArray" 
                                                class="input-sm" 
                                                ng-change="changeSelectPlant( systemDetails.idPlant )" 
                                            ></select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td title="Cilc for more details" ng-click="showMoreDetailsOnModal('department')">Department: </td>
                                        <td>
                                            <select 
                                                ng-model="systemDetails.idDepartment" 
                                                ng-options=" x.id as x.name for x in departmentArray" 
                                                class="input-sm" 
                                            ></select>
                                        </td>
                                    </tr>
                                    <!--tr>
                                        <td></td>
                                        <td style="text-align: right;">
                                            <button class="btn btn-sm" ng-click="clicSaveOrUpdateSystem()">
                                            <span class="glyphicon glyphicon-floppy-disk"></span>
                                                Save
                                            </button>
                                        </td>
                                    </tr-->
                                </table>
                                
                                <!-- SYSTEM Installation date -->
                                <h5 class="well well-sm" style="background-color: {{ ttsmBlueColor }}; color: white" >Installation Date</h5>
                                <input type="text" class="input-sm" ng-model="systemDetails.installationDate" >
                                <div style="text-align: right">
                                    <button class="btn btn-sm" ng-click="clicSaveOrUpdateSystem()">
                                                <span class="glyphicon glyphicon-floppy-disk"></span>
                                                    Save
                                                </button>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <!-- SYSTEM Machine Array data -->
                                <h5 class="well well-sm" style="background-color: {{ ttsmBlueColor }}; color: white" >Machines in the System</h5>
                                <!-- NO MACHINE LABEL -->
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="alert alert-danger" ng-show="isMachineArrayEmpty">
                                            No Machines
                                        </div>
                                    </div>
                                </div>

                                <!-- MACHINE LIST AND DETAILS -->
                                <div class="row">
                                    <div class="col-md-4">
                                        <ul class="list-group">
                                            <li 
                                                ng-repeat="machine in machineArray" 
                                                ng-click="getMachineDetails( machine )"
                                                title="Clic to see the details" 
                                                class="list-group-item list-group-item-success"
                                            >
                                                {{ $index + 1 }} - {{ machine.name }}
                                            </li>
                                            <li class="list-group-item list-group-item-info"
                                                ng-click="
                                                    showMachineDetails=true;
                                                    isMachineUpdate = false;
                                                    cleanMachineDetails();
                                                    machineDetails.idSystem = systemDetails.id;
                                                "
                                                >Add new machine</li>
                                        </ul> 
                                    </div>
                                    <div class="col-md-8">

                                        <div ng-show="showMachineDetails">
                                            <h6 class="well well-sm" style="background-color: {{ ttsmBlueColor }}; color: white" >{{ machineDetails.serialNumber }} Details.</h6>
                                            <table>
                                                <tr>
                                                    <td>Serial Number: </td>
                                                    <td><input ng-model="machineDetails.serialNumber"><br></td>
                                                </tr>
                                                <tr>
                                                    <td ng-click="getCatalogData('machineType','')">Machine Type: </td>
                                                    <td><select
                                                            ng-model="machineDetails.idMachineType"
                                                            ng-options="x.id as x.name for x in machineTypeArray"
                                                        ></select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td ng-click="getCatalogData('computer','')">Computer: </td>
                                                    <td>
                                                        <select
                                                            ng-change="addNewRegister( 'computer' , machineDetails.idComputer )"
                                                            ng-model="machineDetails.idComputer"
                                                            ng-options="x.id as x.name for x in computerArray"
                                                        ></select>
                                                        <label class="label label-info"
                                                               ng-click="openCatalogWindow( 'computer' , machineDetails.idComputer )"
                                                               >Edit</label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Comments:</td>
                                                    <td><textarea ng-model="machineDetails.comments" cols="25" rows="4"></textarea></td>
                                                </tr>
                                                <tr ng-show="!isMachineUpdate">
                                                    <td></td>
                                                    <td style="text-align: right;"><button class="btn-sm" ng-click="clicButtonAddNewMachine()">
                                                            <span class="glyphicon glyphicon-plus-sign"></span>
                                                            Add</button></td>
                                                </tr>
                                                <tr ng-show="isMachineUpdate">
                                                    <td></td>
                                                    <td style="text-align: right;">
                                                        <button class="btn-sm" ng-click="clicButtonUpdateMachine()">
                                                            <span class="glyphicon glyphicon-ok-sign"></span>
                                                            Update</button>
                                                        <button class="btn-sm btn-danger" ng-click="clicButtonDeleteMachine()">
                                                            <span class="glyphicon glyphicon-remove-sign"></span>
                                                            Delete</button>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="text-align: right;">
                        <!--button class="btn btn-info" ng-click="updateOrSaveRow()">{{ updateOrSaveText }}</button>
                        <button class="btn btn-danger" ng-click="deleteRow()">{{ deleteOrCleanText }}</button-->
                    </div>
                </div>
            </div>           
        </div>
    </body>
</html>