function init()
{
    data = new Object();
    var set = testData.dataset("Data.tsv");
    
    var targetItem   = new Array();
    var schName      = new Array();
    var srNum        = new Array();
    var srName       = new Array();
    var custName     = new Array();
    var shipNum      = new Array();
     
    var eCode        = new Array();
    var eNum         = new Array();
    var eName        = new Array();
    var srpGName     = new Array();
    //--
    var record = set[0];
    data.sourceItem  = testData.field(record,"SOURCEITEM");
    data.listPrice   = testData.field(record,"LISTPRICE");
    data.wSalePrice  = testData.field(record,"WSALEPRICE");
    data.schDesc     = testData.field(record,"SCHDESC");
    data.custType    = testData.field(record,"CUSTTYPE");
    
    //--
    
    for (var row = 0; row < set.length; ++row)
    {
        var record = set[row];
        targetItem[row]    =  testData.field(record,"TARGETITEM");
        schName[row]       =  testData.field(record,"SCHNAME");
        srNum[row]         =  testData.field(record,"SRNUM");
        srName[row]        =  testData.field(record,"SRNAME");
        custName[row]      =  testData.field(record,"CUSTNAME");
        shipNum[row]       =  testData.field(record,"SHIPNUM");
        
        eCode[row]         =  testData.field(record,"ECODE");
        eNum[row]          =  testData.field(record,"ENUM");
        eName[row]         =  testData.field(record,"ENAME");
        srpGName[row]      =  testData.field(record,"SRPGNAME");
    }   
    
    data.targetItem    = targetItem;
    data.schName       =  schName;
    data.srNum         = srNum;
    data.srName        = srName;
    data.custName      = custName;
    data.shipNum       = shipNum;
    
    data.eCode         = eCode;
    data.eNum          = eNum;
    data.eName         = eName;
    data.srpGName      = srpGName;
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    snooze(1);
    
}


function main()
        
