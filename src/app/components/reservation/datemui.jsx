import React, { useState }  from "react";
import DatePicker from "react-datepicker";
 



const ViewDatePicker=(props)=>{
    const [date, changeDate] = useState(new Date());
   
    return (
    
    <div>
  <DatePicker
  
       format="dd/MM/yyyy "
       selected={date}
        onChange={(date)=>changeDate(date)}
      />
    </div>
    )
}
export default ViewDatePicker;