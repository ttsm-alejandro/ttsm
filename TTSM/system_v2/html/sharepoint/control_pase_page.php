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
        
        
        <title>Control PASE</title>
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
        <script src="../../js/sharepoint/controlPasePageCtrl.js"></script>
    </head>
    
    <body ng-app="miApp" >
        <div class="container" ng-controller="controlPasePageCtrl" 
             ng-init="
                 
                 user='<?php echo $_SESSION["user"]; ?>';
                 token='<?php echo $_SESSION["token"]; ?>';
                 getData();
                                           ">
                <!-- Header -->
                <div ng-include="'../util/header.html'"></div>
                <div style="color:red; text-align: center; font-size: 100px">{{ totalAmount }}</div>
                
                <!-- MODALS -->
                <div ng-include="'../util/modal/modal_loading.html'"></div>
                <div ng-include="'../util/modal/modal_control_pase_add_register.html'"></div>
                
                
                <!-- Line -->
                <div style="background-color: {{ ttsmBlueColor }}; height: 5px;"></div>
                
                <!-- Title -->
                <div class="row">
                    <div class="col-lg-8">
                        <h2>
                            Registros
                        </h2>
                    </div>
                    <div class="col-lg-4" style="text-align: right">
                        <div class="btn btn-default" ng-click="showModalAddRegister( true )">
                            Agregar registro
                        </div>
                    </div>
                </div>
            
            <div class="row">
                <!-- LIST AREA -->
                <div class="col-lg-12">
                    <div class="input-group">
                        <!--form ng-submit="searchComplete()">
                            <input class="form-control" ng-model="filterSystemSerialNumber" title="Last search: {{ lastSearch }}">
                        </form>
                        <span ng-click="cleanSearchResult()" class="input-group-addon"><i class="glyphicon glyphicon-repeat"></i></span-->
                    </div>
                    <div style="overflow: scroll; max-height: {{ userScreenHeight }};">
                        <table class="table table-hover">
                            <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Destino</th>
                                <th>Usuario</th>
                                <th>Monto</th>
                                <th>Edit</th>
                            </tr>
                            <tr ng-repeat="row in tableContent" 
                                ng-click="getPaseDetail( row )"
                                style="{{ isRowSelected(row) }}"
                                >
                                <td>{{ $index + 1 }}</td>
                                <td>{{ row.date }}</td>
                                <td>{{ row.destiny }}</td>
                                <td>{{ row.user }}</td>
                                <td>{{ row.amount }}</td>
                                <td><div class="btn btn-info"><span class="glyphicon glyphicon-edit" ng-click="showModalAddRegister( false )"></span></div></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>