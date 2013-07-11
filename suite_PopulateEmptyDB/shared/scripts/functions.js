//-***-This script doc contains all the common code libraries/functions required by the Main driver script-***-

var iNumberOfModules=12;

//--------Login into Appl----------
function loginAppl(userrole)
{
    
    var set = testData.dataset("login.tsv");
    var url, db, port, pwd,realname,username;
    db=pwd=port=url=realname=username="";
    for(var records in set)
    {
        url=testData.field(set[records],"HOST");
        db=testData.field(set[records],"DB");
        port=testData.field(set[records],"PORT");
        pwd=testData.field(set[records],"PASSWORD");
        role=testData.field(set[records],"ROLE");
        username=testData.field(set[records],"USERNAME");
        realname=testData.field(set[records],"REALNAME");
        if(userrole==role) break;
        
    }
    
    if(userrole!=role)
    {
        test.fatal("Please enter user details in login.tsv for the role: "+userrole);
        exit(1);
    }
  
    waitForObject(":Log In._server_QLineEdit");
    if(findObject(":Log In._server_QLineEdit").text!= url)
    {findObject(":Log In._server_QLineEdit").text=url;
        test.log("URL Changed to: "+url);
    }
    if(findObject(":_database_QLineEdit_2").text!=db)
    {
        findObject(":_database_QLineEdit_2").text=db;
        test.log("Database Changed to: "+db);
    }
    if(findObject(":Log In._port_QLineEdit").text!=port)
    {
        findObject(":Log In._port_QLineEdit").text=port;
        test.log("Port Changed to:" + port);
    }
   
    waitForObject(":Log In._username_QLineEdit");    
    type(":Log In._username_QLineEdit", username);
    waitForObject(":Log In._username_QLineEdit");
    type(":Log In._username_QLineEdit", "<Tab>");
    waitForObject(":Log In._password_QLineEdit");
    type(":Log In._password_QLineEdit", pwd);
    waitForObject(":Log In._password_QLineEdit");
    type(":Log In._password_QLineEdit", "<Return>");
    try
        {
            waitForObject(":Registration Key.Yes_QPushButton");
            clickButton(":Registration Key.Yes_QPushButton");
        }
        catch(e)
        {
            test.log("Registration key not found");
        }

    test.log("Logged in Application");
}



function findApplicationEdition()
{
    waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
    snooze(2);
    if(findObject(":Setup._tree_XTreeWidget").itemsExpandable==true)
    {
        waitForObject(":Configure.Database_QModelIndex");
        mouseClick(":Configure.Database_QModelIndex", 35, 9, 0, Qt.LeftButton);
    }
    else
    {
        waitForObject(":_tree.Configure_QModelIndex");
        mouseClick(":_tree.Configure_QModelIndex", -11, 6, 0, Qt.LeftButton);
        waitForObject(":Configure.Database_QModelIndex");
        mouseClick(":Configure.Database_QModelIndex", 35, 9, 0, Qt.LeftButton); 
    }
    
    waitForObject(":Database Information.*_QLabel");
    var appEdition = findObject(":Database Information.*_QLabel").text;
    
    if(object.exists(":_stack.Use toolbars on displays when available_QCheckBox"))
    {
        waitForObject(":_stack.Use toolbars on displays when available_QCheckBox");
        if(!(findObject(":_stack.Use toolbars on displays when available_QCheckBox").checked))
            clickButton(":_stack.Use toolbars on displays when available_QCheckBox");
    }
    waitForObject(":List Departments.Save_QPushButton");
    clickButton(":List Departments.Save_QPushButton");
    test.log("Application Edition: " + appEdition);
    
    return appEdition;
}


//-----------Assign All Privileges to the Admin User-----------------------
function assignAllPrivileges(userrole)
{
    
    //----Read Username based on Role------
    var set = testData.dataset("login.tsv");
    var username,role="";
    for (var records in set)
    {
        username=testData.field(set[records],"USERNAME");
        role=testData.field(set[records],"ROLE");
        if(role==userrole) break;
    }
    
    snooze(1.0);
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObject(":xTuple ERP: OpenMFG Edition.System_QMenu");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Maintain Users...");
    
    waitForObject(":xTuple ERP: *._usr_XTreeWidget");
    
    mouseClick("{column='0' container=':xTuple ERP: *._usr_XTreeWidget' text='"+username+"' type='QModelIndex'}",10,10,0,Qt.LeftButton);
    waitForObject(":*.Edit_QPushButton");
    clickButton(":*.Edit_QPushButton");
    waitForObject(":_privTab.Add All->>_QPushButton_2");   
    clickButton(":_privTab.Add All->>_QPushButton_2");   
    var iNumberOfModules=12;
    for(i=0;i<iNumberOfModules;i++)
    {
        waitForObject(":_module_XComboBox_2");
        type(":_module_XComboBox_2", "<Down>");
        waitForObject(":_privTab.Add All->>_QPushButton_2");
        clickButton(":_privTab.Add All->>_QPushButton_2");
    }    
    waitForObject(":Work Center.Save_QPushButton");
    clickButton(":Work Center.Save_QPushButton");
    waitForObject(":List Work Centers.Close_QPushButton");
    clickButton(":List Work Centers.Close_QPushButton");
    test.log("Admin User assigned with all Privileges");
    
    //---Restarting Application--
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObject(":xTuple ERP: OpenMFG Edition.System_QMenu");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Exit xTuple ERP...");
    
    
    if(OS.name=="Linux")
        startApplication("xtuple.bin");
    
    else
        startApplication("xtuple");
    
    snooze(2);
    
    loginAppl("CONFIGURE"); 
    try
    {
        waitForObject(":Cancel.Yes_QPushButton");
        clickButton(":Cancel.Yes_QPushButton");
    }
    catch (e)
    {test.log("No Language dialog found");}
}

