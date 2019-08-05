
function pageManagementService() { }
pageManagementService._path = '/cn/dwr';

pageManagementService.addPageManagement = function(p0, callback) {
    DWREngine._execute(pageManagementService._path, 'pageManagementService', 'addPageManagement', p0, callback);
}

pageManagementService.findPageManagement = function(p0, callback) {
    DWREngine._execute(pageManagementService._path, 'pageManagementService', 'findPageManagement', p0, callback);
}

pageManagementService.updatePageManagement = function(p0, callback) {
    DWREngine._execute(pageManagementService._path, 'pageManagementService', 'updatePageManagement', p0, callback);
}

pageManagementService.getPageManagementDao = function(callback) {
    DWREngine._execute(pageManagementService._path, 'pageManagementService', 'getPageManagementDao', callback);
}

pageManagementService.setPageManagementDao = function(p0, callback) {
    DWREngine._execute(pageManagementService._path, 'pageManagementService', 'setPageManagementDao', p0, callback);
}

pageManagementService.getPagemanagement = function(callback) {
    DWREngine._execute(pageManagementService._path, 'pageManagementService', 'getPagemanagement', callback);
}

pageManagementService.getPagemenageInfo = function(callback) {
    DWREngine._execute(pageManagementService._path, 'pageManagementService', 'getPagemenageInfo', callback);
}

pageManagementService.getFriendLinkDao = function(callback) {
    DWREngine._execute(pageManagementService._path, 'pageManagementService', 'getFriendLinkDao', callback);
}

pageManagementService.setFriendLinkDao = function(p0, callback) {
    DWREngine._execute(pageManagementService._path, 'pageManagementService', 'setFriendLinkDao', p0, callback);
}
