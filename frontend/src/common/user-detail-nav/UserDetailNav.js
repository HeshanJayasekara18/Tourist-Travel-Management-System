import react from "react";
import "./UserDetailNav.css"
import v8 from '../../images/v8.png'; 
import v9 from '../../images/v9.png'; 
import v8 from '../../../images/v8.png'; 
import v9 from '../../../images/v9.png'; 
import h8 from '../../images/h8.png'; 
import h9 from '../../images/h9.png'; 

function UserDetailNav(){
    return (
        <div class="mainUserDetailNav">
            <div class="userDetailsub1">
                 <span class="s1">Welcome</span>
                 <span class="s2">Saman Kumara</span>
            </div>
            <div class="userDetailsub2">
                <img src={h8} class="icons"/>
                <img src={h9} class="icons"/>
            </div>

        </div>

    );
}
export default UserDetailNav;