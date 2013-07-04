function main()
{
    type(waitForObject(":_username_QLineEdit"), "admin");
    type(waitForObject(":_username_QLineEdit"), "<Tab>");
    type(waitForObject(":_password_QLineEdit"), "xz");
    type(waitForObject(":_password_QLineEdit"), "<Backspace>");
    type(waitForObject(":_password_QLineEdit"), "<Backspace>");
    type(waitForObject(":_password_QLineEdit"), "zenx2plEe");
    type(waitForObject(":_password_QLineEdit"), "<Backspace>");
    type(waitForObject(":_password_QLineEdit"), "<Return>");
    type(waitForObject(":Transfer Order.No_QPushButton"), "<Left>");
    type(waitForObject(":W/O Schedule by Planner Code.Yes_QPushButton"), "<Return>");
    activateItem(waitForObjectItem(":xTuple ERP:*_QMenuBar", "Inventory"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Inventory_QMenu", "Receiving"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Receiving_QMenu", "Purchase Order Return..."));
    type(waitForObject(":Issue to Shipping.VirtualClusterLineEdit_OrderLineEdit"), "<2>");
    type(waitForObject(":_QTreeView"), "<0>");
    type(waitForObject(":_QTreeView"), "<1>");
    type(waitForObject(":_QTreeView"), "<3>");
    type(waitForObject(":_QTreeView"), "<5>");
    type(waitForObject(":_QTreeView"), "<Tab>");
    waitForObjectItem(":_poitems._poitem_XTreeWidget_2", "100\\.00_1");
    clickItem(":_poitems._poitem_XTreeWidget_2", "100\\.00_1", 44, 8, 0, Qt.LeftButton);
    clickButton(waitForObject(":*.Enter Return_QPushButton"));
    mouseClick(waitForObject(":*._toReturn_XLineEdit"), 53, 11, 0, Qt.LeftButton);
    type(waitForObject(":*._toReturn_XLineEdit"), "<1>");
    type(waitForObject(":*._toReturn_XLineEdit"), "<Tab>");
    mouseClick(waitForObject(":*._rejectCode_XComboBox"), 63, 11, 0, Qt.LeftButton);
    mouseClick(waitForObjectItem(":*._rejectCode_XComboBox", "PO-DAMAGED-RETURNED"), 63, 3, 0, Qt.LeftButton);
    clickButton(waitForObject(":*.Return_QPushButton"));
    mouseClick(waitForObject(":xTuple ERP:*.Enter Purchase Order Returns_QMdiSubWindow"), 556, 14, 0, Qt.LeftButton);
    clickButton(waitForObject(":W/O Schedule by Planner Code.Post_QPushButton"));
    clickButton(waitForObject(":Work Order.Close_QPushButton"));

}
