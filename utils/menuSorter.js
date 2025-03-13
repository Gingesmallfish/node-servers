function sortMenus(menus) {
    menus.sort((a, b) => a.sort_order - b.sort_order);
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