<?php
    session_start();
    if( !isset( $_SESSION[ "user" ] ) ){
        header( "Location: ../../index.php" );
    }
?>
<!DOCTYPE html>
<!--
Company:    Tokyo Boeki Techno-System de Mexico S.A. de C.V. 
Programmer: Alejandro Aguayo Acosta
-->
<html>
    <head>
        <title>Notes</title>
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
        <script src="../../js/sharepoint/notePageCtrl.js"></script>
    </head>
    
    <body ng-app="miApp" >
        <div class="container" ng-controller="notePageCtrl" 
             ng-init="
                 user='<?php echo $_SESSION["user"]; ?>';
                 token='<?php echo $_SESSION["token"]; ?>';
                 getMainData();
                                           ">
            <!-- Header -->
            <div ng-include="'../util/header.html'"></div>
            
            <div class="row">
                <div class="col-lg-2">
                    <!--h4>Content</h4-->
                    <table class="table table-hover">
                        <!--tr>
                            <!--th>ID</th>
                            <th>Name</th>
                        </tr-->
                        <tr ng-repeat="row in tableListContent" ng-click="getDetails( row )">
                            <!--td>{{ row.id }}</td-->
                            <td>{{ row.tittle }}</td>
                        </tr>
                    </table>
                    <!--div ng-click="getMainData()" class="btn bg-primary">Refresh</div-->
                    <div style="text-align: right;">
                        <button class="btn btn-success" ng-click="newRow()">New</button>
                    </div>
                </div>
                <div class="col-lg-10">
                    <div class="row">
                        <input ng-model="details.tittle" class="form-control" placeholder="Tittle">
                    </div>
                    <div class="row">
                        <textarea rows="20" ng-model="details.content" class="form-control"></textarea>
                    </div>
                    <div class="row" style="text-align: right;">
                        <button class="btn btn-info" ng-click="updateOrSaveRow()">{{ updateOrSaveText }}</button>
                        <button class="btn btn-danger" ng-click="deleteRow()">{{ deleteOrCleanText }}</button>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>