//--------------Create New Dept----------------------
function createDept(DeptNum, DeptName)
{
    try
    {
        
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        snooze(1);
        if(findObject(":Setup._tree_XTreeWidget").itemsExpandable==true)
        {
            waitForObject(":Master Information.Departments_QModelIndex");
            mouseClick(":Master Information.Departments_QModelIndex", 35, 9, 0, Qt.LeftButton);
        }
        else
        {
            waitForObject(":_tree.Master Information_QModelIndex");
            mouseClick(":_tree.Master Information_QModelIndex", -11, 6, 0, Qt.LeftButton);
            waitForObject(":Master Information.Departments_QModelIndex");
            mouseClick(":Master Information.Departments_QModelIndex", 35, 9, 0, Qt.LeftButton); 
        }
        waitForObject(":List Work Centers.New_QPushButton");
        clickButton(":List Work Centers.New_QPushButton");
        waitForObject(":_stack._number_XLineEdit");
        type(":_stack._number_XLineEdit", DeptNum);
        waitForObject(":_stack._name_XLineEdit");
        type(":_stack._name_XLineEdit", DeptName);
        waitForObject(":List Departments.Save_QPushButton");
        clickButton(":List Departments.Save_QPushButton");
        waitForObject(":List Departments.Save_QPushButton");
        clickButton(":List Departments.Save_QPushButton");
        test.log("New Department:"+ DeptNum + " created");
    }
    catch(e)
    {
        test.fail("Department:"+DeptName+" not created:"+e);}
}


//--------------Creat Shift-----------------
function createShift(ShiftNum, ShiftName)
{
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Products", 74, 11, 0, Qt.LeftButton);
        if(findObject(":Setup._tree_XTreeWidget").itemsExpandable==true)
        {
            waitForObject(":Master Information.Shifts_QModelIndex");
            mouseClick(":Master Information.Shifts_QModelIndex", 35, 9, 0, Qt.LeftButton);
        }
        else
        {
            waitForObject(":_tree.Master Information_QModelIndex");
            mouseClick(":_tree.Master Information_QModelIndex", -11, 6, 0, Qt.LeftButton);
            waitForObject(":Master Information.Shifts_QModelIndex");
            mouseClick(":Master Information.Shifts_QModelIndex", 35, 9, 0, Qt.LeftButton); 
        }
        waitForObject(":List Work Centers.New_QPushButton");
        clickButton(":List Work Centers.New_QPushButton");
        
        waitForObject(":List Shifts._number_XLineEdit");
        type(":List Shifts._number_XLineEdit",ShiftNum);
        type(":List Shifts._name_XLineEdit", ShiftName);
        waitForObject(":List Shifts.Save_QPushButton");
        clickButton(":List Shifts.Save_QPushButton");
        
        snooze(2);
        if(object.exists(":_shiftList.1ST_QModelIndex"))
            test.pass("New Shift:"+ ShiftNum + " created");
        else
            test.fail("New Shift:"+ ShiftNum + "not created")
                    
                    waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
    }
    catch(e)
    {test.fail("Shift:"+ShiftName+" not created:"+e);}
    
}



