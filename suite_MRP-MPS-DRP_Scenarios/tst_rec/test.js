function main()
{
    type(waitForObject(":_username_QLineEdit"), "admin");
    type(waitForObject(":_username_QLineEdit"), "<Tab>");
    type(waitForObject(":_password_QLineEdit"), "zenx2plE");
    type(waitForObject(":_password_QLineEdit"), "<Return>");
    type(waitForObject(":Registration Key.No_QPushButton"), "<Left>");
    type(waitForObject(":Work Order.Yes_QPushButton"), "<Return>");
    activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar", "Sales"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Sales_QMenu", "Sales Order"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Sales Order_QMenu", "List Open..."));
    clickButton(waitForObject(":Work Order Schedule.Query_QToolButton"));
    waitForObjectItem(":_list_XTreeWidget_10", "TTOYS_2");
    doubleClickItem(":_list_XTreeWidget_10", "TTOYS_2", 12, 3, 0, Qt.LeftButton);
    clickTab(waitForObject(":Transfer Order.qt_tabwidget_tabbar_QTabBar"), "Line Items");
    clickButton(waitForObject(":List Unposted Purchase Orders.New_QPushButton"));
    type(waitForObject(":Bill of Materials.ItemLineEdit_ItemLineEdit"), "y");
    type(waitForObject(":_QTreeView"), "t");
    type(waitForObject(":_QTreeView"), "<Tab>");
    mouseClick(waitForObject(":_qtyOrdered_XLineEdit"), 77, 9, 0, Qt.LeftButton);
    type(waitForObject(":_qtyOrdered_XLineEdit"), "<1>");
    type(waitForObject(":_qtyOrdered_XLineEdit"), "<0>");
    type(waitForObject(":_qtyOrdered_XLineEdit"), "<0>");
    type(waitForObject(":_qtyOrdered_XLineEdit"), "<Tab>");
    type(waitForObject(":_amountGroup._discountFromCust_XLineEdit"), "<Tab>");
    type(waitForObject(":_amountGroup.XLineEdit_XLineEdit"), "<Tab>");
    type(waitForObject(":Miscellaneous Check.XDateEdit_XDateEdit"), "<0>");
    type(waitForObject(":Miscellaneous Check.XDateEdit_XDateEdit"), "<0>");
    type(waitForObject(":Miscellaneous Check.XDateEdit_XDateEdit"), "<Tab>");
    mouseClick(waitForObject(":_availabilityStack.Create Work Order_QGroupBox_2"), 43, 4, 0, Qt.LeftButton);
    mouseClick(waitForObject(":_availabilityStack.Create Work Order_QGroupBox_2"), 43, 4, 0, Qt.LeftButton);
    clickButton(waitForObject(":Sales Order.Close_QPushButton_2"));
    clickButton(waitForObject(":Work Order Schedule by Planner Code.No_QPushButton"));
    clickButton(waitForObject(":Work Order.Save_QPushButton"));
    clickButton(waitForObject(":Open Sales Orders.OK_QPushButton"));
    clickButton(waitForObject(":W/O Schedule by Planner Code.Close_QPushButton"));
    clickButton(waitForObject(":Work Order Schedule.Query_QToolButton"));
    openItemContextMenu(waitForObject(":_list_XTreeWidget_10"), "Tremendous Toys Incorporated_2", 168, 6, 0);
    activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete..."));
    clickButton(waitForObject(":Work Order.Yes_QPushButton"));
    openItemContextMenu(waitForObject(":_list_XTreeWidget_10"), "Tremendous Toys Incorporated", 203, 9, 0);
    activateItem(waitForObjectItem(":xTuple ERP:*._menu_QMenu", "Delete..."));
    mouseClick(waitForObject(":Delete Sales Order?_QMessageBox"), 191, 48, 0, Qt.LeftButton);
    clickButton(waitForObject(":Work Order.Yes_QPushButton"));

}
