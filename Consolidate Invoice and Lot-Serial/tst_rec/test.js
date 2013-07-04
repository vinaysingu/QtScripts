function main()
{
    type(waitForObject(":_username_QLineEdit"), "admin");
    type(waitForObject(":_username_QLineEdit"), "<Tab>");
    type(waitForObject(":_password_QLineEdit"), "zenx2plE");
    type(waitForObject(":_password_QLineEdit"), "<Return>");
    type(waitForObject(":Sales Order.OK_QPushButton_2"), "<Return>");
    type(waitForObject(":Sales Order.No_QPushButton_2"), "<Left>");
    type(waitForObject(":View Check Run.Yes_QPushButton_2"), "<Return>");
    activateItem(waitForObjectItem(":xTuple ERP: *_QMenuBar", "Products"));
    activateItem(waitForObjectItem(":xTuple ERP:*.Products_QMenu", "Lot/Serial..."));
    clickTab(waitForObject(":Sales Order.qt_tabwidget_tabbar_QTabBar"), "Registrations");
    mouseClick(waitForObject(":Lot/Serial.ItemLineEdit_ItemLineEdit"), 13, 13, 0, Qt.LeftButton);
    type(waitForObject(":Lot/Serial.ItemLineEdit_ItemLineEdit"), "y");
    waitForObjectItem(":_QTreeView", "YPAINT1");
    clickItem(":_QTreeView", "YPAINT1", 46, 11, 0, Qt.LeftButton);
    type(waitForObject(":Lot/Serial.ItemLineEdit_ItemLineEdit"), "<Tab>");
    mouseClick(waitForObject(":Lot/Serial.VirtualClusterLineEdit_LotserialLineEdit"), 17, 10, 0, Qt.LeftButton);
    type(waitForObject(":Lot/Serial.VirtualClusterLineEdit_LotserialLineEdit"), "l");
    type(waitForObject(":_QTreeView"), "<Up>");
    type(waitForObject(":_QTreeView"), "<Tab>");
    sendEvent("QMouseEvent", waitForObject(":_regTab.New_QPushButton"), QEvent.MouseButtonPress, 43, 19, Qt.LeftButton, 0);
    sendEvent("QMouseEvent", waitForObject(":_regTab.New_QPushButton"), QEvent.MouseButtonRelease, 43, 19, Qt.LeftButton, 1);
    mouseClick(waitForObject(":_dateGroup.XDateEdit_XDateEdit_4"), 52, 14, 0, Qt.LeftButton);
    mouseClick(waitForObject(":_filterGroup.XDateEdit_XDateEdit"), 45, 13, 0, Qt.LeftButton);

}
