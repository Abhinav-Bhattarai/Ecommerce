import React from 'react';

const MainPageContext = React.createContext({
    FileEncoder: ()=>{},
    TriggerContactPopup: ()=>{},
    ChangeContactFrom: ()=>{},
    ChangeContactReason: ()=>{},
    contact_from: '',
    contact_reason: '',
    contactus_popup: false,
    ClearScreenHandler: ()=>{}
})

export default MainPageContext