import React, { Component } from 'react';
class AdminDashboard extends Component {
    constructor(props){
        console.log("AdminDashboard - props: ", props);
        super(props);
        this.state = {};
    }
    
    render() {
        return(
            <div>
                This is Admin AdminDashboard
            </div>
        )
    }
}

export default AdminDashboard;