{    
    
    
    //----Verifying the Commission on Managers--
    
    //--Creating an item to calculate Commission on managers ---
    
    copyitem(data.sourceItem,data.targetItem[6],data.listPrice,data.wSalePrice);
    //---Create item-site----
    createRIS(data.targetItem[6]);
    try
    {
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP:*.System_QMenu", "Employees"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "List..."));
        
        //--Employee1--
        try
        {
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            clickButton(waitForObject(":Open Sales Orders.New_QToolButton"));
            type(waitForObject(":_code_XLineEdit_2"),data.eCode[0]);
            nativeType("<Tab>");
            type(waitForObject(":Employee._number_XLineEdit"),data.eNum[0]);
            nativeType("<Tab>");
            type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.eName[0]);
            
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            //---Verifying the Employee Created---
            waitForObject(":_list_XTreeWidget_5");
            if(object.exists("{column='2' container=':_list_XTreeWidget_5' text='"+data.eCode[0]+"' type='QModelIndex'}"))
                test.pass("Employee"+ data.eCode[0] +"created sucessfully");
            else
                test.fail("Employee"+ data.eCode[0] +"creation failed");
            
        }
        catch(e)
        {
            test.fail("Error in creating an "+data.eCode[0]+ "employee");
            if(object.exists(":Sales Order.Cancel_QPushButton_3"))
                clickButton(":Sales Order.Cancel_QPushButton_3");
        }
        //--Employee2--
        try
        {
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            clickButton(waitForObject(":Open Sales Orders.New_QToolButton"));
            type(waitForObject(":_code_XLineEdit_2"),data.eCode[1]);
            nativeType("<Tab>");
            type(waitForObject(":Employee._number_XLineEdit"),data.eNum[1]);
            nativeType("<Tab>");
            type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.eName[1]);
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            //---Verifying the Employee Created---
            waitForObject(":_list_XTreeWidget_5");
            if(object.exists("{column='2' container=':_list_XTreeWidget_5' text='"+data.eCode[1]+"' type='QModelIndex'}"))	 test.pass("Employee"+data.eCode[1]+"created sucessfully");
            
            else
                test.fail("Employee"+ data.eCode[1] +"creation failed");
            
        }
        catch(e)
        {
            test.fail("Error in creating"+ data.eCode[1] +" Employee");
            if(object.exists(":Sales Order.Cancel_QPushButton_3"))
                clickButton(":Sales Order.Cancel_QPushButton_3");
        }
        
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }//End of Main Try
    catch(e)
    {
        test.fail("Error in creating Employee"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
            clickButton(":Sales Order.Cancel_QPushButton_3");
        
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
        
    }
    
    //---Assigning Managers to the Employee--
    
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP:*.System_QMenu", "Employees"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        //--Assign Admin  as manager  to the emp1 
        
        openItemContextMenu(":_list_XTreeWidget_5",data.eCode[0], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Detail");
        type(waitForObject(":_memberGroup.VirtualClusterLineEdit_EmpClusterLineEdit"),"ADMIN");
        
        
        nativeType("<Tab>");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        //---Assign JSMITH as manager to the emp2
        openItemContextMenu(":_list_XTreeWidget_5",data.eCode[1], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Detail");
        type(waitForObject(":_memberGroup.VirtualClusterLineEdit_EmpClusterLineEdit"),"JSMITH");
        
        nativeType("<Tab>");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Assigned Managers to the Employees");
    }
    catch(e)
    {
        test.fail("Error in assigning managers to Employees"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton_3"))
            clickButton(":Sales Order.Cancel_QPushButton_3");
        
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    
    
    
    
    //---Creating Sales Representatives and vendors--
    //---For EMP1----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM"));
        activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Account"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Account_QMenu_2", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_5",data.eCode[0], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        //--Creating Vendor
        clickButton(waitForObject(":Roles._vendor_QCheckBox"));
        snooze(1);
        clickButton(waitForObject(":Roles.Vendor..._QPushButton"));
        waitForObject(":_vendtype_XComboBox");
        clickItem(":_vendtype_XComboBox", "CONTRACTOR-Contractor", 0, 0, 5, Qt.LeftButton);
        type(waitForObject(":_accountNumber_XLineEdit"),data.eNum[0]);
        clickButton(waitForObject(":Sales Order.Save_QPushButton_3"));
        snooze(1);
        //---Creating SalesRep---
        clickButton(waitForObject(":Roles._salesrep_QCheckBox"));
        clickButton(waitForObject(":Roles.Sales Rep..._QPushButton"));
        if(!findObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox").checked)
        {
            waitForObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            clickButton(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            
        }
        type(waitForObject(":_xtcommissionissionsTab.VirtualClusterLineEdit_ExpenseLineEdit_2"),"SALES COMMISSIONS");  
        nativeType("<Tab>");
        
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        snooze(1);
        //--Receive Check option
        clickButton(waitForObject(":Roles.Sales Rep..._QPushButton"));
        if(!findObject(":_xtcommissionissionsTab.Receives Check_XCheckBox_2").checked)
            clickButton(waitForObject(":_xtcommissionissionsTab.Receives Check_XCheckBox_2"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        snooze(1);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        //---Verifying the Satus of SalesRep and vendor ---
        
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='14'  container=':_list_XTreeWidget_5' text= 'Yes' type='QModelIndex'}" && "{column='20' container=':_list_XTreeWidget_5' text='Yes' type='QModelIndex'}"))
            test.pass("Sales Representative and vendor created successfully");
        else  
            test.fail("Sales Representative and vendor  creation failed"); 
        snooze(1);
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        
    }
    catch(e)
    {
        test.fail("Error in relating sales representative and vendor for CRM Account"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
        
    }
    
    //---For EMP2----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM"));
        activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Account"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Account_QMenu_2", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_5",data.eCode[1], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        //--Creating Vendor
        clickButton(waitForObject(":Roles._vendor_QCheckBox"));
        snooze(1);
        clickButton(waitForObject(":Roles.Vendor..._QPushButton"));
        waitForObject(":_vendtype_XComboBox");
        clickItem(":_vendtype_XComboBox", "CONTRACTOR-Contractor", 0, 0, 5, Qt.LeftButton);
        type(waitForObject(":_accountNumber_XLineEdit"),data.eNum[1]);
        clickButton(waitForObject(":Sales Order.Save_QPushButton_3"));
        snooze(1);
        //---Creating SalesRep---
        clickButton(waitForObject(":Roles._salesrep_QCheckBox"));
        clickButton(waitForObject(":Roles.Sales Rep..._QPushButton"));
        
        if(!findObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox").checked)
        {
            waitForObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            clickButton(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            
        }
        type(waitForObject(":_xtcommissionissionsTab.VirtualClusterLineEdit_ExpenseLineEdit_2"),"SALES COMMISSIONS");  
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        snooze(1);
        //--Receive Check option
        clickButton(waitForObject(":Roles.Sales Rep..._QPushButton"));
        if(!findObject(":_xtcommissionissionsTab.Receives Check_XCheckBox_2").checked)
            clickButton(waitForObject(":_xtcommissionissionsTab.Receives Check_XCheckBox_2"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        snooze(1);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        //---Verifying the Satus of SalesRep and vendor ---
        
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='14'  container=':_list_XTreeWidget_5' text= 'Yes' type='QModelIndex'}" && "{column='20' container=':_list_XTreeWidget_5' text='Yes' type='QModelIndex'}"))
            test.pass("Sales Representative and vendor created successfully");
        else  
            test.fail("Sales Representative and vendor  creation failed"); 
        snooze(1);
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        
    }
    catch(e)
    {
        test.fail("Error in relating sales representative and vendor for CRM Account"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
        
    }
    
    //---Editing ADMIN and JSMITH
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM"));
        activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Account"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Account_QMenu_2", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_5","ADMIN", 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(1);
        //---Edit SalesRep---
        
        clickButton(waitForObject(":Roles.Sales Rep..._QPushButton"));
        if(!findObject(":_xtcommissionissionsTab.Receives Check_XCheckBox_2").checked)
            clickButton(waitForObject(":_xtcommissionissionsTab.Receives Check_XCheckBox_2"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        test.log("Edited ADMIN CRM Account sucessfully");
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Error in relating sales representative and vendor for CRM Account ADMIN"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
        
    }
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM"));
        activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Account"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Account_QMenu_2", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_5","JSMITH", 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(1);
        //---Edit SalesRep---
        
        clickButton(waitForObject(":Roles.Sales Rep..._QPushButton"));
        if(!findObject(":_xtcommissionissionsTab.Receives Check_XCheckBox_2").checked)
            clickButton(waitForObject(":_xtcommissionissionsTab.Receives Check_XCheckBox_2"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        test.log("Edited JSMITH CRM Account sucessfully");
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Error in relating sales representative and vendor for CRM Account JSMITH"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
        
    }
    
    
    
    //---Create Sales RepGrp and add sales rep---
    
    
    var grpGDesc = "New Sales Rep Group For Managers";
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Rep Groups");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Rep Groups", 32, 13, 0, Qt.LeftButton);    clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        snooze(1);
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srpGName[1]);
        snooze(1);
        type(waitForObject(":_descrip_XLineEdit"),grpGDesc);
        snooze(1);
        
        //---Add Employee1,Employee2,JSMITH and ADMIN----
        //---Admin
        clickButton(waitForObject(":_stack.Add_QPushButton_2"));
        snooze(1);
        waitForObject(":_stack._salesrepsList_XTreeWidget");
        clickItem(":_stack._salesrepsList_XTreeWidget",'Administrator', 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_stack.Select_QPushButton"));
        //---JSMITH
        clickButton(waitForObject(":_stack.Add_QPushButton_2"));
        snooze(1);
        waitForObject(":_stack._salesrepsList_XTreeWidget");
        clickItem(":_stack._salesrepsList_XTreeWidget",'John Smith', 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_stack.Select_QPushButton"));
        //---Employee1
        clickButton(waitForObject(":_stack.Add_QPushButton_2"));
        snooze(1);
        waitForObject(":_stack._salesrepsList_XTreeWidget");
        clickItem(":_stack._salesrepsList_XTreeWidget",data.eName[0], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_stack.Select_QPushButton"));
        
        //---Employee2
        clickButton(waitForObject(":_stack.Add_QPushButton_2"));
        snooze(1);
        waitForObject(":_stack._salesrepsList_XTreeWidget");
        clickItem(":_stack._salesrepsList_XTreeWidget",data.eName[1], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_stack.Select_QPushButton"));
        
        
        
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2")); 
        //---Verifying the sales rep group created---
        
        
        waitForObject(":_stack._salesrepgrp_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrepgrp_XTreeWidget' text='"+data.srpGName[1]+"' type='QModelIndex'}"))
            test.pass("Sales Representative Group created successfully");
        else  
            test.fail("Sales Representative Group creation failed"); 
        snooze(1);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Sales Representative group"+ data.srpGName[1] +" created with sales representative added under");
    }
    catch(e)
    {
        test.fail("Error in adding sales representative under sales rep group"+e);
        
    }
    
    
    
    
    
    //--Commission schedule-M
    
    
    
    var schDesc = "New Commission schedule created For Managers";
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules", 62, 13, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        type(waitForObject(":_stack._schedName_XLineEdit"),data.schName[10]);
        nativeType("<Tab>");
        type(waitForObject(":_stack._descrip_QTextEdit"),schDesc);
        snooze(1);
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "0");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "2");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "20");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "4");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "50");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "8");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "100");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "0");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //--Verifying the Commission schedule created --
        snooze(1);
        waitForObject(":_stack._commshedes_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._commshedes_XTreeWidget' text='"+data.schName[10]+"' type='QModelIndex'}"))
            test.pass("Commission schedule " + data.schName[10] +" created");
        else
            test.fail("Commission schedule creation failed");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating commission schedule"+e);
        if(object.exists(":_stack.Close_QPushButton"))
            clickButton(":_stack.Close_QPushButton");
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
    }
    
    
    
    
    
    
    
    //---Commission Schedule Assignment for Sales Representative Group---
    
    
    
    
    //--For SalesRepGrp
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules Assignments", 100, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        snooze(1);
        waitForObject(":_stack._commSched_XComboBox");
        clickItem(":_stack._commSched_XComboBox",data.schName[10], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Assignment.Sales Rep Group_XCheckBox"));
        waitForObject(":Assignment._salesRepGrp_XComboBox");
        clickItem(":Assignment._salesRepGrp_XComboBox",data.srpGName[1], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        
        if(!findObject(":Options.Include Sales Managers_XCheckBox").checked)
        {
            waitForObject(":Options.Include Sales Managers_XCheckBox");
            clickButton(":Options.Include Sales Managers_XCheckBox");
            
        }
        clickButton(waitForObject(":Options.Exclude Other Schedules_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":_stack.Query_QToolButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Commission schedule sucessfully assigned to the Sales Representative Group"+data.srpGName[1]);
    }
    catch(e)
    {
        test.fail("Error in assigning commission schedule to "+data.srpGName[1]+"sales representative Group"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
        
    }
    
    
    //---Customer Defaults Setting---
    
    //---Set Customer Defaults settings----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Customer Defaults");
        waitForObject(":_comboGroup._salesrep_XComboBox");
        clickItem(":_comboGroup._salesrep_XComboBox",data.eCode[0] +'-'+data.eName[0], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in setting customer defaults"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }
    
    
    //---Create a Customer and assign EMP1 as its primary salesrep---
    //---Create a Customer ----
    
    
    createCustomer(data.custType,data.custName[13],data.shipNum[13]);
    //---Assigning the primary sales rep to the customer----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.custName[13], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(1);
        //---Verifying the Customer with primary sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.eCode[0]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='Yes' type='QModelIndex'}"))
            test.pass("Primary sales representative associated to the customer sucessfully");
        else  
            test.fail("Failed to assign primary sales representative to the customer ");
        snooze(1); 
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Representative  assigined sucessfully to the customer");
    }
    
    catch(e)
    {
        test.fail("Error in assigning sales representative "+ data.eCode[0] +" as a primary sales representative to the customer "+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    
    
    
    
    
    
    
    //--Configuring the Commission setup---
    
    //Case1:-----'Primary Sales Rep receives' as 'Full', 'Primary Sales Rep's Managers receives' as 'Full'
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Commission");
        waitForObject(":Additional setup option for commission._primarySalesRep_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRep_XComboBox","Full", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._primarySalesRepMgr_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRepMgr_XComboBox","Full", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addSalesRep_XComboBox");
        clickItem(":Additional setup option for commission._addSalesRep_XComboBox","None", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addMgr_XComboBox");
        clickItem(":Additional setup option for commission._addMgr_XComboBox","None", 0, 0, 5, Qt.LeftButton);        
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Sales setup configured sucessfully with Primary sales rep receives full, 'Primary Sales Rep's Managers receives' as 'Full' and remaining set to None");
    }
    catch(e)
    {
        test.fail("Error in configuring the additional setup option for commission in sales setup"+e);
    }
    
    
    
    
    
    
    //---Creating Sales Order and verifying the Managers Commission ---
    
    var disP = "0";
    var sonum = createSalesOrderDiscp(data.custName[13],data.targetItem[6],"100",disP);
    
    //---Edit the sales order and verify Commision applied for Primary and Manager----
    var rate ="2";
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        snooze(2);
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[6], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        
        //---Calculating the Commission%
        var cmnP = ((subtl*rate)/100)+".00";
        test.log(cmnP);
        
        //----Verifying the Commision displayed for Primary sales representative----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.eCode[0]+"' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Rep' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Full' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP+"' type='QModelIndex'}"  ))
            
            test.pass("Commmision rate displayed correctly for primary sales representative "+data.eCode[0]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for primary sales representative under sales order item screen");
        
        //----Verifying the Commision displayed for Manager sales representative----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='ADMIN' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Manager' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Full' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP+"' type='QModelIndex'}"))
            
            test.pass("Commmision rate displayed correctly for Manager ADMIN  on sales order item");
        else
            test.fail("Incorrect commission is displayed for Manager under sales order item screen");
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }   
    
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Sales Order.Save_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    //----Configuring the Commission tab
    //Case2:-----'Primary Sales Rep receives' as 'Full', 'Primary Sales Rep's Managers receives' as 'Split'Add. Sales Rep to 'None', Additional Sales rep managers to 'Split', Manager splits commission with to 'managers'
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Commission");
        waitForObject(":Additional setup option for commission._primarySalesRep_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRep_XComboBox","Full", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._primarySalesRepMgr_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRepMgr_XComboBox","Split", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addSalesRep_XComboBox");
        clickItem(":Additional setup option for commission._addSalesRep_XComboBox","None", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addMgr_XComboBox");
        clickItem(":Additional setup option for commission._addMgr_XComboBox","Split", 0, 0, 5, Qt.LeftButton);        
        waitForObject(":Additional setup option for commission._mngrSplitCommWith_XComboBox");
        clickItem(":Additional setup option for commission._mngrSplitCommWith_XComboBox","Managers", 0, 0, 5, Qt.LeftButton);
        
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Sales setup configured sucessfully with Primary sales rep receives full, 'Primary Sales Rep's Managers receives' as 'Full' and remaining set to None");
    }
    catch(e)
    {
        test.fail("Error in configuring the additional setup option for commission in sales setup"+e);
    }
    
    
    //---Edit Cusotmer and add Employee2 as a additional sales representative---
    
    //---Assigning the Additional sales rep to the customer----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.custName[13], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        //---Assign Additional sales representative 
        snooze(1);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(1);
        
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.eCode[1] +'-'+data.eName[1], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        //---Verifying the Customer with Additional sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.eCode[1]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='No' type='QModelIndex'}"))
            test.pass("Additional sales representative associated to the customer sucessfully");
        else  
            test.fail("Failed to assign additional sales representative to the customer ");
        snooze(1); 
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Additional Sales Representative  assigined sucessfully to the customer");
    }
    
    catch(e)
    {
        test.fail("Error in assigning additional sales representative "+ data.eCode[1] +"  to the customer "+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    
    
    //---Creating Sales Order and verifying the Managers Commission ---
    
    var disP = "0";
    var sonum = createSalesOrderDiscp(data.custName[13],data.targetItem[6],"100",disP);
    
    //---Edit the sales order and verify Commision applied for Primary and Manager----
    var rate ="2";
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        snooze(2);
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[6], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        
        //---Calculating the Commission%
        var cmnP = ((subtl*rate)/100)+".00";
        test.log(cmnP);
        
        //----Verifying the Commision displayed for Primary sales representative----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.eCode[0]+"' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Rep' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Full' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP+"' type='QModelIndex'}"  ))
            
            test.pass("Commmision rate displayed correctly for primary sales representative "+data.eCode[0]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for primary sales representative under sales order item screen");
        
        //----Verifying the Commision displayed for Primary sales representative Manager----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='ADMIN' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Manager' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Full' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP+"' type='QModelIndex'}"))
            
            
            test.pass("Commmision rate displayed correctly for Manager ADMIN on sales order item");
        else
            test.fail("Incorrect commission is displayed for Manager under sales order item screen");
        
        //----Verifying the Commision displayed for Additionalsales representative Manager----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='JSMITH' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Manager' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Split' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP+"' type='QModelIndex'}"))
            
            
            test.pass("Commmision rate displayed correctly for Additional sales representatiave Manager JSMITH on sales order item");
        else
            test.fail("Incorrect commission is displayed for Additional sales representatiave Manager under sales order item screen");
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }   
    
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Sales Order.Save_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    
    
    
    
    
    
    //----Configuring the Commission tab
    //Case3:-----Set all options to full
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Commission");
        waitForObject(":Additional setup option for commission._primarySalesRep_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRep_XComboBox","Full", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._primarySalesRepMgr_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRepMgr_XComboBox","Full", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addSalesRep_XComboBox");
        clickItem(":Additional setup option for commission._addSalesRep_XComboBox","Full", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addMgr_XComboBox");
        clickItem(":Additional setup option for commission._addMgr_XComboBox","Full", 0, 0, 5, Qt.LeftButton);      
        
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Sales setup configured sucessfully with all options set to Full");
    }
    catch(e)
    {
        test.fail("Error in configuring the additional setup option for commission in sales setup"+e);
    }
    
    
    
    
    //---Creating Sales Order and verifying the Managers Commission ---
    
    var disP = "0";
    var sonum = createSalesOrderDiscp(data.custName[13],data.targetItem[6],"100",disP);
    
    
    
    //---Edit the sales order and verify Commision applied for Primary and Manager----
    var rate ="2";
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        snooze(2);
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[6], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        
        //---Calculating the Commission%
        var cmnP = ((subtl*rate)/100)+".00";
        test.log(cmnP);
        
        //----Verifying the Commision displayed for Primary sales representative----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.eCode[0]+"' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Rep' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Full' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP+"' type='QModelIndex'}"  ))
            
            test.pass("Commmision rate displayed correctly for primary sales representative "+data.eCode[0]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for primary sales representative under sales order item screen");
        
        //----Verifying the Commision displayed for Primary sales representative Manager----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='ADMIN' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Manager' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Full' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP+"' type='QModelIndex'}"))
            
            
            test.pass("Commmision rate displayed correctly for Manager ADMIN on sales order item");
        else
            test.fail("Incorrect commission is displayed for Manager under sales order item screen");
        //----Verifying the Commision displayed for Additional sales representative----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.eCode[1]+"' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Rep' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Full' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP+"' type='QModelIndex'}"  ))
            
            test.pass("Commmision rate displayed correctly for Additional sales representative "+data.eCode[1]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for Additional sales representative under sales order item screen");
        //----Verifying the Commision displayed for Additionalsales representative Manager----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='JSMITH' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Manager' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Full' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP+"' type='QModelIndex'}"))
            
            
            test.pass("Commmision rate displayed correctly for Additional sales representatiave Manager JSMITH on sales order item");
        else
            test.fail("Incorrect commission is displayed for Additional sales representatiave Manager under sales order item screen");
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }   
    
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Sales Order.Save_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    
    //Case4:--Configuring the Commission setup   as 'Primary Sales Rep' , Add. Sales Rep to Full, 'Primary Sales Rep Manager , Additional Sales rep managers to 'Split', 'Manager splits commission with' to 'managers' 
    
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Commission");
        waitForObject(":Additional setup option for commission._primarySalesRep_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRep_XComboBox","Full", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._primarySalesRepMgr_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRepMgr_XComboBox","Split", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addSalesRep_XComboBox");
        clickItem(":Additional setup option for commission._addSalesRep_XComboBox","Full", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addMgr_XComboBox");
        clickItem(":Additional setup option for commission._addMgr_XComboBox","Split", 0, 0, 5, Qt.LeftButton);        
        waitForObject(":Additional setup option for commission._mngrSplitCommWith_XComboBox");
        clickItem(":Additional setup option for commission._mngrSplitCommWith_XComboBox","Managers", 0, 0, 5, Qt.LeftButton);
        
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Sales setup configured sucessfully with Primary sales rep receives full, 'Primary Sales Rep's Managers receives' as 'Full' and remaining set to None");
    }
    catch(e)
    {
        test.fail("Error in configuring the additional setup option for commission in sales setup"+e);
    }
    
    
    //---Creating Sales Order and verifying the Managers Commission ---
    
    var disP = "0";
    var sonum = createSalesOrderDiscp(data.custName[13],data.targetItem[6],"100",disP);
    
    
    
    //---Edit the sales order and verify Commision applied for Primary and Manager----
    var rate ="2";
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        snooze(2);
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[6], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        
        //---Calculating the Commission%
        var cmnP = ((subtl*rate)/100)+".00";
        test.log(cmnP);
        //---Split--
        var splt = (cmnP/2)+".00";
        test.log(splt);
        //----Verifying the Commision displayed for Primary sales representative----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.eCode[0]+"' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Rep' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Full' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP+"' type='QModelIndex'}"  ))
            
            test.pass("Commmision rate displayed correctly for primary sales representative "+data.eCode[0]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for primary sales representative under sales order item screen");
        
        //----Verifying the Commision displayed for Primary sales representative Manager----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='ADMIN' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Manager' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Split' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+splt+"' type='QModelIndex'}"))
            
            
            test.pass("Commmision rate displayed correctly for Primary sales representative Manager ADMIN  on sales order item");
        else
            test.fail("Incorrect commission is displayed for Primary sales representative Manager ADMIN under sales order item screen");
        //----Verifying the Commision displayed for Additional sales representative----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.eCode[1]+"' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Rep' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Full' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+cmnP+"' type='QModelIndex'}"  ))
            
            test.pass("Commmision rate displayed correctly for Additional sales representative "+data.eCode[1]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for Additional sales representative under sales order item screen");
        //----Verifying the Commision displayed for Additionalsales representative Manager----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='JSMITH' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Manager' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Split' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+splt+"' type='QModelIndex'}"))
            
            
            test.pass("Commmision rate displayed correctly for Additional sales representatiave Manager JSMITH on sales order item");
        else
            test.fail("Incorrect commission is displayed for Additional sales representatiave Manager under sales order item screen");
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }   
    
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Sales Order.Save_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    //-Case.5--Configure the commisisons   setup , set all options to split and 'Manager splits commission with' to 'Sales Reps' 
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Commission");
        waitForObject(":Additional setup option for commission._primarySalesRep_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRep_XComboBox","Split", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._primarySalesRepMgr_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRepMgr_XComboBox","Split", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addSalesRep_XComboBox");
        clickItem(":Additional setup option for commission._addSalesRep_XComboBox","Split", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addMgr_XComboBox");
        clickItem(":Additional setup option for commission._addMgr_XComboBox","Split", 0, 0, 5, Qt.LeftButton);        
        waitForObject(":Additional setup option for commission._mngrSplitCommWith_XComboBox");
        clickItem(":Additional setup option for commission._mngrSplitCommWith_XComboBox","Managers", 0, 0, 5, Qt.LeftButton);
        
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Sales setup configured sucessfully with all options to split and 'Manager splits commission with' to 'Sales Reps'");
    }
    catch(e)
    {
        test.fail("Error in configuring the additional setup option for commission in sales setup"+e);
    }
    
    
    //---Creating Sales Order and verifying the Managers Commission ---
    
    var disP = "0";
    var sonum = createSalesOrderDiscp(data.custName[13],data.targetItem[6],"100",disP);
    
    
    
    //---Edit the sales order and verify Commision applied for Primary and Manager----
    var rate ="2";
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
        snooze(2);
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
        // Verification Point 'VP1'
        var subtl = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text
                    test.log(subtl);
        waitForObject(":_lineItemsPage.XLineEdit_XLineEdit");
        clickItem(":_lineItemsPage.XLineEdit_XLineEdit",data.targetItem[6], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.Edit_QPushButton"));
        clickTab(waitForObject(":Sales Order Item.qt_tabwidget_tabbar_QTabBar"), "Commissions");
        snooze(1);
        
        //---Calculating the Commission%
        var cmnP = ((subtl*rate)/100);
        test.log(cmnP);
        //---Split--
        var splt = (cmnP/2)+".00";
        //----Verifying the Commision displayed for Primary sales representative----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.eCode[0]+"' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Rep' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Split' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+splt+"' type='QModelIndex'}"  ))
            
            test.pass("Commmision rate displayed correctly for primary sales representative "+data.eCode[0]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for primary sales representative under sales order item screen");
        
        //----Verifying the Commision displayed for Primary sales representative Manager----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='ADMIN' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Manager' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Split' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+splt+"' type='QModelIndex'}"))
            
            
            test.pass("Commmision rate displayed correctly for Manager ADMIN on sales order item");
        else
            test.fail("Incorrect commission is displayed for Manager under sales order item screen");
        //----Verifying the Commision displayed for Additional sales representative----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='"+data.eCode[1]+"' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Rep' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Split' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+splt+"' type='QModelIndex'}"  ))
            
            test.pass("Commmision rate displayed correctly for Additional sales representative "+data.eCode[1]+" on sales order item");
        else
            test.fail("Incorrect commission is displayed for Additional sales representative under sales order item screen");
        //----Verifying the Commision displayed for Additionalsales representative Manager----
        waitForObject(":Commissions._commissions_XTreeWidget");
        
        if(object.exists("{column='0' :Commissions._commissions_XTreeWidget' text='JSMITH' type='QModelIndex'}"&&"{column='4' container=':Commissions._commissions_XTreeWidget' text='Manager' type='QModelIndex'}"&&"{column='5' container=':Commissions._commissions_XTreeWidget' text='Split' type='QModelIndex'}"&&"{column='9' container=':Commissions._commissions_XTreeWidget' text='"+splt+"' type='QModelIndex'}"))
            
            
            test.pass("Commmision rate displayed correctly for Additional sales representatiave Manager JSMITH on sales order item");
        else
            test.fail("Incorrect commission is displayed for Additional sales representatiave Manager under sales order item screen");
        
        clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }   
    
    catch(e)
    {
        
        test.fail("Error occured on verifying the commission rate and commission percentage applied on sales order"+e);
        if(object.exists(":Sales Order Item.Close_QPushButton"))
            clickButton(waitForObject(":Sales Order Item.Close_QPushButton"));
        if(object.exists(":Sales Order.Save_QPushButton_2"))
            clickButton(waitForObject(":Sales Order.Save_QPushButton_2"));
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    
    
    
    
    
    
    
    
         //--REPORTS
    
    //---Configure sales setup with Primary sales rep receives full and remaining set to None---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Commission");
        waitForObject(":Additional setup option for commission._primarySalesRep_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRep_XComboBox","Full", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._primarySalesRepMgr_XComboBox");
        clickItem(":Additional setup option for commission._primarySalesRepMgr_XComboBox","None", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addSalesRep_XComboBox");
        clickItem(":Additional setup option for commission._addSalesRep_XComboBox","None", 0, 0, 5, Qt.LeftButton);
        waitForObject(":Additional setup option for commission._addMgr_XComboBox");
        clickItem(":Additional setup option for commission._addMgr_XComboBox","None", 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Sales setup configured sucessfully with Primary sales rep receives full and remaining set to    None");
    }
    catch(e)
    {
        test.fail("Error in configuring the additional setup option for commission in sales setup"+e);
    }
    
    //---Create an item for verifying Commission--
    
    
    //--Creating an item (Can be used for all Commission schedule assignment verification)---
    
    
    copyitem(data.sourceItem,data.targetItem[7],data.listPrice,data.wSalePrice);
    //---Create item-site----
    createRIS(data.targetItem[7]);
    
    
    
    //--Creating a Commission Schedules---
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules", 62, 13, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        type(waitForObject(":_stack._schedName_XLineEdit"),data.schName[9]);
        nativeType("<Tab>");
        type(waitForObject(":_stack._descrip_QTextEdit"),data.schDesc);
        snooze(1);
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "0");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "10");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "5");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "8");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //-- 
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "10");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "5");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //-- 
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "20");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "2");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        //--
        clickButton(waitForObject(":_stack.Add_QPushButton"));
        type(waitForObject(":_stack._discntUpto_XLineEdit"), "100");
        nativeType("<Tab>");
        type(waitForObject(":_stack._commPercnt_XLineEdit"), "0");
        clickButton(waitForObject(":_stack.Save_QPushButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //--Verifying the Commission schedule created --
        snooze(2);
        waitForObject(":_stack._commshedes_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._commshedes_XTreeWidget' text='"+data.schName[9]+"' type='QMo  delIndex'}"))
            test.pass("Commission schedule " + data.schName[9] +" created");
        else
            test.fail("Commission schedule creation failed");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating commission schedule"+e);
        if(object.exists(":_stack.Close_QPushButton"))
            clickButton(":_stack.Close_QPushButton");
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
    }
    
    
    
    
    
    
    
    //---PART-1-- COMMISSION SCHEDULE ASSIGNMENT FOR SALES REP---
    
    //---Create a sales representative---
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Setup..."));
        waitForObjectItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps");
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Sales Reps", 22, 7, 0, Qt.LeftButton);
        clickButton(waitForObject(":_lineItemsPage.New_QPushButton_2"));
        type(waitForObject(":_number_XLineEdit_2"),data.srNum[15]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP: *._name_XLineEdit"),data.srName[15]);
        nativeType("<Tab>");
        if(!findObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox").checked)
        {
            waitForObject(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            clickButton(":_xtcommissionissionsTab.Use Commission Schedules_XCheckBox");
            
        }
        type(waitForObject(":_xtcommissionissionsTab.VirtualClusterLineEdit_ExpenseLineEdit"),"SALES COMMISSIONS");  
        nativeType("<Tab>");
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        //---Verifying the sales rep created---
        
        waitForObject(":_stack._salesrep_XTreeWidget");
        if(object.exists("{column='0' container=':_stack._salesrep_XTreeWidget' text='"+data.srNum[15]+"' type='QModelIndex'}"))
            test.pass("Sales Representative "+data.srNum[15]+" created successfully");
        else  
            test.fail("Sales Representative "+data.srNum[15]+" creation failed"); 
        snooze(3);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
    }
    catch(e)
    {
        test.fail("Error occured in process of sales representative creation"+e);
        if(object.exists(":Setup.Cancel_QPushButton"))
        {
            clickButton(waitForObject(":Setup.Cancel_QPushButton"));
        }
        if(object.exists(":View Check Run.Save_QPushButton"))
        {
            clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        }
    }             
    
    
    
    //---Create a Customer----
    
    
    createCustomer(data.custType,data.custName[12],data.shipNum[12]);
    
    //---Assigning the primary sales rep to the customer----
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Customer"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Customer_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3",data.custName[12], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        //---Assign sales representative created as primary sales rep to Customer
        snooze(2);
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Sales Reps");
        snooze(1);
        
        clickButton(waitForObject(":Sales Reps.New_QToolButton_2"));
        waitForObject(":Sales Rep Assignment._salesRep_XComboBox");
        clickItem(":Sales Rep Assignment._salesRep_XComboBox",data.srNum[15] +'-'+ data.srName[15], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Sales Rep Assignment.Primary_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        if(object.exists(":Registration Key.Yes_QPushButton"))
            clickButton(":Registration Key.Yes_QPushButton");
        //---Verifying the Customer with primary sales rep assigined--
        snooze(2);
        waitForObject(":Sales Reps._salesReps_XTreeWidget");
        if(object.exists("{column='0' container=':Sales Reps._salesReps_XTreeWidget' text= '"+data.srNum[15]+"' type='QModelIndex'}" && "{column='2' container=':Sales Reps._salesReps_XTreeWidget' text='Yes' type='QModelIndex'}"))
            test.pass("Primary sales representative associated to the customer sucessfully");
        else  
            test.fail("Failed to assign primary sales representative to the customer ");
        snooze(1); 
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("Sales Representative  assigined sucessfully to the customer");
    }
    
    catch(e)
    {
        test.fail("Error in assigning primary sales representative to the customer "+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    
    
    
    
    
    
    
    //---Commission Schedule Assignment by sales rep--
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Setup..."));
        clickItem(":Setup._tree_XTreeWidget", "Master Information.Commission Schedules Assignments", 100, 8, 0, Qt.LeftButton);
        clickButton(waitForObject(":_stack.New_QToolButton"));
        snooze(1);
        waitForObject(":_stack._commSched_XComboBox");
        clickItem(":_stack._commSched_XComboBox",data.schName[9], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":Assignment.Sales Rep_XCheckBox"));
        waitForObject(":Assignment._salesRep_XComboBox");
        clickItem(":Assignment._salesRep_XComboBox",data.srNum[15], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":Options.Exclude Other Schedules_XCheckBox"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        clickButton(waitForObject(":_stack.Query_QToolButton"));
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        test.log("Commission schedule assigned sucessfully to the sales rep");
    }
    catch(e)
    {
        test.fail("Error in assigning commission schedule to sales representative"+e);
        if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
    }
    
  
    //----Creating the sales Order and verifying the commission applied based in discount rate ---
    
    var disP = "20";
    var sonum = createSalesOrderDiscp(data.custName[12],data.targetItem[7],"100",disP);
    
    //--Ship the SO Created---
    issueStock(sonum);
    
    //---Create Invoice---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "Billing Selections..."));
        snooze(0.5);
        if(OS.name != "Windows")
        {
            type(waitForObject(":xTuple ERP:*.Invoice_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP:*.Billing_QMenu"), "<Left>");
            type(waitForObject(":xTuple ERP: *.Sales_QMenu"), "<Esc>");
        }
        
        
        openItemContextMenu(":Billing Selections._cobill_XTreeWidget",sonum, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Create Invoice"));
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in creating the Invoice:"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
        {
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        }
    }
    
    //---Posting the Invoice ----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP: *.Sales_QMenu", "Billing"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Billing_QMenu", "Invoice"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Invoice_QMenu", "List Unposted Invoices..."));
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='2' container=':_list_XTreeWidget_5' text='"+sonum+"' type='QModelIndex'}"))
            test.pass("Invoice creation successful");
        else  
            test.fail("Invoice creation failed"); 
        openItemContextMenu(":_list_XTreeWidget_5",sonum, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        if(object.exists(":OK_QPushButton"))
            clickButton(waitForObject(":OK_QPushButton"));
        snooze(2);
        var inv1 = findObject(":_invoiceNumber_XLineEdit").text
                   test.log(inv1);
        
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
        snooze(1);
        
        openItemContextMenu(":_list_XTreeWidget_5", sonum, 5, 5, Qt.LeftButton);         
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Post..."));
        clickButton(waitForObject(":List Unposted Vouchers.Continue_QPushButton"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        if(object.exists("{column='2' container=':_list_XTreeWidget_5' text='"+sonum+"' type='QModelIndex'}"))
            test.fail("Failed to post the invoice");
        else  
            test.pass("Invoice posted sucessfuly");  
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        
    }   
    
    
    
    
    
    
    //---Verifying the Reports--'Show Open Commissionable' 
    
    //---Open Commissions--after invoice posting
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Reports"));
        activateItem(waitForObjectItem(":*.Reports_QMenu", "Sales Rep Commission..."));
        snooze(2);
 
        waitForObject(":Parameters._salesRepChoice_XComboBox");
        clickItem(":Parameters._salesRepChoice_XComboBox",data.srNum[15] +'-'+ data.srName[15], 0, 0, 5, Qt.LeftButton); 
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
        type(waitForObject(":_filterGroup.XDateEdit_XDateEdit"),"0");
        nativeType("<Tab>");
        findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
        type(waitForObject(":_filterGroup.XDateEdit_XDateEdit_2"),"0");
        nativeType("<Tab>");

        waitForObject(":Parameters._status_XComboBox");
        clickItem(":Parameters._status_XComboBox", "Show Open Commissionable", 0, 0, 5, Qt.LeftButton); 
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='2' container=':_list_XTreeWidget_5' text='"+sonum+"' type='QModelIndex'}" && "{column='5' container=':_list_XTreeWidget_5' text='Open' type='QModelIndex'}")) 
            test.pass("Open Commissions are sucessfully verified");
        else  
            test.fail("Failed to verify open commissions");   
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Error in Verifying the open commissions displayed under sale representataive commissions screen"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    
    //---Preparing and posting the cash receipt--
    //----Entering CashReceipt-------
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "Accounts Receivable"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Accounts Receivable_QMenu", "Workbench..."));
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Cash Receipts");
        
        waitForObject(":_cashRecptTab.New_QPushButton");
        clickButton(":_cashRecptTab.New_QPushButton");
        waitForObject(":Cash Receipt.VirtualClusterLineEdit_CLineEdit");
        type(":Cash Receipt.VirtualClusterLineEdit_CLineEdit",data.custName[12]);
        snooze(1);
        nativeType("<Tab>");
        waitForObject(":_applicationsTab._aropen_XTreeWidget_2");
        doubleClickItem(":_applicationsTab._aropen_XTreeWidget_2",inv1, 5, 5, 0, Qt.LeftButton);
        //waitForObject(":[*]Voucher.XLineEdit_XLineEdit");
        snooze(1);
        var qtinvoice= findObject(":[*]Voucher.XLineEdit_XLineEdit").text
                       test.log(qtinvoice);
        
        type(":Cash Receipt Application.XLineEdit_XLineEdit", qtinvoice);
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit_2");
        type(":Cash Receipt.XLineEdit_XLineEdit_2", qtinvoice);
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        test.log("Cash receipt is created");
    }
    catch(e)
    {
        test.fail("Error in creating cash receipt:" + e);
    }
    //-----Posting Cash Receipts-----
    try
    {
        waitForObject(":_cashRecptTab._cashrcpt_XTreeWidget");
        while(findObject(":_cashRecptTab._cashrcpt_XTreeWidget").topLevelItemCount >= 1)
        {
            clickItem(":_cashRecptTab._cashrcpt_XTreeWidget",data.custName[12], 5, 5, 1, Qt.LeftButton);
            clickButton(waitForObject(":_cashRecptTab.Post_QPushButton"));
            
            var flag =1;
        }   
        
        waitForObject(":Receivables Workbench.Close_QPushButton");
        clickButton(":Receivables Workbench.Close_QPushButton");
        test.log("Cash receipts posted successful");
    }
    catch(e)
    {
        flag = 0;
        test.fail("Error in posting cash receipts:" + e);
        if(object.exists(":Receivables Workbench.Close_QPushButton"))
        {
            waitForObject(":Receivables Workbench.Close_QPushButton");
            clickButton(":Receivables Workbench.Close_QPushButton");
        }
        
    }
    
    //----Verifying the Reports 'Show Closed/Unpaid Commissionable' ---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Reports"));
        activateItem(waitForObjectItem(":*.Reports_QMenu", "Sales Rep Commission..."));
        snooze(2);
        waitForObject(":Parameters._salesRepChoice_XComboBox");
        clickItem(":Parameters._salesRepChoice_XComboBox",data.srNum[15] +'-'+ data.srName[15], 0, 0, 5, Qt.LeftButton); 
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
        type(waitForObject(":_filterGroup.XDateEdit_XDateEdit"),"0");
        nativeType("<Tab>");
        findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
        type(waitForObject(":_filterGroup.XDateEdit_XDateEdit_2"),"0");
        nativeType("<Tab>");
        waitForObject(":Parameters._status_XComboBox");
        clickItem(":Parameters._status_XComboBox", "Show Closed/Unpaid Commissionable", 0, 0, 5, Qt.LeftButton); 
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='2' container=':_list_XTreeWidget_5' text='"+sonum+"' type='QModelIndex'}" && "{column='5' container=':_list_XTreeWidget_5' text='Closed' type='QModelIndex'}")) 
            
            test.pass("Unpaid Commissions entries are sucessfully verified");
        else  
            test.fail("Failed to verify unpaid commission entries");   
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Error in Verifying the Closed Commissions entries displayed under sale representataive commissions screen"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    
    //---Pay Commission and verify the batch number generation---
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Reports"));
        activateItem(waitForObjectItem(":*.Reports_QMenu", "Sales Rep Commission..."));
        snooze(2);
        waitForObject(":Parameters._salesRepChoice_XComboBox");
        clickItem(":Parameters._salesRepChoice_XComboBox",data.srNum[15] +'-'+ data.srName[15], 0, 0, 5, Qt.LeftButton); 
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
        type(waitForObject(":_filterGroup.XDateEdit_XDateEdit"),"0");
        nativeType("<Tab>");
        findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
        type(waitForObject(":_filterGroup.XDateEdit_XDateEdit_2"),"0");
        nativeType("<Tab>");
        waitForObject(":Parameters._status_XComboBox");
        clickItem(":Parameters._status_XComboBox", "Show Closed/Unpaid Commissionable", 0, 0, 5, Qt.LeftButton); 
        waitForObject(":_list_XTreeWidget_5");
        openItemContextMenu(":_list_XTreeWidget_3",sonum, 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Pay Commission for selected Invoices"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        snooze(1);
        waitForObject(":Parameters._status_XComboBox");
        clickItem(":Parameters._status_XComboBox", "Show Closed/Paid Commissionable", 0, 0, 5, Qt.LeftButton);
        if(object.exists("{column='2' container=':_list_XTreeWidget_5' text='"+sonum+"' type='QModelIndex'}"))
        {
            var batchnum =findObject("{column='14' container=':_list_XTreeWidget_5' type='QModelIndex'}").text;
            if(batchnum != "")
                
                test.pass("Payed Commissions entries are sucessfully verified");
            else  
                test.fail("Failed to verify payed commission entries");   
            
        }
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Error in Verifying the Closed Commissions entries displayed under sale representataive commissions screen"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    
    
    
    //----Verifying the reports..show all commissions
    
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Sales"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Reports"));
        activateItem(waitForObjectItem(":*.Reports_QMenu", "Sales Rep Commission..."));
        snooze(2);
        waitForObject(":Parameters._salesRepChoice_XComboBox");
        clickItem(":Parameters._salesRepChoice_XComboBox",data.srNum[15] +'-'+ data.srName[15], 0, 0, 5, Qt.LeftButton); 
        findObject(":_filterGroup.XDateEdit_XDateEdit").clear();
        type(waitForObject(":_filterGroup.XDateEdit_XDateEdit"),"0");
        nativeType("<Tab>");
        findObject(":_filterGroup.XDateEdit_XDateEdit_2").clear();
        type(waitForObject(":_filterGroup.XDateEdit_XDateEdit_2"),"0");
        nativeType("<Tab>");
        waitForObject(":Parameters._status_XComboBox");
        clickItem(":Parameters._status_XComboBox", "Show All Commissionable" , 0, 0, 5, Qt.LeftButton); 
        waitForObject(":_list_XTreeWidget_5");
        if(object.exists("{column='2' container=':_list_XTreeWidget_5' text='"+sonum+"' type='QModelIndex'}")) 
            
            test.pass("Commissions entries are sucessfully verified");
        else  
            test.fail("Failed to verify commission entries");   
        
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
    }
    catch(e)
    {
        test.fail("Error in Verifying the Commissions entries displayed under sale representataive commissions screen"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
        {
            clickButton(":Quotes.Close_QToolButton");
        }
    }
    
    
    
    
}




