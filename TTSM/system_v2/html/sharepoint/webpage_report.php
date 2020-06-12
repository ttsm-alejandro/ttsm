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
        <title>Web Page Report</title>
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
        <script src="../../js/sharepoint/webPageReportCtrl.js"></script>
    </head>
    
    <body ng-app="miApp" >
        <div class="container" ng-controller="webPageReportCtrl" 
             ng-init="
                 
                 user='<?php echo $_SESSION["user"]; ?>';
                 token='<?php echo $_SESSION["token"]; ?>';
                                                            ">
                <!-- Header -->
                <div ng-include="'../util/header.html'"></div>
                
                <!-- MODALS -->
                <div ng-include="'../util/modal/modal_loading.html'"></div>
                
                <!-- Line -->
                <div style="background-color: {{ ttsmBlueColor }}; height: 5px;"></div>
                
                <!-- SELECT TABLE -->
                <div class="row">
                    <div class="col-md-2">
                        <h4 style="text-align: right">Select Table</h4>
                    </div>
                    <div class="col-md-2">
                        <select
                            class="form-control"
                            ng-model="tableReportSelected"
                            ng-options="x.name as x.name for x in tableReportList"
                            ng-change="getData()"
                        ></select>
                    </div>
                    <div class="col-md-8"></div>
                </div>
                
                <!-- Hide data until select table -->
                <div ng-hide="tableReportSelected==''">
                    <!-- Title -->
                    <div class="row">
                        <div class="col-lg-12">
                            <h2>
                                Web Page Report - Table {{ tableReportSelected }}.
                            </h2>
                        </div>
                    </div>
                
                    <!-- Main Table -->
                    <div class="row">
                    
                        <h5 ng-click="showHelp()">Filter List (click for help)</h5>
                    From <input type="date" ng-model="tableReportFilterDateInit" title="{{ tableReportFilterDateInit }}">
                    to <input type="date" ng-model="tableReportFilterDateFinish" title="{{ tableReportFilterDateFinish }}">
                    <label class="label label-warning" 
                           ng-click="tableReportFilterDateInit = '';
                                        tableReportFilterDateFinish = '';
                                        tableReportShowColumn[0] = true;
                                        tableReportShowColumn[1] = true;
                                        tableReportShowColumn[2] = true;
                                        tableReportShowColumn[3] = true;
                                        tableReportShowColumn[4] = true;
                                        tableReportShowColumn[5] = true;
                                        tableReportShowColumn[6] = true;
                                        tableReportShowColumn[7] = true;
                    ">RESET SELECTIONS</label>
                
                    <!-- data table -->
                    <div class="table-responsive"> 
                        <table class="table table-hover table-condensed">
                            <tr style="background-color: {{ ttsmBlueColor }}; color: white">
                                <td ng-dblclick="tableReportShowColumn[0] = false" ng-show="tableReportShowColumn[0]">#</td>
                                <td ng-dblclick="tableReportShowColumn[1] = false" ng-show="tableReportShowColumn[1]">Name</td>
                                <td ng-dblclick="tableReportShowColumn[2] = false" ng-show="tableReportShowColumn[2]">Company</td>
                                <td ng-dblclick="tableReportShowColumn[3] = false" ng-show="tableReportShowColumn[3]">e-mail</td>
                                <td ng-dblclick="tableReportShowColumn[4] = false" ng-show="tableReportShowColumn[4]">Phone</td>
                                <td ng-dblclick="tableReportShowColumn[5] = false" ng-show="tableReportShowColumn[5]">Comment</td>
                                <td ng-dblclick="tableReportShowColumn[6] = false" ng-show="tableReportShowColumn[6]">Date as Text</td>
                                <td ng-dblclick="tableReportShowColumn[7] = false" ng-show="tableReportShowColumn[7]">Date as Date</td>
                            </tr>
                            <tr ng-repeat="row in reportData" title="id: {{ row.id }}" ng-show="getShowByDate( row )">
                                <td ng-show="tableReportShowColumn[0]">{{ $index + 1 }}</td>
                                <td ng-show="tableReportShowColumn[1]">{{ row.name }}</td>
                                <td ng-show="tableReportShowColumn[2]">{{ row.company }}</td>
                                <td ng-show="tableReportShowColumn[3]">{{ row.email }}</td>
                                <td ng-show="tableReportShowColumn[4]">{{ row.phone }}</td>
                                <td ng-show="tableReportShowColumn[5]"><p>{{ row.comment }}</p></td>
                                <td ng-show="tableReportShowColumn[6]">{{ row.date }}</td>
                                <td ng-show="tableReportShowColumn[7]"><input type="date" ng-model="row.date" ng-disabled="true"></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>