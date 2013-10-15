function main()
{
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
    
    
    //--------Edit the User Preferences----
    try
    {
        if(OS.name=="Darwin")
        {
            
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Products");
            activateItem(":xTuple ERP:*_QMenuBar_2", "Products");
            waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu","Setup...");
            activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Setup...");
            
        } 
        else
        {
            waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
            activateItem(":xTuple ERP:*_QMenuBar_2", "System");
            
            waitForObjectItem(":xTuple ERP:*.System_QMenu", "Preferences...");
            activateItem(":xTuple ERP:*.System_QMenu", "Preferences...");
        }
        
        snooze(2);
        waitForObject(":Interface Options.Show windows inside workspace_QRadioButton");
        snooze(1);
        if(!findObject(":Interface Options.Show windows inside workspace_QRadioButton").checked)
            clickButton(":Interface Options.Show windows inside workspace_QRadioButton");
        snooze(0.3);
        if(object.exists(":Notice.Notice_QDialog"))
        {
            waitForObject(":Notice.Remind me about this again._QCheckBox");
            if(findObject(":Notice.Remind me about this again._QCheckBox").checked)
                clickButton(":Notice.Remind me about this again._QCheckBox");
            snooze(0.1);
            waitForObject(":Notice.OK_QPushButton");
            clickButton(":Notice.OK_QPushButton");            
        }
        
        waitForObject(":User Preferences.Save_QPushButton");
        clickButton(":User Preferences.Save_QPushButton");
        
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
        activateItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges");
    }
    catch(e)
    {
        test.fail("Error in editing preferences" + e);
    }
    
    
    waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
    activateItem(":xTuple ERP:*_QMenuBar_2", "System");
    waitForObjectItem(":xTuple ERP:*.System_QMenu", "Exit xTuple ERP...");
    activateItem(":xTuple ERP:*.System_QMenu", "Exit xTuple ERP...");
    
    snooze(4);
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 
    
    
    //-----Variable Declaration-----
    
    
    //---find Application Edition------ 
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.System_QMenu", "Setup...");     
        snooze(1);
        if(findObject(":Setup._tree_XTreeWidget").itemsExpandable== true)
        {
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 41, 6, 0, Qt.LeftButton);
        }
        else
        {    
            waitForObject(":_tree.Configure_QModelIndex");
            mouseClick(":_tree.Configure_QModelIndex", -10, 5, 0, Qt.LeftButton);
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 41, 6, 0, Qt.LeftButton);
        }
        
        waitForObject(":Database Information.*_QLabel");
        var appEdition = findObject(":Database Information.*_QLabel").text;
        
        if(object.exists(":_stack.Use toolbars on displays when available_QCheckBox"))
        {
            waitForObject(":_stack.Use toolbars on displays when available_QCheckBox");
            snooze(1);
            if(!(findObject(":_stack.Use toolbars on displays when available_QCheckBox").checked))
                clickButton(":_stack.Use toolbars on displays when available_QCheckBox");
        }
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in capturing database information" + e);
    }
    
    
    //-----Setting Encryption Key-----
    try
    {
        waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System");
        activateItem(":xTuple ERP:*_QMenuBar_2", "System");
        waitForObjectItem(":xTuple ERP:*.System_QMenu", "Setup...");
        activateItem(":xTuple ERP:*.System_QMenu", "Setup...");
        waitForObject(":Configure.Encryption_QModelIndex");
        mouseClick(":Configure.Encryption_QModelIndex", 40, 8, 0, Qt.LeftButton);
        
        snooze(1);
        if(object.exists(":OK_QPushButton"))
        {	
            clickButton(":OK_QPushButton");
            test.fatal("Please Define the Encryption path"); 
        }
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in setting the encryption key" + e);
    } 
    
    //------ Enabling Project Accounting -------
    
    try{
        activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "CRM"));
        activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Setup..."));
        snooze(2);
         if(!findObject(":_stack.Enable Project Accounting_QCheckBox").checked)
        clickButton(waitForObject(":_stack.Enable Project Accounting_QCheckBox"));
        
        clickButton(waitForObject(":View Check Run.Save_QPushButton"));
        
        test.pass("Project Accounting Enabled successfully");
        }
    catch(e)
       {
        test.fail("Error in Enabling Project Accounting "+e);
         if(object.exists(":View Check Run.Save_QPushButton"))
            clickButton(":View Check Run.Save_QPushButton");
       }
    
    //--------- Rescaning the Privileges -----
    
    try{
         activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "System"));
         activateItem(waitForObjectItem(":xTuple ERP:*.System_QMenu", "Rescan Privileges"));
     }
    catch(e)
    {
        test.fail("Error in Rescaning the Privileges"+e);
    }
    
    
    //-------------- Project Creation ---------
    
    var projNum = "PROJECT 5";
  
    try{
    activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "CRM"));
    activateItem(waitForObjectItem(":xTuple ERP:*CRM_QMenu", "Project"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Project_QMenu", "List..."));
    clickButton(waitForObject(":Open Sales Orders.New_QToolButton_2"));
    snooze(1);
    type(waitForObject(":Project._number_XLineEdit"), "PROJECT 3");
    nativeType("<Tab>");
    type(waitForObject(":Project._name_XLineEdit"), projNum);
    nativeType("<Tab>");
    type(waitForObject(":_infoGroup.VirtualClusterLineEdit_CRMAcctLineEdit"), "TTOYS");
    nativeType("<Tab>");
    type(waitForObject(":_filterGroup.XDateEdit_XDateEdit"), "0");
    type(waitForObject(":_filterGroup.XDateEdit_XDateEdit_2"), "0");
    type(waitForObject(":_scheduleGroup.XDateEdit_XDateEdit"), "0");
    nativeType("<Tab>");
    type(waitForObject(":groupBox_2.VirtualClusterLineEdit_ContactClusterLineEdit"), "Jake Sweet");
    nativeType("<Tab>");
    snooze(0.5);
    waitForObject(":Project._status_XComboBox");
    clickItem(":Project._status_XComboBox", "In-Process",0, 0, 5, Qt.LeftButton);
    snooze(1);
    clickButton(waitForObject(":View Check Run.Save_QPushButton"));
    clickButton(waitForObject(":Vendors.Query_QToolButton_3"));
    snooze(0.5);
    if(object.exists("{column='0' container=':_list_XTreeWidget_13' text='"+projNum+"' type='QModelIndex'}"))
        test.pass("Project Created successfully and found in the list");
    else
        test.fail("Created Project was not found in the list");
        
    clickButton(waitForObject(":Vendors.Close_QToolButton_3"));
    }
    catch(e)
    {
        test.fail("Error in creating Project"+e);
         if(object.exists(":Vendors.Close_QToolButton_3"))
            clickButton(":Vendors.Close_QToolButton_3");
    }
    
    
    // ----- Posting a Simple  Journal entry ------
    
     
    try{
    activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar_2", "Accounting"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Accounting_QMenu", "General Ledger"));
    activateItem(waitForObjectItem(":*.General Ledger_QMenu", "Journal Entry"));
    activateItem(waitForObjectItem(":xTuple ERP: *.Journal Entry_QMenu", "Simple..."));
    type(waitForObject(":Cash Receipt.XLineEdit_XLineEdit_2"), "150");
    type(waitForObject(":Simple G/L Journal Entry._docNumber_XLineEdit"), "123");
    type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit"), "01-01-1000-01");
    nativeType("<Tab>");
    type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_GLClusterLineEdit_2"), "01-01-1010-01");
    nativeType("<Tab>");
    type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_ProjectLineEdit"), projNum);
    type(waitForObject(":Simple G/L Journal Entry.VirtualClusterLineEdit_ProjectLineEdit_2"), projNum);
    type(waitForObject(":frame._notes_XTextEdit"), "Notes");
    clickButton(waitForObject(":Simple G/L Journal Entry.Post_QPushButton"));
    clickButton(waitForObject(":Simple G/L Journal Entry.Close_QPushButton"));
    test.log("Simple Journal entry posted successfully");
    
    }
    catch(e)
    {
        test.fail("Error in posting simple Journal Entry"+e);
         if(object.exists(":Simple G/L Journal Entry.Close_QPushButton"))
            clickButton(":Simple G/L Journal Entry.Close_QPushButton");
    }

}