//----------------Create Locale-----------------------
function createLocale(LocaleCode,LocaleDesc)
{  
    try{
        
        
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Master Information.Locales_QModelIndex");
        mouseClick(":Master Information.Locales_QModelIndex", 35, 9, 0, Qt.LeftButton);
        waitForObject(":List Work Centers.New_QPushButton");
        clickButton(":List Work Centers.New_QPushButton");
        waitForObject(":Work Center._code_XLineEdit");
        type(":Work Center._code_XLineEdit", LocaleCode);
        waitForObject(":Work Center._description_XLineEdit");
        type(":Work Center._description_XLineEdit",  LocaleDesc);    
        
        snooze(0.5);
        waitForObject(":_language_XComboBox_2");
        clickItem(":_language_XComboBox_2", "English",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_country_XComboBox_2");
        clickItem(":_country_XComboBox_2", "United States",0,0,1,Qt.LeftButton);	
        
        waitForObject(":_currencyScale_QSpinBox_2");
        if(findObject(":_currencyScale_QSpinBox_2").text!=2)
        {
            findObject(":_currencyScale_QSpinBox_2").clear();
            type(":_currencyScale_QSpinBox_2","2");
        }
        if(findObject(":_salesPriceScale_QSpinBox_2").text!=2)
        { 
            findObject(":_salesPriceScale_QSpinBox_2").clear();
            type(":_salesPriceScale_QSpinBox_2", "2");
        }
        if(findObject(":_purchPriceScale_QSpinBox_2").text!=2)
        {     
            findObject(":_purchPriceScale_QSpinBox_2").clear();
            type(":_purchPriceScale_QSpinBox_2", "2");
        }
        if(findObject(":_extPriceScale_QSpinBox_2").text!=2)
        { 
            findObject(":_extPriceScale_QSpinBox_2").clear();
            type(":_extPriceScale_QSpinBox_2", "2");
        }
        if(findObject(":_costScale_QSpinBox_2").text!=2)
        { 
            findObject(":_costScale_QSpinBox_2").clear();
            type(":_costScale_QSpinBox_2", "2");
        }
        if(findObject(":_qtyScale_QSpinBox_2").text!=2)
        { 
            findObject(":_qtyScale_QSpinBox_2").clear();
            type(":_qtyScale_QSpinBox_2", "2");
        }
        if(findObject(":_qtyPerScale_QSpinBox_2").text!=6)
        { 
            findObject(":_qtyPerScale_QSpinBox_2").clear();
            type(":_qtyPerScale_QSpinBox_2", "6");
        }
        if(findObject(":_uomRatioScale_QSpinBox_2").text!=6)
        { 
            findObject(":_uomRatioScale_QSpinBox_2").clear();
            type(":_uomRatioScale_QSpinBox_2", "6");
        }
        if(findObject(":_stack._percentScale_QSpinBox").text!="2")
        {
            findObject(":_stack._percentScale_QSpinBox").clear();
            type(":_stack._percentScale_QSpinBox","2");
        }
        type(":_error_QLineEdit_2", "red");
        type(":_warning_QLineEdit_2", "orange");
        type(":_emphasis_QLineEdit_2", "lime");
        type(":_expired_QLineEdit_2", "gray");
        type(":_alternate_QLineEdit_2", "blue");
        type(":_future_QLineEdit_2", "green");
        type(":_comments_QTextEdit_4", "My Locale for Class");
        waitForObject(":List Departments.Save_QPushButton");
        clickButton(":List Departments.Save_QPushButton");
        waitForObject(":_stack._locale_XTreeWidget");
        if(!clickItem(":_stack._locale_XTreeWidget","MYLOCALE", 5, 5, 1, Qt.LeftButton))
            test.pass("Locale created: MYLOCALE");
        
        clickItem(":_stack._locale_XTreeWidget","MYLOCALE", 5, 5, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":_stack.Edit_QPushButton");
        clickButton(":_stack.Edit_QPushButton");
        snooze(0.5);
        if(findObject(":_stack._percentScale_QSpinBox").text!="2")
        {
            findObject(":_stack._percentScale_QSpinBox").clear();
            type(":_stack._percentScale_QSpinBox","2");
        }
        
        waitForObject(":List Departments.Save_QPushButton");
        clickButton(":List Departments.Save_QPushButton");
        waitForObject(":List Departments.Save_QPushButton");
        clickButton(":List Departments.Save_QPushButton");          
    }
    catch(e)
    {test.fail("Locale:"+LocaleCode+" not created:"+e);}
}


//----------------Create new Group----------------
function createRole(GrpName, GrpDesc)
{
    
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        snooze(0.1);
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Maintain Roles...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Maintain Roles...");
        
        waitForObject(":List Work Centers.New_QPushButton");
        clickButton(":List Work Centers.New_QPushButton");

        waitForObject(":_name_XLineEdit");
        type(":_name_XLineEdit", GrpName);
        type(":_description_XLineEdit_2", GrpDesc);
        for(var i=0;i<iNumberOfModules;i++)
        {
            waitForObject(":frame.Add All->>_QPushButton");
            clickButton(":frame.Add All->>_QPushButton");
            waitForObject(":_module_XComboBox_3");
            type(":_module_XComboBox_3", "<Down>");
        }
        waitForObject(":List Groups.Save_QPushButton");
        clickButton(":List Groups.Save_QPushButton");
        
        var sWidgetTreeControl = ":List Groups._list_XTreeWidget";
        waitForObject(sWidgetTreeControl);
        var obj_TreeWidget = findObject(sWidgetTreeControl);
        var obj_TreeRootItem=obj_TreeWidget.invisibleRootItem();
        var iNumberOfRootItems = obj_TreeRootItem.childCount();
        type(sWidgetTreeControl,"<Space>");
        var obj_TreeTopLevelItem = obj_TreeRootItem.child(0);
        var sNameOfRootItem = obj_TreeTopLevelItem.text(0);
        for(i=1;sNameOfRootItem!=GrpName || i<iNumberOfRootItems ;i++)
        {
            obj_TreeTopLevelItem = obj_TreeRootItem.child(i);
            sNameOfRootItem = obj_TreeTopLevelItem.text(0);
            type(sWidgetTreeControl,"<Down>"); 
        }
        snooze(2);
        if(sNameOfRootItem==GrpName)
            test.pass("New Group: '"+GrpName+"' created");
        else
            test.fail("New Group: '"+GrpName+"' not created");
        waitForObject(":List Groups.Close_QPushButton");
        clickButton(":List Groups.Close_QPushButton");
    }
    catch(e)
    {test.fail("Group:"+GrpName+" not created:"+e);}
}


