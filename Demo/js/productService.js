
function productService() { }
productService._path = '/cn/dwr';

productService.getProductDao = function(callback) {
    DWREngine._execute(productService._path, 'productService', 'getProductDao', callback);
}

productService.setProductDao = function(p0, callback) {
    DWREngine._execute(productService._path, 'productService', 'setProductDao', p0, callback);
}

productService.getRecommended = function(callback) {
    DWREngine._execute(productService._path, 'productService', 'getRecommended', callback);
}

productService.getProductInfo = function(p0, callback) {
    DWREngine._execute(productService._path, 'productService', 'getProductInfo', p0, callback);
}

productService.findProductInfo = function(p0, p1, callback) {
    DWREngine._execute(productService._path, 'productService', 'findProductInfo', p0, p1, callback);
}

productService.getProductFeatures = function(p0, p1, callback) {
    DWREngine._execute(productService._path, 'productService', 'getProductFeatures', p0, p1, callback);
}

productService.selectFeaturesById = function(p0, callback) {
    DWREngine._execute(productService._path, 'productService', 'selectFeaturesById', p0, callback);
}

productService.selectProduct = function(p0, callback) {
    DWREngine._execute(productService._path, 'productService', 'selectProduct', p0, callback);
}

productService.getProductInfoList = function(p0, callback) {
    DWREngine._execute(productService._path, 'productService', 'getProductInfoList', p0, callback);
}

productService.loadProductInfoName = function(p0, p1, callback) {
    DWREngine._execute(productService._path, 'productService', 'loadProductInfoName', p0, p1, callback);
}

productService.updateCout = function(p0, callback) {
    DWREngine._execute(productService._path, 'productService', 'updateCout', p0, callback);
}

productService.getProductInfoTop10 = function(callback) {
    DWREngine._execute(productService._path, 'productService', 'getProductInfoTop10', callback);
}

productService.findProductTreeId = function(p0, callback) {
    DWREngine._execute(productService._path, 'productService', 'findProductTreeId', p0, callback);
}

productService.updateScoreAndTimes = function(p0, p1, callback) {
    DWREngine._execute(productService._path, 'productService', 'updateScoreAndTimes', p0, p1, callback);
}
