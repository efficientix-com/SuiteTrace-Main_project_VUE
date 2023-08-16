export const data_test_summary = () => {
    let obj_data = [
        {
            id: '1',
            date: 'Sun Aug 06 12:27:51 PDT 2023',
            purchaseOrders: 'urn:epcglobal:cbv:bt:0399999999991:4567,urn:epcglobal:cbv:bt:0399999999991:1234',
            isSuspicious: true,
            three_ts: {
                transaction_information: {
                    senderId: "urn:epc:id:sgln:030001.111124.0",
                    receiverId: "urn:epc:id:sgln:039999.999929.0",
                    senderIdOfLocationOrigin: "urn:epc:id:sgln:030001.111125.0",
                    receiverIdOfLocation: "urn:epc:id:sgln:039999.999928.0",
                    timeTransaction: "2012-03-27T17:10:18Z",
                    commissioning: [],
                    purchaseOrders: ["urn:epcglobal:cbv:bt:0399999999991:4567", "urn:epcglobal:cbv:bt:0399999999991:1234"],
                    transactionEvent: [
                        {
                            purchase_order: "urn:epcglobal:cbv:bt:0399999999991:1234",
                            outermost: {
                                id: "urn:epc:id:sscc:030001.00000000101",
                                "single_items": [],
                                items_with_children: [
                                    {
                                        parent_item: {
                                            id: "urn:epc:id:sgtin:0355154.094495.40047623652721",
                                            children_items: [
                                                "urn:epc:id:sgtin:0355154.094495.40023811077021",
                                                "urn:epc:id:sgtin:0355154.094495.40075808151866"
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            purchase_order: "urn:epcglobal:cbv:bt:0399999999991:1234",
                            outermost: {
                                id: "urn:epc:id:sgtin:030001.1123456.401",
                                single_items: [
                                    "urn:epc:id:sgtin:0355154.094495.40023811077021",
                                    "urn:epc:id:sgtin:0355154.094495.40075808151866"
                                ],
                                items_with_children: [
                                    {
                                        upper_parent: {
                                            id: "urn:epc:id:sgtin:0355154.094495.40095247428196",
                                            "single_items": [],
                                            parent_item: [
                                                {
                                                    id: "urn:epc:id:sgtin:0355154.094495.40047623652721",
                                                    children_items: [
                                                        "urn:epc:id:sgtin:0355154.094495.40023811077021",
                                                        "urn:epc:id:sgtin:0355154.094495.40075808151866"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            purchase_order: "urn:epcglobal:cbv:bt:0399999999991:4567",
                            outermost: {
                                id: "urn:epc:id:sscc:030001.00000000102",
                                single_items: [
                                    "urn:epc:id:sgtin:0355154.256899.40023811077021",
                                    "urn:epc:id:sgtin:0355154.256899.40075808151866"
                                ],
                                items_with_children: [
                                    {
                                        parent_item: {
                                            id: "urn:epc:id:sgtin:0355154.256899.40047623652721",
                                            children_items: [
                                                "urn:epc:id:sgtin:0355154.121313.400767687686",
                                                "urn:epc:id:sgtin:0355154.121313.4009567868687"
                                            ]
                                        }
                                    },
                                    {
                                        upper_parent: {
                                            id: "urn:epc:id:sgtin:0355154.256899.400476236525558",
                                            "single_items": [],
                                            parent_item: [
                                                {
                                                    id: "urn:epc:id:sgtin:0355154.152466.4009567868690",
                                                    children_items: [
                                                        "urn:epc:id:sgtin:0355154.152466.4009567868699",
                                                        "urn:epc:id:sgtin:0355154.152466.4009567868600"
                                                    ]
                                                },
                                                {
                                                    id: "urn:epc:id:sgtin:0355154.444444.4546158751311",
                                                    children_items: [
                                                        "urn:epc:id:sgtin:0355154.444444.1545451245454",
                                                        "urn:epc:id:sgtin:0355154.444444.12212121212121"
                                                    ]
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        upper_parent: {
                                            id: "urn:epc:id:sgtin:0355154.256899.400476236525569",
                                            "single_items": [],
                                            parent_item: [
                                                {
                                                    id: "urn:epc:id:sgtin:0355154.152466.4009567868690",
                                                    children_items: [
                                                        "urn:epc:id:sgtin:0355154.152466.4009567868699",
                                                        "urn:epc:id:sgtin:0355154.152466.4009567868600"
                                                    ]
                                                },
                                                {
                                                    id: "urn:epc:id:sgtin:0355154.444444.4546158751311",
                                                    children_items: [
                                                        "urn:epc:id:sgtin:0355154.444444.1545451245454",
                                                        "urn:epc:id:sgtin:0355154.444444.12212121212121"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    products_information: [
                        {
                            "sgtin": "urn:epc:id:sgtin:0355154.256899.40095247428196",
                            "itemIdentification": "05515439449",
                            "itemIdentificationTypeCode": "FDA_NDC_11",
                            "productName": "EpcistraCASE",
                            "nameManufacturerOrTrader": "GS1 Pharma LLC",
                            "dosage": "PILL",
                            "strength": "200mg",
                            "containerSize": "300 pills",
                            "lotNumber": "PR444",
                            "expirationDate": "2022-12-18"
                        },
                        {
                            "sgtin": "urn:epc:id:sgtin:0355154.256899.40023811077021",
                            "itemIdentification": "05515439449",
                            "itemIdentificationTypeCode": "FDA_NDC_11",
                            "productName": "EpcistraCASE",
                            "nameManufacturerOrTrader": "GS1 Pharma LLC",
                            "dosage": "PILL",
                            "strength": "200mg",
                            "containerSize": "300 pills",
                            "lotNumber": "PR444",
                            "expirationDate": "2022-12-18"
                        },
                        {
                            "sgtin": "urn:epc:id:sgtin:0355154.256899.40075808151866",
                            "itemIdentification": "05515439449",
                            "itemIdentificationTypeCode": "FDA_NDC_11",
                            "productName": "EpcistraCASE",
                            "nameManufacturerOrTrader": "GS1 Pharma LLC",
                            "dosage": "PILL",
                            "strength": "200mg",
                            "containerSize": "300 pills",
                            "lotNumber": "PR444",
                            "expirationDate": "2022-12-18"
                        },
                        {
                            "sgtin": "urn:epc:id:sgtin:0355154.256899.40047623652721",
                            "itemIdentification": "05515439449",
                            "itemIdentificationTypeCode": "FDA_NDC_11",
                            "productName": "EpcistraCASE",
                            "nameManufacturerOrTrader": "GS1 Pharma LLC",
                            "dosage": "PILL",
                            "strength": "200mg",
                            "containerSize": "300 pills",
                            "lotNumber": "PR444",
                            "expirationDate": "2022-12-18"
                        },
                        {
                            "sgtin": "urn:epc:id:sgtin:0355154.256899.400476236525558",
                            "itemIdentification": "05515439449",
                            "itemIdentificationTypeCode": "FDA_NDC_11",
                            "productName": "EpcistraCASE",
                            "nameManufacturerOrTrader": "GS1 Pharma LLC",
                            "dosage": "PILL",
                            "strength": "200mg",
                            "containerSize": "300 pills",
                            "lotNumber": "PR444",
                            "expirationDate": "2022-12-18"
                        },
                        {
                            "sgtin": "urn:epc:id:sgtin:0355154.256899.400476236525569",
                            "itemIdentification": "05515439449",
                            "itemIdentificationTypeCode": "FDA_NDC_11",
                            "productName": "EpcistraCASE",
                            "nameManufacturerOrTrader": "GS1 Pharma LLC",
                            "dosage": "PILL",
                            "strength": "200mg",
                            "containerSize": "300 pills",
                            "lotNumber": "PR444",
                            "expirationDate": "2022-12-18"
                        },
                        {
                            "sgtin": "urn:epc:id:sgtin:0355154.121313.400767687686",
                            "itemIdentification": "05515439449",
                            "itemIdentificationTypeCode": "FDA_NDC_11",
                            "productName": "EpcistraCASE",
                            "nameManufacturerOrTrader": "GS1 Pharma LLC",
                            "dosage": "PILL",
                            "strength": "900mg",
                            "containerSize": "30 pills",
                            "lotNumber": "PR444",
                            "expirationDate": "2022-12-18"
                        },
                        {
                            "sgtin": "urn:epc:id:sgtin:0355154.121313.4009567868687",
                            "itemIdentification": "05515439449",
                            "itemIdentificationTypeCode": "FDA_NDC_11",
                            "productName": "EpcistraCASE",
                            "nameManufacturerOrTrader": "GS1 Pharma LLC",
                            "dosage": "PILL",
                            "strength": "900mg",
                            "containerSize": "30 pills",
                            "lotNumber": "PR444",
                            "expirationDate": "2022-12-18"
                        }
                    ],
                    sender_info: { "sender": { "senderId": "urn:epc:id:sgln:030001.111124.0", "name": "GS1 Pharma LLC", "streetAddressOne": "1295 S George Ave", "streetAddressTwo": "Room 378", "city": "Washington", "state": "DC", "postalCode": "12345-6789", "countryCode": "US" }, "senderOfLocationOrigin": { "senderId": "urn:epc:id:sgln:030001.111125.0", "name": "GS1 Pharma LLC", "streetAddressOne": "1299 S George Ave", "streetAddressTwo": "Room 378", "city": "Washington", "state": "DC", "postalCode": "12345-6789", "countryCode": "US" } },
                    receiver_info: { "receiver": { "receiverId": "urn:epc:id:sgln:039999.999929.0", "name": "GS1 Drug Distro LLC", "streetAddressOne": "230 Park Ave S", "streetAddressTwo": "Room 378", "city": "New York", "state": "NY", "postalCode": "10003-1502", "countryCode": "US" }, "receiverOfLocationOrigin": { "receiverId": "urn:epc:id:sgln:039999.999928.0", "name": "GS1 Drug Distro LLC", "streetAddressOne": "231 Park Ave S", "streetAddressTwo": "Room 378", "city": "New York", "state": "NY", "postalCode": "10003-1502", "countryCode": "US" } }
                },
                transaction_history: [
                    {
                        commissioning: [
                            "urn:epc:id:sgtin:0355154.094495.40095247428196",
                            "urn:epc:id:sgtin:0355154.094495.40023811077021",
                            "urn:epc:id:sgtin:0355154.094495.40075808151866",
                            "urn:epc:id:sgtin:0355154.094495.40047623652721",
                            "urn:epc:id:sgtin:0355154.394495.40072894693743"
                        ],
                        products_information: [
                            {
                                "sgtin": "urn:epc:id:sgtin:0355154.256899.40095247428196",
                                "itemIdentification": "05515439449",
                                "itemIdentificationTypeCode": "FDA_NDC_11",
                                "productName": "EpcistraCASE",
                                "nameManufacturerOrTrader": "GS1 Pharma LLC",
                                "dosage": "PILL",
                                "strength": "200mg",
                                "containerSize": "300 pills",
                                "lotNumber": "PR444",
                                "expirationDate": "2022-12-18"
                            },
                            {
                                "sgtin": "urn:epc:id:sgtin:0355154.256899.40023811077021",
                                "itemIdentification": "05515439449",
                                "itemIdentificationTypeCode": "FDA_NDC_11",
                                "productName": "EpcistraCASE",
                                "nameManufacturerOrTrader": "GS1 Pharma LLC",
                                "dosage": "PILL",
                                "strength": "200mg",
                                "containerSize": "300 pills",
                                "lotNumber": "PR444",
                                "expirationDate": "2022-12-18"
                            },
                            {
                                "sgtin": "urn:epc:id:sgtin:0355154.256899.40075808151866",
                                "itemIdentification": "05515439449",
                                "itemIdentificationTypeCode": "FDA_NDC_11",
                                "productName": "EpcistraCASE",
                                "nameManufacturerOrTrader": "GS1 Pharma LLC",
                                "dosage": "PILL",
                                "strength": "200mg",
                                "containerSize": "300 pills",
                                "lotNumber": "PR444",
                                "expirationDate": "2022-12-18"
                            },
                            {
                                "sgtin": "urn:epc:id:sgtin:0355154.256899.40047623652721",
                                "itemIdentification": "05515439449",
                                "itemIdentificationTypeCode": "FDA_NDC_11",
                                "productName": "EpcistraCASE",
                                "nameManufacturerOrTrader": "GS1 Pharma LLC",
                                "dosage": "PILL",
                                "strength": "200mg",
                                "containerSize": "300 pills",
                                "lotNumber": "PR444",
                                "expirationDate": "2022-12-18"
                            },
                            {
                                "sgtin": "urn:epc:id:sgtin:0355154.256899.400476236525558",
                                "itemIdentification": "05515439449",
                                "itemIdentificationTypeCode": "FDA_NDC_11",
                                "productName": "EpcistraCASE",
                                "nameManufacturerOrTrader": "GS1 Pharma LLC",
                                "dosage": "PILL",
                                "strength": "200mg",
                                "containerSize": "300 pills",
                                "lotNumber": "PR444",
                                "expirationDate": "2022-12-18"
                            },
                            {
                                "sgtin": "urn:epc:id:sgtin:0355154.256899.400476236525569",
                                "itemIdentification": "05515439449",
                                "itemIdentificationTypeCode": "FDA_NDC_11",
                                "productName": "EpcistraCASE",
                                "nameManufacturerOrTrader": "GS1 Pharma LLC",
                                "dosage": "PILL",
                                "strength": "200mg",
                                "containerSize": "300 pills",
                                "lotNumber": "PR444",
                                "expirationDate": "2022-12-18"
                            },
                            {
                                "sgtin": "urn:epc:id:sgtin:0355154.121313.400767687686",
                                "itemIdentification": "05515439449",
                                "itemIdentificationTypeCode": "FDA_NDC_11",
                                "productName": "EpcistraCASE",
                                "nameManufacturerOrTrader": "GS1 Pharma LLC",
                                "dosage": "PILL",
                                "strength": "900mg",
                                "containerSize": "30 pills",
                                "lotNumber": "PR444",
                                "expirationDate": "2022-12-18"
                            },
                            {
                                "sgtin": "urn:epc:id:sgtin:0355154.121313.4009567868687",
                                "itemIdentification": "05515439449",
                                "itemIdentificationTypeCode": "FDA_NDC_11",
                                "productName": "EpcistraCASE",
                                "nameManufacturerOrTrader": "GS1 Pharma LLC",
                                "dosage": "PILL",
                                "strength": "900mg",
                                "containerSize": "30 pills",
                                "lotNumber": "PR444",
                                "expirationDate": "2022-12-18"
                            }
                        ],
                        sender_info: {
                            sender: {
                                city: 'Queretaro',
                                countryCode: 'US',
                                name: "FICTICIOUS DISTRIBUTOR",
                                postalCode: "76148",
                                senderId: "urn:epc:id:sgln:030001.111129.0",
                                state: "Qro",
                                streetAddressOne: "211 La Ladera",
                                streetAddressTwo: "Room 211",
                            },
                            senderOfLocationOrigin: {
                                city: "Queretaro",
                                countryCode: "US",
                                name: "ANOTHER FICTICIOUS DISTRIBUTOR",
                                postalCode: "76149",
                                senderId: "urn:epc:id:sgln:030001.111127.0",
                                state: "Qro",
                                streetAddressOne: "207 La Ladera",
                                streetAddressTwo: "Room 206",
                            }
                        },
                        receiver_info: {
                            receiver: {
                                city: "Washington",
                                countryCode: "US",
                                name: "GS1 Pharma LLC",
                                postalCode: "12345-6789",
                                receiverId: "urn:epc:id:sgln:030001.111124.0",
                                state: "DC",
                                streetAddressOne: "1295 S George Ave",
                                streetAddressTwo: "Room 378"
                            },
                            receiverOfLocationOrigin: {
                                city:"Washington",
                                countryCode:"US",
                                name:"GS1 Pharma LLC",
                                postalCode:"12345-6789",
                                receiverId:"urn:epc:id:sgln:030001.111125.0",
                                state:"DC",
                                streetAddressOne:"1299 S George Ave",
                                streetAddressTwo:"Room 378"
                            }
                        },
                        timeTransaction: "2012-03-27T17:10:18Z",
                        purchaseOrders:["urn:epcglobal:cbv:bt:0399999999991:PO42157"]

                    },
                    {
                        commissioning: [
                            "urn:epc:id:sgtin:0355154.094495.40095247428196",
                            "urn:epc:id:sgtin:0355154.094495.40023811077021",
                            "urn:epc:id:sgtin:0355154.094495.40075808151866",
                            "urn:epc:id:sgtin:0355154.094495.40047623652721",
                            "urn:epc:id:sgtin:0355154.394495.40072894693743"
                        ],
                        products_information: [
                            {
                                "sgtin": "urn:epc:id:sgtin:0355154.256899.40095247428196",
                                "itemIdentification": "05515439449",
                                "itemIdentificationTypeCode": "FDA_NDC_11",
                                "productName": "EpcistraCASE",
                                "nameManufacturerOrTrader": "GS1 Pharma LLC",
                                "dosage": "PILL",
                                "strength": "200mg",
                                "containerSize": "300 pills",
                                "lotNumber": "PR444",
                                "expirationDate": "2022-12-18"
                            },
                            {
                                "sgtin": "urn:epc:id:sgtin:0355154.256899.40023811077021",
                                "itemIdentification": "05515439449",
                                "itemIdentificationTypeCode": "FDA_NDC_11",
                                "productName": "EpcistraCASE",
                                "nameManufacturerOrTrader": "GS1 Pharma LLC",
                                "dosage": "PILL",
                                "strength": "200mg",
                                "containerSize": "300 pills",
                                "lotNumber": "PR444",
                                "expirationDate": "2022-12-18"
                            },
                            {
                                "sgtin": "urn:epc:id:sgtin:0355154.256899.40075808151866",
                                "itemIdentification": "05515439449",
                                "itemIdentificationTypeCode": "FDA_NDC_11",
                                "productName": "EpcistraCASE",
                                "nameManufacturerOrTrader": "GS1 Pharma LLC",
                                "dosage": "PILL",
                                "strength": "200mg",
                                "containerSize": "300 pills",
                                "lotNumber": "PR444",
                                "expirationDate": "2022-12-18"
                            },
                            {
                                "sgtin": "urn:epc:id:sgtin:0355154.256899.40047623652721",
                                "itemIdentification": "05515439449",
                                "itemIdentificationTypeCode": "FDA_NDC_11",
                                "productName": "EpcistraCASE",
                                "nameManufacturerOrTrader": "GS1 Pharma LLC",
                                "dosage": "PILL",
                                "strength": "200mg",
                                "containerSize": "300 pills",
                                "lotNumber": "PR444",
                                "expirationDate": "2022-12-18"
                            },
                            {
                                "sgtin": "urn:epc:id:sgtin:0355154.256899.400476236525558",
                                "itemIdentification": "05515439449",
                                "itemIdentificationTypeCode": "FDA_NDC_11",
                                "productName": "EpcistraCASE",
                                "nameManufacturerOrTrader": "GS1 Pharma LLC",
                                "dosage": "PILL",
                                "strength": "200mg",
                                "containerSize": "300 pills",
                                "lotNumber": "PR444",
                                "expirationDate": "2022-12-18"
                            },
                            {
                                "sgtin": "urn:epc:id:sgtin:0355154.256899.400476236525569",
                                "itemIdentification": "05515439449",
                                "itemIdentificationTypeCode": "FDA_NDC_11",
                                "productName": "EpcistraCASE",
                                "nameManufacturerOrTrader": "GS1 Pharma LLC",
                                "dosage": "PILL",
                                "strength": "200mg",
                                "containerSize": "300 pills",
                                "lotNumber": "PR444",
                                "expirationDate": "2022-12-18"
                            },
                            {
                                "sgtin": "urn:epc:id:sgtin:0355154.121313.400767687686",
                                "itemIdentification": "05515439449",
                                "itemIdentificationTypeCode": "FDA_NDC_11",
                                "productName": "EpcistraCASE",
                                "nameManufacturerOrTrader": "GS1 Pharma LLC",
                                "dosage": "PILL",
                                "strength": "900mg",
                                "containerSize": "30 pills",
                                "lotNumber": "PR444",
                                "expirationDate": "2022-12-18"
                            },
                            {
                                "sgtin": "urn:epc:id:sgtin:0355154.121313.4009567868687",
                                "itemIdentification": "05515439449",
                                "itemIdentificationTypeCode": "FDA_NDC_11",
                                "productName": "EpcistraCASE",
                                "nameManufacturerOrTrader": "GS1 Pharma LLC",
                                "dosage": "PILL",
                                "strength": "900mg",
                                "containerSize": "30 pills",
                                "lotNumber": "PR444",
                                "expirationDate": "2022-12-18"
                            }
                        ],
                        sender_info: {
                            sender: {
                                city: 'Queretaro',
                                countryCode: 'US',
                                name: "FICTICIOUS DISTRIBUTOR",
                                postalCode: "76148",
                                senderId: "urn:epc:id:sgln:030001.111129.0",
                                state: "Qro",
                                streetAddressOne: "211 La Ladera",
                                streetAddressTwo: "Room 211",
                            },
                            senderOfLocationOrigin: {
                                city: "Queretaro",
                                countryCode: "US",
                                name: "ANOTHER FICTICIOUS DISTRIBUTOR",
                                postalCode: "76149",
                                senderId: "urn:epc:id:sgln:030001.111127.0",
                                state: "Qro",
                                streetAddressOne: "207 La Ladera",
                                streetAddressTwo: "Room 206",
                            }
                        },
                        receiver_info: {
                            receiver: {
                                city: "Washington",
                                countryCode: "US",
                                name: "GS1 Pharma LLC",
                                postalCode: "12345-6789",
                                receiverId: "urn:epc:id:sgln:030001.111124.0",
                                state: "DC",
                                streetAddressOne: "1295 S George Ave",
                                streetAddressTwo: "Room 378"
                            },
                            receiverOfLocationOrigin: {
                                city:"Washington",
                                countryCode:"US",
                                name:"GS1 Pharma LLC",
                                postalCode:"12345-6789",
                                receiverId:"urn:epc:id:sgln:030001.111125.0",
                                state:"DC",
                                streetAddressOne:"1299 S George Ave",
                                streetAddressTwo:"Room 378"
                            }
                        },
                        timeTransaction: "2012-03-27T17:10:18Z",
                        purchaseOrders:["urn:epcglobal:cbv:bt:0399999999991:PO1234565"]
                    }
                ]


            }
        }
    ];
    return obj_data;
}