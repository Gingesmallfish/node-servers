function buildTree(data) {
    const idToNode = {};
    const tree = [];

    // 第一步：将所有节点存储到一个对象中，键为节点的 id
    data.forEach(item => {
        idToNode[item.id] = {...item, children: []};
    });

    // 第二步：构建树形结构,然后进行排序从小拍到大

    data.forEach(item => {
        if (item.parent_id === null) {
            tree.push(idToNode[item.id]);
        } else {
            const parent = idToNode[item.parent_id];
            if (parent) {
                if (parent.name === '教务管理系统') {
                    // 若父菜单是教务管理系统，将其提升到顶层
                    tree.push(idToNode[item.id]);
                } else {
                    parent.children.push(idToNode[item.id]);
                }
            }
        }
    });



    return tree;
}

module.exports = {
    buildTree
};