const {sortMenus} = require('./menuSorter');

function buildTree(data) {
    const idToNode = {};
    const tree = [];

    // 第一步：将所有节点存储到一个对象中，键为节点的 id
    data.forEach(item => {
        idToNode[item.id] = {...item, children: []};
    });

    // 第二步：构建树形结构
    data.forEach(item => {
        if (item.parent_id === null) {
            if (item.id === 1 || item.id === 2 || item.id === 3) {
                // 先添加 id 为 1、2、3 的顶层菜单
                tree.push(idToNode[item.id]);
            }
        }
    });

    // 第三步：添加 id 为 4、5、6、7 的菜单作为顶层菜单
    [4, 5, 6, 7].forEach(id => {
        const menu = idToNode[id];
        if (menu) {
            tree.push(menu);
        }
    });

    // 第四步：再次遍历数据，构建子菜单关系
    data.forEach(item => {
        if (item.parent_id !== null && !([1, 2, 3].includes(item.parent_id))) {
            const parent = idToNode[item.parent_id];
            if (parent) {
                parent.children.push(idToNode[item.id]);
            }
        }
    });

    // 第五步：递归对每个菜单的子菜单按 id 排序
    function recursiveSort(menus) {
        menus.sort((a, b) => a.id - b.id);
        menus.forEach(menu => {
            if (menu.children && menu.children.length > 0) {
                menu.children = recursiveSort(menu.children);
            }
        });
        return menus;
    }

    recursiveSort(tree);

    return tree;
}

module.exports = {
    buildTree
};