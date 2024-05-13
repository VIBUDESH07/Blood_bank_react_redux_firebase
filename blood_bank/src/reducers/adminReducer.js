const Adminreducer = (state = { loginError: false, data: "" }, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS": return { data: action.payload };
        case "LOGIN_FAILED": return { loginError: true, data: "invalid credentials" };
        default: return state;
    }
}
export default Adminreducer;