
function main()
{
    
    //-----includes-----
    source(findFile("scripts","functions.js"));
    
    //-----login Application-----
    loginAppl("CONFIGURE"); 
    
   //---find Application Edition------
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "System");
        activateItem(":xTuple ERP: *_QMenuBar", "System");
        waitForObjectItem(":xTuple ERP: *._System_QMenu", "Setup...");
        activateItem(":xTuple ERP: *._System_QMenu", "Setup...");
        waitForObject(":Configure.Database_QModelIndex");
        mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton);
        
        if(findObject(":Setup._tree_XTreeWidget").itemsExpandable==true)
        {
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton);
        }
        else
        {
            waitForObject(":_tree.Configure_QModelIndex");
            mouseClick(":_tree.Configure_QModelIndex",0, 0, 0, Qt.LeftButton);
            waitForObject(":Configure.Database_QModelIndex");
            mouseClick(":Configure.Database_QModelIndex", 0, 0, 0, Qt.LeftButton); 
        }
        
        waitForObject(":Database Information.*_QLabel");
        var appEdition = findObject(":Database Information.*_QLabel").text;
        
        if(object.exists(":_stack.Use toolbars on displays when available_QCheckBox"))
        {
            waitForObject(":_stack.Use toolbars on displays when available_QCheckBox");
            if(!findObject(":_stack.Use toolbars on displays when available_QCheckBox").checked)
                clickButton(":_stack.Use toolbars on displays when available_QCheckBox");
        }
        waitForObject(":Setup.Save_QPushButton");
        clickButton(":Setup.Save_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in identifying the application edition" + e);       
        
    }
   //--------------- Set the window to Tab view mode -------------
    tabView();
    
    //    //------ Creating Vendor ------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Vendor");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Vendor");
        waitForObjectItem(":xTuple ERP:*.Vendor_QMenu", "List...");
        activateItem(":xTuple ERP:*.Vendor_QMenu", "List...");
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        waitForObject(":_number_XLineEdit_3");
        type(":_number_XLineEdit_3", "Vendor 1");
        nativeType("<Tab>");
        waitForObject(":_vendtype_XComboBox");
        clickItem(":_vendtype_XComboBox","STANDARD-Standard Vendor",0, 0, 5, Qt.LeftButton);
        waitForObject(":xTuple ERP:*._name_XLineEdit");
        type(":xTuple ERP:*._name_XLineEdit", "Vendor 1");
        nativeType("<Tab>");
        waitForObject(":_accountNumber_XLineEdit");
        type(":_accountNumber_XLineEdit", "Vendor 1 for 5% Tax");
        waitForObject(":Default._defaultTerms_XComboBox");
        clickItem(":Default._defaultTerms_XComboBox","2-10N30-2% Discount in 10 Days - Net 30 Days",0, 0, 5, Qt.LeftButton);
        waitForObject(":Default Miscellaneous Distribution.Expense Category_QRadioButton");
        clickButton(":Default Miscellaneous Distribution.Expense Category_QRadioButton");
        waitForObject(":_expenseGroup_QLabel");
        type(":_expenseGroup_QLabel", "VENDOR_TAX_PAID_TYPE1");
        nativeType("<Tab>");
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Tax");
        waitForObject(":_taxzone_XComboBox_4");
        clickItem(":_taxzone_XComboBox_4","ZONE 1-Tax Zone 1",0, 0, 5, Qt.LeftButton); 
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Contacts");
        waitForObject(":Contact 1.VirtualClusterLineEdit_ContactClusterLineEdit");
        type(":Contact 1.VirtualClusterLineEdit_ContactClusterLineEdit", "admin");
        nativeType("<Tab>");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        
        waitForObject(":_list_XTreeWidget_3");
        if (object.exists("{column='1' container=':_list_XTreeWidget_3' text='VENDOR 1' type='QModelIndex'}"))                             test.pass("Vendor 1 record is created ");
        else
            test.fail("Vendor 1 record is Not Created");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
    }
    catch(e)
    {
        test.fail("Error in creating Vendor"+e);
    }
    snooze(3);
      var sourceitem = "TBOX1";
    var targetitem = "TAXBOX 1";
    //----- Purchase Type Item Creation -----
    
   try
  {
       waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products");
       activateItem(":xTuple ERP: *_QMenuBar", "Products");
       waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Item");
       activateItem(":xTuple ERP:*.Products_QMenu", "Item");
       waitForObjectItem(":xTuple ERP:*.Item_QMenu", "List...");
       activateItem(":xTuple ERP:*.Item_QMenu", "List...");
       waitForObject(":Quotes.Query_QToolButton");
       clickButton(":Quotes.Query_QToolButton");
       
       waitForObject(":_list_XTreeWidget_3");
       clickItem(":_list_XTreeWidget_3", sourceitem, 0, 0, 5, Qt.LeftButton);
       openItemContextMenu(":_list_XTreeWidget_3", sourceitem, 5, 5, Qt.LeftButton);
       waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Copy...");
       activateItem(":xTuple ERP:*._menu_QMenu", "Copy...");
       
       waitForObject(":_targetItemNumber_XLineEdit_2");
       type(":_targetItemNumber_XLineEdit_2", targetitem);
       
       if(!findObject(":Copy Item.Copy Item Costs_QCheckBox").checked)
       {
           clickButton(":Copy Item.Copy Item Costs_QCheckBox");
       }
       if(!findObject(":Copy Item.Copy Bill of Materials_QCheckBox").checked)
       {
           clickButton(":Copy Item.Copy Bill of Materials_QCheckBox");
       }
       if(object.exists(":Copy Item.Copy Bill of Operations_XCheckBox"))
       {
           if(!findObject(":Copy Item.Copy Bill of Operations_XCheckBox").checked)
           {
               clickButton(":Copy Item.Copy Bill of Operations_XCheckBox");
           }
           if(!findObject(":Copy Item.Copy Used At Operation_XCheckBox").checked)
           {
               clickButton(":Copy Item.Copy Used At Operation_XCheckBox");
           }
       }
       waitForObject(":Items.Copy_QPushButton");
       clickButton(":Items.Copy_QPushButton");
       
       waitForObject(":Sales Order.No_QPushButton");
       clickButton(":Sales Order.No_QPushButton");
       snooze(1);
       if(object.exists("{column='0' container=':_list_XTreeWidget_3' text='"+targetitem+"' type='QModelIndex'}"))
           test.pass("Item " + targetitem +" created");
       else
           test.fail("Item creation failed");
       
       waitForObject(":Quotes.Close_QToolButton");
       clickButton(":Quotes.Close_QToolButton");
   }
   catch(e)
   {
       test.fail("Exception in creating Item " + e);
       if(object.exists(":Quotes.Close_QToolButton"))
           clickButton(":Quotes.Close_QToolButton");
   }
  createRIS("TAXBOX 1");
    
    //------ Assiging Item to the TAX TYPE -----
    assignTaxType("TAXBOX 1",1);
    //--------- Purchase Order Creation ----------
    try{
        
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        waitForObject(":Quotes.New_QToolButton");
        clickButton(":Quotes.New_QToolButton");
        waitForObject(":_headerPage.VirtualClusterLineEdit_VendorLineEdit");
        type(":_headerPage.VirtualClusterLineEdit_VendorLineEdit", "VENDOR 1");
        nativeType("<Tab>");
        var ponumber1 = findObject(":_headerPage._orderNumber_XLineEdit").text;  
        waitForObject(":_headerPage._taxZone_XComboBox");
        clickItem(":_headerPage._taxZone_XComboBox","ZONE 1-Tax Zone 1",0, 0, 5, Qt.LeftButton);  
        snooze(1);
        waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar");
        clickTab(":Sales Order.qt_tabwidget_tabbar_QTabBar", "Line Items");
        nativeType("<Tab>");
        waitForObject(":_lineItemsPage.New_QPushButton");
        clickButton(":_lineItemsPage.New_QPushButton");
        snooze(2);
        waitForObject(":groupBox_2.ItemLineEdit_ItemLineEdit");
        type(":groupBox_2.ItemLineEdit_ItemLineEdit", "TAXBOX 1");
        nativeType("<Tab>");
        waitForObject(":_ordered_XLineEdit_2");
        type(":_ordered_XLineEdit_2", "100");
        nativeType("<Tab>");
        var polineitem1 = findObject(":groupBox_2.ItemLineEdit_ItemLineEdit").text;         
        var poquantity1 = findObject(":_ordered_XLineEdit_2").text;       
        waitForObject(":_priceGroup.XLineEdit_XLineEdit").clear();
        type(":_priceGroup.XLineEdit_XLineEdit", "1");
        nativeType("<Tab>");
        waitForObject(":_schedGroup.XDateEdit_XDateEdit");
        type(":_schedGroup.XDateEdit_XDateEdit", "+7");
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        snooze(2);
        if(object.exists(":Invalid Unit Price.Continue_QPushButton"))
            clickButton(":Invalid Unit Price.Continue_QPushButton");
        var potaxamt1 = findObject(":xTuple ERP:*.XLineEdit_XLineEdit").text;
        test.log(potaxamt1);
        var posubtot1 = findObject(":_lineItemsPage.XLineEdit_XLineEdit_2").text;
        posubtot1 = replaceSubsting(posubtot1);
        if(potaxamt1 == posubtot1*5/100)
            test.pass("Tax amount calculted correctly for the purchase order");
        else
            test.fail("Incorrect Tax amount is calculated for the purchase order");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        snooze(2);
   
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");       waitForObject(":Quotes.Query_QToolButton");
        clickButton(":Quotes.Query_QToolButton");
        snooze(1);
        waitForObject(":_list_XTreeWidget_3");
        if(object.exists("{column='0' container=':_list_XTreeWidget_3' text= '"+ponumber1+"' type='QModelIndex'}"))
            test.pass("Purchase order created successfully");
        else 
            test.fail("Purchase order couldn't be created");
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
    }
    catch(e)
    {
        test.fail("Error in creating purchase order" + e);
    }
    
    //-----Releasing Purchase Orders-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Purchase");
        activateItem(":xTuple ERP: *_QMenuBar", "Purchase");
        waitForObjectItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        activateItem(":xTuple ERP:*.Purchase_QMenu", "Purchase Order");
        waitForObjectItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        activateItem(":xTuple ERP:*.Purchase Order_QMenu", "List Open...");
        snooze(0.5);
        if(!findObject(":List Open Purchase Orders.Unreleased_XCheckBox").checked)
            clickButton(":List Open Purchase Orders.Unreleased_XCheckBox");
        waitForObject(":Quantities on Hand.Query_QToolButton");
        clickButton(":Quantities on Hand.Query_QToolButton");
        snooze(0.5);
        waitForObject(":_list_XTreeWidget_3");
        openItemContextMenu(":_list_XTreeWidget_3",ponumber1, 5, 5, Qt.LeftButton);
        waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Release...");
        activateItem(":xTuple ERP:*._menu_QMenu", "Release...");  
        waitForObject(":Quotes.Close_QToolButton");
        clickButton(":Quotes.Close_QToolButton");
        
        
        test.log("Purchase Orders Released successfully");
    }
    catch(e)
    {
        test.fail("Error in Releasing purchase orders" + e);
    }
  
    //-----Receiving Purchase Goods-----
    try
    {
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Inventory");
        activateItem(":xTuple ERP: *_QMenuBar", "Inventory");
        waitForObjectItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        activateItem(":xTuple ERP: *.Inventory_QMenu", "Receiving");
        waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");
        activateItem(":xTuple ERP:*.Receiving_QMenu", "New Receipt...");  
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit", ponumber1);
        snooze(0.5);
        nativeType("<Tab>");
        waitForObject(":_frame.Receive All_QPushButton");
        clickButton(":_frame.Receive All_QPushButton");
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Purchase Order for TAXBOX 1  received successfully")
            }
    catch(e)
    {
        test.fail("Error in receiving Purchase Order"+e);
    }
    //-----Entering a Voucher-----
    try
    {
        //--------------------Voucher for regular item----------  
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "New...");
        waitForObject(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit");
        type(":xTuple ERP:*.VirtualClusterLineEdit_OrderLineEdit", ponumber1);
        snooze(0.5);
        nativeType("<Tab>");
        
        vounumber1 = findObject(":_voucherGroup._voucherNumber_XLineEdit").text; 
        
        waitForObject(":_poitems._poitem_XTreeWidget");
        doubleClickItem(":_poitems._poitem_XTreeWidget", "EA", 5, 5, 1, Qt.LeftButton);      
        waitForObject(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget");
        doubleClickItem(":Uninvoiced Recepts and Returns._uninvoiced_XTreeWidget", "Receiving", 5, 5, 0, Qt.LeftButton);
        waitForObject(":_distTab.New_QPushButton");
        clickButton(":_distTab.New_QPushButton");
        
        waitForObject(":Cash Receipt.XLineEdit_XLineEdit_2");
        type(":Cash Receipt.XLineEdit_XLineEdit_2", "100");
        waitForObject(":Voucher Item Distribution.Save_QPushButton");
        clickButton(":Voucher Item Distribution.Save_QPushButton");
        
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        var votaxamt1 = findObject(":Cash Receipt.XLineEdit_XLineEdit").text;
        clickButton(":Select Order for Billing.Save_QPushButton_2");  
        waitForObject(":xTuple ERP:*.XLineEdit_XLineEdit");
        type(":xTuple ERP:*.XLineEdit_XLineEdit",findObject(":_amount.XLineEdit_XLineEdit").text);
        
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "+0");
        waitForObject(":_invoiceNum_XLineEdit");
        type(":_invoiceNum_XLineEdit", "VO for" + ponumber1);
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
        if(potaxamt1 == parseInt(votaxamt1))
            test.pass("Voucher Tax amount is Equal to the Purchase Order tax amount");
        else
            test.fail("Voucher Tax amount is Not-Equal to the Purchase Order tax amount");
        
    }
    catch(e)
    {
        test.fail("Error in creating vouchers for purchase orders" + e);
    }
    
    //-----Posting Vouchers-----
    try
    {
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        
        waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
        if(object.exists("{column='0' container=':xTuple ERP:*._vohead_XTreeWidget' text='"+vounumber1+"' type='QModelIndex'}"))
            
            test.pass(" Voucher created for Regular item type");
        else test.fail(" Voucher not created Regular item type");
        
        clickItem(":xTuple ERP:*._vohead_XTreeWidget", vounumber1, 5, 5, 1, Qt.LeftButton);
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Posted Voucher successfully");
    }
    catch(e)
    {
        test.fail("Error in posting vouchers" + e);
    }
    //-------- G/L Verification for Voucher --------------
    bool = glTaxTransactions(/01-01-2350-01/, vounumber1);
    if(bool == 1)
    {
        test.pass("Voucher " + vounumber1 + " has a G/L entry for its tax amount");
    }
    else
        test.fail("No GL entry is made for voucher" + vounumber1+"");
    //-----Tax History Verification for Voucher -----------
    
    bool = taxHistory(vounumber1);
    if(bool == 1)
    {
        test.pass("Voucher" + vounumber1 + " has a Tax History entry for its tax amount");
    }
    else
        test.fail("No Tax History is available for the "+vounumber1+" voucher tax amount");
  //---------- Misc. Voucher Creation ---------
 
    try{
        
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "New Miscellaneous...");
        waitForObject(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit");
        type(":_voucherGroup.VirtualClusterLineEdit_VendorLineEdit", "VENDOR 1");
        nativeType("<Tab>");
        var miscvou1 = findObject(":_voucherGroup._voucherNumber_XLineEdit").text;
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "0");
        nativeType("<Tab>");
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        type(":_amountGroup.XLineEdit_XLineEdit", "500");
        nativeType("<Tab>");
        waitForObject(":_miscDistribTab.New_QPushButton");
        clickButton(":_miscDistribTab.New_QPushButton");
        waitForObject(":_groupButton.Tax Code_QRadioButton");
        clickButton(":_groupButton.Tax Code_QRadioButton");
        waitForObject(":_groupButton._taxCode_XComboBox");
        clickItem(":_groupButton._taxCode_XComboBox","Code 1-Tax Code 1",0, 0, 5, Qt.LeftButton);
        snooze(0.5);
        waitForObject(":Select Order for Billing.Save_QPushButton_2");
        clickButton(":Select Order for Billing.Save_QPushButton_2");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Sales Order.Cancel_QPushButton");
        clickButton(":Sales Order.Cancel_QPushButton");
    }
    catch(e)
    {
        test.fail("Error in Creating a Misc.Voucher"+e);
    }
    
    snooze(3);
    //----- Posting Misc.Voucher --------
    try{
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Voucher");
        waitForObjectItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        activateItem(":xTuple ERP:*.Voucher_QMenu", "List Unposted...");
        waitForObject(":xTuple ERP:*._vohead_XTreeWidget");
        if (object.exists("{column='0' container=':xTuple ERP:*._vohead_XTreeWidget' text= '"+miscvou1+"' type='QModelIndex'}"))            test.pass("Misc.Voucher Created Successfully");
        else
            test.fail("Misc.Voucher Not Created");
        
        clickItem(":xTuple ERP:*._vohead_XTreeWidget",miscvou1,0, 0, 5, Qt.LeftButton);
        waitForObject(":List Unposted Invoices.Post_QPushButton");
        clickButton(":List Unposted Invoices.Post_QPushButton");
        waitForObject(":List Unposted Invoices.Continue_QPushButton");
        clickButton(":List Unposted Invoices.Continue_QPushButton");
        waitForObject(":Select Order for Billing.Close_QPushButton");
        clickButton(":Select Order for Billing.Close_QPushButton");
        test.log("Misc.Voucher posted successfully");
    }
    catch(e)
    {
        test.fail("Error in Posting Misc.Voucher"+e);
    }
    snooze(3);
    //-------- G/L Verification for Misc.Voucher --------------
    bool = glTaxTransactions(/01-01-2350-01/, miscvou1);
    if(bool == 1)
    {
        test.pass("Misc.Voucher " + miscvou1 + " has a G/L entry for its tax amount");
    }
    else
        test.fail("No GL entry is made for misc.voucher" + miscvou1+"");
    //-----Tax History Verification for Misc.Voucher -----------
    
    bool = taxHistory(miscvou1);
    if(bool == 1)
    {
        test.pass("Misc.Voucher" + miscvou1 + " has a Tax History entry for its tax amount");
    }
    else
        test.fail("No Tax History is available for the "+miscvou1+" misc.voucher");
    
      //------- A/P Misc.Debit Memo Creation ------
    try{ 
        waitForObjectItem(":xTuple ERP: *_QMenuBar", "Accounting");
        activateItem(":xTuple ERP: *_QMenuBar", "Accounting");
        waitForObjectItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        activateItem(":xTuple ERP: *.Accounting_QMenu", "Accounts Payable");
        waitForObjectItem(":xTuple ERP:*.Accounts Payable_QMenu", "Memos");
        activateItem(":xTuple ERP:*.Accounts Payable_QMenu", "Memos");
        waitForObjectItem(":xTuple ERP:*.Memos_QMenu_2", "New Misc. Debit Memo...");
        activateItem(":xTuple ERP:*.Memos_QMenu_2", "New Misc. Debit Memo...");
        waitForObject(":A/P Open Item - Enter Misc. Debit Memo.VirtualClusterLineEdit_VendorLineEdit");
        type(":A/P Open Item - Enter Misc. Debit Memo.VirtualClusterLineEdit_VendorLineEdit", "VENDOR 1");
        nativeType("<Tab>");
        var apdmnum1 = findObject(":_docGroup._docNumber_XLineEdit_2").text;
        waitForObject(":xTuple ERP:*.XDateEdit_XDateEdit");
        type(":xTuple ERP:*.XDateEdit_XDateEdit", "+0");
        nativeType("<Tab>");
        waitForObject(":_docGroup._poNumber_XLineEdit");
        type(":_docGroup._poNumber_XLineEdit", "1111");
        nativeType("<Tab>");
        waitForObject(":_amountGroup.XLineEdit_XLineEdit");
        type(":_amountGroup.XLineEdit_XLineEdit", "1200");
        nativeType("<Tab>");
        snooze(0.5);
        waitForObject(":_amountGroup.Tax:_XURLLabel_2");
        mouseClick(":_amountGroup.Tax:_XURLLabel_2", 24, 12, 0, Qt.LeftButton);
        snooze(1);
        waitForObject(":_frame.New_QPushButton_3");
        clickButton(":_frame.New_QPushButton_3");
        waitForObject(":_taxcode_XComboBox");
        clickItem(":_taxcode_XComboBox","Code 1-Tax Code 1",0, 0, 5, Qt.LeftButton);  
        snooze(0.5);
        waitForObject(":Tax Adjustment.XLineEdit_XLineEdit");
        type(":Tax Adjustment.XLineEdit_XLineEdit", "200");
        waitForObject(":Select Order for Billing.Save_QPushButton");
        clickButton(":Select Order for Billing.Save_QPushButton");
        waitForObject(":Tax Detail.Close_QPushButton");
        clickButton(":Tax Detail.Close_QPushButton");
        waitForObject(":A/P Open Item - Enter Misc. Debit Memo.Post_QPushButton");
        clickButton(":A/P Open Item - Enter Misc. Debit Memo.Post_QPushButton");
        test.log("A/P Misc Debit memo created and posted");
    }
    catch(e)
    {
        test.fail("Error in Creating/Posting A/P Misc. Debit Memo"+e);
    }
    //-------- G/L Verification for Misc.A/P Debit Memo --------------
    bool = glTaxTransactions(/01-01-2350-01/, apdmnum1);
    if(bool == 1)
    {
        test.pass("misc.debit memo " + apdmnum1 + " has a G/L entry for its tax amount");
    }
    else
        test.fail("No GL entry is made for misc.debit memo" + apdmnum1+"");
    //-----Tax History Verification for A/R Misc.Debit Memo -----------
    
    bool = taxHistory(apdmnum1);
    if(bool == 1)
    {
        test.pass("misc.debit memo" + apdmnum1 + " has a Tax History entry for its tax amount");
    }
    else
        test.fail("No Tax History is available for the "+apdmnum1+" misc.debit memo tax amount");  
    
}
