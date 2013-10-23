

function init()
{
    data = new Object();
    var set = testData.dataset("Data.tsv");
    
    var empCode = new Array();  
    var empNum = new Array();
    var empName = new Array();
    var empGrp = new Array();
    
    
    
    
    var record = set[0];
    data.uName      = testData.field(record,"UNAME");
    data.editEmpNum = testData.field(record,"EDITEMPNUM");
    data.editEmpGrp = testData.field(record,"EDITEMPGRP");
    
    
    
    
    
    
    for (var row = 0; row < set.length; ++row)
    {
        var record = set[row];
        empCode[row]    = testData.field(record,"EMPCODE");
        empNum[row]     = testData.field(record,"EMPNUM");
        empName[row]    = testData.field(record,"EMPNAME");
        empGrp[row]     = testData.field(record,"EMPGRP");
    }   
    
    data.empCode   = empCode;
    data.empGrp    = empGrp;
    data.empNum    = empNum;
    data.empName   = empName;
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    snooze(1);
}


function main()
{
    
    
    //-----Editing of preferences----
    try
    {
        if(OS.name == "Darwin")
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Preferences..."));
        }
        else
        {
            waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
            activateItem(":xTuple ERP: *_QMenuBar", "System");
            waitForObjectItem(":xTuple ERP: *._System_QMenu", "Preferences...");
            activateItem(":xTuple ERP: *._System_QMenu", "Preferences..."); 
        }
        snooze(0.5);
        if(object.exists(":Interface Options.Show windows inside workspace_QRadioButton"))
        {
            if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
                clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
        }
        snooze(0.3);
        if(object.exists(":Notice.Notice_QDialog"))
        {
            if(findObject(":Notice.Remind me about this again._QCheckBox").checked)
                clickButton(":Notice.Remind me about this again._QCheckBox");
            snooze(0.2);
            waitForObject(":Notice.OK_QPushButton");
            clickButton(":Notice.OK_QPushButton");
        }
        
        waitForObject(":View Check Run.Save_QPushButton");
        clickButton(":View Check Run.Save_QPushButton");
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP: *._System_QMenu", "Rescan Privileges");
        snooze(3);
    }
    catch(e)
    {
        test.fail("Error in editing preferences"+ e);
    }  
    
    //--------Exiting the application------
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
    activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Exit xTuple ERP..."));
    
    snooze(5);
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 
    snooze(3);
    
    
    
    
    //---Creating a New Employee ----
    //username should be exactly similar to Empcode but in small letters
    
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        try
        {
            clickButton(waitForObject(":Quotes.New_QToolButton"));
            type(waitForObject(":_code_XLineEdit_3"),data.empCode[0]);
            nativeType("<Tab>");
            type(waitForObject(":xTuple ERP:*._number_XLineEdit"),data.empNum[0]);
            snooze(0.5);
            if(!findObject(":xTuple ERP:*.Active_XCheckBox").checked)
                clickButton(":xTuple ERP:*.Active_XCheckBox");
            
            type(waitForObject(":xTuple ERP:*._name_XLineEdit"),data.empName[0]);
            
            clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Detail");
            
            type(waitForObject(":_memberGroup.VirtualClusterLineEdit_EmpClusterLineEdit_2"), "JSMITH");
            nativeType("<Tab>");
            type(waitForObject(":_filterGroup.XDateEdit_XDateEdit"), "<0>");
            nativeType("<Tab>");
            type(waitForObject(":_timeclockGroup.VirtualClusterLineEdit_DeptClusterLineEdit_2"), "ADMIN");            nativeType("<Tab>");
            type(waitForObject(":_timeclockGroup.VirtualClusterLineEdit_ShiftClusterLineEdit_2"), "DAY");
            nativeType("<Tab>");
            
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            //-----Verifying the Employee Created ----
            snooze(1);
            if(object.exists("{column='3' container=':_list_XTreeWidget_3' text='"+data.empNum[0]+"' type='QModelIndex'}"))
                test.pass("Employee " +data.empCode[0] +" created sucessfully");
            else
                test.fail("Employee creation failed");
            
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
            
        }
        catch(e)
        {
            test.fail("Error in creating and verifying an Employee"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(":Sales Order.Cancel_QPushButton");
            if(object.exists(":Quotes.Close_QToolButton"))
                clickButton(":Quotes.Close_QToolButton");
        }
        
        
    }//Main try
    catch(e)
    {
        test.fail("Error in creating Employee "+e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
        
    }
    
    
    //--Verifying the CRM Created----
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "CRM"));
        activateItem(waitForObjectItem(":xTuple ERP:*.CRM_QMenu", "Account"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Account_QMenu_2", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        waitForObject(":_list_XTreeWidget_3");
        snooze(1);
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+data.empCode[0]+"' type='QModelIndex'}"))
            test.pass("CRM Account related to employee" + data.empCode[0] +" created sucessfully");
        else
            test.fail("CRM Account Creation failed");
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        
        
    }
    catch(e)
    {
        test.fail("Error in creating the CRM Account associated to an Employee"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    //----Assiging user Account to Employee and verifying the User account creaetd ---
    
    try
    {
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        openItemContextMenu(":_list_XTreeWidget_3", data.empCode[0], 5, 5, Qt.LeftButton);
        activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
        clickButton(waitForObject(":Employee.CRM Account..._QPushButton"));
        clickButton(waitForObject(":Roles._user_QCheckBox"));
        clickButton(waitForObject(":Roles.User..._QPushButton"));
        clickButton(waitForObject(":User Information.Save_QPushButton"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        test.log("sucessfully assigned user Account for an Employee");
    }
    catch(e)
    {
        test.fail("Error in assiging user account to an employee"+e);
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
        
    }
    
    
    
    //---Verifying the User Account Created---
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Maintain Users..."));
        snooze(1);
        if(object.exists("{column='0' container=':xTuple ERP:*._usr_XTreeWidget' text='"+data.uName +"' type='QModelIndex'}"))
            test.pass("User Acclunt" +data.uName +" created");
        else
            test.fail("Error in creating an user Account");
        
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.fail("Error in verifying the User account created"+e);
        
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    
    
    //-----Operations on Employee-----
    
    //---Performing Operations on Employee----
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        //---Duplicating Employee---
        try
        {
            clickButton(waitForObject(":Quotes.New_QToolButton"));
            type(waitForObject(":_code_XLineEdit_3"),data.empCode[0]);
            nativeType("<Tab>");
            type(waitForObject(":xTuple ERP:*._number_XLineEdit"),"555");
            snooze(0.5);
            if(!findObject(":xTuple ERP:*.Active_XCheckBox").checked)
                clickButton(":xTuple ERP:*.Active_XCheckBox");
            
            type(waitForObject(":xTuple ERP:*._name_XLineEdit"),"ZenEmp2");
            clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Detail");
            
            type(waitForObject(":_memberGroup.VirtualClusterLineEdit_EmpClusterLineEdit_2"), "JSMITH");
            nativeType("<Tab>");
            type(waitForObject(":_filterGroup.XDateEdit_XDateEdit"), "<0>");
            nativeType("<Tab>");
            type(waitForObject(":_timeclockGroup.VirtualClusterLineEdit_DeptClusterLineEdit_2"), "ADMIN");            nativeType("<Tab>");
            type(waitForObject(":_timeclockGroup.VirtualClusterLineEdit_ShiftClusterLineEdit_2"), "DAY");
            nativeType("<Tab>");
            
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            
            if(object.exists(":Sales Order.OK_QPushButton_2"))
            {
                test.pass("It is not possible to duplicate an Employee");
                clickButton(":Sales Order.OK_QPushButton_2");
                clickButton(waitForObject(":Sales Order.Cancel_QPushButton"));
            }
            else
            {
                test.fail("It is possible to duplicate an Employee");
                if(object.exists(":Select Order for Billing.Save_QPushButton"))
                    clickButton(":Select Order for Billing.Save_QPushButton");
            }
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            
            
        }
        catch(e)
        {
            test.fail("Error in verifying an Employee duplication"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(":Sales Order.Cancel_QPushButton");
        }
        
        //--Editing Employee----
        
        try{
            snooze(1);
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            openItemContextMenu(":_list_XTreeWidget_3", data.empCode[0], 5, 5, Qt.LeftButton);
            activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
            findObject(":xTuple ERP:*._number_XLineEdit").clear();
            type(waitForObject(":xTuple ERP:*._number_XLineEdit"),data.editEmpNum);
            
            nativeType("<Tab>"); 
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        }
        
        catch(e)
        {
            test.fail("Error in editing the employee"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(":Sales Order.Cancel_QPushButton");
            if(object.exists(":Quotes.Close_QToolButton"))
                clickButton(":Quotes.Close_QToolButton");
            
        }
        
        //---Verifying the changes made after editing ----
        try
        {
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            waitForObject(":_list_XTreeWidget_3");
            snooze(1);
            if(object.exists("{column='3' container=':_list_XTreeWidget_3' text='"+data.editEmpNum+"' type='QModelIndex'}"))
                test.pass("Employee " + data.empCode[0] +" edited created sucessfully");
            else
                test.fail("Employee editing failed");
        }
        catch(e)
        {
            test.fail("Error in verifying the Emplloyee created"+e);
            if(object.exists(":Quotes.Close_QToolButton"))
                clickButton(":Quotes.Close_QToolButton");
            
        }
        
        //---Deleting Employee---
        try
        {
            snooze(1);
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            openItemContextMenu(":_list_XTreeWidget_3",data.editEmpNum, 5, 5, Qt.LeftButton);
            activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete"));
            clickButton(waitForObject(":View Check Run.Yes_QPushButton_2"));
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='"+data.editEmpNum+"' type='QModelIndex'}"))
                test.fail("Failed to delete "+ data.empCode[0] +" Employee");
            
            else
                test.pass("Employee "+ data.empCode[0] +"Deleted sucessfully");
            
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
        }
        
        
        catch(e)
        {
            test.fail("Error in Deleting the Employee created"+e);
            if(object.exists(":Quotes.Close_QToolButton"))
                clickButton(":Quotes.Close_QToolButton");
            
        }
        
        
        
    }//End of Main Try for operaions
    
    
    catch(e)//Main catch for Emp Operations
    {
        test.fail("Error in verifying the Employee created"+e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
        
    }
    
    
    //----For Employee Group----
    
    
    //--Creating an Employee Group ----
    
    try
    {
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "Employee Groups..."));
        //--Create Employee Group---
        
        clickButton(waitForObject(":xTuple ERP:*.New_QPushButton"));
        type(waitForObject(":GroupBox1._name_XLineEdit_2"),data.empGrp[0]);
        nativeType("<Tab>");
        type(waitForObject(":GroupBox1._descrip_XLineEdit_2"), "New EMployee GROUP");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        snooze(1);
        if(object.exists("{column='0' container=':xTuple ERP:*._empgrp_XTreeWidget' text='"+data.empGrp[0]+"' type='QModelIndex'}"))
            test.pass("Employee Group" + data.empGrp[0] +" created sucessfully");
        else
            test.fail("Employee Group creation failed");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Creating an Employee Group"+e)
                if(object.exists(":Sales Order.Close_QPushButton"))
                    clickButton(":Sales Order.Close_QPushButton");   
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    
    
    
    
    
    
    //---Operations on Employee Group--
    try
    {
        
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "Employee Groups..."));
        //--Editing Employee Group---
        try
        {
            
            clickItem(":xTuple ERP:*._empgrp_XTreeWidget",data.empGrp[0], 0, 0, 5, Qt.LeftButton);
            clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
            findObject(":GroupBox1._descrip_XLineEdit_2").clear();
            type(waitForObject(":GroupBox1._descrip_XLineEdit_2"),data.editEmpGrp);
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        }
        catch(e)
        {
            test.log("Error in editing an employee group"+e);
            if(object.exists(":Sales Order.Close_QPushButton"))
                clickButton(":Sales Order.Close_QPushButton");   
        }
        //---Verifying the changes made ----
        try
        {
            snooze(1);
            if(object.exists("{column='1' container=':xTuple ERP:*._empgrp_XTreeWidget' text='"+data.editEmpGrp+"' type='QModelIndex'}"))
                test.pass("Employee Group " + data.empGrp[0] + " edited created sucessfully");
            else
                test.fail("Employee Group editing failed");
            
        }
        catch(e)
        {
            test.fail("Failed to verify the changes made in employee group"+e);
            
        }
        
        
        //---Deleting an Employee Group
        
        
        try
        {
            snooze(1);
            clickItem(":xTuple ERP:*._empgrp_XTreeWidget",data.empGrp[0], 0, 0, 5, Qt.LeftButton);
            clickButton(waitForObject(":xTuple ERP:*.Delete_QPushButton"));
            //--Verifying the Employee group after deletion
            
            if(object.exists("{column='0' container=':xTuple ERP:*._empgrp_XTreeWidget' text='"+data.empGrp[0]+"' type='QModelIndex'}"))
                
                test.fail("Employee Group deletion failed");
            
            
            else
                test.pass("Employee Group " +data.empGrp[0]+ " Deleted sucessfully");
            
            
        }
        catch(e)
        {
            test.fail("Error in deleting the Employee Group");
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(":Select Order for Billing.Close_QPushButton");   
        }
        
        
        clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }
    catch(e)
    {
        test.log("Error in performing operations on employee group"+e);
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");   
        
        
    }
    
    
    
    
    
    
    
    //--Attaching an Employee to Employee Group---
    
    
    
    
    //---Creating a New Employee ----
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        clickButton(waitForObject(":Quotes.New_QToolButton"));
        type(waitForObject(":_code_XLineEdit_3"),data.empCode[1]);
        nativeType("<Tab>");
        type(waitForObject(":xTuple ERP:*._number_XLineEdit"),data.empNum[1]);
        snooze(0.5);
        if(!findObject(":xTuple ERP:*.Active_XCheckBox").checked)
            clickButton(":xTuple ERP:*.Active_XCheckBox");
        
        type(waitForObject(":xTuple ERP:*._name_XLineEdit"),data.empName[1]);
        
        clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Detail");
        
        type(waitForObject(":_memberGroup.VirtualClusterLineEdit_EmpClusterLineEdit_2"), "JSMITH");
        nativeType("<Tab>");
        type(waitForObject(":_filterGroup.XDateEdit_XDateEdit"), "<0>");
        nativeType("<Tab>");
        type(waitForObject(":_timeclockGroup.VirtualClusterLineEdit_DeptClusterLineEdit_2"), "ADMIN");            nativeType("<Tab>");
        type(waitForObject(":_timeclockGroup.VirtualClusterLineEdit_ShiftClusterLineEdit_2"), "DAY");
        nativeType("<Tab>");
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        
        //-----Verifying the Employee Created ----
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        waitForObject(":_list_XTreeWidget_3");
        snooze(1);
        if(object.exists("{column='3' container=':_list_XTreeWidget_3' text='"+data.empNum[1]+"' type='QModelIndex'}"))
            test.pass("Employee " + data.empCode[1] +" created sucessfully");
        else
            test.fail("Employee " + data.empCode[1] +" creation failed");
        
        clickButton(waitForObject(":Quotes.Close_QToolButton"));
        
        
        
    }
    catch(e)
    {
        test.fail("Error in creating Employee "+e);
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
        
    }
    
    //--Creating an Employee Group ----
    
    
    
    try
    {
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "Employee Groups..."));
        //--Create Employee Group---
        
        clickButton(waitForObject(":xTuple ERP:*.New_QPushButton"));
        type(waitForObject(":GroupBox1._name_XLineEdit_2"),data.empGrp[1]);
        nativeType("<Tab>");
        type(waitForObject(":GroupBox1._descrip_XLineEdit_2"), "New EMployee GROUP");
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        //---Verifying the Employee Group Created---
        snooze(1);
        if(object.exists("{column='0' container=':xTuple ERP:*._empgrp_XTreeWidget' text='"+data.empGrp[1]+"' type='QModelIndex'}"))
            test.pass("Employee Group" +data.empGrp[1] +" created sucessfully");
        else
            test.fail("Employee Group creation failed");
        clickButton(":Select Order for Billing.Close_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Creating Employee Group"+e)
                if(object.exists(":Sales Order.Close_QPushButton"))
                    clickButton(":Sales Order.Close_QPushButton"); 
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    
    
    
  
    
    
    //----Attaching Employee to Employee group craeted
    var flag = "0";
    
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "Employee Groups..."));
       
        try
        {
            
            snooze(1);
            clickItem(":xTuple ERP:*._empgrp_XTreeWidget",data.empGrp[1], 10, 10, 0, Qt.LeftButton);
            clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
            
            clickButton(waitForObject(":xTuple ERP:*.New_QPushButton_2"));
            
            waitForObject(":_listTab_XTreeWidget_22");
            clickItem(":_listTab_XTreeWidget_22",data.empCode[1], 0, 0, 5, Qt.LeftButton);
            
            clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
        }
        catch(e)
        {
            test.fail("Error in creating an employee group with employee attached"+e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(":Select Order for Billing.Close_QPushButton");
            
        }
        
        //---Verifying the Employee attached to employee group
        
        clickItem(":xTuple ERP:*._empgrp_XTreeWidget",data.empGrp[1], 0, 0, 5, Qt.LeftButton);
        clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
        
        snooze(1);
        
        if(object.exists("{column='0' container=':Employee Group._empgrpitem_XTreeWidget' text='"+data.empCode[1]+"' type='QModelIndex'}"))
            
        {
            flag ="1";    
            test.pass("Employee "+data.empCode[1]+" sucessfully attached to an Employee Group");
            
            
        }
        else
            test.fail("Employee " +data.empCode[1] +"failed to attach to an employee group");
        
        clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));  
        
        clickButton(":Select Order for Billing.Close_QPushButton");
        
        
    }//end of main try
    catch(e)
    {
        test.fail("Error in attaching an employee to employee group"+e);
                if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
                if(object.exists(":Sales Order.Close_QPushButton"))
                    clickButton(":Sales Order.Close_QPushButton");
        
        
        
    }
    
    
    //----Deleting an employee group with employee associated
    if(flag ==1)
    {
        
        try
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
            activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "Employee Groups..."));
            clickItem(":xTuple ERP:*._empgrp_XTreeWidget",data.empGrp[1], 0, 0, 5, Qt.LeftButton);
            snooze(1);
            clickButton(waitForObject(":xTuple ERP:*.Delete_QPushButton"));
            snooze(2);
            
            if(object.exists(":Sales Order.OK_QPushButton_2"))
            {
                test.pass("It is not possible to delete an employee group with employee associated");
                clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
            }
            else
                test.fail("No error message is displayed on seleting to delete an employee group with employee associate");
            clickButton(":Select Order for Billing.Close_QPushButton");
            
        }
        catch(e)
        {
            test.fail("Error occured in process of verifying employee group deletion associated with an employee"+e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(":Select Order for Billing.Close_QPushButton");
            
        }
        
    }//end of if
    else
    {
        test.fail("No employee attached to an employee group");
    }
    
    
    //---Deleting an employee associated to employee group---
    if(flag ==1)
    {
        try
        {
            
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
            activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "Employee Groups..."));
            
            //--Deleting the employee assigned to employee group---
            try
            {
                clickItem(":xTuple ERP:*._empgrp_XTreeWidget",data.empGrp[1], 0, 0, 5, Qt.LeftButton);
                clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
                snooze(1);
                clickItem(":Employee Group._empgrpitem_XTreeWidget",data.empCode[1], 0, 0, 5, Qt.LeftButton);
                snooze(1);
                clickButton(waitForObject(":Employee Group.Delete_QPushButton"));
                clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            }
            catch(e)
            {
                test.fail("Error in deleting an employee "+e);
                if(object.exists(":Sales Order.Close_QPushButton"))
                    clickButton(":Sales Order.Close_QPushButton");
                
            }
            
            //---Verifying the employee after deletion--
            clickItem(":xTuple ERP:*._empgrp_XTreeWidget",data.empGrp[1], 0, 0, 5, Qt.LeftButton);
            clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
            
            if(object.exists("{column='0' container=':Employee Group._empgrpitem_XTreeWidge' text='"+data.empCode[1]+"' type='QModelIndex'}"))
                test.fail("Employee " +data.empCode[1] +"failed to delete");
            
            else
                test.pass("Employee " +data.empCode[1]+ " related to employee group deleted sucessfully");
            
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));  
            
            clickButton(":Select Order for Billing.Close_QPushButton");
            
            
            
        }
        catch(e)
        {
            test.fail("Error in deleting an employee attached to employee group"+e);
            if(object.exists(":Sales Order.Close_QPushButton"))
                clickButton(":Sales Order.Close_QPushButton");
            
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(":Select Order for Billing.Close_QPushButton");
            
        }
    }//end of if
    else
    {
        test.fail("No Employee attached to employee group");
    }
    
    
    //----Deleting an Employee Group after deleting an Employee associated---
    
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "Employee Groups..."));
        clickItem(":xTuple ERP:*._empgrp_XTreeWidget",data.empGrp[1], 0, 0, 5, Qt.LeftButton);
        snooze(1);
        clickButton(waitForObject(":xTuple ERP:*.Delete_QPushButton"));
        snooze(2);
        
        if(object.exists("{column='0' container=':xTuple ERP:*._empgrp_XTreeWidget' text='"+data.empGrp[1]+"' type='QModelIndex'}"))
            test.fail("Failed to delete an employee Group" +data.empGrp[1] +"");
        else
            test.pass("Employee Group " +data.empGrp[1] +" Deleted Sucessfully");
        clickButton(":Select Order for Billing.Close_QPushButton");
        
    }
    catch(e)
    {
        test.fail("Error in deleting an employee Group after deleting an employee associated"+e);
        
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(":Select Order for Billing.Close_QPushButton");
    }
    
    
    
    
    
    //----Attaching an Employee Group to an Employee and Verify that Employee is attached--
    
    //--Creating an Employee Group ----
    
    
    
    try
    {
        
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "Employee Groups..."));
        //--Create Employee Group---
        try
        {
            
            clickButton(waitForObject(":xTuple ERP:*.New_QPushButton"));
            type(waitForObject(":GroupBox1._name_XLineEdit_2"),data.empGrp[2]);
            nativeType("<Tab>");
            type(waitForObject(":GroupBox1._descrip_XLineEdit_2"), "New EMployee GROUP");
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            snooze(1);
        }
        catch(e)
        {
            test.fail("Error in Creating Employee Group"+e)
                    if(object.exists(":Sales Order.Close_QPushButton"))
                        clickButton(":Sales Order.Close_QPushButton");   
            
        }
        
        //---Verifying the Employee Group Created---
        try
        {
            snooze(1);
            if(object.exists("{column='0' container=':xTuple ERP:*._empgrp_XTreeWidget' text='"+data.empGrp[2]+"' type='QModelIndex'}"))
                test.pass("Employee Group" +data.empGrp[2] +" created sucessfully");
            else
                test.fail("Employee Group " +data.empGrp[2] +" creation failed");
        }
        catch(e)
        {
            test.fail("Error in verifying the Employee Group Creates"+e);
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(":Select Order for Billing.Close_QPushButton");
        }
        
        clickButton(":Select Order for Billing.Close_QPushButton");
        
    }//End of main EMPGRP 
    
    
    
    catch(e)
    {
        test.fail("Error in creating an Employee Group"+e);
        
        if(object.exists(":Select Order for Billing.Close_QPushButton"))
            clickButton(waitForObject(":Select Order for Billing.Close_QPushButton"));
    }//End of main EMPGRP3
    
    
    
    
    
    //----Attach an employee group to employee---
    var flag = "0";
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        try
        {
            snooze(1);
            openItemContextMenu(":_list_XTreeWidget_3", data.empCode[1], 5, 5, Qt.LeftButton);
            activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
            clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Groups");
            
            clickButton(waitForObject(":_groupTab.Attach_QPushButton_2"));
            snooze(1);
            waitForObject(":_listTab_XTreeWidget_23");
            clickItem(":_listTab_XTreeWidget_23",data.empGrp[2] ,0, 0, 5, Qt.LeftButton);
            clickButton(waitForObject(":Sales Order.OK_QPushButton_2"));
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
        }
        catch(e)
        {
            test.fail("Error in attaching EMPLOYEE GROUP to employee"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(":Sales Order.Cancel_QPushButton");
        }
        //----Verifying the EMployee Group attached to an employee--
        try
        {
            snooze(1);
            openItemContextMenu(":_list_XTreeWidget_3", data.empCode[1], 5, 5, Qt.LeftButton);
            activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
            clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Groups");
            snooze(1);
            
            if(object.exists("{column='0' container=':_groupTab._groups_XTreeWidget_2' text='"+data.empGrp[2]+"' type='QModelIndex'}"))
            {
                
                flag = "1";
                test.pass("Employee Group" +data.empGrp[2] +" attached sucessfully to an employee");
                
            }
            else
                test.fail("Error in attaching " +data.empGrp[2] +" Employee Group");
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
            
        }
        catch(e)
        {
            test.fail("Error in verifying the employee group attached to an employee"+e)
                    if(object.exists(":Sales Order.Cancel_QPushButton"))
                        clickButton(":Sales Order.Cancel_QPushButton");
            
        }
    }//End of Emp
    catch(e)
    {
        test.fail("Error in Attaching Employee Group to Employee");
        
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    //----Verifying the employee attached in employee group ---
    if(flag ==1)
    {
        
        try
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
            activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "Employee Groups..."));
            
            clickItem(":xTuple ERP:*._empgrp_XTreeWidget",data.empGrp[2], 0, 0, 5, Qt.LeftButton);
            clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
            
            snooze(1);
            
            if(object.exists("{column='0' container=':Employee Group._empgrpitem_XTreeWidget' text='"+data.empCode[1]+"' type='QModelIndex'}"))
                
            {
                
                test.pass("Employee Group"+data.empGrp[2]+" attached to an Employee sucessfully verified");
                
                
            }
            else
                test.fail("Error in verifying the Employee Group" +data.empGrp[2] +" attach to an employee");
            
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));  
            
            clickButton(":Select Order for Billing.Close_QPushButton");
            
        }
        catch(e)
        {
            test.fail("Error in verifying the employee group attached with an employee"+e);
            if(object.exists(":Sales Order.Close_QPushButton"))
                clickButton(":Sales Order.Close_QPushButton");
            
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(":Select Order for Billing.Close_QPushButton");
        }
        
        
    }
    else
    {
        test.fail("Error in attaching an employee group to employee");
    }
    
    
    
    
    
    
    
    
    
    //----Detaching an Employee Group Attached an Employee----
    
    
    var flag = "0";
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        try
        {
            snooze(1);
            openItemContextMenu(":_list_XTreeWidget_3", data.empCode[1], 5, 5, Qt.LeftButton);
            activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
            clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Groups");
            clickItem(":_groupTab._groups_XTreeWidget_2",data.empGrp[2],0, 0,5, Qt.LeftButton);
            clickButton(waitForObject(":_groupTab.Detach_QPushButton_2"));
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
        }
        catch(e)
        {
            test.fail("Error in Detaching EMPLOYEE GROUP to an employee"+e);
            if(object.exists(":Sales Order.Cancel_QPushButton"))
                clickButton(":Sales Order.Cancel_QPushButton");
        }
        //----Verifying the EMployee Group Detached to an employee--
        try
        {
            snooze(1);
            openItemContextMenu(":_list_XTreeWidget_3", data.empCode[1], 5, 5, Qt.LeftButton);
            activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
            clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Groups");
            snooze(1);
            if(object.exists("{column='0' container=':_groupTab._groups_XTreeWidget_2' text='"+data.empGrp[2]+"' type='QModelIndex'}"))
                
                test.fail("Employee Group" +data.empGrp[2] +" detachment failed");
            
            else
            {
                flag = "1";
                
                test.pass("Employee Group" +data.empGrp[2] +" detached sucessfully");
            }
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
            
        }
        catch(e)
        {
            test.fail("Error in verifying the employee group detached to an employee"+e)
                    if(object.exists(":Sales Order.Cancel_QPushButton"))
                        clickButton(":Sales Order.Cancel_QPushButton");
            
        }
    }//End of Emp
    catch(e)
    {
        test.fail("Error in Detaching Employee Group to Employee");
        
        if(object.exists(":Sales Order.Cancel_QPushButton"))
            clickButton(":Sales Order.Cancel_QPushButton");
        if(object.exists(":Quotes.Close_QToolButton"))
            clickButton(":Quotes.Close_QToolButton");
    }
    
    
    
    
    //----Verifying the employee detached in employee group ---
    if(flag ==1)
    {
        
        try
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
            activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "Employee Groups..."));
            
            clickItem(":xTuple ERP:*._empgrp_XTreeWidget",data.empGrp[2], 0, 0, 5, Qt.LeftButton);
            clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
            
            snooze(1);
            
            if(object.exists("{column='0' container=':Employee Group._empgrpitem_XTreeWidget' text='"+data.empCode[1]+"' type='QModelIndex'}"))
                
            {
                
                test.fail("Fail to detach an Employee Group "+data.empGrp[2]+"from an Employee");
                
                
            }
            else
                test.pass("Employee group" +data.empGrp[2] +" sucessfully  detached from an employee");
            
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));  
            
            clickButton(":Select Order for Billing.Close_QPushButton");
            
        }
        catch(e)
        {
            test.fail("Error in verifying the employee group detached to an employee"+e);
            if(object.exists(":Sales Order.Close_QPushButton"))
                clickButton(":Sales Order.Close_QPushButton");
            
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(":Select Order for Billing.Close_QPushButton");
        }
        
        
    }
    else
    {
        test.fail("Error in detaching an employee group to an employee");
    }
    
    
    
}
