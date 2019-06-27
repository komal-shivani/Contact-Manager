export const setContact=(contact)=>{
    return {type:'SET_CONTACTS', payload:contact}
}
export const addContact=(contact)=>{
    return {type:'ADD_CONTACT', payload:contact}
}
export const removeContact=(id)=>{
    return {type:'REMOVE_CONTACT', payload:id}
}