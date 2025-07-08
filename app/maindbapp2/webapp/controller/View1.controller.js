sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("maindbapp2.controller.View1", {
        onInit() {
            debugger
            
            var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteView1").attachMatched(this._onRouteMatched, this);  
        },
       _onRouteMatched: async function (oEvent) {
        debugger
     
        var projectId = oEvent.getParameter("arguments").DocId;
        let user,userEmail;
        try {
             user = sap.ushell.services.UserInfo.getFullName();
             userEmail = sap.ushell.services.UserInfo.getEmail();    
        } catch (error) {
             user = 'Tesst User'; 
             userEmail = 'akshay.br@peolsolutions.com' 
        }
        var jsonoModel = new sap.ui.model.json.JSONModel({ projectId: projectId ,userName:user});
        this.getView().setModel(jsonoModel, "DocId");
        let oModel=this.getView().getModel();
        let sFunctionName='getDataForUserAndProject';
        let oFunction=oModel.bindContext(`/${sFunctionName}(...)`);
        oFunction.setParameter('project',projectId);
        oFunction.setParameter('user',userEmail);
        await oFunction.execute();
        var oContext = oFunction.getBoundContext().getValue();
        debugger
       },
        onBeforeRendering:function(oEvent){
        debugger
        },
      
        routing:{
            onBeforeBinding:function(oEvent){
                debugger
            }
        }
    });
});