//-----------------Create New User and assign privileges-------------------
function createUserByRole(userrole)
{
    try{
        //----Read the new User data from login.tsv based on role---
        var set = testData.dataset("login.tsv");
        var realname,username,role,pwd;
        role=realname=username=pwd="";
        
        for (var records in set)
        {
            role=testData.field(set[records],"ROLE");
            username=testData.field(set[records],"USERNAME");
            realname=testData.field(set[records],"REALNAME");
            pwd=testData.field(set[records],"PASSWORD");
            
            if(role==userrole) break;
        }
        
        if(userrole!=role) //User Role not found
        {
            test.fatal("Please provide user details in login.tsv for the role: "+userrole);
            exit(1);
        }
        
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Employees");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Employees");

        waitForObjectItem(":Employees_QMenu", "List...");
        activateItem(":Employees_QMenu", "List...");
        clickButton(waitForObject(":Tax Authorities.Query_QToolButton"));
        snooze(0.5);
        waitForObject(":Tax Authorities.New_QToolButton");
        clickButton(":Tax Authorities.New_QToolButton");
        waitForObject(":_code_XLineEdit_16");
        type(":_code_XLineEdit_16", username);
        waitForObject(":List Employees._number_XLineEdit");
        type(":List Employees._number_XLineEdit", username);
        snooze(0.5);
        waitForObject(":_contactTab._honorific_XComboBox");
        type(":_contactTab._honorific_XComboBox", "MR");
        waitForObject(":_contactTab._honorific_XLineEdit");
        type(":_contactTab._honorific_XLineEdit", "Susanta");
        waitForObject(":_contactTab_XLineEdit");
        type(":_contactTab_XLineEdit", "R");
        waitForObject(":_contactTab_XLineEdit_2");
        type(":_contactTab_XLineEdit_2", "Misra");
        waitForObject(":Employee.qt_tabwidget_tabbar_QTabBar");
        snooze(0.5);
        clickTab(":Employee.qt_tabwidget_tabbar_QTabBar", "Detail");
        snooze(0.5);
        waitForObject(":_memberGroup._site_WComboBox");
        clickItem(":_memberGroup._site_WComboBox", "WH1", 0, 0, 1, Qt.LeftButton);
      snooze(0.5);
        waitForObject(":Employee.Save_QPushButton");
        clickButton(":Employee.Save_QPushButton");
        waitForObject(":Tax Authorities.Close_QToolButton");
        clickButton(":Tax Authorities.Close_QToolButton");
        
        
        snooze(1);
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Maintain Users...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Maintain Users...");
        waitForObject(":List Users.New_QPushButton")
        clickButton(":List Users.New_QPushButton");
        waitForObject(":_username_XLineEdit");
        type(":_username_XLineEdit", username);
        waitForObject(":_initials_XLineEdit");
        findObject(":_initials_XLineEdit").clear();
        type(":_initials_XLineEdit","JS");
        waitForObject(":_properName_XLineEdit");
        findObject(":_properName_XLineEdit").clear();
        type(":_properName_XLineEdit",realname);
        findObject(":_email_XLineEdit").clear();
        type(":_email_XLineEdit", "demo@openmfg.com");
        findObject(":_passwd_XLineEdit").clear();
        type(":_passwd_XLineEdit", pwd);
        snooze(0.5);
        findObject(":_verify_XLineEdit").clear();
        findObject(":_verify_XLineEdit");
        type(":_verify_XLineEdit", pwd);
        snooze(0.5);
        if(!findObject(":List Users.Active_QCheckBox").checked)
            clickButton(":List Users.Active_QCheckBox");
        snooze(0.5);
        if(!findObject(":List Users.Purchasing Agent_QCheckBox").checked)
            clickButton(":List Users.Purchasing Agent_QCheckBox");
        snooze(0.5);
        if(!findObject(":List Users.Can Create System Users_QCheckBox").checked)
            clickButton(":List Users.Can Create System Users_QCheckBox");  
        
        clickItem(":_locale_XComboBox_4","Default",0,0,1,Qt.LeftButton);
        waitForObject(":List Users.qt_tabwidget_tabbar_QTabBar");
        clickTab(":List Users.qt_tabwidget_tabbar_QTabBar", "Roles");
        snooze(1);
        waitForObject(":_groupTab._availableGroup_XTreeWidget");
        sWidgetTreeControl = ":_groupTab._availableGroup_XTreeWidget";
        clickItem(":_groupTab._availableGroup_XTreeWidget","SUPER",0,0,1,Qt.LeftButton);
        waitForObject(":_groupTab.Add->_QPushButton");
        clickButton(":_groupTab.Add->_QPushButton");
        waitForObject(":List Sites.Save_QPushButton");
        clickButton(":List Sites.Save_QPushButton");
        
        
        snooze(2);
        waitForObject(":List Users._usr_XTreeWidget_2");
        if(object.exists("{column='0' container=':List Users._usr_XTreeWidget_2' text='"+username+"' type='QModelIndex'}"))
            test.pass("User created:"+username);
        else test.fail("User not created:"+username);
        
        waitForObject(":List Users.Close_QPushButton_2");
        clickButton(":List Users.Close_QPushButton_2");
    }
    catch(e){test.fail("Exception caught in creating user:"+e);}
    
}


//--------------Accounting-Account-Companies-New---------------------
function createCompany(CompNum, CompDesc)
{
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Companies...");
        activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Companies...");
        snooze(0.5);
        waitForObject(":List Companies.New_QPushButton");
        clickButton(":List Companies.New_QPushButton");
        waitForObject(":_number_XLineEdit");
        findObject(":_number_XLineEdit").clear();
        type(":_number_XLineEdit", CompNum);
        findObject(":_descrip_XTextEdit").clear();
        type(":_descrip_XTextEdit", CompDesc);
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        waitForObject(":OK_QPushButton");
        clickButton(":OK_QPushButton");
        
        snooze(1);
        var sWidgetTreeControl = ":List Companies._company_XTreeWidget";
        if(findObject(":_company.01_QModelIndex").text == "01")
            test.pass("Company: "+CompDesc+" created");
        else
            test.fail("Company: "+CompDesc+"not created");
        
        waitForObject(":List Companies.Close_QPushButton");
        clickButton(":List Companies.Close_QPushButton");
    }
    catch(e){test.fail("Company:"+CompNum+" not created:"+e);}
    
}

