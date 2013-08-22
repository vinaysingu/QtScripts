function main()
{
    
    
    source(findFile("scripts","functions.js"));
    
    //---login Application--------
    loginAppl("RUNREGISTER");  
   
    
    var appEdition = findApplicationEdition();
  
    //--------Configure: Purchase Module-------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Purchase", 10, 10, 0, Qt.LeftButton);
        waitForObject(":Configure.Purchase_QModelIndex");
        mouseClick(":Configure.Purchase_QModelIndex", 32, 4, 0, Qt.LeftButton);
        waitForObject(":_orderNumGeneration_QComboBox");
        if(findObject(":_orderNumGeneration_QComboBox").currentText!="Automatic")
            clickItem(":_orderNumGeneration_QComboBox", "Automatic",0,0,1,Qt.LeftButton);
        type(":_nextPoNumber_XLineEdit", "<Ctrl+A>");
        type(":_nextPoNumber_XLineEdit", "<Del>");
        type(":_nextPoNumber_XLineEdit", "20000");
        type(":_nextVcNumber_XLineEdit", "<Ctrl+A>");
        type(":_nextVcNumber_XLineEdit", "<Del>");
        type(":_nextVcNumber_XLineEdit", "30000");
        if(findObject(":_prNumberGeneration_QComboBox_2").currentText!="Automatic")
            type(":_prNumberGeneration_QComboBox_2", "Automatic");
        type(":_nextPrNumber_XLineEdit", "<Ctrl+A>");
        type(":_nextPrNumber_XLineEdit", "<Del>");
        type(":_nextPrNumber_XLineEdit", "10000");

        if(!findObject(":Purchase Configuration.Post Purchase Order Changes to the Change Log_QCheckBox").checked)
            clickButton(":Purchase Configuration.Post Purchase Order Changes to the Change Log_QCheckBox");
        if(!findObject(":Purchase Configuration.Post Vendor Changes to the Change Log_QCheckBox").checked)
            clickButton(":Purchase Configuration.Post Vendor Changes to the Change Log_QCheckBox");
        if(!findObject(":Purchase Configuration.Use Earliest Avail. as Due Date for Purchase Order Item_QCheckBox").checked)            clickButton(":Purchase Configuration.Use Earliest Avail. as Due Date for Purchase Order Item_QCheckBox");
        if(!findObject(":Purchase Configuration.Prevent Purchase Order Items when no Std. Cost Exists_QCheckBox").checked)
            clickButton(":Purchase Configuration.Prevent Purchase Order Items when no Std. Cost Exists_QCheckBox");
        if(findObject(":Purchase Configuration.Check Print Purchase Order on Save by Default_QCheckBox").checked)
            clickButton(":Purchase Configuration.Check Print Purchase Order on Save by Default_QCheckBox");
        if(!findObject(":Options.Copy Purchase Request notes to Purchase Order Item notes_QCheckBox").checked)
            clickButton(":Options.Copy Purchase Request notes to Purchase Order Item notes_QCheckBox");
        if(object.exists(":Options.Enable Drop Shipments_QCheckBox"))
        {
            if(!findObject(":Options.Enable Drop Shipments_QCheckBox").checked)
            { clickButton(":Options.Enable Drop Shipments_QCheckBox");
                if(!findObject(":Options.Select Drop Shipped Orders for Billing on Receipt_QCheckBox").checked)
                    clickButton(":Options.Select Drop Shipped Orders for Billing on Receipt_QCheckBox");
            }
        }
        type(":_defaultShipVia_XLineEdit", "<Ctrl+A>");    
        type(":_defaultShipVia_XLineEdit", "<Del>");
        type(":_defaultShipVia_XLineEdit", "UPS Account 1234567");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("Purchase Module Configured");
    }catch(e){test.fail("Exception in configuring Purchase Module:"+e);}
    
  
    //-------------Configure: Inventory Module---------------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Inventory", 76, 6, 0, Qt.LeftButton);
        waitForObject(":Configure.Inventory_QModelIndex");
        mouseClick(":Configure.Inventory_QModelIndex", 42, 8, 0, Qt.LeftButton);
        waitForObject(":Inventory Configuration.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Inventory Configuration.qt_tabwidget_tabbar_QTabBar", "Shipping and Receiving");
        waitForObject(":_nextShipmentNum_XLineEdit");
        findObject(":_nextShipmentNum_XLineEdit").clear();
        type(":_nextShipmentNum_XLineEdit", "10000");
        if(findObject(":tab_2.Disallow Purchase Order Receipt of Qty greater than ordered_QCheckBox").checked)
            clickButton(":tab_2.Disallow Purchase Order Receipt of Qty greater than ordered_QCheckBox");
        if(!findObject(":tab_2.Warn if Purchase Order Receipt Qty differs from receivable Qty_QCheckBox").checked)
            clickButton(":tab_2.Warn if Purchase Order Receipt Qty differs from receivable Qty_QCheckBox");
        findObject(":_tolerance_QLineEdit").clear();
        type(":_tolerance_QLineEdit", "5");
        
      
        findObject(":Default Shipping Form Copies:._numOfCopies_QSpinBox").clear();
        type(":Default Shipping Form Copies:._numOfCopies_QSpinBox", "2");
        snooze(2);
        waitForObject(":Default Shipping Form Copies:._watermarks_XTreeWidget");
        doubleClickItem(":Default Shipping Form Copies:._watermarks_XTreeWidget", "Copy #1",5,5,0,Qt.LeftButton);
        waitForObject(":tab_2._watermark_XLineEdit");
        type(":tab_2._watermark_XLineEdit", "Customer");
        if(!findObject(":tab_2.Show Prices_QCheckBox").checked)
            clickButton(":tab_2.Show Prices_QCheckBox");
        clickButton(":Inventory Configuration.Save_QPushButton");
        waitForObject(":Default Shipping Form Copies:._watermarks_XTreeWidget");
        doubleClickItem(":Default Shipping Form Copies:._watermarks_XTreeWidget", "Copy #2",5,5,0,Qt.LeftButton);
        waitForObject(":tab_2._watermark_XLineEdit");
        type(":tab_2._watermark_XLineEdit", "Internal");
        if(!findObject(":tab_2.Show Prices_QCheckBox"))
            clickButton(":tab_2.Show Prices_QCheckBox");
        clickButton(":Inventory Configuration.Save_QPushButton");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("Inventory Module configured");
    }catch(e){test.log("Exception in configuring Inventory module:"+e)}
    
    //---------Configure: Accounting-Account Payble---------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Accounting", 75, 11, 0, Qt.LeftButton);

        waitForObject(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Accounting Configuration.qt_tabwidget_tabbar_QTabBar", "Accounts Payable");
        waitForObject(":_nextAPMemoNumber_XLineEdit");
        type(":_nextAPMemoNumber_XLineEdit", "<Ctrl>");
        type(":_nextAPMemoNumber_XLineEdit", "<Del>");
        type(":_nextAPMemoNumber_XLineEdit", "39000");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        test.log("Account-Accounts Payable configured");
    }catch(e){test.fail("Exception in configuring Accounting"+e);}
    
    
    //----------Define Vendor types--------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Purchase", 76, 8, 0, Qt.LeftButton);
        waitForObject(":Master Information.Vendor Types_QModelIndex");
        mouseClick(":Master Information.Vendor Types_QModelIndex", 41, 6, 0, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Vendor Types.New_QPushButton");
        clickButton(":List Vendor Types.New_QPushButton");
        waitForObject(":_code_XLineEdit_8");
        type(":_code_XLineEdit_8", "STANDARD");
        type(":_description_XLineEdit_18", "Standard Vendor");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Vendor Types._vendtype_XTreeWidget");
        if(object.exists(":_vendtype.STANDARD_QModelIndex"))
            test.pass("Vendor Types Created: STANDARD");
        else test.fail("Vendor Types not Created: STANDARD");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }catch(e){test.fail("Exception in Defining Vendor types:"+e);}
    
    
    //---------Purchase: define Terms--------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Purchase", 76, 8, 0, Qt.LeftButton);
        waitForObject(":Master Information.Terms_QModelIndex");
        mouseClick(":Master Information.Terms_QModelIndex", 15, 4, 0, Qt.LeftButton);
        
        waitForObject(":List Terms.New_QPushButton");
        clickButton(":List Terms.New_QPushButton");
        waitForObject(":_code_XLineEdit_9");
        type(":_code_XLineEdit_9", "2-10N30");
        type(":_description_XLineEdit_19", "2% Discount in 10 Days - Net 30 Days");
        if(!findObject(":_typeGroup.Days_QRadioButton").checked)
            clickButton(":_typeGroup.Days_QRadioButton");
        if(!findObject(":_stack.Used in Payables_QCheckBox").checked)
            clickButton(":_stack.Used in Payables_QCheckBox");
        if(!findObject(":_stack.Used in Receivables_QCheckBox").checked)
            clickButton(":_stack.Used in Receivables_QCheckBox");
        type(":_dueDays_QSpinBox", "<Ctrl+A>");
        type(":_dueDays_QSpinBox", "<Del>");
        type(":_dueDays_QSpinBox", "30");
        type(":_discountDays_QSpinBox", "<Ctrl+A>");
        type(":_discountDays_QSpinBox", "<Del>");
        type(":_discountDays_QSpinBox", "10");
        type(":_discountPercent_XLineEdit", "<Ctrl+A>");
        type(":_discountPercent_XLineEdit", "<Del>");
        type(":_discountPercent_XLineEdit", "2");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Terms._terms_XTreeWidget");
        if(object.exists(":_terms.2-10N30_QModelIndex"))
            test.pass("Terms Created: 2-10N30");
        else test.fail("Terms not created: 2-10N30");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }catch(e){test.fail("Exception in defining Terms"+e);}
    
    //-------------Define: Reject Codes-----------------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Purchase", 76, 8, 0, Qt.LeftButton);
        waitForObject(":Master Information.Reject Codes_QModelIndex");
        mouseClick(":Master Information.Reject Codes_QModelIndex", 55, 4, 0, Qt.LeftButton);
        snooze(0.5);
        
        waitForObject(":List Reject Codes.New_QPushButton");
        clickButton(":List Reject Codes.New_QPushButton");
        waitForObject(":_code_XLineEdit_10");
        type(":_code_XLineEdit_10", "PO-DAMAGED-RETURNED");
        type(":_description_XLineEdit_20", "Damaged Purchased Material - Returned");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Reject Codes._rjctcode_XTreeWidget");
        if(object.exists(":_rjctcode.PO-DAMAGED-RETURNED_QModelIndex"))
            test.pass("Reject Codes Created: PO-DAMAGED-RETURNED");
        else test.fail("Reject Codes not Created: PO-DAMAGED-RETURNED");
        
        
        waitForObject(":List Reject Codes.New_QPushButton");
        clickButton(":List Reject Codes.New_QPushButton");
        waitForObject(":_code_XLineEdit_10");
        type(":_code_XLineEdit_10", "PO-WRONG-RETURNED");
        type(":_description_XLineEdit_20", "Wrong Purchased Product - Returned");
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        waitForObject(":List Reject Codes._rjctcode_XTreeWidget");
        if(object.exists(":_rjctcode.PO-WRONG-RETURNED_QModelIndex"))
            test.pass("Reject Codes Created: PO-WRONG-RETURNED");
        else test.fail("Reject Codes Created: PO-WRONG-RETURNED");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }catch(e){test.fail("Exception in defining Reject codes:"+e);}
    
    
    //-----------Chart Of Accounts-------------------------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        activateItem(":xTuple ERP: OpenMFG Edition.Accounting_QMenu", "Account");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
        activateItem(":xTuple ERP: OpenMFG Edition.Account_QMenu", "Chart of Accounts...");
        
        COA("01","01","2000","01","Accounts Payable","Liability","AP");
        
        COA("01","01","1400","01","Prepaid Account - Purchasing","Asset","CAS");
        
        COA("01","01","4900","01","Promotions and Discounts Taken","Revenue","SI");
        
        COA("01","01","4060","01","Shipping Charges Revenue","Revenue","SO");
        
        waitForObject(":Chart of Accounts.Close_QPushButton_2");
        clickButton(":Chart of Accounts.Close_QPushButton_2");
    }catch(e){test.fail("Exception in defining Chart of Accounts:"+e);}
    
  
    //----------Purchase: A/P Account Assignments-----------
    try{
        waitForObjectItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        activateItem(":xTuple ERP: OpenMFG Edition.System_QMenu", "Setup...");
        waitForObject(":Setup._modules_QComboBox");
        clickItem(":Setup._modules_QComboBox","Purchase", 76, 8, 0, Qt.LeftButton);
        waitForObject(":Accounting Mappings.Payables Assignments_QModelIndex");
        mouseClick(":Accounting Mappings.Payables Assignments_QModelIndex", 89, 6, 0, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":List Work Centers.New_QPushButton");
        clickButton(":List Work Centers.New_QPushButton");
        waitForObject(":_vendorTypeGroup.All Vendor Types:_QRadioButton_2");
        clickButton(":_vendorTypeGroup.All Vendor Types:_QRadioButton_2");
        
        waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_2");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_2","01-01-2000-01");
        nativeType("<Tab>");
        
        
        waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit");  
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit","01-01-1400-01");
        nativeType("<Tab>");
        
        
        waitForObject(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_3");
        type(":_stack.VirtualClusterLineEdit_GLClusterLineEdit_3","01-01-4900-01");
        nativeType("<Tab>");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
        waitForObject(":_stack._apaccnt_XTreeWidget");
        
        if(object.exists(":_apaccnt.All_QModelIndex_2"))
            test.pass("Accounts(A/P) Assignment created for: All");
        else test.fail("Accounts(A/P) Assignment not created for: All");
        
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
        
    }catch(e){test.fail("Exception in Assigning Accounts:"+e);}
    
    //--------------Create new Vendor-------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Vendor");
        activateItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Vendor");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Vendor_QMenu", "List...");
        activateItem(":xTuple ERP: OpenMFG Edition.Vendor_QMenu", "List...");
        
        waitForObject(":Tax Authorities.New_QToolButton");
        clickButton(":Tax Authorities.New_QToolButton");
        
        waitForObject(":_number_XLineEdit_4");
        findObject(":_number_XLineEdit_4").clear();
        type(":_number_XLineEdit_4", "TPARTS");
        if(findObject(":_vendtype_XComboBox").currentText!="STANDARD-Standard Vendor")
            clickItem(":_vendtype_XComboBox", "STANDARD-Standard Vendor",0,0,1,Qt.LeftButton);
        type(":_name_XLineEdit_8", "Toy Parts Inc");
        type(":_accountNumber_XLineEdit", "110022");
        if(findObject(":Default._defaultTerms_XComboBox").currentText!="2-10N30-2% Discount in 10 Days - Net 30 Days")
            clickItem(":Default._defaultTerms_XComboBox", "2-10N30-2% Discount in 10 Days - Net 30 Days",0,0,1,Qt.LeftButton);
        clickButton(":Default FOB.Receiving Site_QRadioButton");
        if(findObject(":_settingsGroup.Sells Purchase Order Items_QCheckBox").checked)
            clickButton(":_settingsGroup.Sells Purchase Order Items_QCheckBox");
        if(findObject(":_settingsGroup.Qualified_QCheckBox").checked)
            clickButton(":_settingsGroup.Qualified_QCheckBox");
        if(!findObject(":_settingsGroup.*amounts_QCheckBox").checked)
            clickButton(":_settingsGroup.*amounts_QCheckBox");
        if(findObject(":_settingsGroup.*Item Source_QCheckBox").checked)
            clickButton(":_settingsGroup.*Item Source_QCheckBox");
        clickTab(":Vendor.qt_tabwidget_tabbar_QTabBar", "Order Notes");
        waitForObject(":ponotesTab._poComments_QTextEdit");
        type(":ponotesTab._poComments_QTextEdit", "Default Vendor Notes From Vendor Master");
        waitForObject(":Vendor.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Vendor.qt_tabwidget_tabbar_QTabBar", "Addresses"); 
        waitForObject(":Maintain Item Costs.XLineEdit_XLineEdit");
        type(":Maintain Item Costs.XLineEdit_XLineEdit", "#522, Park Lane");
        type(":_addressStack.XLineEdit_XLineEdit", "Alpha Industries PVt ltd");
        type(":_addressStack.XLineEdit_XLineEdit_2", "Vengal Rao  Nagar");
        type(":_addressStack.XLineEdit_XLineEdit_3", "Kolkata");
        
        waitForObject(":_addressStack._state_XComboBox_3");
        clickItem(":_addressStack._state_XComboBox_3", "VA", 8, 12, 0, Qt.LeftButton);
        
        waitForObject(":_addressStack.XLineEdit_XLineEdit_4");
        type(":_addressStack.XLineEdit_XLineEdit_4", "300838");
        waitForObject(":Vendor.Save_QPushButton");
        clickButton(":Vendor.Save_QPushButton");
        waitForObject(":_list_XTreeWidget_3");
        snooze(1);
        if(object.exists(":_vendor.STANDARD_QModelIndex"))
            test.pass("Vendor created: TPARTS");
        else test.fail("Vendor not created: TPARTS");
        
        waitForObject(":Tax Authorities.Close_QToolButton");
        clickButton(":Tax Authorities.Close_QToolButton");
    }catch(e){test.fail("Exception in creating Vendor:"+e);}
    
  
    //------------Create Item Sources------------------
    try{
        waitForObject(":xTuple ERP: OpenMFG Edition_QMenuBar");
        activateItem(":xTuple ERP: OpenMFG Edition_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Item Source");
        activateItem(":xTuple ERP: OpenMFG Edition.Purchase_QMenu", "Item Source");
        waitForObjectItem(":xTuple ERP: OpenMFG Edition.Item Source_QMenu", "List...");
        activateItem(":xTuple ERP: OpenMFG Edition.Item Source_QMenu", "List...");
        
        //----Item source for TBOX1--------------
        
        waitForObject(":Tax Authorities.New_QToolButton");
        clickButton(":Tax Authorities.New_QToolButton");
        
        waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
        type(":Item Sites.ItemLineEdit_ItemLineEdit", "TBOX1");
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit_2");
        type(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit_2", "TPARTS");
        nativeType("<Tab>");
        snooze(0.5); 
        
        waitForObject(":_venditemGroup._vendorItemNumber_XLineEdit_2");
        type(":_venditemGroup._vendorItemNumber_XLineEdit_2", "TPBOX01");
        type(":_vendorUOM_XComboBox", "EA");
        type(":_venditemGroup._invVendorUOMRatio_XLineEdit", "1");
        type(":_venditemGroup._minOrderQty_XLineEdit", "0");
        type(":_multOrderQty_XLineEdit", "1");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Del>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "1");
        type(":_venditemGroup._leadTime_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._leadTime_QSpinBox", "<Del>");
        type(":_venditemGroup._leadTime_QSpinBox", "1");
        waitForObject(":Item Source.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Source.qt_tabwidget_tabbar_QTabBar", "Prices");
        
        waitForObject(":_pricesTab.Add_QPushButton_2");
        clickButton(":_pricesTab.Add_QPushButton_2");
        waitForObject(":_prodCatGroup._qtyBreak_XLineEdit");
        type(":_prodCatGroup._qtyBreak_XLineEdit", "100");
        type(":_addressGroup.XLineEdit_XLineEdit", ".20");
        waitForObject(":Item Source Price.Save_QPushButton");
        clickButton(":Item Source Price.Save_QPushButton");
        
        waitForObject(":Item Source.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Source.qt_tabwidget_tabbar_QTabBar", "Vendor Description");
        waitForObject(":_vendorTab._vendorItemDescrip_QTextEdit_2");
        type(":_vendorTab._vendorItemDescrip_QTextEdit_2", "ProDiem Box For Truck Type 1");
        waitForObject(":Item Source.Save_QPushButton");
        clickButton(":Item Source.Save_QPushButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='4' container=':_list_XTreeWidget_3' text='TBOX1' type='QModelIndex'}"))
            test.pass("Item Source created for: TBOX1");
        else test.fail("Item Source not created for: TBOX1");
        
    }catch(e){test.fail("Exception in defining Item sources for TBOX1:"+e);
    }
    
    //----Item source for TBODY1--------------
    try{
        waitForObject(":Tax Authorities.New_QToolButton");
        clickButton(":Tax Authorities.New_QToolButton");
        
        waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
        type(":Item Sites.ItemLineEdit_ItemLineEdit", "TBODY1");
        nativeType("<Tab>");
        snooze(0.5);
        
        
        waitForObject(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit_2");
        type(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit_2", "TPARTS");
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":_venditemGroup._vendorItemNumber_XLineEdit");
        type(":_venditemGroup._vendorItemNumber_XLineEdit", "TPBODY01");
        type(":_vendorUOM_XComboBox", "EA");
        type(":_venditemGroup._invVendorUOMRatio_XLineEdit", "1");
        type(":_venditemGroup._minOrderQty_XLineEdit", "0");
        type(":_multOrderQty_XLineEdit", "1");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Del>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "1");
        type(":_venditemGroup._leadTime_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._leadTime_QSpinBox", "<Del>");
        type(":_venditemGroup._leadTime_QSpinBox", "1");
        waitForObject(":Item Source.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Source.qt_tabwidget_tabbar_QTabBar", "Prices");
        
        waitForObject(":_pricesTab.Add_QPushButton_2");
        clickButton(":_pricesTab.Add_QPushButton_2");
        waitForObject(":_prodCatGroup._qtyBreak_XLineEdit");
        type(":_prodCatGroup._qtyBreak_XLineEdit", "0");
        type(":_addressGroup.XLineEdit_XLineEdit", "1");
        clickButton(":Item Source Price.Save_QPushButton");
        waitForObject(":Item Source.Save_QPushButton");
        clickButton(":Item Source.Save_QPushButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='4' container=':_list_XTreeWidget_3' text='TBODY1' type='QModelIndex'}"))
            test.pass("Item Source created for: TBODY1");
        else test.fail("Item source not created for TBODY1");
    }catch(e){test.fail("Exception in defining Item sources for TBODY1:"+e);}
    
    
    
    //----Item source for TINSERT1--------------
    try{
        waitForObject(":Tax Authorities.New_QToolButton");
        clickButton(":Tax Authorities.New_QToolButton");
        
        waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
        type(":Item Sites.ItemLineEdit_ItemLineEdit", "TINSERT1");
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit_2");
        type(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit_2", "TPARTS");
        nativeType("<Tab>");
        snooze(0.5);
        
        type(":_venditemGroup._vendorItemNumber_XLineEdit", "TPINSERT01");
        type(":_vendorUOM_XComboBox", "EA");
        type(":_venditemGroup._invVendorUOMRatio_XLineEdit", "1");
        type(":_venditemGroup._minOrderQty_XLineEdit", "0");
        type(":_multOrderQty_XLineEdit", "1");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Del>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "1");
        type(":_venditemGroup._leadTime_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._leadTime_QSpinBox", "<Del>");
        type(":_venditemGroup._leadTime_QSpinBox", "1");
        waitForObject(":Item Source.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Source.qt_tabwidget_tabbar_QTabBar", "Prices");
        
        waitForObject(":_pricesTab.Add_QPushButton_2");
        clickButton(":_pricesTab.Add_QPushButton_2");
        waitForObject(":_prodCatGroup._qtyBreak_XLineEdit");
        type(":_prodCatGroup._qtyBreak_XLineEdit", "0");
        type(":_addressGroup.XLineEdit_XLineEdit", ".25");
        clickButton(":Item Source Price.Save_QPushButton");
        waitForObject(":Item Source.Save_QPushButton");
        clickButton(":Item Source.Save_QPushButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='4' container=':_list_XTreeWidget_3' text='TINSERT1' type='QModelIndex'}"))
            test.pass("Item Source created for: TINSERT1");
        else test.fail("Item Source not created for: TINSERT1");
    }
    catch (e) {
        test.fail("Exception creating item source for TINSERT1: " + e);
    }
    
    
    
    //----Item source for TWHEEL1--------------
    try{
        waitForObject(":Tax Authorities.New_QToolButton");
        clickButton(":Tax Authorities.New_QToolButton");
        waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
        type(":Item Sites.ItemLineEdit_ItemLineEdit", "TWHEEL1");
        nativeType("<Tab>");
        snooze(0.5);
        
        
        waitForObject(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit_2");
        type(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit_2", "TPARTS");
        nativeType("<Tab>");
        snooze(0.5);
        
        
        type(":_venditemGroup._vendorItemNumber_XLineEdit", "TPWHEEL01");
        type(":_vendorUOM_XComboBox", "EA");
        type(":_venditemGroup._invVendorUOMRatio_XLineEdit", "1");
        type(":_venditemGroup._minOrderQty_XLineEdit", "0");
        type(":_multOrderQty_XLineEdit", "1");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Del>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "1");
        type(":_venditemGroup._leadTime_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._leadTime_QSpinBox", "<Del>");
        type(":_venditemGroup._leadTime_QSpinBox", "1");
        waitForObject(":Item Source.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Source.qt_tabwidget_tabbar_QTabBar", "Prices");
        
        waitForObject(":_pricesTab.Add_QPushButton_2");
        clickButton(":_pricesTab.Add_QPushButton_2");
        waitForObject(":_prodCatGroup._qtyBreak_XLineEdit");
        type(":_prodCatGroup._qtyBreak_XLineEdit", "0");
        type(":_addressGroup.XLineEdit_XLineEdit", ".10");
        clickButton(":Item Source Price.Save_QPushButton");
        waitForObject(":Item Source.Save_QPushButton");
        clickButton(":Item Source.Save_QPushButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='4' container=':_list_XTreeWidget_3' text='TWHEEL1' type='QModelIndex'}"))
            test.pass("Item Source created for: TWHEEL1");
        else test.fail("Item Source not created for: TWHEEL1");
    }catch(e){test.fail("Exception in defining Item sources for TWHEEL1:"+e);}
    
    //----Item source for YPAINT1--------------
    try{
        waitForObject(":Tax Authorities.New_QToolButton");
        clickButton(":Tax Authorities.New_QToolButton");
        waitForObject(":Item Sites.ItemLineEdit_ItemLineEdit");
        type(":Item Sites.ItemLineEdit_ItemLineEdit", "YPAINT1");
        nativeType("<Tab>");
        snooze(0.5);
        
        waitForObject(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit_2");
        type(":_vendorGroup.VirtualClusterLineEdit_VendorLineEdit_2", "TPARTS");
        nativeType("<Tab>");
        snooze(0.5);
        
        
        type(":_venditemGroup._vendorItemNumber_XLineEdit", "TPPAINT01");
        type(":_vendorUOM_XComboBox", "EA");
        type(":_venditemGroup._invVendorUOMRatio_XLineEdit", "1");
        type(":_venditemGroup._minOrderQty_XLineEdit", "0");
        type(":_multOrderQty_XLineEdit", "1");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "<Del>");
        type(":_venditemGroup._vendorRanking_QSpinBox", "1");
        type(":_venditemGroup._leadTime_QSpinBox", "<Ctrl+A>");
        type(":_venditemGroup._leadTime_QSpinBox", "<Del>");
        type(":_venditemGroup._leadTime_QSpinBox", "1");
        waitForObject(":Item Source.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Item Source.qt_tabwidget_tabbar_QTabBar", "Prices");
        
        waitForObject(":_pricesTab.Add_QPushButton_2");
        clickButton(":_pricesTab.Add_QPushButton_2");
        waitForObject(":_prodCatGroup._qtyBreak_XLineEdit");
        type(":_prodCatGroup._qtyBreak_XLineEdit", "0");
        type(":_addressGroup.XLineEdit_XLineEdit", ".10");
        clickButton(":Item Source Price.Save_QPushButton");
        waitForObject(":Item Source.Save_QPushButton");
        clickButton(":Item Source.Save_QPushButton");
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='4' container=':_list_XTreeWidget_3' text='YPAINT1' type='QModelIndex'}"))
            test.pass("Item Source created for: YPAINT1");
        else test.fail("Item Source not created for: YPAINT1");
        waitForObject(":Tax Authorities.Close_QToolButton");
        clickButton(":Tax Authorities.Close_QToolButton");
    }catch(e){test.fail("Exception in defining Item sources for YPAINT1:"+e);}   
    
    
}
