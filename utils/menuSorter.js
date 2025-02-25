// 对菜单进行排序的函数
function sortMenus(menus) {
    // 对顶层菜单进行排序
    menus.sort((a, b) => a.sort_order - b.sort_order);
    // 递归对每个菜单的子菜单进行排序
    menus.forEach(menu => {
        if (menu.children && menu.children.length > 0) {
            menu.children = sortMenus(menu.children);
        }
    });
    return menus;
}

module.exports = {
    sortMenus
};