const getUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return {};
}


const getUserName = () => {
    
    return getUser()?.username || null;
}
const getUserId = () => {
    return getUser()?.id || null;
}

export { getUser, getUserName, getUserId };