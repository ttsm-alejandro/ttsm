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
        
        
        <title>Persons</title>
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
        <script src="../../js/catalogs/personCtrl.js"></script>
    </head>
    
    <body ng-app="miApp" >
        <div class="container" ng-controller="personCtrl" 
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
            
            <h2>
                Person Catalog.
            </h2>
            
            <!-- *A End : -->
            <?php } ?>
            
            <div class="row">

                <!-- *B Begin: PHP line for block elements when "?id=" is present in the URL -->
                <?php if( !isset( $_GET[ "id" ] ) ){ ?>
                
                <div class="col-lg-3">
                    <div class="input-group">
                        <select ng-model="filterCompany" ng-options=" x.id as x.fullName for x in companyCatalog" class="form-control"></select>
                        <input class="form-control" ng-model="filterPerson">
                        <span ng-click="filterCompany = ''; filterPerson = '';" class="input-group-addon"><i class="glyphicon glyphicon-repeat"></i></span>
                    </div>
                    <div style="overflow: scroll; max-height: {{ userScreenHeight }};">
                        <table class="table table-hover">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                            </tr>
                            <tr ng-repeat="row in tableContent | filter : { idCompany : filterCompany , name : filterPerson } " 
                                ng-click="getDetails( row )"
                                ng-show="((row.idCompany === filterCompany) && ( filterCompany !== '' )) || (filterCompany === '')"
                                style="{{ isRowSelected(row) }}"
                                >
                                <td>{{ $index + 1 }}</td>
                                <td>{{ row.name }}</td>
                            </tr>
                        </table>
                    </div>
                    <!--div ng-click="getData()" class="btn bg-primary">Refresh</div-->
                    <button class="btn btn-success" ng-click="newRow()">New</button>
                </div>
                
                <!-- *B End : -->
                <?php } ?>
                 
                <div class="col-lg-9">
                    <h4>Person Details</h4>
                    <table class="table table-striped">
                        <tr><th>ID:</th><td>{{ details.id }}</td></tr>
                        <tr><th title="Clic to reload catalog" ng-click="getCatalogData()">Company:</th>
                            <td><select ng-model="details.idCompany" ng-options=" x.id as x.fullName for x in companyCatalog" class="form-control"></select>
                                <button class="btn btn-info" ng-click="openCatalogWindow( 'company' , details.idCompany )">Edit</button>
                                <button class="btn btn-success" ng-click="openCatalogWindow( 'company' , '--' )">Add</button>                            
                            </td>
                        </tr>
                        <tr><th>Name:</th><td><input ng-model="details.name" class="form-control" ng-disabled="updateDisable"></td></tr>
                        <tr><th>Japanese Name:</th><td><input ng-model="details.japaneseName" class="form-control" ng-disabled="updateDisable"></td></tr>
                        <tr><th>Cellphone:</th><td><input ng-model="details.cellphone" class="form-control" ng-disabled="updateDisable"></td></tr>
                        <tr><th>e-mail:</th><td><input ng-model="details.email" class="form-control" ng-disabled="updateDisable"></td></tr>
                        <tr><th>Comment:</th><td><textarea ng-model="details.comment" class="form-control" ng-disabled="updateDisable"></textarea></td></tr>
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