function main()
{
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    snooze(3);
    
    
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
    var uName = "code1" //username should be exactly similar to Empcode but in small letters
    var empCode1 ="CODE1";
    var empNum1 = "111";
    var empName1 = "EMPLOYEE1";
    
    try
    {
        activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
        activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
        activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "List..."));
        clickButton(waitForObject(":Quotes.Query_QToolButton"));
        try
        {
            clickButton(waitForObject(":Quotes.New_QToolButton"));
            type(waitForObject(":_code_XLineEdit_2"),empCode1);
            nativeType("<Tab>");
            type(waitForObject(":xTuple ERP:*._number_XLineEdit"),empNum1);
            snooze(0.5);
            if(!findObject(":xTuple ERP:*.Active_XCheckBox").checked)
                clickButton(":xTuple ERP:*.Active_XCheckBox");
            
            type(waitForObject(":xTuple ERP:*._name_XLineEdit"),empName1);
            
            clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Detail");
            type(waitForObject(":_memberGroup.VirtualClusterLineEdit_EmpClusterLineEdit"), "JSMITH");
            nativeType("<Tab>");
            type(waitForObject(":_filterGroup.XDateEdit_XDateEdit"), "<0>");
            nativeType("<Tab>");
            type(waitForObject(":_timeclockGroup.VirtualClusterLineEdit_DeptClusterLineEdit"), "ADMIN");
            nativeType("<Tab>");
            type(waitForObject(":_timeclockGroup.VirtualClusterLineEdit_ShiftClusterLineEdit"), "DAY");
            nativeType("<Tab>");
            
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            //-----Verifying the Employee Created ----
            snooze(1);
            if(object.exists("{column='3' container=':_list_XTreeWidget_3' text='"+empNum1+"' type='QModelIndex'}"))
                test.pass("Employee " + empCode1 +" created sucessfully");
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
            if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+empCode1+"' type='QModelIndex'}"))
                test.pass("CRM Account related to employee" + empCode1 +" created sucessfully");
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
            openItemContextMenu(":_list_XTreeWidget_3", empCode1, 5, 5, Qt.LeftButton);
            activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
            
            clickButton(waitForObject(":xTuple ERP:*.CRM Account..._QPushButton"));
            clickButton(waitForObject(":Roles._user_QCheckBox"));
            clickButton(waitForObject(":Roles.User..._QPushButton"));
            clickButton(waitForObject(":User Information.Save_QPushButton"));
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton_2"));
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            clickButton(waitForObject(":Quotes.Close_QToolButton"));
            test.log("User Account is assigned for an Employee");
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
            if(object.exists("{column='0' container=':xTuple ERP:*._usr_XTreeWidget' text='"+ uName +"' type='QModelIndex'}"))
                test.pass("User Acclunt" + uName +" created");
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
        
        
        var editEmpNum = "222";
        
                
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
                type(waitForObject(":_code_XLineEdit_2"),empCode1);
                nativeType("<Tab>");
                type(waitForObject(":xTuple ERP:*._number_XLineEdit"),"555");
                snooze(0.5);
                if(!findObject(":xTuple ERP:*.Active_XCheckBox").checked)
                    clickButton(":xTuple ERP:*.Active_XCheckBox");
                
                type(waitForObject(":xTuple ERP:*._name_XLineEdit"),"ZenEmp2");
                
                clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Detail");
                type(waitForObject(":_memberGroup.VirtualClusterLineEdit_EmpClusterLineEdit"), "JSMITH");
                nativeType("<Tab>");
                type(waitForObject(":_filterGroup.XDateEdit_XDateEdit"), "<0>");
                nativeType("<Tab>");
                type(waitForObject(":_timeclockGroup.VirtualClusterLineEdit_DeptClusterLineEdit"), "ADMIN");
                nativeType("<Tab>");
                type(waitForObject(":_timeclockGroup.VirtualClusterLineEdit_ShiftClusterLineEdit"), "DAY");
                nativeType("<Tab>");
                clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
                snooze(1);
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
                openItemContextMenu(":_list_XTreeWidget_3", empCode1, 5, 5, Qt.LeftButton);
                activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
                findObject(":xTuple ERP:*._number_XLineEdit").clear();
                type(waitForObject(":xTuple ERP:*._number_XLineEdit"),editEmpNum);
                
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
                if(object.exists("{column='3' container=':_list_XTreeWidget_3' text='"+editEmpNum+"' type='QModelIndex'}"))
                    test.pass("Employee " + empCode1 +" edited created sucessfully");
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
                openItemContextMenu(":_list_XTreeWidget_3",editEmpNum, 5, 5, Qt.LeftButton);
                activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete"));
                clickButton(waitForObject(":View Check Run.Yes_QPushButton_2"));
                clickButton(waitForObject(":Quotes.Query_QToolButton"));
                if(object.exists("{column='2' container=':_list_XTreeWidget_3' text='"+editEmpNum+"' type='QModelIndex'}"))
                    test.fail("Failed to delete Employee");
                
                else
                    test.pass("Employee Deleted sucessfully");
                
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
        
        var EMPGRP1 = "GROUP1";
        var editEMPGRP = "Employee Desc Group Editied";
        
        
        
        try
        {
            
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
            activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "Employee Groups..."));
            //--Create Employee Group---
            try
            {
                clickButton(waitForObject(":xTuple ERP:*.New_QPushButton"));
                type(waitForObject(":xTuple ERP:*._name_XLineEdit"),EMPGRP1);
                nativeType("<Tab>");
                type(waitForObject(":GroupBox1._descrip_XLineEdit_2"), "New EMployee GROUP");
                clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
                snooze(1);
                if(object.exists("{column='0' container=':xTuple ERP:*._empgrp_XTreeWidget' text='"+EMPGRP1+"' type='QModelIndex'}"))
                    test.pass("Employee Group" +EMPGRP1 +" created sucessfully");
                else
                    test.fail("Employee Group creation failed");
            }
            catch(e)
            {
                test.fail("Error in Creating an Employee Group"+e)
                        if(object.exists(":Sales Order.Close_QPushButton"))
                            clickButton(":Sales Order.Close_QPushButton");   
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
        }//End of main EMPGRP
        
        
        
        //---Operations on Employee Group--
        try
        {
            
            
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
            activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "Employee Groups..."));
            //--Editing Employee Group---
            try
            {
                
                clickItem(":xTuple ERP:*._empgrp_XTreeWidget",EMPGRP1, 0, 0, 5, Qt.LeftButton);
                clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
                findObject(":GroupBox1._descrip_XLineEdit_2").clear();
                type(waitForObject(":GroupBox1._descrip_XLineEdit_2"),editEMPGRP);
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
                if(object.exists("{column='1' container=':xTuple ERP:*._empgrp_XTreeWidget' text='"+editEMPGRP+"' type='QModelIndex'}"))
                    test.pass("Employee Group " + EMPGRP1 +" edited created sucessfully");
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
                clickItem(":xTuple ERP:*._empgrp_XTreeWidget",EMPGRP1, 0, 0, 5, Qt.LeftButton);
                clickButton(waitForObject(":xTuple ERP:*.Delete_QPushButton"));
                //--Verifying the Employee group after deletion
                
                if(object.exists("{column='0' container=':xTuple ERP:*._empgrp_XTreeWidget' text='"+EMPGRP1+"' type='QModelIndex'}"))
                    
                    test.fail("Employee Group deletion failed");
                
                
                else
                    test.pass("Employee Group " + EMPGRP1 +" Deleted sucessfully");
                
                
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
        var empCode2 ="CODE2";
        var empNum2 = "221";
        var empName2 = "EMPLOYEE2";
        
        try
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
            activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "List..."));
            clickButton(waitForObject(":Quotes.Query_QToolButton"));
            try
            {
                clickButton(waitForObject(":Quotes.New_QToolButton"));
                type(waitForObject(":_code_XLineEdit_2"),empCode2);
                nativeType("<Tab>");
                type(waitForObject(":xTuple ERP:*._number_XLineEdit"),empNum2);
                snooze(0.5);
                if(!findObject(":xTuple ERP:*.Active_XCheckBox").checked)
                    clickButton(":xTuple ERP:*.Active_XCheckBox");
                
                type(waitForObject(":xTuple ERP:*._name_XLineEdit"),empName2);
                
                clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Detail");
                type(waitForObject(":_memberGroup.VirtualClusterLineEdit_EmpClusterLineEdit"), "JSMITH");
                nativeType("<Tab>");
                type(waitForObject(":_filterGroup.XDateEdit_XDateEdit"), "<0>");
                nativeType("<Tab>");
                type(waitForObject(":_timeclockGroup.VirtualClusterLineEdit_DeptClusterLineEdit"), "ADMIN");
                nativeType("<Tab>");
                type(waitForObject(":_timeclockGroup.VirtualClusterLineEdit_ShiftClusterLineEdit"), "DAY");
                nativeType("<Tab>");
                
                clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
                clickButton(waitForObject(":Quotes.Query_QToolButton"));
                
            }
            catch(e)
            {
                test.fail("Error in creating an Employee"+e);
                if(object.exists(":Sales Order.Cancel_QPushButton"))
                    clickButton(":Sales Order.Cancel_QPushButton");
            }
            
            
            //-----Verifying the Employee Created ----
            try 
            {
                clickButton(waitForObject(":Quotes.Query_QToolButton"));
                waitForObject(":_list_XTreeWidget_3");
                snooze(1);
                if(object.exists("{column='3' container=':_list_XTreeWidget_3' text='"+empNum2+"' type='QModelIndex'}"))
                    test.pass("Employee " + empCode2 +" created sucessfully");
                else
                    test.fail("Employee creation failed");
                
                clickButton(waitForObject(":Quotes.Close_QToolButton"));
            }
            catch(e)
            {
                test.fail("Error in verifying the Emplloyee created"+e);
                if(object.exists(":Quotes.Close_QToolButton"))
                    clickButton(":Quotes.Close_QToolButton");
                
            }
            
            
        }
        catch(e)
        {
            test.fail("Error in creating Employee "+e);
            if(object.exists(":Quotes.Close_QToolButton"))
                clickButton(":Quotes.Close_QToolButton");
            
        }
      
        //--Creating an Employee Group ----
        
        var EMPGRP2 = "GROUP2";
        
        
        try
        {
            
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
            activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "Employee Groups..."));
            //--Create Employee Group---
            try
            {
                clickButton(waitForObject(":xTuple ERP:*.New_QPushButton"));
                type(waitForObject(":xTuple ERP:*._name_XLineEdit"),EMPGRP2);
                nativeType("<Tab>");
                type(waitForObject(":GroupBox1._descrip_XLineEdit_2"), "New EMployee GROUP");
                clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
                //---Verifying the Employee Group Created---
                snooze(1);
                if(object.exists("{column='0' container=':xTuple ERP:*._empgrp_XTreeWidget' text='"+EMPGRP2+"' type='QModelIndex'}"))
                    test.pass("Employee Group" +EMPGRP2 +" created sucessfully");
                else
                    test.fail("Employee Group creation failed");
            }
            catch(e)
            {
                test.fail("Error in Creating Employee Group"+e)
                        if(object.exists(":Sales Order.Close_QPushButton"))
                            clickButton(":Sales Order.Close_QPushButton"); 
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
        }//End of main EMPGRP
        
       
        //----Attaching Employee to Employee group craeted
        var flag = "0";
        
        
        
        try
        {
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
            activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "Employee Groups..."));
            clickButton(waitForObject(":xTuple ERP:*.New_QPushButton"));
            try
            {
                type(waitForObject(":xTuple ERP:*._name_XLineEdit"),EMPGRP2);
                nativeType("<Tab>");
                type(waitForObject(":GroupBox1._descrip_XLineEdit_2"), "New EMployee GROUP Created");
                snooze(1);
                
                clickButton(waitForObject(":xTuple ERP:*.New_QPushButton_2"));
                
                waitForObject(":_listTab_XTreeWidget_22");
                clickItem(":_listTab_XTreeWidget_22",empCode2, 0, 0, 5, Qt.LeftButton);
                
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
            
            clickItem(":xTuple ERP:*._empgrp_XTreeWidget",EMPGRP2, 0, 0, 5, Qt.LeftButton);
            clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
            
            snooze(1);
            
            if(object.exists("{column='0' container=':Employee Group._empgrpitem_XTreeWidget' text='"+empCode2+"' type='QModelIndex'}"))
                
            {
                flag ="1";    
                test.pass("Employee "+empCode2+"is sucessfully attached to an Employee Group");
                
                
            }
            else
                test.fail("Employee " +empCode2 +"failed to attach to an employee group");
            
            clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));  
            
            clickButton(":Select Order for Billing.Close_QPushButton");
            test.log(flag);
            
        }//end of main try
        catch(e)
        {
            test.fail("Error in attaching an employee to employee group"+e)
                    if(object.exists(":Sales Order.Close_QPushButton"))
                        clickButton(":Sales Order.Close_QPushButton");
            
            if(object.exists(":Select Order for Billing.Close_QPushButton"))
                clickButton(":Select Order for Billing.Close_QPushButton");
            
        }
        
       
        //----Deleting an employee group with employee associated
        if(flag ==1)
        {
            
            try
            {
                activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
                activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
                activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "Employee Groups..."));
                clickItem(":xTuple ERP:*._empgrp_XTreeWidget",EMPGRP2, 0, 0, 5, Qt.LeftButton);
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
                    clickItem(":xTuple ERP:*._empgrp_XTreeWidget",EMPGRP2, 0, 0, 5, Qt.LeftButton);
                    clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
                    snooze(1);
                    clickItem(":Employee Group._empgrpitem_XTreeWidget",empCode2, 0, 0, 5, Qt.LeftButton);
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
                clickItem(":xTuple ERP:*._empgrp_XTreeWidget",EMPGRP2, 0, 0, 5, Qt.LeftButton);
                clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
                
                if(object.exists("{column='0' container=':Employee Group._empgrpitem_XTreeWidge' text='"+empCode2+"' type='QModelIndex'}"))
                    test.fail("Employee " +empCode2 +"failed to delete");
                
                else
                    test.pass("Employee"+empCode2+"related to employee group deleted sucessfully");
                
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
        
        
        
        //----Attaching an Employee to Group to an Employee and Verify that Employee is attached--
        
        //--Creating an Employee Group ----
        
        var EMPGRP3 = "GROUP3";
        
        try
        {
            
            activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "System"));
            activateItem(waitForObjectItem(":xTuple ERP: *._System_QMenu", "Employees"));
            activateItem(waitForObjectItem(":xTuple ERP:*.Employees_QMenu", "Employee Groups..."));
            //--Create Employee Group---
            try
            {
                clickButton(waitForObject(":xTuple ERP:*.New_QPushButton"));
                type(waitForObject(":xTuple ERP:*._name_XLineEdit"),EMPGRP3);
                nativeType("<Tab>");
                type(waitForObject(":GroupBox1._descrip_XLineEdit_2"), "New EMployee GROUP");
                clickButton(waitForObject(":Select Order for Billing.Save_QPushButton"));
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
                if(object.exists("{column='0' container=':xTuple ERP:*._empgrp_XTreeWidget' text='"+EMPGRP3+"' type='QModelIndex'}"))
                    test.pass("Employee Group" +EMPGRP3 +" created sucessfully");
                else
                    test.fail("Employee Group creation failed");
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
                openItemContextMenu(":_list_XTreeWidget_3", empCode2, 5, 5, Qt.LeftButton);
                activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
                clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Groups");
                clickButton(waitForObject(":_groupTab.Attach_QPushButton"));
                snooze(1);
                waitForObject(":_listTab_XTreeWidget_23");
                clickItem(":_listTab_XTreeWidget_23",EMPGRP3 ,0, 0, 5, Qt.LeftButton);
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
                openItemContextMenu(":_list_XTreeWidget_3", empCode2, 5, 5, Qt.LeftButton);
                activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
                clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Groups");
                snooze(1);
                if(object.exists("{column='0' container=':_groupTab._groups_XTreeWidget' text='"+EMPGRP3+"' type='QModelIndex'}"))
                {
                    
                    flag = "1";
                    test.pass("Employee Group" +EMPGRP3 +"attached sucessfully to an employee");
                    
                }
                else
                    test.fail("Error in attaching Employee Group");
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
                
                clickItem(":xTuple ERP:*._empgrp_XTreeWidget",EMPGRP3, 0, 0, 5, Qt.LeftButton);
                clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
                
                snooze(1);
                
                if(object.exists("{column='0' container=':Employee Group._empgrpitem_XTreeWidget' text='"+empCode2+"' type='QModelIndex'}"))
                    
                {
                    
                    test.pass("Employee Group"+EMPGRP3+"attached to an Employee sucessfully verified");
                    
                    
                }
                else
                    test.fail("Error in verifying the Employee Group" +EMPGRP3 +" attach to an employee");
                
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
            test.fail("Error in attaching an employee group to employee"+e);
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
                openItemContextMenu(":_list_XTreeWidget_3", empCode2, 5, 5, Qt.LeftButton);
                activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
                clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Groups");
                clickItem(":_groupTab._groups_XTreeWidget",EMPGRP3,0, 0,5, Qt.LeftButton);
                clickButton(waitForObject(":_groupTab.Detach_QPushButton"));
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
                openItemContextMenu(":_list_XTreeWidget_3", empCode2, 5, 5, Qt.LeftButton);
                activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Edit..."));
                clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Groups");
                snooze(1);
                if(object.exists("{column='0' container=':_groupTab._groups_XTreeWidget' text='"+EMPGRP3+"' type='QModelIndex'}"))
                    
                    test.fail("Employee Group" +EMPGRP3 +" detachment failed");
                
                else
                {
                    flag = "1";
                    test.log(flag);
                    test.pass("Employee Group Detached sucessfully");
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
                
                clickItem(":xTuple ERP:*._empgrp_XTreeWidget",EMPGRP3, 0, 0, 5, Qt.LeftButton);
                clickButton(waitForObject(":xTuple ERP:*.Edit_QPushButton"));
                
                snooze(1);
                
                if(object.exists("{column='0' container=':Employee Group._empgrpitem_XTreeWidget' text='"+empCode2+"' type='QModelIndex'}"))
                    
                {
                    
                    test.fail("Fail to verify an detach Employee Grup "+EMPGRP3+"to an Employee");
                    
                    
                }
                else
                    test.pass("Employee group" +EMPGRP3 +"detached from an employee sucessfully verified");
                
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
