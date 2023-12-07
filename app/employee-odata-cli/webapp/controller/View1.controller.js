sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "employeeodatacli/employeeodatacli/model/models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, models) {
        "use strict";

        return Controller.extend("employeeodatacli.employeeodatacli.controller.View1", {
            onInit: function () {
                var sServiceUrl = "/odata/v4/employees-/";
                var oModel = new sap.ui.model.odata.v4.ODataModel({serviceUrl: sServiceUrl});
                this.getView().setModel(oModel, "model")
                var oList = this.byId("List");
                this._oList = oList;
            },
            /**
             *------------------------------------------------------------------------*
             *     OnRefresh                                                          *
             * -----------------------------------------------------------------------*
             */
            OnRefresh: function (oEvent) {
                this._oList.getBinding("items").refresh();
            },
            /**
             *------------------------------------------------------------------------*
             *     OnAdd                                                              *
             * -----------------------------------------------------------------------*
             */
            OnAdd: function (oEvent) {
                var oList = this.byId("List")
                var oBinding = oList.getBinding("items")
                console.log(oList)
                console.log(oBinding)

                var dialog = new sap.m.Dialog({
                    title: "Add Organization Employee",
                    type: "Message",
                    content: [new sap.ui.layout.HorizontalLayout({
                        content: [
                            new sap.ui.layout.VerticalLayout({
                                width: "140px",
                                content: [
                                    new sap.m.Label({
                                        text: "Employee ID"
                                    }),
                                    new sap.m.Label({
                                        text: "Employee Name:"
                                    }),
                                    new sap.m.Label({
                                        text: "Employee Job Title:"
                                    }),
                                    new sap.m.Label({
                                        text: "Employee Address CEP:"
                                    }),
                                    new sap.m.Label({
                                        text: "Employee Address Number:"
                                    }),
                                    new sap.m.Label({
                                        text: "Employee Address Complement:"
                                    }),
                                    new sap.m.Label({
                                        text: "Employee Email:"
                                    })
                                ]
                            }),
                            new sap.ui.layout.VerticalLayout({
                                width: "140px",
                                content: [
                                    new sap.m.Input("ID", {
                                        editable: false
                                    }),
                                    new sap.m.Input("name", {
                                    }),
                                    new sap.m.Input("jobTitle", {
                                    }),
                                    new sap.m.Input("address_CEP", {
                                    }),
                                    new sap.m.Input("address_number", {
                                    }),
                                    new sap.m.Input("address_complement", {
                                    }),
                                    new sap.m.Input("email", {
                                    })
                                ]
                            })
                        ]
                    })],
                    beginButton: new sap.m.Button({
                        text: "Save",
                        press: function () {
                            var sEmployeeName = sap.ui.getCore().byId("name").getValue();
                            var sEmployeeJobTitle = sap.ui.getCore().byId("jobTitle").getValue();
                            var sEmployeeAddressCEP = sap.ui.getCore().byId("address_CEP").getValue();
                            var sEmployeeAddressNumber = sap.ui.getCore().byId("address_number").getValue();
                            var sEmployeeAddressComplement = sap.ui.getCore().byId("address_complement").getValue();
                            var sEmployeeEmail = sap.ui.getCore().byId("email").getValue();// Create a new Object with the new data 
                            var oObject = {};
                            oObject = {
                                "name": sEmployeeName,
                                "jobTitle": sEmployeeJobTitle,
                                "address_CEP": sEmployeeAddressCEP,
                                "address_number": String(sEmployeeAddressNumber),
                                "address_complement": sEmployeeAddressComplement,
                                "email": sEmployeeEmail
                            };

                            var oContext = oBinding.create(oObject)
                            oContext.created().then(() => {
                                console.log("objeto criado")
                            }, error => {
                                console.log(error)
                            })

                            dialog.close();
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: "Cancel",
                        press: function () {
                            dialog.close();
                        }
                    }),
                    afterClose: function () {
                        dialog.destroy();
                    }
                });
                dialog.open();
            },
            /**
             *------------------------------------------------------------------------*
             *     OnEdit                                                             *
             * -----------------------------------------------------------------------*
             */
            OnEdit: function (oEvent) {
                var employeeContext = this._itemContext

                var oEmployee = this._item
                var oEmployeeID = oEmployee.ID;
                var oEmployeeName = oEmployee.name;
                var oEmployeeJobTitle = oEmployee.jobTitle;
                var oEmployeeAddressCEP = oEmployee.address_CEP;
                var oEmployeeAddressNumber = oEmployee.address_number;
                var oEmployeeAddressComplement = oEmployee.address_complement;
                var oEmployeeEmail = oEmployee.email;

                // call Dialog popup
                var dialog = new sap.m.Dialog({
                    title: "Edit Organization Employee",
                    type: "Message",
                    content: [new sap.ui.layout.HorizontalLayout({
                        content: [
                            new sap.ui.layout.VerticalLayout({
                                width: "140px",
                                content: [
                                    new sap.m.Label({
                                        text: "Employee ID"
                                    }),
                                    new sap.m.Label({
                                        text: "Employee Name:"
                                    }),
                                    new sap.m.Label({
                                        text: "Employee Job Title:"
                                    }),
                                    new sap.m.Label({
                                        text: "Employee CEP:"
                                    }),
                                    new sap.m.Label({
                                        text: "Employee Address Number:"
                                    }),
                                    new sap.m.Label({
                                        text: "Employee Address Complement:"
                                    }),
                                    new sap.m.Label({
                                        text: "Employee Email:"
                                    })
                                ]
                            }),
                            new sap.ui.layout.VerticalLayout({
                                content: [
                                    new sap.m.Input("ID", {
                                        value: oEmployeeID,
                                        editable: false
                                    }),
                                    new sap.m.Input("name", {
                                        value: oEmployeeName
                                    }),
                                    new sap.m.Input("jobTitle", {
                                        value: oEmployeeJobTitle
                                    }),
                                    new sap.m.Input("address_CEP", {
                                        value: oEmployeeAddressCEP
                                    }),
                                    new sap.m.Input("address_number", {
                                        value: oEmployeeAddressNumber
                                    }),
                                    new sap.m.Input("address_complement", {
                                        value: oEmployeeAddressComplement
                                    }),
                                    new sap.m.Input("email", {
                                        value: oEmployeeEmail
                                    })
                                ]
                            })
                        ]
                    })],
                    beginButton: new sap.m.Button({
                        text: "Save",
                        press: function () {
                            var sEmployeeID = sap.ui.getCore().byId("ID").getValue();
                            var sEmployeeName = sap.ui.getCore().byId("name").getValue();
                            var sEmployeeJobTitle = sap.ui.getCore().byId("jobTitle").getValue();
                            var sEmployeeAddressCEP = sap.ui.getCore().byId("address_CEP").getValue();
                            var sEmployeeAddressNumber = sap.ui.getCore().byId("address_number").getValue();
                            var sEmployeeAddressComplement = sap.ui.getCore().byId("address_complement").getValue();
                            var sEmployeeEmail = sap.ui.getCore().byId("email").getValue();

                            var oObject = {};
                            oObject = {
                                "name": sEmployeeName,
                                "jobTitle": sEmployeeJobTitle,
                                "address_CEP": sEmployeeAddressCEP,
                                "address_number": String(sEmployeeAddressNumber),
                                "address_complement": sEmployeeAddressComplement,
                                "email": sEmployeeEmail
                            };
                            
                            var oContext = employeeContext
                            console.log(oContext)
                            for (let [key, value] of Object.entries(oObject)) {
                                if (value != null || values != "") {
                                    console.log(key)
                                    oContext.setProperty(key, value);
                                }
                            }

                            dialog.close();
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: "Cancel",
                        press: function () {
                            dialog.close();
                        }
                    }),
                    afterClose: function () {
                        dialog.destroy();
                    }
                });
                dialog.open();
            },
            /**
             *------------------------------------------------------------------------*
             *     OnDelete                                                         *
             * -----------------------------------------------------------------------*
             */
            OnDelete: function (oEvent) {
                var employeeContext = this._itemContext
           	
                employeeContext.delete();
            },
            /**
             *------------------------------------------------------------------------*
             *     OnSelectionChange                                                  *
             * -----------------------------------------------------------------------*
             */
            OnSelectionChange: function (oEvent) {
                this._item = oEvent.getSource().getBindingContext("model").getObject();
                this._itemContext = oEvent.getSource().getBindingContext("model")
            },

            onSearch: function () {
                var oList = this.byId("List")
                var oBinding = oList.getBinding("items")

                var oView = this.getView(),
                  sValue = oView.byId("searchField").getValue();

                console.log(sValue)
                
                var oFilter = new sap.ui.model.Filter("name", FilterOperator.Contains, sValue)
                oBinding.filter(oFilter)
              }
        });
    });