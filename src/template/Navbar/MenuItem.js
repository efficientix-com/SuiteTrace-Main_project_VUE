export default {
    profile: {
        name: "Magdiel Jimenez",
        image: "logo.png",
        // onClick() {
        //     console.log("profile name clicked");
        // }
    },
    items: [
        // {
        //     id: 0,
        //     title: "Dashboard",
        //     header:"Apps",
        //     displayHeader:false,
        //     path: "/",
        //     icon: 'fa-home',
        //     // onClick() {
        //     //     console.log("Dashboard");
        //     // },
        //     hasChildren: false,

        // },
        {
            id: 1,
            title: "WeTrack",
            header:"Apps",
            displayHeader:true,
            path: "#/",
            icon: 'fa-cart-flatbed',
            // onClick() {
            //     console.log("Lot trace clicked");
            // },
            hasChildren: false,

        },
        {
            id: 2,
            header:"Apps",
            displayHeader:false,
            title: "Register Track",
            icon: 'fa-truck-fast',
            path: "#/register-track",
            onClick() {
                console.log("Soporte");
            },
            hasChildren: false,
        },
        {
            id: 3,
            header:"Apps",
            displayHeader:false,
            title: "WeTrack 3T's",
            icon: 'fa-truck-fast',
            path: "#/epcis-dscsa",
            onClick() {
                console.log("Soporte");
            },
            hasChildren: false,
        },
        {
            id: 4,
            header:"Apps",
            displayHeader:false,
            title: "SuiteTrace Report",
            icon: 'fa-truck-fast',
            path: "#/suitetrace-reports",
            
            hasChildren: false,
        },
        
        {
            id: 5,
            header:"Sandbox",
            displayHeader:true,
            title: "EPCIS master",
            icon: 'fa-screwdriver-wrench',
            path: "#/epcis-track",
            onClick() {
                console.log("SB epcis master");
            },
            hasChildren: false,
        }
    ]
}