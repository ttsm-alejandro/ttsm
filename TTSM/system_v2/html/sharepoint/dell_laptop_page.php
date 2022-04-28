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
        
        
        <title>Dell Laptop Set / Information Collect</title>
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
        <script src="../../js/sharepoint/dellLaptopPageCtrl.js"></script>
    </head>
    
    <body ng-app="miApp" >
        <div class="container" ng-controller="dellLaptopPageCtrl" 
             ng-init="
                 
                 user='<?php echo $_SESSION["user"]; ?>';
                 token='<?php echo $_SESSION["token"]; ?>';
                                           ">
                <!-- Header -->
                <div ng-include="'../util/header.html'"></div>
                <div style="color:{{ ttsmBlueColor }}; text-align: center; font-size: 50px">Dell Laptop Set / Information Collect</div>
                
                <!-- MODALS -->
                <div ng-include="'../util/modal/modal_loading.html'"></div>
                
                
                <!-- Line -->
                <div style="background-color: {{ ttsmBlueColor }}; height: 2px;"></div>
                
                <!-- Title -->
                
                <!-- 
                ********************************
                COMPANY 
                ********************************
                -->
                <div class="row" ng-show="viewCompany">
                    <h2>
                        About Owner
                    </h2>
                    <div class="col-lg-12">
                        <!-- Boton NEXT -->
                        <div class="form-group" style="text-align: right">
                            <button class="btn-lg btn-info btn-primary" ng-click="changeViewFlag( 2 )"><span class="glyphicon glyphicon-forward"></span> NEXT</button>
                        </div>
                        
                        <!-- Company -->
                        <div class="form-group">
                            <label for="inputlg">Company</label>
                            <input class="form-control input-lg" ng-model="information.company" type="text" placeholder="Input Company Name">
                        </div>
                        
                        <!-- Department -->
                        <div class="form-group">
                            <label for="inputlg">Department</label>
                            <input class="form-control input-lg" ng-model="information.department" type="text" placeholder="Input Department Name">
                        </div>
                    </div>
                </div>
                
                <!--
                *******************************************
                ABOUT SPECS 
                *******************************************
                -->
                <div class="row" ng-show="viewSpec">
                    <h2>
                        About Laptop Specs
                    </h2>
                    <div class="col-lg-12">
                        <!-- Botones BACK NEXT -->
                        <div class="form-group" style="text-align: right">
                            <button class="btn-lg btn-warning btn-primary" ng-click="changeViewFlag( 1 )"><span class="glyphicon glyphicon-backward"></span> BACK</button>
                            <button class="btn-lg btn-info btn-primary" ng-click="changeViewFlag( 3 )"><span class="glyphicon glyphicon-forward"></span> NEXT</button>
                        </div>
                        
                        <!-- Model -->
                        <div class="form-group">
                            <label for="inputlg">Model</label>
                            <input class="form-control input-lg" ng-model="information.model" type="text" placeholder="ex. Dell Precision 7760">
                        </div>
                        
                        <!-- Service Tag -->
                        <div class="form-group">
                            <label for="inputlg">Service Tag</label>
                            <input class="form-control input-lg" ng-model="information.serviceTag" type="text" placeholder="Input Service Tag">
                        </div>
                        
                        <!-- macAddress -->
                        <div class="form-group">
                            <label for="inputlg">MAC Address</label>
                            <input class="form-control input-lg" ng-model="information.macAddress" type="text" placeholder="Input MAC Address">
                        </div>
                        
                        <!-- gpu -->
                        <div class="form-group">
                            <label for="inputlg">Graphic Card (GPU)</label>
                            <input class="form-control input-lg" ng-model="information.gpu" type="text" placeholder="ex. Nvidia Quadro RTX4000">
                        </div>
                        
                        <!-- gpuRam -->
                        <div class="form-group">
                            <label for="inputlg">GPU RAM</label>
                            <input class="form-control input-lg" ng-model="information.gpuRam" type="text" placeholder="ex. 8GB DDR5">
                        </div>
                        
                        <!-- resolution -->
                        <div class="form-group">
                            <label for="inputlg">Resolution</label>
                            <input class="form-control input-lg" ng-model="information.resolution" type="text" placeholder="ex. 1920 x 1080">
                        </div>
                        
                        <!-- cpu -->
                        <div class="form-group">
                            <label for="inputlg">CPU</label>
                            <input class="form-control input-lg" ng-model="information.cpu" type="text" placeholder="ex. Intel i9 @ 2.6GHz">
                        </div>
                        
                        <!-- ram -->
                        <div class="form-group">
                            <label for="inputlg">RAM</label>
                            <input class="form-control input-lg" ng-model="information.ram" type="text" placeholder="ex. 32GB">
                        </div>
                        
                        <!-- windows -->
                        <div class="form-group">
                            <label for="inputlg">Windows version</label>
                            <input class="form-control input-lg" ng-model="information.windows" type="text" placeholder="ex. 10 Pro for WorkStation 20H2">
                        </div>
                        
                        <!-- primaryHdd -->
                        <div class="form-group">
                            <label for="inputlg">Primary HDD</label>
                            <input class="form-control input-lg" ng-model="information.primaryHdd" type="text" placeholder="ex. 512GB SSD">
                        </div>
                        
                        <!-- secondaryHdd -->
                        <div class="form-group">
                            <label for="inputlg">Secondary HDD</label>
                            <input class="form-control input-lg" ng-model="information.secondaryHdd" type="text" placeholder="ex. 1TB HDD 7200">
                        </div>
                        
                        <h2 style="text-align: center">
                            Common Settings
                        </h2>
                        
                        <!-- switchableGraphicSetting -->
                        <div class="form-group">
                            <label for="inputlg">Disable Switchable Graphic</label>
                            <input class="form-control input-lg" ng-model="information.switchableGraphicSetting" type="checkbox">
                        </div>
                        
                        <!-- energySetting -->
                        <div class="form-group">
                            <label for="inputlg">Energy Setting (Never sleep, HDD never sleep)</label>
                            <input class="form-control input-lg" ng-model="information.energySetting" type="checkbox">
                        </div>
                        
                        <!-- adminAccountSetting -->
                        <div class="form-group">
                            <label for="inputlg">User Account (admin, never confirm)</label>
                            <input class="form-control input-lg" ng-model="information.adminAccountSetting" type="checkbox">
                        </div>
                        
                        <!-- ttsmFolder -->
                        <div class="form-group">
                            <label for="inputlg">Create TTSM Folder for installers</label>
                            <input class="form-control input-lg" ng-model="information.ttsmFolder" type="checkbox">
                        </div>
                        
                        <!-- comments -->
                        <div class="form-group">
                            <label for="inputlg">Comments</label>
                            <textarea class="form-control input-lg" ng-model="information.comments" placeholder="Comments"></textarea>
                        </div>
                        
                        <!-- Botones BACK NEXT -->
                        <div class="form-group" style="text-align: right">
                            <button class="btn-lg btn-warning btn-primary" ng-click="changeViewFlag( 1 )"><span class="glyphicon glyphicon-backward"></span> BACK</button>
                            <button class="btn-lg btn-info btn-primary" ng-click="changeViewFlag( 3 )"><span class="glyphicon glyphicon-forward"></span> NEXT</button>
                        </div>
                        
                    </div>
                </div>
                
                <!-- 
                *******************************************
                ABOUT CHECKLIST 
                *******************************************
                -->
                <div class="row" ng-show="viewChecklist">
                    <h2>
                        About System - Checklist
                    </h2>
                    <div class="col-lg-12">
                        
                        <!-- Botones BACK NEXT -->
                        <div class="form-group" style="text-align: right">
                            <button class="btn-lg btn-warning btn-primary" ng-click="changeViewFlag( 2 )"><span class="glyphicon glyphicon-backward"></span> BACK</button>
                            <button class="btn-lg btn-success btn-primary" ng-click="clicFinish()"><span class="glyphicon glyphicon-save-file"></span> FINISH</button>
                        </div>
                        
                        <!-- System Type -->
                        <div class="form-group">
                            <label for="inputlg">System Type</label>
                            
                            <!-- Selector -->
                            <select 
                                ng-model="information.checklist" 
                                ng-options="x.name as x.name for x in checklistOptions" 
                                class="form-control input-lg"></select>
                        
                        </div>
                        
                        <h2 style="text-align: center">
                            {{ information.checklist }}
                        </h2>
                        
                        <!-- 
                        *********************************************
                        VECTORON CHECKLIST 
                        *********************************************
                        -->
                        <div ng-show="information.checklist == 'Vectoron'">
                            <!-- Vectoron - Serial Number -->
                            <div class="form-group">
                                <label for="inputlg">Vectoron Serial Number</label>
                                <input class="form-control input-lg" ng-model="informationREGALIS.vectoronSerialNumber" type="text" placeholder="ex. MR-51901">
                            </div>
                            
                            <!-- regalisVersion -->
                            <div class="form-group">
                                <label for="inputlg">REGALIS Version</label>
                                <input class="form-control input-lg" ng-model="informationREGALIS.regalisVersion" type="text" placeholder="ex. 4.5.7980">
                            </div>
                            
                            <!-- regalisDongle -->
                            <div class="form-group">
                                <label for="inputlg">REGALIS Dongle</label>
                                <input class="form-control input-lg" ng-model="informationREGALIS.regalisDongle" type="text" placeholder="ex. 60144">
                            </div>
                            
                            <!-- ipAddress -->
                            <div class="form-group">
                                <label for="inputlg">Ip Address set to 192.168.10.12</label>
                                <input class="form-control input-lg" ng-model="informationREGALIS.ipAddress" type="checkbox">
                            </div>
                            
                            <!-- ttsmFolderRegalisInstaller -->
                            <div class="form-group">
                                <label for="inputlg">Folder TTSM - REGALIS Installer</label>
                                <input class="form-control input-lg" ng-model="informationREGALIS.ttsmFolderRegalisInstaller" type="checkbox">
                            </div>
                            
                            <!-- ttsmFolderRegalisInstaller -->
                            <div class="form-group">
                                <label for="inputlg">Folder TTSM - ATPC y AC6 Installer</label>
                                <input class="form-control input-lg" ng-model="informationREGALIS.ttsmFolderAtpcAc6Installer" type="checkbox">
                            </div>
                            
                            <!-- ttsmFoldertbLicense -->
                            <div class="form-group">
                                <label for="inputlg">Folder TTSM - tbLicense</label>
                                <input class="form-control input-lg" ng-model="informationREGALIS.ttsmFoldertbLicense" type="checkbox">
                            </div>
                            
                            <!-- ttsmFoldermlLicense -->
                            <div class="form-group">
                                <label for="inputlg">Folder TTSM - mlLicense</label>
                                <input class="form-control input-lg" ng-model="informationREGALIS.ttsmFoldermlLicense" type="checkbox" title="if no apply, check and comment">
                            </div>
                            
                            <!-- ttsmFolderArmParam -->
                            <div class="form-group">
                                <label for="inputlg">Folder TTSM - Arm Param</label>
                                <input class="form-control input-lg" ng-model="informationREGALIS.ttsmFolderArmParam" type="checkbox">
                            </div>
                            
                            <!-- ttsmFolderScanParam -->
                            <div class="form-group">
                                <label for="inputlg">Folder TTSM - Scan Param</label>
                                <input class="form-control input-lg" ng-model="informationREGALIS.ttsmFolderScanParam" type="checkbox">
                            </div>
                            
                            <!-- regalisInstalled -->
                            <div class="form-group">
                                <label for="inputlg">REGALIS correctly installed</label>
                                <input class="form-control input-lg" ng-model="informationREGALIS.regalisInstalled" type="checkbox">
                            </div>
                            
                            <!-- atpcAc6Installed -->
                            <div class="form-group">
                                <label for="inputlg">ATPC and AC6 correctly installed</label>
                                <input class="form-control input-lg" ng-model="informationREGALIS.atpcAc6Installed" type="checkbox">
                            </div>
                            
                            <!-- regalisInstalledTestedWithArm -->
                            <div class="form-group">
                                <label for="inputlg" title="In periodic inspection, ATPC opens?, path correctly setted?">REGALIS tested and connected to Vectoron - Periodic Inspection</label>
                                <input class="form-control input-lg" ng-model="informationREGALIS.regalisInstalledTestedWithArm" type="checkbox">
                            </div>
                            
                            <!-- excelTrustCenterSetting -->
                            <div class="form-group">
                                <label for="inputlg">Set EXCEL trust center for Report</label>
                                <input class="form-control input-lg" ng-model="informationREGALIS.excelTrustCenterSetting" type="checkbox">
                            </div>
                            
                        </div>
                        
                        <!-- 
                        *********************************************
                        FLARE / COMET CHECKLIST 
                        *********************************************
                        -->
                        <div ng-show="information.checklist == 'FLARE / COMET'">
                            
                            <!-- hiperThreadSetting -->
                            <div class="form-group">
                                <label for="inputlg">Disable HiperThread on BIOS</label>
                                <input class="form-control input-lg" ng-model="informationFLARE.hiperThreadSetting" type="checkbox">
                            </div>
                            
                            <!-- colin3DVersion -->
                            <div class="form-group">
                                <label for="inputlg">Colin3D Version</label>
                                <input class="form-control input-lg" ng-model="informationFLARE.colin3DVersion" type="text" placeholder="ex. 7.0.4">
                            </div>
                            
                            <!-- colin3DDongle -->
                            <div class="form-group">
                                <label for="inputlg">Colin3D Dongle #</label>
                                <input class="form-control input-lg" ng-model="informationFLARE.colin3DDongle" type="text" placeholder="ex. 7C7755054">
                            </div>
                            
                            <!-- ttsmFolderColin3DInstaller -->
                            <div class="form-group">
                                <label for="inputlg">Folder TTSM - Colin3D installer</label>
                                <input class="form-control input-lg" ng-model="informationFLARE.ttsmFolderColin3DInstaller" type="checkbox">
                            </div>
                            
                            <!-- ttsmFolderColin3DKeyFile -->
                            <div class="form-group">
                                <label for="inputlg">Folder TTSM - Colin3D keyfile</label>
                                <input class="form-control input-lg" ng-model="informationFLARE.ttsmFolderColin3DKeyFile" type="checkbox">
                            
                            </div>
                            
                            <!-- ttsmFolderColin3DParam -->
                            <div class="form-group">
                                <label for="inputlg">Folder TTSM - Colin3D backup Params</label>
                                <input class="form-control input-lg" ng-model="informationFLARE.ttsmFolderColin3DParam" type="checkbox">
                            
                            </div>
                            
                            <!-- colin3DInstalled -->
                            <div class="form-group">
                                <label for="inputlg">Colin3D Installed</label>
                                <input class="form-control input-lg" ng-model="informationFLARE.colin3DInstalled" type="checkbox">
                            </div>
                            
                            <!-- colin3DDriverPackInstalled -->
                            <div class="form-group">
                                <label for="inputlg">Colin3D DriverPack Installed</label>
                                <input class="form-control input-lg" ng-model="informationFLARE.colin3DDriverPackInstalled" type="checkbox">
                            </div>
                            
                            <!-- colin3DDriverPackIXXAT -->
                            <div class="form-group">
                                <label for="inputlg">DriverPack - IXXAT installed</label>
                                <input class="form-control input-lg" ng-model="informationFLARE.colin3DDriverPackIXXAT" type="checkbox" 
                                       title="IXXAT VCI Installation 
                                       &#013; ○ Allow Access is required 
                                       &#013; ○ Reboot after finish 
                                       &#013; ○ After reboot, IXXAT is listed in DEVICE MANAGER">
                            </div>
                            
                            <!-- colin3DDriverSVSVistek -->
                            <div class="form-group">
                                <label for="inputlg">DriverPack - SVS-Vistek GigE FilterDriver Installed</label>
                                <input class="form-control input-lg" ng-model="informationFLARE.colin3DDriverSVSVistek" type="checkbox">
                            </div>
                            
                            <!-- ipAddress -->
                            <div class="form-group">
                                <label for="inputlg">IP Address set to 169.254.0.1 / 255.255.255.0</label>
                                <input class="form-control input-lg" ng-model="informationFLARE.ipAddress" type="checkbox">
                            </div>
                            
                            <!-- ethernetAdvanceSetting -->
                            <div class="form-group">
                                <label for="inputlg">Ethernet - Configure Adapter - Advance Setting</label>
                                <input class="form-control input-lg" ng-model="informationFLARE.ethernetAdvanceSetting" type="checkbox"
                                       title="Jumbo Packet - Maximun value (9014 Byte)
                                       &#013; Receive buffers - 2048
                                       &#013; Transmit buffers - 2048
                                       &#013; Energy efficient Ethernet - OFF
                                       &#013; ○ Power Management - Allow the computer to turn off this device to save power - OFF">
                            </div>
                            
                            <!-- colin3DInstalledTestWithComet -->
                            <div class="form-group">
                                <label for="inputlg">Colin3D tested with Comet / Flare</label>
                                <input class="form-control input-lg" ng-model="informationFLARE.colin3DInstalledTestWithComet" type="checkbox">
                            </div>
                        </div>
                        
                        <!-- 
                        *********************************************
                        OTHER CHECKLIST 
                        *********************************************
                        -->
                        <div ng-show="information.checklist == 'Other'">
                            
                            <!-- softwareVersion -->
                            <div class="form-group">
                                <label for="inputlg">Software Name and Version</label>
                                <input class="form-control input-lg" ng-model="informationOther.softwareVersion" type="text" placeholder="ex. GapNinja+ 1.3">
                            </div>
                            
                            <!-- softwareDongle -->
                            <div class="form-group">
                                <label for="inputlg">Software Dongle</label>
                                <input class="form-control input-lg" ng-model="informationOther.softwareDongle" type="text" placeholder="ex. 60114">
                            </div>
                            
                            <!-- ttsmFolderSoftwareInstaller -->
                            <div class="form-group">
                                <label for="inputlg">Folder TTSM - Software Installer</label>
                                <input class="form-control input-lg" ng-model="informationOther.ttsmFolderSoftwareInstaller" type="checkbox">
                            </div>
                            
                            <!-- ttsmFolderSoftwareKeyfile -->
                            <div class="form-group">
                                <label for="inputlg">Folder TTSM - Software Keyfile</label>
                                <input class="form-control input-lg" ng-model="informationOther.ttsmFolderSoftwareKeyfile" type="checkbox">
                            </div>
                            
                            <!-- ttsmFolderSoftwareParam -->
                            <div class="form-group">
                                <label for="inputlg">Folder TTSM - Software Params</label>
                                <input class="form-control input-lg" ng-model="informationOther.ttsmFolderSoftwareParam" type="checkbox">
                            </div>
                            
                            <!-- softwareInstalled -->
                            <div class="form-group">
                                <label for="inputlg">Software Installed</label>
                                <input class="form-control input-lg" ng-model="informationOther.softwareInstalled" type="checkbox">
                            </div>
                            
                            <!-- ipAddress -->
                            <div class="form-group">
                                <label for="inputlg">IP Address set</label>
                                <input class="form-control input-lg" ng-model="informationOther.ipAddress" type="text" placeholder="ex. 192.168.1.24">
                            </div>
                            
                            <!-- softwareInstalledTestWithHardware -->
                            <div class="form-group">
                                <label for="inputlg">Software Installed and tested with Hardware</label>
                                <input class="form-control input-lg" ng-model="informationOther.softwareInstalledTestWithHardware" type="checkbox">
                            </div>
                            
                        </div>
                        
                        <!-- Botones BACK NEXT -->
                        <div class="form-group" style="text-align: right">
                            <button class="btn-lg btn-warning btn-primary" ng-click="changeViewFlag( 2 )"><span class="glyphicon glyphicon-backward"></span> BACK</button>
                            <button class="btn-lg btn-success btn-primary" ng-click="clicFinish()"><span class="glyphicon glyphicon-save-file"></span> FINISH</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>