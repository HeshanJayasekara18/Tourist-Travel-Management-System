import react from "react";
import "./UserDetailNav.css"
import v8 from '../../images/v8.png'; 
import v9 from '../../images/v9.png'; 

function UserDetailNav(){
    return (
        <div class="mainUserDetailNav">
            <div class="userDetailsub1">
                 <span class="s1">Welcome</span>
                 <span class="s2">Saman Kumara</span>
            </div>
            <div class="userDetailsub2">
                <img src={v8} class="icons"/>
                <img src={v9} class="icons"/>
            </div>

        </div>

    );
}
export default UserDetailNav;