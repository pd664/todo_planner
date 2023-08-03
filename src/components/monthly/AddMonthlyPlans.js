import React, {useState} from 'react'
import '../../static/components/monthly/addMonthly.css'
import { useDispatch, useSelector } from 'react-redux';
import { addMonthlyPlan, allMonthlyServer } from '../../reduxComps/actions/Index';
import axios from 'axios';
import { getUser } from '../../utils/token'

const monthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December']

function AddMonthly() {
    const dispatch = useDispatch()
    const [mPName, setMPName] = useState("")
    const [mpDate, setMPDate] = useState("")
    const [mpId, setMPId] = useState("")
    const [mpUserId, setMPUserId] = useState("")

    // let a = getUser() ? setMPUserId(getUser().userId) : "";

    function handleSubmit(e) {
        e.preventDefault()
        var id = "id" + Math.random().toString(16).slice(2)
        axios.post('http://localhost:4000/addMonthlyPlan', {
            monthlyPlanName: mPName,
            monthlyPlanDate: mpDate,
            monthlyPlanId: id,
            monthlyPlanUserId: getUser().userId,
        })
        .then((res) => dispatch(addMonthlyPlan(mPName, mpDate, id, getUser().userId)))
        // dispatch(addMonthlyPlan(mPName, mpDate))
        
        document.getElementsByName("addMonthly_input")[0].reset();
    }
    
    return (
        <div className="addMonthly">
            <div className="addMonthly_todo">
                <h2>MONTHLY PLAN</h2>
                <div className="addMonthly_todo">
                    <p>New Plan</p>
                    <form name="addMonthly_input">
                    <input type="text" className='addMonthly_input' onChange={(e) => setMPName(e.target.value)} placeholder="Create new Monthly Plan"></input>
                    <input type="month" placeholder="YYYY--mm" min="1900" max="2013" className='addMonthly_input' onChange={(e) => {console.log(e.target.value); setMPDate(e.target.value)}}></input>
                    <input type="submit" onClick={handleSubmit} className="addMonthly_submit" value="Submit"></input> 
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddMonthly