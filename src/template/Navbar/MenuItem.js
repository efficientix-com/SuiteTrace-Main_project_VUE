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
            title: "We Track",
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
            title: "Register track",
            icon: 'fa-truck-fast',
            path: "#/register-track",
            onClick() {
                console.log("Soporte");
            },
            hasChildren: false,
        },
        
        // {
        //     id: 5,
        //     header:"Sandbox",
        //     displayHeader:true,
        //     title: "EPC Encoder",
        //     icon: 'fa-screwdriver-wrench',
        //     path: "#/sb-encoder-epc",
        //     onClick() {
        //         console.log("SB encoder");
        //     },
        //     hasChildren: false,
        // }
    ]
}