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
    <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        
        <title>Calibration Planner</title>
        
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
        <script src="../../js/sharepoint/calibrationPlannerPageCtrl.js"></script>
    </head>
    
    <body ng-app="miApp" >
        <div class="container" ng-controller="calibrationPlannerPageCtrl" 
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
                <div ng-include="'../util/modal/modal_calibration_planner_email_resume.html'"></div>
                
                
                <!-- Line -->
                <div style="background-color: {{ ttsmBlueColor }}; height: 5px;"></div>
                
                <!-- Title -->
                <div class="row">
                    <div class="col-lg-6">
                        <h2>
                            Calibration Planner.
                        </h2>
                    </div>
                    <div class="col-lg-6" style="text-align: right">
                        <button class="btn btn-lg btn-info" ng-click="showEmailToSendResume()">Messages Resume</button>
                    </div>
                </div>
            
            <div class="row">
                <div class="col-lg-12">
                    <h5>Filter List</h5>
                <select 
                    title="Select Company to filter list"
                    ng-model="filterCompanyInCalibrationPlanner"
                    class="input-sm"
                    ng-options="x.shortName as x.fullName for x in companyCatalog"></select>
                    <label class="label label-info" ng-click="filterCompanyInCalibrationPlanner = ''">RESET Company</label><br>
                
                <select 
                    title="Select Machine Type to filter list : {{ filterMachineTypeInCalibrationPlanner }}"
                    ng-model="filterMachineTypeInCalibrationPlanner"
                    class="input-sm"
                    ng-options="x.name as x.name for x in machineTypeCatalog">
                </select>
                <label class="label label-info" ng-click="filterMachineTypeInCalibrationPlanner = ''">RESET MachineType</label><br>
                
                <select
                    title="Select STATUS to filter list"
                    ng-model="filterStatusInCalibrationPlanner"
                    class="input-sm"
                    ng-options="x.value as x.name for x in statusCatalog"
                    >
                </select>
                <label class="label label-info">Filter by Status</label><br>
                
                <select
                    title="Select Month to filter list"
                    ng-model="filterMonthInCalibrationPlanner"
                    class="input-sm"
                    ng-options="x.value as x.name for x in monthCatalog"
                    >
                </select>
                <label class="label label-info">Filter by Month</label><br>
                
                Show/hide columns: <label class="label {{ labelPlantStyle }}" ng-click="clicShowColumn( 'plant' )">Plant</label>
                <label class="label {{ labelPersonStyle }}" ng-click="clicShowColumn( 'person' )">Person</label>
                <label class="label {{ labelEmailStyle }}" ng-click="clicShowColumn( 'email' )">Email</label>
                <label 
                    class="label {{ labelEmailToSendStyle }}" 
                    ng-click="
                        clicShowColumn( 'emailToSend' );
                                            ">Email to send</label>
                <label 
                    class="label {{ labelDateLastReminderSentStyle }}" 
                    ng-click="
                        clicShowColumn( 'dateLastReminderSent' );
                        getAllDateLastReminderSent();
                                            ">Last Reminder Sent</label>
                <label 
                    class="label {{ labelCommentStyle }}" 
                    ng-click="
                        clicShowColumn( 'comment' );
                        getAllDateLastReminderSent();
                                            ">Comment</label>
                    
                    
                    <div class="table-responsive"> 
                    <table class="table table-hover table-condensed">
                        <tr style="background-color: {{ ttsmBlueColor }}; color: white">
                            <td>Company</td>
                            <td ng-show="isShowPlantInCalibrationPlanner">Plant</td>
                            <td ng-show="isShowPersonInCalibrationPlanner">Person</td>
                            <td ng-show="isShowEmailInCalibrationPlanner">E-mail</td>
                            <td ng-show="isShowEmailToSendInCalibrationPlanner">Message</td>
                            <td>System</td>
                            <td>System Type</td>
                            <td>Next Calibration</td>
                            <td>Days left</td>
                            <td ng-show="isShowDateLastReminderSentInCalibrationPlanner">Last Reminder</td>
                            <td ng-show="isShowCommentInCalibrationPlanner">Comment</td>
                            <td>Status</td>
                        </tr>
                        <tr ng-repeat="row in tableCalibrationPlanner" 
                            ng-show="
                                ( 
                                ( ( filterCompanyInCalibrationPlanner == row.companyName ) || ( filterCompanyInCalibrationPlanner == '' ) )
                                && ( ( filterStatusInCalibrationPlanner ==  row.status ) || (filterStatusInCalibrationPlanner == '' ) ) 
                                && ( (  row.systemType.includes( filterMachineTypeInCalibrationPlanner ) ) || (filterMachineTypeInCalibrationPlanner == '' ) )
                                && ( isMonthSelected( row.nextCalibrationDate ) )
                                )
                            "
                            title="{{ row.comment }}"
                            >
                            <td>{{ row.companyName }}</td>
                            <td ng-show="isShowPlantInCalibrationPlanner">{{ row.plantName }}</td>
                            <td ng-show="isShowPersonInCalibrationPlanner">{{ row.personName }}</td>
                            <td ng-show="isShowEmailInCalibrationPlanner"><label class="label label-default">{{ row.personEmail }}</label></td>
                            <td ng-show="isShowEmailToSendInCalibrationPlanner">
                                <textarea class="form-control" rows="10" >{{ row.emailToSend }}</textarea>
                                
                            </td>
                            <td>{{ row.systemSerialNumber }}</td>
                            <td>{{ row.systemType }}</td>
                            <td>{{ row.nextCalibrationDate }}</td>
                            <td>{{ row.dayUntilNextCalibrationDate }}</td>
                            <td ng-show="isShowDateLastReminderSentInCalibrationPlanner">
                                <label
                                    ng-show=" row.emailToSend != ''" 
                                    >{{ row.lastReminderSent }}</label>
                                <button 
                                    class="btn btn-sm btn-primary" 
                                    ng-click="updateLastReminderSent( row.systemSerialNumber , row.comment );"
                                    ng-show=" row.emailToSend != ''" 
                                    title="Clic to update Last reminder sent"><span class="glyphicon glyphicon-envelope"></span>-<span class="glyphicon glyphicon-forward"></span></button></td>
                            <td ng-show="isShowCommentInCalibrationPlanner"><input type="text" ng-model="row.comment"></td>
                            <td style="{{ getStyleByStatus( row.status ) }}">{{ row.status }}</td>
                        </tr>
                    </table>
                </div>
                </div>
            </div>
        </div>
    </body>
</html>