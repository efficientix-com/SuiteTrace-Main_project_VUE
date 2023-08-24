
const menuItems = () => {
    const data = [

        {
            id: 0,
            title: 'Lot Trace',
            path: '#/',
            icon: 'fa-solid fa-cart-flatbed',
            hasChildren: false
        },
        {
            id: 1,
            title: 'Register Track',
            path: '#/register-track',
            icon: 'fa-solid fa-truck-fast',
            hasChildren: false
        },
        {
            id: 2,
            title: 'SuiteTrace Reports',
            path: '#/suitetrace-reports',
            icon: 'fa-solid fa-file',
            hasChildren: false
        },

        

    ];
    return data;
}
export default menuItems;