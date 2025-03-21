import react from 'react';
import "./PropertyTransaction.css"
import v20 from '../../../../images/v20.png';

function PropertyTransaction (){
    return(
        <div>
           
           <div class="transactionNav">
            <div class="dataset">
                <div class="dateText">
                    <span class="u1">May</span>
                    <span class="u2">Today is Saturday, May 9th, 2025</span>
                </div>
                <div class="line"></div>
                <div class="manageTopic">
                  <h4>Transaction Manage</h4>
                </div>
            </div>
          </div>

          <div class="transaction-container">
                  
                  <div class="transaction-row header-row">
                    <div class="transaction-cell">Transaction ID</div>
                    <div class="transaction-cell">Category</div>
                    <div class="transaction-cell">Full Name</div>
                    <div class="transaction-cell">Start Date</div>
                    <div class="transaction-cell">End Date</div>
                    <div class="transaction-cell">Total Amount</div>
                    <div class="transaction-cell">Payment Status</div>
                  </div>
                  
                 
                  <div class="transaction-row">
                    <div class="transaction-cell">TRX-001</div>
                    <div class="transaction-cell">Hotel</div>
                    <div class="transaction-cell">John Doe</div>
                    <div class="transaction-cell">2025-03-15</div>
                    <div class="transaction-cell">2025-03-19</div>
                    <div class="transaction-cell">Rs 35 000</div>
                    <div class="transaction-cell"><img class="paidIcon" src={v20}/></div>
                  </div>
        </div>
        </div>

    );
}

export default PropertyTransaction;