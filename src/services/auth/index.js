const axios = require('axios');
import ROUTER from "router";
const Swal = require('sweetalert2')

export default {
    userEmail: null,
    registeredUser: [],
    courses: [],
    setUser(user) {
        this.userEmail = user
    },

    register(username, email, password) {
        var data = {
            username: username,
            email: email,
            password: password
        }
        const self = this;
        axios.post('http://localhost:3000/users', data)
            .then(function (response) {
                localStorage.setItem("user", "dashboard")
                localStorage.setItem("email", email)
                self.setUser(email);
                ROUTER.push('/dashboard')
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    login(email, password) {
        // userEmail = localStorage.getItem("email");
        var data = {
            email: email,
            password: password
        }
        const self = this;
        axios.post('http://localhost:3000/login', data)
            .then(function (response) {
                localStorage.setItem("email", email)
                self.setUser(email);
                if (response.data.user != undefined) {
                    console.log(response.data.user)
                    localStorage.setItem("user", "dashboard")
                    ROUTER.push('/dashboard');
                } else {
                    localStorage.setItem("partner", "dashboardPartneredUser")
                    ROUTER.push('/dashboardPartneredUser');
                }
                console.log(response.data);
            })
            .catch(function (error) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'email or password is incorrect',
                    showConfirmButton: false,
                    timer: 1500
                })
                localStorage.removeItem("email")
                console.log(error);
            });
    },
    logout() {
        Swal.fire({
            title: 'Are you sure you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                let timerInterval
                Swal.fire({
                    title: 'Logging out ...',
                    timer: 2000,
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                    },
                    onClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    if (
                        result.dismiss === Swal.DismissReason.timer
                    ) {
                        console.log('I was closed by the timer')
                        localStorage.clear()
                        ROUTER.push('/Homepage')
                    }
                })
                this.userEmail = null;
            }
        });
    }
}