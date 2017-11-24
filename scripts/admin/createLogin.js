
function createLogin() {

    const loggingInOutControlsEl = document.getElementById("loggingInOutControls")

    let loggingInOutControlsDOMString = `
        <section class="login" id="adminLogin">
            <header class="page-header">
                <h3>Login</h3>
            </header>
            <form name="adminLoginForm">
                <label>Email</label>
                <input type="email" name="adminLoginEmail" class="form-control" autofocus required placeholder="...email">
                <label>Password</label>
                <input type="password" name="adminLoginPassword" class="form-control"  required placeholder="...password">
            </form>
                <button class="btn btn-primary" id="adminLoginBtn">Login</button>
                <button class="btn btn-success" id="adminCreateLoginBtn">Create Account</button>
        </section>
        <section class="logout hidden" id="logout">
            <button class="btn btn-warning" id="adminLogoutBtn">Logout</button>
        </section>
    `

    loggingInOutControlsEl.innerHTML = loggingInOutControlsDOMString

}

module.exports = createLogin