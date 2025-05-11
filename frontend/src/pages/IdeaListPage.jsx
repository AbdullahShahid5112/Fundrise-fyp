import { useState } from "react"
import AddIdea from "./AddIdeaPage";

export default function TableList(){
    const Clint=[
    {id:1,IdeaName:"john Doe",EntrepreneurName:"JohnDoe" ,RequiredInvestment:"1000"},
    {id:1,IdeaName:"john Doe",EntrepreneurName:"JohnDoe" ,RequiredInvestment:"1000"},
    {id:1,IdeaName:"john Doe",EntrepreneurName:"JohnDoe" ,RequiredInvestment:"1000"},
    ]
    const[isOpen, setIsOpen]=useState(false);
    const[moduleMode,setModuleMode]=useState('add');
    const handleOpen=(mode)=>{
        setIsOpen(true);
    }
    const handleSubmit=()=>{
        if(moduleMode==='add'){
            console.log('model Mode Add')
        }
        else{
            console.log('model Mode Edit')
        }
    }
return(

<>


<></>
   
      <div className="overflow-x-auto overflow-y-auto my-20 mx-8">
        
            
      <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th>id</th>
            <th>IdeaName</th>
            <th>EntrepreneurName</th>
            <th>RequiredInvestment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
 {Clint.map((item, index) => (
  <tr key={index}>
    <th>{index + 1}</th>
    <td>{item.id}</td>
    <td>{item.IdeaName}</td>
    <td>{item.EntrepreneurName}</td>
    <td>{item.RequiredInvestment}</td>
    <td className="flex gap-2">
      <button className="btn btn-secondary" onClick={() => onOpen(item)}>Update</button>
      <button className="btn btn-accent" onClick={() => onDelete(item.id)}>Delete</button>
    </td>
  </tr>
))}

            
        
        </tbody>
      </table>
    </div>
    

  


</>
)
}