//------------Create Chart of Accounts-------------------
function COA(COACompany,COAProfit,COANumber,COASub,COADesc,COAType,COASubType)
{
    
    try{
        waitForObject(":Chart of Accounts.New_QPushButton_2");
        clickButton(":Chart of Accounts.New_QPushButton_2");
        snooze(1);
        waitForObject(":Account Number._company_XComboBox");
        if(findObject(":Account Number._company_XComboBox").currentText!=COACompany)
            clickItem(":Account Number._company_XComboBox","01",0,0,1,Qt.LeftButton);
        snooze(1);
        waitForObject(":Account Number._profit_XComboBox");
        if(findObject(":Account Number._profit_XComboBox").currentText!=COAProfit)
            clickItem(":Account Number._profit_XComboBox", "01",0,0,1,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Account Number._sub_XComboBox");
        snooze(1);
        if(findObject(":Account Number._sub_XComboBox").currentText!=COASub)
            clickItem(":Chart of Accounts._sub_XComboBox", "01",0,0,1,Qt.LeftButton);
        snooze(0.5);
        type(":_number_XLineEdit_3", COANumber);
        type(":_description_XLineEdit_11", COADesc);
        type(":_extReference_XLineEdit_2", COACompany+"-"+COAProfit+"-"+COANumber+"-"+COASub);
        waitForObject(":Account Number._type_XComboBox");
        clickItem(":Account Number._type_XComboBox", COAType, 0, 0, 1, Qt.LeftButton);
        snooze(1);
        waitForObject(":Account Number._subType_XComboBox");
        type(":Account Number._subType_XComboBox", COASubType);
        snooze(0.5);
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        test.log("Acc: "+COACompany+"-"+COAProfit+"-"+COANumber+"-"+COASub+" created");
        
        createdCOA = "{column='2' container=':_account_XTreeWidget_2' text='"+COANumber+"' type='QModelIndex'}";
        //wait till save
        while(!object.exists(createdCOA))
            snooze(0.1);
    }
    catch(e){test.fail("Exception caught in creating Chart of Account:"+e);}
}

//--------check if the year is a leap year--------
function IsLeapYear(datea)
{
    datea = parseInt(datea);
    if(datea%4 == 0)
    {
        if(datea%100 != 0)
            return true;
        else
        {
            if(datea%400 == 0)
                return true;
            else
                return false;
        }
    }
    return false;
}



function defineTaxAuth(ta)
{
    //------Define Tax Authorities-------
    try{
        
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP: *.Tax_QMenu", "Tax Authorities...");
        activateItem(":xTuple ERP: *.Tax_QMenu", "Tax Authorities...");
        
        
        waitForObject(":Tax Authorities.New_QToolButton");
        clickButton(":Tax Authorities.New_QToolButton"); 
        waitForObject(":_code_XLineEdit_15");
        findObject(":_code_XLineEdit_15").clear();
        type(":_code_XLineEdit_15", ta);
        type(":_name_XLineEdit_22", "Virginia");
        type(":_extref_XLineEdit", "Smith");
        if(findObject(":_currency_XComboBox_2").currentText!= "USD - $")
            type(":_currency_XComboBox_2", "USD");
        type(":Tax Authority._county_QLineEdit", "United States");
        type(":groupBox.XLineEdit_XLineEdit", "Street Addr Line1");
        type(":groupBox.XLineEdit_XLineEdit_2", "Street addr line2");
        type(":groupBox.XLineEdit_XLineEdit_3", "Street Addr line3");
        type(":groupBox.XLineEdit_XLineEdit_4", "city1");
        
        waitForObject(":groupBox._state_XComboBox_2");
        clickItem(":groupBox._state_XComboBox_2", "VA", 0, 0, 1, Qt.LeftButton);
        
        type(":groupBox.XLineEdit_XLineEdit_5", "323525");
        clickButton(":Tax Authority.Save_QPushButton");
        snooze(1);
        waitForObject(":_list_XTreeWidget_4");
        snooze(1);
        if(object.exists(":_taxauth.TAX-AUTH1_QModelIndex"))
            test.pass("Tax Authority created:TAX-AUTH1");
        else test.fail("Tax Authority not created:TAX-AUTH1");
        
        waitForObject(":Tax Authorities.Close_QToolButton");
        clickButton(":Tax Authorities.Close_QToolButton");
    }
    
    catch(e){
        test.fail("Exception :"+e);
    }
    
}


function defineTaxCode(tc)
{
    try{
        //----------Create: Tax Codes---------------
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP: *.Tax_QMenu", "Tax Codes...");
        activateItem(":xTuple ERP: *.Tax_QMenu", "Tax Codes...");
        
        
        waitForObject(":List Tax Codes.New_QPushButton");
        clickButton(":List Tax Codes.New_QPushButton");
        waitForObject(":_code_XLineEdit_12");
        type(":_code_XLineEdit_12", tc);
        type(":_description_XLineEdit_23", "Tax Authority 1 General Merchandise");
        
        waitForObject(":List Tax Codes.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":List Tax Codes.VirtualClusterLineEdit_GLClusterLineEdit","01-01-4050-01");
        nativeType("<Tab>");
        waitForObject(":Tax Code._taxClass_XComboBox");
        clickItem(":Tax Code._taxClass_XComboBox","1-Legacy Class 1",1,0,0,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Tax Code._taxauth_XComboBox");
        clickItem(":Tax Code._taxauth_XComboBox","TAX-AUTH1",1,0,0,Qt.LeftButton);
        snooze(0.5);
        waitForObject(":_frame.New_QPushButton_2");
        clickButton(":_frame.New_QPushButton_2");
        waitForObject(":_rateGroup._percent_XLineEdit");
        type(":_rateGroup._percent_XLineEdit", "10");
        clickButton(":Tax Code Rate.Save_QPushButton");
        waitForObject(":List Departments.Save_QPushButton");
        clickButton(":List Departments.Save_QPushButton");
    }
    catch(e){test.fail("exception caught in creating Tax Code");}
    
    
    //-------verify saved Tax Code-----
    try {
        waitForObject(":List Tax Codes._tax_XTreeWidget");
        doubleClickItem(":List Tax Codes._tax_XTreeWidget","TAXAUTH1-GM",0,0,0,Qt.LeftButton);
        waitForObject(":Tax Code_taxCode");
        test.compare(findObject(":Tax Code._taxClass_XComboBox").currentText,"1-Legacy Class 1");
        test.compare(findObject(":Tax Code._taxauth_XComboBox").currentText,"TAX-AUTH1");
        waitForObject(":_frame._taxitems_XTreeWidget");
        doubleClickItem(":_frame._taxitems_XTreeWidget","Always",0,0,0,Qt.LeftButton);
        waitForObject(":_rateGroup._percent_XLineEdit");
        test.compare(parseInt(findObject(":_rateGroup._percent_XLineEdit").text), "10");
        waitForObject(":Tax Code Rate.Save_QPushButton");
        clickButton(":Tax Code Rate.Save_QPushButton");
        waitForObject(":List Departments.Save_QPushButton");
        clickButton(":List Departments.Save_QPushButton");
        if(object.exists("{column='0' container=':List Tax Codes._tax_XTreeWidget' text='TAXAUTH1-GM' type='QModelIndex'}"))
            test.pass("Tax Code created:TAXAUTH1-GM");
    } catch (e) { test.fail("caught exception " + e + " looking for tax code TAXAUTH1-GM"); }
    
    try{
        waitForObject(":List Tax Codes.New_QPushButton");
        clickButton(":List Tax Codes.New_QPushButton");
        waitForObject(":_code_XLineEdit_12");
        type(":_code_XLineEdit_12", "TAXAUTH1-EDU");
        type(":_description_XLineEdit_23", "Tax Authority 1 Educational Merchandise");
        waitForObject(":List Tax Codes.VirtualClusterLineEdit_GLClusterLineEdit");
        type(":List Tax Codes.VirtualClusterLineEdit_GLClusterLineEdit","01-01-4050-01");
        nativeType("<Tab>");
        waitForObject(":Tax Code._taxClass_XComboBox");
        clickItem(":Tax Code._taxClass_XComboBox","1-Legacy Class 1",1,0,0,Qt.LeftButton);
        waitForObject(":Tax Code._taxauth_XComboBox");
        clickItem(":Tax Code._taxauth_XComboBox","TAX-AUTH1",1,0,0,Qt.LeftButton);
        clickButton(":_frame.New_QPushButton_2");
        waitForObject(":_rateGroup._percent_XLineEdit");
        type(":_rateGroup._percent_XLineEdit", "1");
        clickButton(":Tax Code Rate.Save_QPushButton");
        waitForObject(":List Departments.Save_QPushButton");
        clickButton(":List Departments.Save_QPushButton");
    }
    catch(e){test.fail("Exception in defining Tax Code:"+e);}
    
    //-------verify saved Tax Code-----
    try {
        waitForObject(":List Tax Codes._tax_XTreeWidget");
        doubleClickItem(":List Tax Codes._tax_XTreeWidget","TAXAUTH1-EDU",0,0,0,Qt.LeftButton);
        waitForObject(":Tax Code_taxCode");    
        test.compare(findObject(":Tax Code._taxClass_XComboBox").currentText,"1-Legacy Class 1");
        test.compare(findObject(":Tax Code._taxauth_XComboBox").currentText,"TAX-AUTH1");
        waitForObject(":_frame._taxitems_XTreeWidget");
        doubleClickItem(":_frame._taxitems_XTreeWidget","Always",0,0,0,Qt.LeftButton);
        waitForObject(":_rateGroup._percent_XLineEdit");
        test.compare(parseInt(findObject(":_rateGroup._percent_XLineEdit").text), "1");
        waitForObject(":Tax Code Rate.Save_QPushButton");
        clickButton(":Tax Code Rate.Save_QPushButton");
        waitForObject(":List Departments.Save_QPushButton");
        clickButton(":List Departments.Save_QPushButton");
        if(object.exists("{column='0' container=':List Tax Codes._tax_XTreeWidget' text='TAXAUTH1-EDU' type='QModelIndex'}"))
            test.pass("Tax Code created:TAXAUTH1-EDU");
    } catch (e) { test.fail("caught exception " + e + " looking for tax code TAXAUTH1-EDU"); }
    
    waitForObject(":List Tax Codes.Close_QPushButton");
    clickButton(":List Tax Codes.Close_QPushButton");
    
} 


function defineTaxType(name, desc)
{
    
    try{
        
        //---------Create Tax Types--------------------
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP: *.Tax_QMenu", "Tax Types...");
        activateItem(":xTuple ERP: *.Tax_QMenu", "Tax Types...");
        
        waitForObject(":List Tax Types.New_QPushButton_2");
        clickButton(":List Tax Types.New_QPushButton_2");
        waitForObject(":Tax Type._name_XLineEdit");
        type(":Tax Type._name_XLineEdit", name);
        type(":Tax Type._description_XLineEdit", desc);
        clickButton(":Tax Type.Save_QPushButton");
        waitForObject(":List Tax Types._taxtype_XTreeWidget");
        if(object.exists(":_taxtype.GM_QModelIndex"))
            test.pass("Tax Type created:GM");
        
        waitForObject(":List Tax Types.Close_QPushButton_2");
        clickButton(":List Tax Types.Close_QPushButton_2");
    }
    catch(e){test.fail("Exception caught in creating Tax Type:"+e);}
}

function defineTaxZone(name, desc)
{
    try{
        //----Define Tax Zones----
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP: *.Tax_QMenu", "Tax Zones...");
        activateItem(":xTuple ERP: *.Tax_QMenu", "Tax Zones...");
        
        waitForObject(":List Tax Zones.New_QPushButton_2");
        clickButton(":List Tax Zones.New_QPushButton_2");
        
        waitForObject(":_taxZone_XLineEdit_2");
        type(":_taxZone_XLineEdit_2", name);
        type(":_description_XLineEdit_40", desc);
        waitForObject(":Tax Zone.Save_QPushButton");
        clickButton(":Tax Zone.Save_QPushButton");
        
        waitForObject(":List Tax Zones.Close_QPushButton_2");
        clickButton(":List Tax Zones.Close_QPushButton_2");
    }
    catch(e){test.fail("Exception caught in defining Tax Zone:"+e);}
}  

function assignTax(zone,ttype,tcode)
{
    try{
        //--------Tax Assignments-------
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP: *.Tax_QMenu", "Tax Assignments...");
        activateItem(":xTuple ERP: *.Tax_QMenu", "Tax Assignments...");
        
        waitForObject(":_frame.New_QPushButton_4");
        clickButton(":_frame.New_QPushButton_4");
        
    
        waitForObject(":Tax Assignment._taxZone_XComboBox_2");
        type(":Tax Assignment._taxZone_XComboBox_2", zone);
        waitForObject(":Tax Assignment._taxType_XComboBox_2");
        type(":Tax Assignment._taxType_XComboBox_2", ttype);
        waitForObject(":_frame._taxCodeOption_XTreeWidget_3"); 
        
        clickItem(":_frame._taxCodeOption_XTreeWidget_3", tcode, 0, 0, 1, Qt.LeftButton);
        
   
        while(!findObject(":_frame.Add->_QPushButton_3").enabled)
            snooze(0.1);
        waitForObject(":_frame.Add->_QPushButton_3");
        clickButton(":_frame.Add->_QPushButton_3");
        waitForObject(":List Pricing Schedule Assignments.Close_QPushButton_2");
        clickButton(":List Pricing Schedule Assignments.Close_QPushButton_2");
        waitForObject(":Tax Assignment.Close_QPushButton");
        clickButton(":Tax Assignment.Close_QPushButton");
        
    }
    catch(e){test.fail("Exception in assigning Tax:"+e);}
}

function RegTax(zone,treg)
{
    try{
        
        //----------Create: Tax Registrations--------------
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Tax");
        waitForObjectItem(":xTuple ERP: *.Tax_QMenu", "Tax Registrations...");
        activateItem(":xTuple ERP: *.Tax_QMenu", "Tax Registrations...");
        
        waitForObject(":List Tax Registrations.New_QPushButton_2");
        clickButton(":List Tax Registrations.New_QPushButton_2");
        
        waitForObject(":Tax Registration Information._taxZone_XComboBox");
        type(":Tax Registration Information._taxZone_XComboBox", zone);
        waitForObject(":Tax Registration Information._taxauth_XComboBox");
        type(":Tax Registration Information._taxauth_XComboBox", zone);
        waitForObject(":Tax Registration Information._number_QLineEdit");
        mouseClick(":Tax Registration Information._number_QLineEdit", 5, 5, 1, Qt.LeftButton);
        
        waitForObject(":Tax Registration Information._number_QLineEdit");
        type(":Tax Registration Information._number_QLineEdit", treg);
        waitForObject(":_frame._notes_XTextEdit_2");
        type(":_frame._notes_XTextEdit_2", treg);
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        snooze(1);
        waitForObject(":List Tax Registrations.Close_QPushButton_2");
        clickButton(":List Tax Registrations.Close_QPushButton_2");
    }
    catch(e){test.fail("Exception while Registering Tax:"+e);}
    
}


//-----------Products: create Characteristics--------------------    
function defineChartcs(name,desc,ctype)
{
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Products", 74, 11, 0, Qt.LeftButton);
        waitForObject(":Master Information.Characteristics_QModelIndex");
        mouseClick(":Master Information.Characteristics_QModelIndex", 75, 7, 0, Qt.LeftButton);
        
        waitForObject(":List Characteristics.New_QPushButton_2");
        clickButton(":List Characteristics.New_QPushButton_2");
        
        waitForObject(":_name_XLineEdit_6");
        type(":_name_XLineEdit_6", name);
        
        waitForObject(":Work Center.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Work Center.qt_tabwidget_tabbar_QTabBar", "Description");
        waitForObject(":_descripPage._description_QTextEdit");
        type(":_descripPage._description_QTextEdit",desc);
        
        snooze(1);
        
        switch(ctype)
        {
             case "item": 
                 waitForObject(":May be used on:.Item_QCheckBox_2");
                 if(!findObject(":May be used on:.Item_QCheckBox_2").checked)
                     clickButton(":May be used on:.Item_QCheckBox_2");
                 break;
             case "customer" :
                 waitForObject(":May be used on:.Customer_QCheckBox_2");
                 if(!findObject(":May be used on:.Customer_QCheckBox_2").checked)
                     clickButton(":May be used on:.Customer_QCheckBox_2");
                 break;
             case "crm":
                 waitForObject(":May be used on:.CRM Account_QCheckBox_2");
                 if(!findObject(":May be used on:.CRM Account_QCheckBox_2").checked)
                     clickButton(":May be used on:.CRM Account_QCheckBox_2");
                 break;
             case "address":
                 waitForObject(":May be used on:.Address_QCheckBox_2");
                 if(!findObject(":May be used on:.Address_QCheckBox_2").checked)
                     clickButton(":May be used on:.Address_QCheckBox_2");
                 break;
             case "contact":
                 waitForObject(":May be used on:.Contact_QCheckBox_2");
                 if(!findObject(":May be used on:.Contact_QCheckBox_2").checked)
                     clickButton(":May be used on:.Contact_QCheckBox_2");
                 break;
             case "lot":
                 waitForObject(":May be used on:.Lot/Serial_QCheckBox_2");
                 if(!findObject(":May be used on:.Lot/Serial_QCheckBox_2").checked)
                     clickButton(":May be used on:.Lot/Serial_QCheckBox_2");
                 break;
             }
        
        waitForObject(":List Employees.Save_QPushButton_2");
        clickButton(":List Employees.Save_QPushButton_2");
        snooze(2);
        waitForObject(":List Characteristics._char_XTreeWidget");
        if(object.exists("{column='0' container=':List Characteristics._char_XTreeWidget' text='"+name+"' type='QModelIndex'}"))                 
            test.pass("Characteristics:"+ name+" created");
        else test.fail("Characteristics:"+ name+" not created");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }catch(e){test.fail("Exception in defining Characteristics:"+e);}
    
}

//---------------exit Appl-----------------------
function exitAppl()
{
    waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
    activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
    waitForObject(":xTuple ERP: OpenMFG Edition.System_QMenu");
    activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Exit xTuple ERP...");
}

//---------------Maintain Item Costs------------

function maintainItemCosts(Item,cost)
{
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Products");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Costing");
        activateItem(":xTuple ERP: OpenMFG Edition.Products_QMenu", "Costing");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Costing_QMenu", "Maintain Item Costs...");
        activateItem(":xTuple ERP: OpenMFG Edition.Costing_QMenu", "Maintain Item Costs...");
        waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
        type(":Item Sites.ItemLineEdit_ItemLineEdit",Item);
        waitForObject(":_QTreeView");
        type(":_QTreeView", "<Tab>");
        waitForObject(":_zonesTab.New_QPushButton");
        clickButton(":_zonesTab.New_QPushButton");
        waitForObject(":Create Item Cost._costelem_XComboBox");
        if(findObject(":Create Item Cost._costelem_XComboBox").currentText!="Material")
            clickItem(":Create Item Cost._costelem_XComboBox", "Material",0,0,1,Qt.LeftButton);
        if(findObject(":Create Item Cost._currency_XComboBox").currentText!="USD - $")
            clickItem(":Create Item Cost._currency_XComboBox", "USD - $",0,0,1,Qt.LeftButton);
        type(":Maintain Item Costs.XLineEdit_XLineEdit", cost);
        clickButton(":Create Item Cost.Post Cost to Standard_QCheckBox");
        clickButton(":Create Item Cost.Save_QPushButton");
        test.log("Material cost for "+Item+" defined");  
        waitForObject(":Tax Assignment.Close_QPushButton");
        clickButton(":Tax Assignment.Close_QPushButton"); 
    }
    catch(e){test.fail("Exception in defining material cost for "+Item+" :"+e);}
}

