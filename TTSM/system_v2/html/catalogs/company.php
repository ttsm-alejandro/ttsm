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
        
        
        <title>Companies</title>
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
        <script src="../../js/catalogs/companyCtrl.js"></script>
    </head>
    
    <body ng-app="miApp" >
        <div class="container" ng-controller="companyCtrl" 
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
                                           ">
            
            <!-- *A Begin : URL contains "id=" -->
            <?php if( !isset( $_GET[ "id" ] ) ){?>
            
            <!-- Header -->
            <div ng-include="'../util/header.html'"></div>
            
            <!-- MODALS -->
            <div ng-include="'../util/modal/modal_loading.html'"></div>
            
            <h2>
                Companies Catalog.
            </h2>
            
            <!-- *A End : URL contains "id=" -->
            <?php } ?>
            <div class="row">
                <!-- *B Begin : URL contains "id=" -->
                <?php if( !isset( $_GET[ "id" ] ) ){?>
                
                <div class="col-lg-3">
                    <div class="input-group">
                        <input class="form-control"
                               ng-model="filterCompany"
                               >
                        <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>
                    </div>
                    <!--h4>Content</h4-->
                    <div style="overflow: scroll; max-height: {{ userScreenHeight }};">
                        <table class="table table-hover"
                               
                               >
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                            <tr ng-repeat="row in tableContent | filter : { fullName : filterCompany }" 
                                ng-click="getDetails( row )"  
                                style="{{ isRowSelected(row) }}"
                                >
                                <td>{{ $index + 1 }}</td>
                                <td>{{ row.fullName }}</td>
                            </tr>
                        </table>
                    </div>
                    <div ng-click="getData()" class="btn bg-primary">Refresh</div>
                    <button class="btn btn-success" ng-click="newRow()">New</button>
                </div>
                
                <!-- B* End -->
                <?php } ?>
                
                <div class="col-lg-9">
                    <h4>Company Details</h4>
                    <table class="table table-striped">
                        <tr><th>ID:</th><td>{{ details.id }}</td></tr>
                        <tr><th>Name:</th><td><input ng-model="details.fullName" class="form-control"></td></tr>
                        <tr><th>Alias:</th><td><input ng-model="details.shortName" class="form-control"></td></tr>
                        <tr><th>Web Page:</th><td><input ng-model="details.webPage" class="form-control"></td></tr>
                    </table>
                    <button class="btn btn-info" ng-click="updateOrSaveRow()">Save</button>
                    
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