function createUserByRole2(userrole)
{ 
    try{
        //----Read the new User data from login.tsv based on role---
        var set = testData.dataset("login.tsv");
        var realname,username,role,pwd;
        role=realname=username=pwd="";
        
        for (var records in set)
        {
            role=testData.field(set[records],"ROLE");
            username=testData.field(set[records],"USERNAME");
            realname=testData.field(set[records],"REALNAME");
            pwd=testData.field(set[records],"PASSWORD");
            
            if(role==userrole) break;
        }
        
        if(userrole!=role) //User Role not found
        {
            test.fatal("Please provide user details in login.tsv for the role: "+userrole);
            exit(1);
        }
        
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Employees");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Employees");
        waitForObjectItem(":xTuple ERP: *.Employees_QMenu", "List...");
        activateItem(":xTuple ERP: *.Employees_QMenu", "List...");
        
        waitForObject(":_frame.New_QPushButton_5");
        clickButton(":_frame.New_QPushButton_5");
        waitForObject(":_code_XLineEdit_16");
        type(":_code_XLineEdit_16", username);
        waitForObject(":List Employees._number_XLineEdit");
        type(":List Employees._number_XLineEdit", username);
        waitForObject(":_contactTab._honorific_XComboBox");
        type(":_contactTab._honorific_XComboBox", "MR");
        waitForObject(":_contactTab._honorific_XLineEdit");
        type(":_contactTab._honorific_XLineEdit", "Susanta5");
        waitForObject(":_contactTab_XLineEdit");
        type(":_contactTab_XLineEdit", "R");
        waitForObject(":_contactTab_XLineEdit_2");
        type(":_contactTab_XLineEdit_2", "Misra");
        waitForObject(":Employee.qt_tabwidget_tabbar_QTabBar");
        snooze(1);
        clickTab(":Employee.qt_tabwidget_tabbar_QTabBar", "Detail");
        snooze(1);
        waitForObject(":_memberGroup._site_WComboBox");
        clickItem(":_memberGroup._site_WComboBox", "WH1", 0, 0, 1, Qt.LeftButton);
        waitForObject(":Employee.Save_QPushButton");
        clickButton(":Employee.Save_QPushButton");
        waitForObject(":List Work Centers.Close_QPushButton");
        clickButton(":List Work Centers.Close_QPushButton");
        
        
        snooze(1);
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Maintain Users...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Maintain Users...");
        waitForObject(":List Users.New_QPushButton")
                clickButton(":List Users.New_QPushButton");
        waitForObject(":_username_XLineEdit");
        type(":_username_XLineEdit", username);
        waitForObject(":List Users.Active_QCheckBox");
        if(!findObject(":List Users.Active_QCheckBox").checked)
            clickButton(":List Users.Active_QCheckBox");
        waitForObject(":_initials_XLineEdit");
        findObject(":_initials_XLineEdit").clear();
        type(":_initials_XLineEdit","JS");
        waitForObject(":_properName_XLineEdit");
        findObject(":_properName_XLineEdit").clear();
        type(":_properName_XLineEdit",realname);
        findObject(":_email_XLineEdit").clear();
        type(":_email_XLineEdit", "demo@openmfg.com");
        findObject(":_passwd_XLineEdit").clear();
        type(":_passwd_XLineEdit", pwd);
        snooze(0.5);
        findObject(":_verify_XLineEdit").clear();
        findObject(":_verify_XLineEdit");
        type(":_verify_XLineEdit", pwd);
        
        if(!findObject(":List Users.Purchasing Agent_QCheckBox").checked)
            clickButton(":List Users.Purchasing Agent_QCheckBox");
        if(!findObject(":List Users.Can Create System Users_QCheckBox").checked)
            clickButton(":List Users.Can Create System Users_QCheckBox");  
        
        clickItem(":_locale_XComboBox_4","Default",0,0,1,Qt.LeftButton);
        waitForObject(":List Users.qt_tabwidget_tabbar_QTabBar");
        clickTab(":List Users.qt_tabwidget_tabbar_QTabBar", "Roles");
        snooze(1);
        waitForObject(":_groupTab._availableGroup_XTreeWidget");
        sWidgetTreeControl = ":_groupTab._availableGroup_XTreeWidget";
        clickItem(":_groupTab._availableGroup_XTreeWidget","SUPER",0,0,1,Qt.LeftButton);
        waitForObject(":_groupTab.Add->_QPushButton");
        clickButton(":_groupTab.Add->_QPushButton");
        waitForObject(":List Users.Save_QPushButton_2");
        clickButton(":List Users.Save_QPushButton_2");
        
        
        snooze(2);
        waitForObject(":List Users._usr_XTreeWidget_2");
        if(object.exists("{column='0' container=':List Users._usr_XTreeWidget_2' text='"+username+"' type='QModelIndex'}"))
            test.pass("User created:"+username);
        else test.fail("User not created:"+username);
        
        waitForObject(":List Users.Close_QPushButton_2");
        clickButton(":List Users.Close_QPushButton_2");
    }
    catch(e){test.fail("Exception caught in creating user:"+e);}
}
